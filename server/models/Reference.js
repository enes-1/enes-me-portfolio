const mongoose = require('mongoose');

const ReferenceSchema = new mongoose.Schema({
    githubId: { type: String, required: true },
    username: { type: String, required: true },
    avatarUrl: { type: String },
    profileUrl: { type: String },
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Reference', ReferenceSchema);
