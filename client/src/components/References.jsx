import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import LoginButton from './LoginButton';

// Oturum bilgilerini (cookie) göndermek için gerekli
axios.defaults.withCredentials = true;

// --- BİLEŞENLER ---

const MessageCard = ({ msg, isLast }) => {
    // Rastgele syntax highlight renkleri
  const colors = [
  'text-purple-400',
  'text-yellow-400',
  'text-blue-400',
  'text-green-400',
  'text-pink-400',
  'text-red-400',
  'text-indigo-400',
  'text-teal-400',
  'text-cyan-400',
  'text-emerald-400',
  'text-lime-400',
  'text-amber-400',
  'text-orange-400',
  'text-rose-400',
  'text-fuchsia-400',
  'text-violet-400',
  'text-sky-400',
  'text-slate-400',
  'text-gray-400',
  'text-zinc-400',
  'text-neutral-400',
  'text-stone-400'
]; const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="group py-2 flex items-start space-x-3 font-mono text-sm md:text-base"
        >
            <a
                href={msg.profileUrl || `https://github.com/${msg.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-shrink-0 font-bold hover:underline cursor-pointer ${randomColor}`}
            >
                {msg.username || 'Anonymous'}
            </a>

            <span className="text-gray-300 break-words flex-1">
                {msg.message}
            </span>

            {/* İmleç efekti sadece son mesajda opsiyonel olabilir veya dekoratif olarak eklenebilir */}
            {isLast && (
                <span className="ml-1 w-2 h-5 bg-gray-500 animate-pulse inline-block align-middle"></span>
            )}
        </motion.div>
    );
};

const References = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

    // Kullanıcı oturum kontrolü ve Pending Comment (Bekleyen Yorum) Mantığı
    useEffect(() => {
        const checkAuthAndSubmitPending = async () => {
            try {
                // Backend'den oturum durumunu kontrol et
                const baseUrl = API_URL.replace('/api', '');
                const res = await axios.get(`${baseUrl}/auth/user`);

                if (res.data.user) {
                    setUser(res.data.user);

                    // --- PENDING COMMENT KONTROLÜ ---
                    const pendingComment = localStorage.getItem('pendingComment');
                    if (pendingComment) {
                        try {
                            // Bekleyen yorumu gönder
                            await axios.post(`${API_URL}/references`, { message: pendingComment });
                            // Listeyi güncellemek için mesajları tekrar çek (veya manuel ekle)
                            fetchMessages();
                            // Temizle
                            localStorage.removeItem('pendingComment');
                        } catch (err) {
                            console.error("Error submitting pending comment:", err);
                            setError("Daha önce yazdığınız yorum gönderilemedi: " + (err.response?.data?.message || err.message));
                        }
                    }
                }
            } catch (err) {
                console.log("Not logged in");
            }
        };

        checkAuthAndSubmitPending(); // Auth ve Pending Comment kontrolü
        fetchMessages(); // Mesajları çek
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${API_URL}/references`);
            setMessages(response.data);
        } catch (err) {
            console.error("Error fetching messages:", err);
            // Fallback - Mock Veri
          
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const messageText = comment.trim();
        if (!messageText) return;

        // --- GİRİŞ YAPMAMIŞSA ---
        if (!user) {
            // Yorumu kaydet
            localStorage.setItem('pendingComment', messageText);
            // GitHub giriş sayfasına yönlendir
            const baseUrl = API_URL.replace('/api', '');
            window.location.href = `${baseUrl}/auth/github`;
            return;
        }

        // --- GİRİŞ YAPMIŞSA ---
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/references`, { message: messageText });
            setMessages([...messages, response.data]);
            setComment('');
        } catch (err) {
            setError(err.response?.data?.message || "Mesaj gönderilemedi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="references" className="py-6 relative">
            {/* Nokta Deseni Arka Planı */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10  pointer-events-none"></div>

            <div className="max-w-2xl mx-auto px-24 relative z-10 hidden-scrollbar">
                <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700/80 rounded-lg shadow-2xl p-6 min-h-[400px] flex flex-col justify-end">

                    {/* Mesaj Listesi */}
                    <div className="flex-grow max-h-60 overflow-y-auto space-y-1 mb-4 pr-2 custom-scrollbar">
                        <AnimatePresence initial={false}>
                            {messages.map((msg, index) => (
                                <MessageCard
                                    key={msg._id || Math.random()}
                                    msg={msg}
                                    isLast={index === messages.length - 1}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Giriş veya Form Alanı */}
                    <div className="border-t border-slate-700/80 pt-4 mt-4">
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder={user ? "Bir referans bırakın..." : "Yorum yazmak için GitHub ile giriş yapın..."}
                                className="w-full bg-slate-800/60 border border-slate-700 rounded-md py-2 pl-4 pr-24 text-slate-300 font-mono text-sm placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                autoFocus
                                disabled={isSubmitting}
                            />
                            {!user && (
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded px-3 py-1 transition-colors disabled:opacity-50"
                                    disabled={isSubmitting}
                                >
                                    Gönder & Giriş Yap
                                </button>
                            )}
                            {user && (
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded px-3 py-1 transition-colors disabled:opacity-50"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                                </button>
                            )}
                        </form>
                        {error && <p className="text-red-400 text-xs mt-2 font-mono pl-1">{error}</p>}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default References;
