const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    role: { type: String, required: true, default: 'farmer' },
    registrationDate: { type: Date, default: Date.now },
    avatar: { type: String , default: 'https://res.cloudinary.com/djnv06fje/image/upload/v1617322354/avatars/avatar-1_ukzj6v.png'},
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
