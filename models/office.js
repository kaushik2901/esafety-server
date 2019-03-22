const mongoose = require('mongoose');
const { Schema } = mongoose;

const OfficeSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    location: {
        type: { type: String },
        coordinates: []
    }
});

OfficeSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('Office', OfficeSchema);