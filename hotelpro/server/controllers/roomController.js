const Room = require('../models/Room');

// Comprehensive seed mock rooms to support demo mode or offline MongoDB
const defaultRooms = [
  {
    _id: 'rm_101',
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
    _id: 'rm_204',
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
    status: 'Available',
    rating: 4.95,
  },
  {
    _id: 'rm_305',
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
    _id: 'rm_108',
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
    _id: 'rm_412',
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
    status: 'Available',
    rating: 4.88,
  },
  {
    _id: 'rm_215',
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
];

// @desc    Get all rooms with optional filtering (type, price, status, search)
// @route   GET /api/rooms
const getRooms = async (req, res, next) => {
  try {
    const { type, maxPrice, status, guests, search } = req.query;

    let rooms;
    try {
      let query = {};
      if (type && type !== 'All') query.type = type;
      if (status && status !== 'All') query.status = status;
      if (maxPrice) query.pricePerNight = { $lte: Number(maxPrice) };
      if (guests) query.maxGuests = { $gte: Number(guests) };
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }
      rooms = await Room.find(query);
      if (!rooms || rooms.length === 0) {
        rooms = defaultRooms;
      }
    } catch (e) {
      // In-memory filter fallback
      rooms = defaultRooms.filter(r => {
        if (type && type !== 'All' && r.type !== type) return false;
        if (status && status !== 'All' && r.status !== status) return false;
        if (maxPrice && r.pricePerNight > Number(maxPrice)) return false;
        if (guests && r.maxGuests < Number(guests)) return false;
        if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      });
    }

    res.json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single room by ID
// @route   GET /api/rooms/:id
const getRoomById = async (req, res, next) => {
  try {
    let room;
    try {
      room = await Room.findById(req.params.id);
    } catch (e) {
      room = defaultRooms.find(r => r._id === req.params.id);
    }

    if (!room) {
      room = defaultRooms.find(r => r._id === req.params.id || r.roomNumber === req.params.id);
    }

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.json({ success: true, data: room });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new room (Admin only)
// @route   POST /api/rooms
const createRoom = async (req, res, next) => {
  try {
    let newRoom;
    try {
      newRoom = await Room.create(req.body);
    } catch (e) {
      newRoom = { _id: 'rm_' + Date.now(), ...req.body, status: req.body.status || 'Available' };
      defaultRooms.unshift(newRoom);
    }

    res.status(201).json({ success: true, data: newRoom });
  } catch (error) {
    next(error);
  }
};

// @desc    Update room details or status (Admin only)
// @route   PUT /api/rooms/:id
const updateRoom = async (req, res, next) => {
  try {
    let room;
    try {
      room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    } catch (e) {
      const idx = defaultRooms.findIndex(r => r._id === req.params.id);
      if (idx !== -1) {
        defaultRooms[idx] = { ...defaultRooms[idx], ...req.body };
        room = defaultRooms[idx];
      }
    }

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found to update' });
    }

    res.json({ success: true, data: room });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete room (Admin only)
// @route   DELETE /api/rooms/:id
const deleteRoom = async (req, res, next) => {
  try {
    try {
      await Room.findByIdAndDelete(req.params.id);
    } catch (e) {
      const idx = defaultRooms.findIndex(r => r._id === req.params.id);
      if (idx !== -1) defaultRooms.splice(idx, 1);
    }

    res.json({ success: true, message: 'Room removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRooms, getRoomById, createRoom, updateRoom, deleteRoom, defaultRooms };
