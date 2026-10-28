import React from 'react';

const InvoiceModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content overflow-hidden">
          <div className="modal-header bg-dark text-white p-3">
            <h5 className="modal-title serif-heading mb-0">
              <i className="bi bi-receipt me-2 text-warning"></i> Reservation Voucher & Receipt
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="voucher-card text-center mb-3">
              <div className="mb-2">
                <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill fw-bold">
                  ✓ Booking Confirmed & Paid
                </span>
              </div>
              <h3 className="serif-heading mb-1">{booking.roomDetails ? booking.roomDetails.title : 'Luxury Hotel Suite'}</h3>
              <p className="text-muted small mb-3">
                Reference Code: <strong className="font-monospace text-primary fs-6">{booking.bookingReference}</strong>
              </p>

              <div className="text-start bg-light p-3 rounded mb-3 small">
                <div className="row mb-1">
                  <div className="col-5 text-muted">Primary Guest:</div>
                  <div className="col-7 fw-semibold text-dark">{booking.guestName}</div>
                </div>
                <div className="row mb-1">
                  <div className="col-5 text-muted">Check-in:</div>
                  <div className="col-7 fw-semibold text-dark">{booking.checkInDate} (From 3:00 PM)</div>
                </div>
                <div className="row mb-1">
                  <div className="col-5 text-muted">Check-out:</div>
                  <div className="col-7 fw-semibold text-dark">{booking.checkOutDate} (Until 11:00 AM)</div>
                </div>
                <div className="row mb-1">
                  <div className="col-5 text-muted">Duration:</div>
                  <div className="col-7 fw-semibold text-dark">{booking.nights} Night(s)</div>
                </div>
                <div className="row mb-1">
                  <div className="col-5 text-muted">Payment Method:</div>
                  <div className="col-7 text-dark">{booking.paymentMethod}</div>
                </div>
                <div className="row mb-1">
                  <div className="col-5 text-muted">Transaction ID:</div>
                  <div className="col-7 font-monospace text-muted">{booking.transactionId || 'TXN-984210'}</div>
                </div>
                <hr className="my-2" />
                <div className="row">
                  <div className="col-5 fw-bold text-dark">Total Paid:</div>
                  <div className="col-7 fw-bold text-success fs-6">${booking.totalAmount} USD</div>
                </div>
              </div>

              {/* Simulated QR Code Box */}
              <div className="p-3 border rounded bg-white d-inline-block shadow-sm">
                <i className="bi bi-qr-code text-dark" style={{ fontSize: '4.5rem' }}></i>
                <div className="text-muted" style={{ fontSize: '0.7rem' }}>Scan at Front Desk for Instant Check-in</div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-dark w-100" onClick={() => window.print()}>
                <i className="bi bi-printer me-2"></i> Print Voucher
              </button>
              <button className="btn btn-gold w-100" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
