const mongoose = require('mongoose');


const najemSchema = new mongoose.Schema({
    accident_id: { type: Number, required: true, unique: true }, // Unique accident ID
    car_brand: { type: String, required: true },
    car_model: { type: String, required: true },
    car_model_year: { type: String, required: true },
    description: { type: String, default: "" },
    damage_info: {
        type: [String], // Array of strings for damage areas
        enum: [
            'rear',
            'front',
            'front-left',
            'front-right',
            'rear-left',
            'rear-right',
            'side-left',
            'side-right',
            'top'
        ],
        required: true,
    },
    images: { 
        type: [String], // Array of base64 image strings
        validate: [arrayLimit, 'Exceeds the limit of 3 images'], // Limit to 3 images
        required: true,
    },
    created_at: { type: Date, default: Date.now }, // Automatically set creation date
});


function arrayLimit(val) {
    return (val.length <= 3 && val.length >= 1); // 1-3
}


module.exports = mongoose.model('Najem', najemSchema);