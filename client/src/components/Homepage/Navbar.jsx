import React from 'react';
import logo from '../../assets/images/logo.png';

function Navbar({ onLogout, isLoggedIn }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><img src={logo} alt="Logo" style={{ height: '40px', width: 'auto' }}/></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/backend/top50">Top 50</a>
            </li>
            <li className="nav-item">   
              <a className="nav-link" href="/backend/all-companies">All Companies</a>
            </li>
          </ul>

          <form className="d-flex align-items-center" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success me-2" type="submit">Search</button>

            {isLoggedIn && (
              <button onClick={onLogout} className="btn btn-danger" type="button">
                Logout
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
