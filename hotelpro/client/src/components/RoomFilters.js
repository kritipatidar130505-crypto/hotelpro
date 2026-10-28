import React from 'react';

const RoomFilters = ({
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  roomType,
  setRoomType,
  guests,
  setGuests,
  searchQuery,
  setSearchQuery,
  maxPrice,
  setMaxPrice,
}) => {
  return (
    <div className="container">
      <div className="search-card">
        <div className="row g-3 align-items-end">
          <div className="col-lg-3 col-md-6">
            <label className="form-label small fw-bold text-muted mb-1">
              <i className="bi bi-calendar-event me-1 text-primary"></i> Check-in Date
            </label>
            <input
              type="date"
              className="form-control"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <label className="form-label small fw-bold text-muted mb-1">
              <i className="bi bi-calendar-check me-1 text-primary"></i> Check-out Date
            </label>
            <input
              type="date"
              className="form-control"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div className="col-lg-2 col-md-4">
            <label className="form-label small fw-bold text-muted mb-1">
              <i className="bi bi-door-open me-1 text-primary"></i> Suite Category
            </label>
            <select
              className="form-select"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Deluxe">Deluxe Suites</option>
              <option value="Executive Suite">Executive Suites</option>
              <option value="Presidential Villa">Presidential Villa</option>
              <option value="Superior King">Superior King</option>
              <option value="Family Penthouse">Family Penthouse</option>
            </select>
          </div>

          <div className="col-lg-2 col-md-4">
            <label className="form-label small fw-bold text-muted mb-1">
              <i className="bi bi-people me-1 text-primary"></i> Guests
            </label>
            <select
              className="form-select"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4+ Guests</option>
            </select>
          </div>

          <div className="col-lg-2 col-md-4">
            <label className="form-label small fw-bold text-muted mb-1">
              <i className="bi bi-cash-stack me-1 text-primary"></i> Max ${maxPrice}/nt
            </label>
            <input
              type="range"
              className="form-range"
              min="150"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Search keyword input */}
        <div className="mt-3 pt-3 border-top d-flex gap-2">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search by keywords, amenities, views (e.g. Ocean, Jacuzzi, Balcony)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchQuery && (
            <button className="btn btn-outline-secondary" onClick={() => setSearchQuery('')}>
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomFilters;
