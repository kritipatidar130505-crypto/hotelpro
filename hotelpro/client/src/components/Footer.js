import React from 'react';

const Footer = () => {
  return (
    <footer className="luxury-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h4 className="luxury-brand mb-3">
              HOTEL<span>PRO</span>
            </h4>
            <p className="text-white-50 small mb-3">
              The premier hospitality management suite providing next-generation booking operations, real-time availability tracking, guest services, and revenue automation.
            </p>
            <div className="text-muted small">
              © {new Date().getFullYear()} HotelPro Hospitality Solutions. All rights reserved.
            </div>
          </div>

          <div className="col-lg-2 col-6">
            <h5>Accommodations</h5>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><a href="#deluxe">Deluxe Suites</a></li>
              <li><a href="#executive">Executive Skyline</a></li>
              <li><a href="#penthouse">Presidential Villas</a></li>
              <li><a href="#family">Family Residences</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-6">
            <h5>Operations</h5>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><a href="#booking">Online Reservations</a></li>
              <li><a href="#checkin">Express Check-in</a></li>
              <li><a href="#dining">Concierge & Dining</a></li>
              <li><a href="#admin">Staff Console</a></li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h5>HotelPro Concierge</h5>
            <p className="small text-white-50 mb-2">
              <i className="bi bi-geo-alt-fill text-warning me-2"></i> 742 Evergreen Avenue, Luxury District, NY 10001
            </p>
            <p className="small text-white-50 mb-2">
              <i className="bi bi-telephone-fill text-warning me-2"></i> +1 (800) 555-HOTEL (46835)
            </p>
            <p className="small text-white-50 mb-3">
              <i className="bi bi-envelope-fill text-warning me-2"></i> concierge@hotelpro.com
            </p>
            <div className="d-flex gap-3 fs-5 text-white-50">
              <a href="#social" className="text-white-50"><i className="bi bi-instagram"></i></a>
              <a href="#social" className="text-white-50"><i className="bi bi-facebook"></i></a>
              <a href="#social" className="text-white-50"><i className="bi bi-twitter-x"></i></a>
              <a href="#social" className="text-white-50"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
