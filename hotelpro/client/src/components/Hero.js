import React from 'react';

const Hero = ({ onExploreClick }) => {
  return (
    <div className="hero-banner text-center">
      <div className="container">
        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-3">
          ★ Five-Star Luxury Experience
        </span>
        <h1 className="hero-title mb-3">
          Redefining Modern Hospitality
        </h1>
        <p className="hero-subtitle mx-auto mb-4">
          Experience extraordinary comfort, world-class amenities, and seamless reservation management with HotelPro's next-generation platform.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-gold btn-lg" onClick={onExploreClick}>
            <i className="bi bi-search me-2"></i> Find Available Suites
          </button>
          <a href="#amenities" className="btn btn-outline-light btn-lg">
            <i className="bi bi-stars me-2"></i> Hotel Highlights
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
