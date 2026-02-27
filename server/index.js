require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const Reference = require('./models/Reference');

const app = express();

const FRONTEND_URL = process.env.NODE_ENV === 'production'
    ? 'https://enes-me-portfolio.vercel.app'
    : (process.env.FRONTEND_URL || 'http://localhost:5173');

// Middleware
app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Session Config
app.use(session({
    secret: process.env.SESSION_SECRET || 'super_secret_key_change_me',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Production'da true olmalı
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Cross-site cookies için production'da 'none'
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Proxy trust for production (important for secure cookies behind proxies like Render/Vercel)
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Passport Config
app.use(passport.initialize());
app.use(passport.session());

// Passport Serialization
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || 'PLACEHOLDER_ID',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'PLACEHOLDER_SECRET',
    callbackURL: process.env.NODE_ENV === 'production'
        ? "https://enes-me-portfolioenes-portfolio-backend.onrender.com/auth/github/callback"
        : (process.env.CALLBACK_URL || "http://localhost:5001/auth/github/callback")
},
    function (accessToken, refreshToken, profile, done) {
        // Burada kullanıcıyı sadece session'a kaydediyoruz, veritabanına yorum attığında kaydedeceğiz.
        // Veya kullanıcıyı veritabanında "User" collection'ı varsa oraya kaydedebiliriz.
        // Şimdilik profil bilgilerini dönüyoruz.
        const user = {
            id: profile.id,
            username: profile.username,
            avatarUrl: profile.photos[0].value,
            profileUrl: profile.profileUrl
        };
        return done(null, user);
    }
));


// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- ROUTES ---

// Auth Routes
app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: `${FRONTEND_URL}?error=login_failed` }),
    function (req, res) {
        // Başarılı giriş
        res.redirect(`${FRONTEND_URL}`);
    });

app.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

app.get('/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect(FRONTEND_URL);
    });
});


// API Routes
// GET all references
app.get('/api/references', async (req, res) => {
    try {
        const references = await Reference.find().sort({ createdAt: 1 }); // Eskiden yeniye sırala
        res.json(references);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new reference
app.post('/api/references', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Yorum yapmak için giriş yapmalısınız.' });
    }

    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }

    // Kullanıcının daha önce yorum yapıp yapmadığını kontrol et
    const existingRef = await Reference.findOne({ githubId: req.user.id });
    if (existingRef) {
        return res.status(403).json({ message: 'Daha önce yorum yaptığınız için yeni bir yorum bırakamazsınız.' });
    }

    try {
        const newReference = new Reference({
            githubId: req.user.id,
            username: req.user.username,
            avatarUrl: req.user.avatarUrl,
            profileUrl: req.user.profileUrl,
            message: message
        });
        const savedReference = await newReference.save();
        res.status(201).json(savedReference);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
