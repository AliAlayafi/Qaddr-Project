const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    role: { type: Number, required: true, enum: [1, 2] },
    createDate: { type: Date, default: Date.now },
});



const { hashPassword } = require('../utils/passwordUtils'); 
EmployeeSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await hashPassword(this.password);
    }
    next(); // Continue the saving process
});



module.exports = mongoose.model('Employee', EmployeeSchema);
