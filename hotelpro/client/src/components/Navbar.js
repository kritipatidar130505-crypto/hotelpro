import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ activeTab, setActiveTab, openMyBookings }) => {
  const { user, role, switchRole } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark luxury-navbar sticky-top py-3">
      <div className="container">
        <a className="navbar-brand luxury-brand d-flex align-items-center" href="#home" onClick={() => setActiveTab('explore')}>
          <i className="bi bi-buildings-fill me-2 text-warning"></i>
          HOTEL<span>PRO</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#hotelNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="hotelNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${activeTab === 'explore' ? 'active text-warning fw-bold' : 'text-white'}`}
                onClick={() => setActiveTab('explore')}
              >
                <i className="bi bi-compass me-1"></i> Explore Suites
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${activeTab === 'my-bookings' ? 'active text-warning fw-bold' : 'text-white'}`}
                onClick={() => { setActiveTab('my-bookings'); openMyBookings(); }}
              >
                <i className="bi bi-calendar-check me-1"></i> My Bookings
              </button>
            </li>
            {role === 'admin' && (
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === 'admin' ? 'active text-warning fw-bold' : 'text-white'}`}
                  onClick={() => setActiveTab('admin')}
                >
                  <i className="bi bi-speedometer2 me-1"></i> Staff Console
                </button>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Quick Role Switcher for Mentor / Evaluation */}
            <div className="btn-group btn-group-sm" role="group">
              <button
                type="button"
                className={`btn ${role === 'guest' ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary text-light'}`}
                onClick={() => switchRole('guest')}
              >
                <i className="bi bi-person me-1"></i> Guest View
              </button>
              <button
                type="button"
                className={`btn ${role === 'admin' ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary text-light'}`}
                onClick={() => { switchRole('admin'); setActiveTab('admin'); }}
              >
                <i className="bi bi-shield-lock me-1"></i> Admin View
              </button>
            </div>

            <div className="text-white-50 small border-start ps-3 d-none d-md-block">
              <div className="text-white fw-semibold">{user.name}</div>
              <div className="badge bg-secondary text-uppercase" style={{ fontSize: '0.65rem' }}>{role}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
