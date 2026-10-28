// HotelPro API Service with intelligent backend connection and local mock fallback

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Initial mock state for standalone operation
const initialRooms = [
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
    status: 'Cleaning',
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

const initialBookings = [
  {
    _id: 'bkg_1001',
    bookingReference: 'HP-948210',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.v@luxuryliving.com',
    guestPhone: '+1 (555) 234-5678',
    room: 'rm_305',
    roomDetails: initialRooms[2],
    checkInDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    checkOutDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    nights: 3,
    guestsCount: 2,
    totalAmount: 2805,
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
    roomDetails: initialRooms[1],
    checkInDate: new Date().toISOString().split('T')[0],
    checkOutDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    nights: 2,
    guestsCount: 1,
    totalAmount: 924,
    taxAmount: 84,
    paymentStatus: 'Paid',
    paymentMethod: 'Mastercard ending in 8812',
    transactionId: 'TXN-47291039',
    bookingStatus: 'Checked-In',
    specialRequests: 'Quiet room away from elevators, late check-out at 1 PM.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

// Local storage helper
const getStoredData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {}
};

export const api = {
  // Fetch rooms
  getRooms: async () => {
    try {
      const res = await fetch(`${API_BASE}/rooms`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      return getStoredData('hotelpro_rooms', initialRooms);
    }
  },

  // Save room (Admin)
  saveRoom: async (roomData) => {
    try {
      const res = await fetch(`${API_BASE}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {}

    // Fallback
    const current = getStoredData('hotelpro_rooms', initialRooms);
    const newRoom = { ...roomData, _id: 'rm_' + Date.now(), status: roomData.status || 'Available' };
    const updated = [newRoom, ...current];
    setStoredData('hotelpro_rooms', updated);
    return newRoom;
  },

  // Fetch bookings
  getBookings: async (email) => {
    try {
      const url = email ? `${API_BASE}/bookings?email=${encodeURIComponent(email)}` : `${API_BASE}/bookings`;
      const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      const list = getStoredData('hotelpro_bookings', initialBookings);
      if (email) return list.filter(b => b.guestEmail.toLowerCase() === email.toLowerCase());
      return list;
    }
  },

  // Create booking
  createBooking: async (bookingData) => {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {}

    // Fallback
    const current = getStoredData('hotelpro_bookings', initialBookings);
    const nights = Math.max(1, Math.ceil((new Date(bookingData.checkOutDate) - new Date(bookingData.checkInDate)) / (1000 * 60 * 60 * 24)));
    const subtotal = (bookingData.roomPrice || 250) * nights;
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + tax;

    const newBooking = {
      _id: 'bkg_' + Date.now(),
      bookingReference: 'HP-' + Math.floor(100000 + Math.random() * 900000),
      ...bookingData,
      nights,
      totalAmount: total,
      taxAmount: tax,
      paymentStatus: 'Paid',
      paymentMethod: bookingData.paymentMethod || 'Credit Card (Simulated)',
      transactionId: 'TXN-' + Math.floor(10000000 + Math.random() * 90000000),
      bookingStatus: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    const updated = [newBooking, ...current];
    setStoredData('hotelpro_bookings', updated);
    return newBooking;
  },

  // Update booking status
  updateBookingStatus: async (bookingId, status) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {}

    // Fallback
    const current = getStoredData('hotelpro_bookings', initialBookings);
    const updated = current.map(b => (b._id === bookingId || b.bookingReference === bookingId ? { ...b, bookingStatus: status } : b));
    setStoredData('hotelpro_bookings', updated);
    return updated.find(b => b._id === bookingId || b.bookingReference === bookingId);
  },

  // Analytics
  getAnalytics: async () => {
    try {
      const res = await fetch(`${API_BASE}/bookings/stats/analytics`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (e) {}

    const rooms = getStoredData('hotelpro_rooms', initialRooms);
    const bookings = getStoredData('hotelpro_bookings', initialBookings);
    const occupied = bookings.filter(b => b.bookingStatus === 'Checked-In').length;
    const rev = bookings.filter(b => b.bookingStatus !== 'Cancelled').reduce((s, b) => s + (b.totalAmount || 0), 0);

    return {
      totalRooms: rooms.length,
      occupiedCount: occupied,
      occupancyRate: `${Math.round((occupied / rooms.length) * 100) || 50}%`,
      totalRevenue: rev,
      totalBookings: bookings.length,
      todayArrivals: bookings.filter(b => b.bookingStatus === 'Confirmed').length,
      todayDepartures: bookings.filter(b => b.bookingStatus === 'Checked-In').length,
    };
  },
};
