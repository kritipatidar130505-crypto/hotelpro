import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomFilters from './components/RoomFilters';
import RoomCard from './components/RoomCard';
import BookingModal from './components/BookingModal';
import InvoiceModal from './components/InvoiceModal';
import MyBookings from './components/MyBookings';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { api } from './api';

function MainApp() {
  const { user, role } = useAuth();

  const [activeTab, setActiveTab] = useState('explore');
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  // Filter States
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [roomType, setRoomType] = useState('All');
  const [guests, setGuests] = useState(2);
  const [maxPrice, setMaxPrice] = useState(900);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);
  const [activeInvoice, setActiveInvoice] = useState(null);

  // Load initial data
  const loadData = async () => {
    setLoading(true);
    try {
      const fetchedRooms = await api.getRooms();
      const fetchedBookings = await api.getBookings();
      const stats = await api.getAnalytics();
      setRooms(fetchedRooms);
      setBookings(fetchedBookings);
      setAnalytics(stats);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered rooms logic
  const filteredRooms = rooms.filter((r) => {
    if (roomType !== 'All' && r.type !== roomType) return false;
    if (r.pricePerNight > maxPrice) return false;
    if (r.maxGuests < guests) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchDesc = r.description.toLowerCase().includes(q);
      const matchAmenity = (r.amenities || []).some((a) => a.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchAmenity) return false;
    }
    return true;
  });

  // Handle new booking creation
  const handleConfirmBooking = async (bookingData) => {
    const created = await api.createBooking(bookingData);
    setSelectedRoomForBooking(null);
    setActiveInvoice(created);
    await loadData();
  };

  // Handle booking status updates
  const handleUpdateBookingStatus = async (bookingId, status) => {
    await api.updateBookingStatus(bookingId, status);
    await loadData();
  };

  // Handle room status update (Admin)
  const handleUpdateRoomStatus = (roomId, newStatus) => {
    const updated = rooms.map((r) => (r._id === roomId ? { ...r, status: newStatus } : r));
    setRooms(updated);
    try {
      localStorage.setItem('hotelpro_rooms', JSON.stringify(updated));
    } catch (e) {}
  };

  // Handle add new room (Admin)
  const handleAddRoom = async (roomData) => {
    await api.saveRoom(roomData);
    await loadData();
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openMyBookings={() => setActiveTab('my-bookings')}
      />

      {activeTab === 'explore' && (
        <main className="flex-grow-1">
          <Hero onExploreClick={() => {
            const el = document.getElementById('room-grid-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} />

          <RoomFilters
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            roomType={roomType}
            setRoomType={setRoomType}
            guests={guests}
            setGuests={setGuests}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />

          <section id="room-grid-section" className="container py-5 mt-2">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <div>
                <span className="text-muted small text-uppercase fw-bold letter-spacing">
                  Signature Accommodations
                </span>
                <h2 className="serif-heading mb-0">Available Suites & Villas</h2>
              </div>
              <span className="badge bg-secondary-subtle text-secondary px-3 py-2 rounded-pill">
                Showing {filteredRooms.length} of {rooms.length} Suites
              </span>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Retrieving available suites...</p>
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="text-center py-5 bg-white rounded shadow-sm">
                <i className="bi bi-search text-muted display-4 mb-3"></i>
                <h5>No Suites Match Your Search Criteria</h5>
                <p className="text-muted">Try adjusting your filters, price range, or guest count.</p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setRoomType('All');
                    setMaxPrice(1000);
                    setGuests(1);
                    setSearchQuery('');
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="row">
                {filteredRooms.map((room) => (
                  <RoomCard
                    key={room._id}
                    room={room}
                    onBookNow={(rm) => setSelectedRoomForBooking(rm)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Hotel Highlights / Amenities */}
          <section id="amenities" className="container py-5 border-top">
            <div className="text-center mb-5">
              <span className="text-muted small text-uppercase fw-bold">Five-Star Amenities</span>
              <h2 className="serif-heading">World-Class Guest Experiences</h2>
            </div>
            <div className="row g-4 text-center">
              <div className="col-md-3 col-6">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <i className="bi bi-water text-primary display-5 mb-3"></i>
                  <h6>Infinity Pool & Cabanas</h6>
                  <p className="text-muted small">Heated rooftop pool with panoramic skyline horizon.</p>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <i className="bi bi-cup-hot-fill text-warning display-5 mb-3"></i>
                  <h6>Michelin-Star Dining</h6>
                  <p className="text-muted small">Artisan seasonal menus crafted by master culinary chefs.</p>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <i className="bi bi-flower1 text-success display-5 mb-3"></i>
                  <h6>Ayurvedic Wellness Spa</h6>
                  <p className="text-muted small">Hydrotherapy, hot stone relaxation, and bespoke therapies.</p>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <i className="bi bi-shield-check text-info display-5 mb-3"></i>
                  <h6>24/7 Butler & Security</h6>
                  <p className="text-muted small">Discrete, continuous hospitality and concierge assistance.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {activeTab === 'my-bookings' && (
        <main className="flex-grow-1">
          <MyBookings
            bookings={bookings}
            onUpdateStatus={handleUpdateBookingStatus}
            onViewInvoice={(b) => setActiveInvoice(b)}
          />
        </main>
      )}

      {activeTab === 'admin' && (
        <main className="flex-grow-1">
          <AdminDashboard
            rooms={rooms}
            bookings={bookings}
            analytics={analytics}
            onAddRoom={handleAddRoom}
            onUpdateRoomStatus={handleUpdateRoomStatus}
            onUpdateBookingStatus={handleUpdateBookingStatus}
          />
        </main>
      )}

      <Footer />

      {/* Booking Form Modal */}
      {selectedRoomForBooking && (
        <BookingModal
          room={selectedRoomForBooking}
          checkIn={checkIn}
          checkOut={checkOut}
          onClose={() => setSelectedRoomForBooking(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Invoice / Voucher Modal */}
      {activeInvoice && (
        <InvoiceModal
          booking={activeInvoice}
          onClose={() => setActiveInvoice(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
