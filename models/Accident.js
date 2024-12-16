const mongoose = require('mongoose');

const accidentSchema = new mongoose.Schema({
    accident_id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    images: { 
        type: [String],
        validate: [arrayLimit, 'You can only upload up to 3 images'] ,
        required: true, 
    },
    AI_Images: { 
        type: [String], 
        validate: [arrayLimit, 'You can only upload up to 3 images'],
        default: [""]
    },
    employee_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee',
        default: null
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true, 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Process','Rejected','Reviewed','Objection', 'Appointment','Complete','Closed'], 
        default: 'Pending' 
    },
    message: { 
        type: String, 
        default: '' 
    },
    appointment_date: { 
        type: Date, 
        default: null 
    },
    response_at: { 
        type: Date, 
        default: null 
    },
    AI_Response: { 
        type: [ 
            {
                part: {
                    type: String,
                    required: true 
                },
                price: {
                    type: Number, 
                    required: true 
                }
            }
        ],
        default: [] 
    },
    created_at: { 
        type: Date, 
        default: Date.now
    },
});

// Custom validator to ensure only 3 images
function arrayLimit(val) {
    return (val.length >= 1 && val.length <= 3);
}

module.exports = mongoose.model('Accident', accidentSchema);
