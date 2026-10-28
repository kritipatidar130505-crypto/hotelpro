import React, { useState } from 'react';

const AdminDashboard = ({ rooms, bookings, analytics, onAddRoom, onUpdateRoomStatus, onUpdateBookingStatus }) => {
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newRoomTitle, setNewRoomTitle] = useState('');
  const [newRoomType, setNewRoomType] = useState('Deluxe');
  const [newRoomPrice, setNewRoomPrice] = useState(250);
  const [newRoomGuests, setNewRoomGuests] = useState(2);
  const [newRoomDesc, setNewRoomDesc] = useState('');

  const handleCreateRoom = (e) => {
    e.preventDefault();
    onAddRoom({
      roomNumber: newRoomNumber,
      title: newRoomTitle,
      type: newRoomType,
      pricePerNight: Number(newRoomPrice),
      maxGuests: Number(newRoomGuests),
      description: newRoomDesc || 'Contemporary suite with luxury finishings and hotel amenities.',
      amenities: ['High-Speed Wi-Fi', 'Smart TV', 'Climate Control', 'Room Service'],
      images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
      status: 'Available',
    });

    setNewRoomNumber('');
    setNewRoomTitle('');
    setShowAddRoom(false);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <span className="badge bg-danger text-uppercase fw-bold px-3 py-1 mb-1">
            Staff & General Manager Access
          </span>
          <h2 className="serif-heading mb-0">HotelPro Operations Dashboard</h2>
          <small className="text-muted">Real-time room inventory, revenue analysis, and front-desk workflows</small>
        </div>

        <button
          className="btn btn-gold"
          onClick={() => setShowAddRoom(!showAddRoom)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          {showAddRoom ? 'Close Form' : 'Register New Suite'}
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="row g-4 mb-5">
        <div className="col-lg-3 col-sm-6">
          <div className="stat-card">
            <div className="text-muted small text-uppercase fw-bold">Live Occupancy</div>
            <div className="stat-value">{analytics.occupancyRate || '45%'}</div>
            <small className="text-success"><i className="bi bi-graph-up-arrow me-1"></i> +8% from last week</small>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="stat-card" style={{ borderLeftColor: '#2ec4b6' }}>
            <div className="text-muted small text-uppercase fw-bold">Total Gross Revenue</div>
            <div className="stat-value text-success">${analytics.totalRevenue ? analytics.totalRevenue.toLocaleString() : '8,420'}</div>
            <small className="text-muted">Simulated ledger balance</small>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="stat-card" style={{ borderLeftColor: '#3a86ff' }}>
            <div className="text-muted small text-uppercase fw-bold">Total Suites</div>
            <div className="stat-value text-primary">{rooms.length}</div>
            <small className="text-muted">{rooms.filter(r => r.status === 'Available').length} Available for booking</small>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="stat-card" style={{ borderLeftColor: '#ff006e' }}>
            <div className="text-muted small text-uppercase fw-bold">Total Reservations</div>
            <div className="stat-value text-dark">{bookings.length}</div>
            <small className="text-muted">{bookings.filter(b => b.bookingStatus === 'Confirmed').length} Upcoming check-ins</small>
          </div>
        </div>
      </div>

      {/* Add New Room Accordion / Form */}
      {showAddRoom && (
        <div className="card shadow-sm border-0 mb-5 p-4 bg-white rounded-3">
          <h5 className="fw-bold mb-3">Add New Suite to Hotel Inventory</h5>
          <form onSubmit={handleCreateRoom}>
            <div className="row g-3">
              <div className="col-md-2">
                <label className="form-label small fw-bold">Room #</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="501"
                  value={newRoomNumber}
                  onChange={(e) => setNewRoomNumber(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Suite Title</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Royal Sunset Suite"
                  value={newRoomTitle}
                  onChange={(e) => setNewRoomTitle(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Category</label>
                <select
                  className="form-select"
                  value={newRoomType}
                  onChange={(e) => setNewRoomType(e.target.value)}
                >
                  <option value="Deluxe">Deluxe</option>
                  <option value="Executive Suite">Executive Suite</option>
                  <option value="Presidential Villa">Presidential Villa</option>
                  <option value="Superior King">Superior King</option>
                  <option value="Family Penthouse">Family Penthouse</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Price / Night ($)</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={newRoomPrice}
                  onChange={(e) => setNewRoomPrice(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label small fw-bold">Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Brief overview of amenities and views..."
                  value={newRoomDesc}
                  onChange={(e) => setNewRoomDesc(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-3 text-end">
              <button type="submit" className="btn btn-gold">
                Save & Publish Room
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Room Inventory Table */}
      <div className="card shadow-sm border-0 rounded-3 mb-5 overflow-hidden">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
          <h5 className="mb-0 fw-bold">
            <i className="bi bi-door-closed me-2 text-warning"></i> Room Inventory Management
          </h5>
          <span className="badge bg-secondary">{rooms.length} Units</span>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Room #</th>
                <th>Title & Category</th>
                <th>Nightly Rate</th>
                <th>Max Guests</th>
                <th>Operational Status</th>
                <th>Quick Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td className="fw-bold font-monospace text-primary">#{room.roomNumber}</td>
                  <td>
                    <div className="fw-semibold">{room.title}</div>
                    <small className="text-muted">{room.type}</small>
                  </td>
                  <td className="fw-bold text-success">${room.pricePerNight}</td>
                  <td>{room.maxGuests} Guests</td>
                  <td>
                    <span
                      className={`badge ${
                        room.status === 'Available'
                          ? 'bg-success'
                          : room.status === 'Occupied'
                          ? 'bg-danger'
                          : 'bg-warning text-dark'
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm w-auto d-inline-block"
                      value={room.status}
                      onChange={(e) => onUpdateRoomStatus(room._id, e.target.value)}
                    >
                      <option value="Available">Set Available</option>
                      <option value="Occupied">Set Occupied</option>
                      <option value="Cleaning">Set Cleaning</option>
                      <option value="Maintenance">Set Maintenance</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Front-Desk Bookings Queue */}
      <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
          <h5 className="mb-0 fw-bold">
            <i className="bi bi-journal-check me-2 text-warning"></i> Front Desk Guest Reservation Queue
          </h5>
          <span className="badge bg-secondary">{bookings.length} Records</span>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Reference</th>
                <th>Guest</th>
                <th>Dates</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Front Desk Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td className="font-monospace fw-bold">{b.bookingReference}</td>
                  <td>
                    <div className="fw-semibold">{b.guestName}</div>
                    <small className="text-muted">{b.guestEmail}</small>
                  </td>
                  <td>
                    <small>
                      {b.checkInDate} → {b.checkOutDate} ({b.nights}n)
                    </small>
                  </td>
                  <td>
                    <span className="badge bg-success-subtle text-success border border-success">
                      Paid ${b.totalAmount}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        b.bookingStatus === 'Confirmed'
                          ? 'bg-primary'
                          : b.bookingStatus === 'Checked-In'
                          ? 'bg-success'
                          : b.bookingStatus === 'Checked-Out'
                          ? 'bg-secondary'
                          : 'bg-danger'
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      {b.bookingStatus === 'Confirmed' && (
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => onUpdateBookingStatus(b._id, 'Checked-In')}
                        >
                          Check In
                        </button>
                      )}
                      {b.bookingStatus === 'Checked-In' && (
                        <button
                          className="btn btn-sm btn-outline-warning text-dark"
                          onClick={() => onUpdateBookingStatus(b._id, 'Checked-Out')}
                        >
                          Check Out
                        </button>
                      )}
                      {b.bookingStatus !== 'Cancelled' && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onUpdateBookingStatus(b._id, 'Cancelled')}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
