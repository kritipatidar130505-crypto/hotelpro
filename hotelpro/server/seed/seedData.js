const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: __dirname + '/../.env' });

const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotelpro');
    console.log('[Seed]: Connected to MongoDB...');

    // Clear existing collections
    await User.deleteMany();
    await Room.deleteMany();
    await Booking.deleteMany();
    console.log('[Seed]: Cleared existing collections.');

    // Seed Users
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const guestPassword = await bcrypt.hash('guest123', salt);

    const users = await User.insertMany([
      {
        name: 'HotelPro General Manager',
        email: 'admin@hotelpro.com',
        password: adminPassword,
        phone: '+1 (555) 019-2831',
        role: 'admin',
      },
      {
        name: 'Sophia Sterling',
        email: 'guest@hotelpro.com',
        password: guestPassword,
        phone: '+1 (555) 892-1234',
        role: 'guest',
      },
    ]);
    console.log(`[Seed]: Seeded ${users.length} users (Admin & Guest accounts).`);

    // Seed Luxury Rooms
    const rooms = await Room.insertMany([
      {
        roomNumber: '101',
        title: 'Grand Deluxe Ocean Suite',
        type: 'Deluxe',
        pricePerNight: 280,
        maxGuests: 2,
        bedType: '1 King Bed',
        sizeSqFt: 520,
        amenities: ['Panoramic Ocean View', 'Private Balcony', 'High-Speed Wi-Fi', 'Espresso Machine', 'Marble Bathroom', '24/7 Room Service'],
        description: 'Bask in breathtaking coastal views with our Grand Deluxe Ocean Suite. Features an Italian marble bathroom, plush king bed, and private terrace.',
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'],
        status: 'Available',
        rating: 4.9,
      },
      {
        roomNumber: '204',
        title: 'Executive Skyline Suite',
        type: 'Executive Suite',
        pricePerNight: 420,
        maxGuests: 3,
        bedType: '1 King Bed + 1 Daybed',
        sizeSqFt: 780,
        amenities: ['High-Floor City Skyline View', 'Executive Lounge Access', 'Work Desk & Herman Miller Chair', 'Walk-in Closet', 'Complimentary Breakfast'],
        description: 'Designed for discerning travelers and executives. Enjoy floor-to-ceiling glass windows overlooking the vibrant skyline and private lounge privileges.',
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'],
        status: 'Occupied',
        rating: 4.95,
      },
      {
        roomNumber: '305',
        title: 'Presidential Royal Penthouse',
        type: 'Presidential Villa',
        pricePerNight: 850,
        maxGuests: 4,
        bedType: '2 California King Beds',
        sizeSqFt: 1450,
        amenities: ['Private Heated Jacuzzi', 'Dedicated Butler Service', 'Chef Kitchenette', 'Limousine Airport Transfer', 'Sonos Surround Audio'],
        description: 'The pinnacle of luxury hospitality. Spanning 1,450 sq ft with dual master suites, private rooftop terrace with jacuzzi, and 24-hour dedicated butler.',
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'],
        status: 'Available',
        rating: 5.0,
      },
      {
        roomNumber: '108',
        title: 'Superior Garden King',
        type: 'Superior King',
        pricePerNight: 195,
        maxGuests: 2,
        bedType: '1 King Bed',
        sizeSqFt: 410,
        amenities: ['Lush Garden Patio', 'Rain Shower', 'Organic Toiletries', 'Smart 55" 4K TV', 'Silent Mini Fridge'],
        description: 'A serene sanctuary surrounded by tropical flora. Perfect for couples seeking peaceful rejuvenation with direct garden terrace access.',
        images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'],
        status: 'Available',
        rating: 4.8,
      },
      {
        roomNumber: '412',
        title: 'Luxury Family Penthouse',
        type: 'Family Penthouse',
        pricePerNight: 550,
        maxGuests: 6,
        bedType: '2 King Beds + 2 Twin Beds',
        sizeSqFt: 1100,
        amenities: ['2 Separate Bedrooms', 'Spacious Living & Dining Room', 'Kids Play Zone', 'Full Kitchen', 'Washer & Dryer'],
        description: 'A lavish home away from home for families. Features two private master suites, expansive communal parlor, and customized family concierge.',
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'],
        status: 'Cleaning',
        rating: 4.88,
      },
      {
        roomNumber: '215',
        title: 'Boutique Courtyard King',
        type: 'Deluxe',
        pricePerNight: 230,
        maxGuests: 2,
        bedType: '1 King Bed',
        sizeSqFt: 460,
        amenities: ['Courtyard Fountain View', 'Plush Bathrobes', 'Coffee Bar', 'Acoustic Soundproofing', 'Fast Wi-Fi'],
        description: 'Warm artisan aesthetics combined with modern comforts. Overlooks our classical courtyard with gentle fountain acoustics.',
        images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80'],
        status: 'Available',
        rating: 4.85,
      },
    ]);
    console.log(`[Seed]: Seeded ${rooms.length} hotel suites.`);

    // Seed Sample Booking
    await Booking.create({
      bookingReference: 'HP-948210',
      user: users[1]._id,
      guestName: 'Sophia Sterling',
      guestEmail: 'guest@hotelpro.com',
      guestPhone: '+1 (555) 892-1234',
      room: rooms[0]._id,
      checkInDate: new Date(Date.now() + 86400000 * 2),
      checkOutDate: new Date(Date.now() + 86400000 * 5),
      nights: 3,
      guestsCount: 2,
      totalAmount: 924,
      taxAmount: 84,
      paymentStatus: 'Paid',
      paymentMethod: 'Visa ending in 4242',
      transactionId: 'TXN-98471924',
      bookingStatus: 'Confirmed',
      specialRequests: 'High floor, complimentary champagne on arrival.',
    });

    console.log(`[Seed]: Seeded initial active reservations.`);
    console.log('✅ HotelPro Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error]: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
