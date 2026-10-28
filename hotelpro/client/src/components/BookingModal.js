import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const BookingModal = ({ room, checkIn, checkOut, onClose, onConfirmBooking }) => {
  const { user } = useAuth();

  const [inDate, setInDate] = useState(checkIn || new Date().toISOString().split('T')[0]);
  const [outDate, setOutDate] = useState(
    checkOut || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [guestName, setGuestName] = useState(user.name || 'Sophia Sterling');
  const [guestEmail, setGuestEmail] = useState(user.email || 'guest@hotelpro.com');
  const [guestPhone, setGuestPhone] = useState('+1 (555) 789-0123');
  const [specialRequests, setSpecialRequests] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [loading, setLoading] = useState(false);

  // Calculate nights
  const start = new Date(inDate);
  const end = new Date(outDate);
  const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  const subtotal = (room.pricePerNight || 250) * nights;
  const taxes = Math.round(subtotal * 0.1);
  const total = subtotal + taxes;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      onConfirmBooking({
        roomId: room._id,
        roomDetails: room,
        roomPrice: room.pricePerNight,
        guestName,
        guestEmail,
        guestPhone,
        checkInDate: inDate,
        checkOutDate: outDate,
        nights,
        guestsCount: room.maxGuests,
        specialRequests: specialRequests || 'No special requests',
        paymentMethod: 'Credit Card (Simulated)',
      });
      setLoading(false);
    }, 700);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content overflow-hidden">
          <div className="modal-header modal-luxury-header p-4">
            <div>
              <span className="badge bg-warning text-dark text-uppercase fw-bold mb-1">
                Suite Reservation
              </span>
              <h4 className="modal-title text-white serif-heading mb-0">{room.title}</h4>
              <small className="text-white-50">Room #{room.roomNumber} • ${room.pricePerNight} per night</small>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <div className="row g-4">
                {/* Guest Details */}
                <div className="col-md-7 border-end-md">
                  <h6 className="fw-bold text-dark mb-3">
                    <i className="bi bi-person-circle me-2 text-primary"></i> Guest Information
                  </h6>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Primary Guest Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold">Contact Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold">Check-in Date</label>
                      <input
                        type="date"
                        className="form-control"
                        required
                        value={inDate}
                        onChange={(e) => setInDate(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold">Check-out Date</label>
                      <input
                        type="date"
                        className="form-control"
                        required
                        value={outDate}
                        onChange={(e) => setOutDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Special Requests (Optional)</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="e.g. Quiet floor, extra pillows, early check-in preference..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    ></textarea>
                  </div>

                  {/* Payment Card Simulation */}
                  <h6 className="fw-bold text-dark mb-2 mt-4">
                    <i className="bi bi-credit-card-2-front me-2 text-primary"></i> Payment Details (Secure Mock)
                  </h6>
                  <div className="input-group mb-2">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-credit-card"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control font-monospace"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <span className="input-group-text text-success bg-light">
                      <i className="bi bi-shield-check me-1"></i> 256-bit Encrypted
                    </span>
                  </div>
                </div>

                {/* Price Breakdown Summary */}
                <div className="col-md-5">
                  <div className="p-3 bg-light rounded-3 h-100 d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="fw-bold text-dark mb-3">Reservation Summary</h6>
                      <img
                        src={room.images[0]}
                        alt={room.title}
                        className="w-100 rounded mb-3"
                        style={{ height: '120px', objectFit: 'cover' }}
                      />

                      <div className="d-flex justify-content-between text-muted small mb-2">
                        <span>Duration:</span>
                        <span className="fw-bold text-dark">{nights} night(s)</span>
                      </div>
                      <div className="d-flex justify-content-between text-muted small mb-2">
                        <span>Nightly Rate:</span>
                        <span>${room.pricePerNight}</span>
                      </div>
                      <div className="d-flex justify-content-between text-muted small mb-2">
                        <span>Room Subtotal:</span>
                        <span>${subtotal}</span>
                      </div>
                      <div className="d-flex justify-content-between text-muted small mb-2">
                        <span>Hospitality Tax & Fees (10%):</span>
                        <span>${taxes}</span>
                      </div>

                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold text-dark">Total Payable:</span>
                        <span className="h4 fw-bold text-primary mb-0">${total}</span>
                      </div>
                      <p className="text-muted" style={{ fontSize: '0.75rem' }}>
                        Free cancellation up to 48 hours prior to arrival. Includes all resort privileges.
                      </p>
                    </div>

                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-gold w-100 py-2 d-flex align-items-center justify-content-center"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                        ) : (
                          <i className="bi bi-lock-fill me-2"></i>
                        )}
                        {loading ? 'Processing Transaction...' : `Confirm & Pay $${total}`}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
