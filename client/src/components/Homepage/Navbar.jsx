import React from 'react';
import Fulllogo from '../../assets/images/Full-logo.png';
import { Link, useLocation  } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, onLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={Fulllogo} alt="Logo" className="brand-logo me-2" />
          <span className="fw-bold text-white">Magic Formula Screener</span>
        </a>

        <div class="d-none d-lg-flex flex-grow-1 justify-content-center">
          <div class="nav-pills-box">
            <a class="pill-link mx-1 active" href="/">Home</a>
            <Link class="pill-link mx-1" to="/news">News</Link>
            <Link
              className={`pill-link mx-1 ${isActive('/backend') ? 'active' : ''}`}
              to={isLoggedIn ? "/backend/top50" : "/login"}
            >
              Dashboard
            </Link>
          </div>
        </div>

        {isLoggedIn ? (
          <button onClick={onLogout} className="btn btn-danger btn-gradient-logout rounded-pill px-4">Logout</button>
        ) : (
           <>
              <a href="/login" className="btn btn-gradient rounded-pill px-3 mx-2">
                Login
              </a>
              <a href="/signup" className="btn btn-gradient rounded-pill px-3 mx-2">
                Sign Up
              </a>
            </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
