const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, 
    description: { type: String },
    availability: { type: String },
    rentalPrice: { type: Number },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    img: [{ type: String }],
    condition: { type: String },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const Machine = mongoose.model('Machine', machineSchema);

module.exports = Machine;
