const mongoose = require('mongoose');

const ResetSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  // Reference to User collection
        required: true 
    },
    link: { 
        type: String, 
        required: true,
        unique: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now,
        expires: 3600  // Auto-delete after 1 hour (3600 seconds)
    },
});

module.exports = mongoose.model('Reset', ResetSchema);