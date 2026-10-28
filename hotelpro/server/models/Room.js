const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: [true, 'Please provide room number'],
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide room title'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['Deluxe', 'Executive Suite', 'Presidential Villa', 'Superior King', 'Family Penthouse'],
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: [true, 'Please specify price per night'],
  },
  maxGuests: {
    type: Number,
    required: true,
    default: 2,
  },
  bedType: {
    type: String,
    default: '1 King Bed',
  },
  sizeSqFt: {
    type: Number,
    default: 450,
  },
  amenities: {
    type: [String],
    default: ['High-Speed Wi-Fi', 'Smart TV', 'Mini Bar', 'Climate Control', 'Ocean/City View', 'Room Service'],
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Cleaning', 'Maintenance'],
    default: 'Available',
  },
  rating: {
    type: Number,
    default: 4.8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Room', roomSchema);
