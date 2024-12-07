const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    createDate: { type: Date, default: Date.now },
});


const { hashPassword } = require('../utils/passwordUtils'); 

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await hashPassword(this.password);
    }
    next(); // Continue the saving process
});


module.exports = mongoose.model('User', userSchema);
