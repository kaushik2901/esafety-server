const mongoose = require('mongoose');

const aiqSchema = mongoose.Schema({
    type: { type: String },
    geometry: {
        type: {
            type: String
        },
        coordinates: [ Array ]
    },
    properties: {
        name : { type: String },
        description : { type: String }
    }
}, { timestamps: true } );

aiqSchema.index({ geometry: '2dsphere' });

module.exports = mongoose.model('Aiq', aiqSchema)