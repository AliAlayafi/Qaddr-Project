const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId, // Assuming Employee_ID references another collection
    ref: 'Employee', // The name of the referenced model (e.g., 'Employee')
    required: true,
  },
  manager_id: {
    type: mongoose.Schema.Types.ObjectId, // Assuming Employee_ID references another collection
    ref: 'Employee', // The name of the referenced model (e.g., 'Employee')
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
  },
});


module.exports = mongoose.model('Message', messageSchema);
