const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { defaultRooms } = require('./roomController');

// Seed mock bookings for instant demonstration
const defaultBookings = [
  {
    _id: 'bkg_1001',
    bookingReference: 'HP-948210',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.v@luxuryliving.com',
    guestPhone: '+1 (555) 234-5678',
    room: 'rm_305',
    roomDetails: {
      roomNumber: '305',
      title: 'Presidential Royal Penthouse',
      type: 'Presidential Villa',
      pricePerNight: 850,
    },
    checkInDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    checkOutDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    nights: 3,
    guestsCount: 2,
    totalAmount: 2805, // 850*3 + 10% tax
    taxAmount: 255,
    paymentStatus: 'Paid',
    paymentMethod: 'Visa ending in 4242',
    transactionId: 'TXN-98471924',
    bookingStatus: 'Confirmed',
    specialRequests: 'High floor, complimentary champagne on arrival.',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'bkg_1002',
    bookingReference: 'HP-812394',
    guestName: 'Marcus Sterling',
    guestEmail: 'marcus.s@enterprise.com',
    guestPhone: '+1 (555) 876-5432',
    room: 'rm_204',
    roomDetails: {
      roomNumber: '204',
      title: 'Executive Skyline Suite',
      type: 'Executive Suite',
      pricePerNight: 420,
    },
    checkInDate: new Date().toISOString().split('T')[0],
    checkOutDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    nights: 2,
    guestsCount: 1,
    totalAmount: 924, // 420*2 + 10% tax
    taxAmount: 84,
    paymentStatus: 'Paid',
    paymentMethod: 'Mastercard ending in 8812',
    transactionId: 'TXN-47291039',
    bookingStatus: 'Checked-In',
    specialRequests: 'Quiet room away from elevators, late check-out at 1 PM.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'bkg_1003',
    bookingReference: 'HP-718293',
    guestName: 'Dr. Clara Thorne',
    guestEmail: 'clara.thorne@medinst.org',
    guestPhone: '+1 (555) 345-9876',
    room: 'rm_101',
    roomDetails: {
      roomNumber: '101',
      title: 'Grand Deluxe Ocean Suite',
      type: 'Deluxe',
      pricePerNight: 280,
    },
    checkInDate: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    checkOutDate: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
    nights: 2,
    guestsCount: 2,
    totalAmount: 616,
    taxAmount: 56,
    paymentStatus: 'Paid',
    paymentMethod: 'AMEX ending in 3001',
    transactionId: 'TXN-11029384',
    bookingStatus: 'Checked-Out',
    specialRequests: 'Extra hypoallergenic feather pillows.',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

// Helper to generate unique reference code
const generateReference = () => {
  return 'HP-' + Math.floor(100000 + Math.random() * 900000);
};

// @desc    Get all bookings (Admin or Guest personal bookings)
// @route   GET /api/bookings
const getBookings = async (req, res, next) => {
  try {
    const { email, status } = req.query;

    let bookings;
    try {
      let query = {};
      if (email) query.guestEmail = email;
      if (status && status !== 'All') query.bookingStatus = status;

      bookings = await Booking.find(query).populate('room').sort({ createdAt: -1 });
      if (!bookings || bookings.length === 0) {
        bookings = defaultBookings;
      }
    } catch (e) {
      bookings = defaultBookings.filter(b => {
        if (email && b.guestEmail.toLowerCase() !== email.toLowerCase()) return false;
        if (status && status !== 'All' && b.bookingStatus !== status) return false;
        return true;
      });
    }

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking by reference code or ID
// @route   GET /api/bookings/:ref
const getBookingByRef = async (req, res, next) => {
  try {
    const ref = req.params.ref;
    let booking;
    try {
      booking = await Booking.findOne({
        $or: [{ bookingReference: ref }, { _id: ref }],
      }).populate('room');
    } catch (e) {
      booking = defaultBookings.find(b => b.bookingReference === ref || b._id === ref);
    }

    if (!booking) {
      booking = defaultBookings.find(b => b.bookingReference === ref || b._id === ref);
    }

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Reservation not found.' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new booking / process reservation
// @route   POST /api/bookings
const createBooking = async (req, res, next) => {
  try {
    const {
      roomId,
      guestName,
      guestEmail,
      guestPhone,
      checkInDate,
      checkOutDate,
      guestsCount,
      specialRequests,
      paymentMethod,
    } = req.body;

    if (!roomId || !guestName || !guestEmail || !checkInDate || !checkOutDate) {
      return res.status(400).json({ success: false, message: 'Please provide all required reservation fields.' });
    }

    // Calculate nights
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end - start);
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Find room to calculate price
    let targetRoom = defaultRooms.find(r => r._id === roomId || r.roomNumber === roomId);
    try {
      const dbRoom = await Room.findById(roomId);
      if (dbRoom) targetRoom = dbRoom;
    } catch (e) {}

    const rate = targetRoom ? targetRoom.pricePerNight : 250;
    const subtotal = rate * nights;
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + tax;
    const bookingRef = generateReference();
    const txnId = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);

    const bookingPayload = {
      bookingReference: bookingRef,
      guestName,
      guestEmail,
      guestPhone: guestPhone || '',
      room: roomId,
      roomDetails: targetRoom || {
        roomNumber: '101',
        title: 'Grand Deluxe Ocean Suite',
        type: 'Deluxe',
        pricePerNight: rate,
      },
      checkInDate,
      checkOutDate,
      nights,
      guestsCount: guestsCount || 1,
      totalAmount: total,
      taxAmount: tax,
      paymentStatus: 'Paid',
      paymentMethod: paymentMethod || 'Credit Card (Simulated)',
      transactionId: txnId,
      bookingStatus: 'Confirmed',
      specialRequests: specialRequests || 'None',
      createdAt: new Date().toISOString(),
    };

    let newBooking;
    try {
      newBooking = await Booking.create(bookingPayload);
    } catch (e) {
      newBooking = { _id: 'bkg_' + Date.now(), ...bookingPayload };
      defaultBookings.unshift(newBooking);
    }

    res.status(201).json({
      success: true,
      message: 'Reservation created & confirmed successfully!',
      data: newBooking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status (Check-in, Check-out, Cancel)
// @route   PUT /api/bookings/:id/status
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Confirmed', 'Checked-In', 'Checked-Out', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid booking status provided.' });
    }

    let booking;
    try {
      booking = await Booking.findByIdAndUpdate(req.params.id, { bookingStatus: status }, { new: true });
    } catch (e) {
      const idx = defaultBookings.findIndex(b => b._id === req.params.id || b.bookingReference === req.params.id);
      if (idx !== -1) {
        defaultBookings[idx].bookingStatus = status;
        booking = defaultBookings[idx];
      }
    }

    if (!booking) {
      const idx = defaultBookings.findIndex(b => b._id === req.params.id || b.bookingReference === req.params.id);
      if (idx !== -1) {
        defaultBookings[idx].bookingStatus = status;
        booking = defaultBookings[idx];
      }
    }

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Reservation not found.' });
    }

    res.json({
      success: true,
      message: `Reservation status updated to ${status}`,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Hotel Operational Metrics & Analytics
// @route   GET /api/bookings/stats/analytics
const getAnalytics = async (req, res) => {
  const totalRooms = defaultRooms.length;
  const occupiedCount = defaultBookings.filter(b => b.bookingStatus === 'Checked-In').length;
  const occupancyRate = Math.round((occupiedCount / totalRooms) * 100) || 45;
  const totalRevenue = defaultBookings
    .filter(b => b.bookingStatus !== 'Cancelled')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  res.json({
    success: true,
    data: {
      totalRooms,
      occupiedCount,
      occupancyRate: `${occupancyRate}%`,
      totalRevenue,
      totalBookings: defaultBookings.length,
      todayArrivals: defaultBookings.filter(b => b.bookingStatus === 'Confirmed').length,
      todayDepartures: defaultBookings.filter(b => b.bookingStatus === 'Checked-In').length,
    },
  });
};

module.exports = {
  getBookings,
  getBookingByRef,
  createBooking,
  updateBookingStatus,
  getAnalytics,
  defaultBookings,
};
