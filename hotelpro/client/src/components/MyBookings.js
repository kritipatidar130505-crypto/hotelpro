import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const MyBookings = ({ bookings, onUpdateStatus, onViewInvoice }) => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'All') return true;
    return b.bookingStatus === filter;
  });

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="serif-heading mb-1">My Reservations & Stays</h2>
          <p className="text-muted small mb-0">
            Managing active guest stays for <strong>{user.email}</strong>
          </p>
        </div>

        <div className="btn-group btn-group-sm" role="group">
          {['All', 'Confirmed', 'Checked-In', 'Checked-Out', 'Cancelled'].map((st) => (
            <button
              key={st}
              type="button"
              className={`btn ${filter === st ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setFilter(st)}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="card text-center p-5 shadow-sm border-0">
          <i className="bi bi-calendar-x text-muted display-4 mb-3"></i>
          <h4>No reservations found</h4>
          <p className="text-muted">You do not have any bookings under the current filter.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredBookings.map((b) => (
            <div key={b._id} className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-3 p-4 h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <span className="badge bg-light text-dark font-monospace border mb-1">
                      {b.bookingReference}
                    </span>
                    <h5 className="fw-bold mb-0 text-dark">
                      {b.roomDetails ? b.roomDetails.title : 'Luxury Hotel Suite'}
                    </h5>
                  </div>
                  <span
                    className={`badge ${
                      b.bookingStatus === 'Confirmed'
                        ? 'bg-primary'
                        : b.bookingStatus === 'Checked-In'
                        ? 'bg-success'
                        : b.bookingStatus === 'Checked-Out'
                        ? 'bg-secondary'
                        : 'bg-danger'
                    } text-uppercase px-3 py-2`}
                  >
                    {b.bookingStatus}
                  </span>
                </div>

                <div className="row g-2 text-muted small my-3 bg-light p-3 rounded">
                  <div className="col-sm-6">
                    <i className="bi bi-calendar3 me-1 text-primary"></i>
                    <strong>Dates:</strong> {b.checkInDate} to {b.checkOutDate} ({b.nights} nights)
                  </div>
                  <div className="col-sm-6">
                    <i className="bi bi-cash me-1 text-primary"></i>
                    <strong>Total Paid:</strong> ${b.totalAmount}
                  </div>
                  <div className="col-sm-6">
                    <i className="bi bi-person me-1 text-primary"></i>
                    <strong>Guest:</strong> {b.guestName}
                  </div>
                  <div className="col-sm-6">
                    <i className="bi bi-chat-text me-1 text-primary"></i>
                    <strong>Requests:</strong> {b.specialRequests || 'None'}
                  </div>
                </div>

                <div className="d-flex gap-2 mt-auto pt-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onViewInvoice(b)}
                  >
                    <i className="bi bi-receipt me-1"></i> View Invoice
                  </button>

                  {b.bookingStatus === 'Confirmed' && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => onUpdateStatus(b._id, 'Checked-In')}
                      >
                        <i className="bi bi-door-open-fill me-1"></i> Online Check-In
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onUpdateStatus(b._id, 'Cancelled')}
                      >
                        Cancel Stay
                      </button>
                    </>
                  )}

                  {b.bookingStatus === 'Checked-In' && (
                    <button
                      className="btn btn-sm btn-warning text-dark fw-bold"
                      onClick={() => onUpdateStatus(b._id, 'Checked-Out')}
                    >
                      <i className="bi bi-box-arrow-right me-1"></i> Express Check-Out
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
