import React from 'react';

const RoomCard = ({ room, onBookNow }) => {
  const isAvailable = room.status === 'Available';

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card room-card h-100 position-relative">
        <div className="position-relative overflow-hidden">
          <img
            src={room.images[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'}
            alt={room.title}
            className="w-100 room-card-img"
          />
          <div className="room-price-badge">
            ${room.pricePerNight} <span className="small fw-normal text-white-50">/ night</span>
          </div>
          <span
            className={`position-absolute top-0 start-0 m-3 badge ${
              room.status === 'Available'
                ? 'badge-available'
                : room.status === 'Occupied'
                ? 'badge-occupied'
                : 'badge-cleaning'
            }`}
          >
            {room.status}
          </span>
        </div>

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-muted small text-uppercase fw-bold letter-spacing">
              Suite #{room.roomNumber} • {room.type}
            </span>
            <span className="text-warning small fw-bold">
              ★ {room.rating || 4.9}
            </span>
          </div>

          <h5 className="card-title fw-bold text-dark mb-2">{room.title}</h5>

          <p className="card-text text-muted small flex-grow-1">
            {room.description}
          </p>

          <div className="d-flex gap-3 text-muted small mb-3 border-top border-bottom py-2">
            <span>
              <i className="bi bi-people me-1 text-primary"></i> Max {room.maxGuests} Guests
            </span>
            <span>
              <i className="bi bi-aspect-ratio me-1 text-primary"></i> {room.sizeSqFt || 450} sq ft
            </span>
            <span>
              <i className="bi bi-moon me-1 text-primary"></i> {room.bedType}
            </span>
          </div>

          {/* Amenities Badges */}
          <div className="mb-3">
            {(room.amenities || []).slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="amenity-chip">
                <i className="bi bi-check-circle-fill text-success me-1"></i>
                {amenity}
              </span>
            ))}
            {(room.amenities || []).length > 3 && (
              <span className="amenity-chip text-muted">
                +{(room.amenities || []).length - 3} more
              </span>
            )}
          </div>

          <button
            className={`btn w-100 ${isAvailable ? 'btn-gold' : 'btn-secondary disabled'}`}
            onClick={() => onBookNow(room)}
            disabled={!isAvailable}
          >
            {isAvailable ? (
              <>
                <i className="bi bi-calendar-plus me-2"></i> Book This Suite
              </>
            ) : (
              'Currently Unavailable'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
