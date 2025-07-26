import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-gradient-footer text-white">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="fw-bold">Magic Formula Screener</h5>
            <p className="small">Simplifying your investment decisions using Joel Greenblatt’s Magic Formula strategy.</p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/news" className="footer-link">News</a></li>
              <li><a href="/backend/top50" className="footer-link">Dashboard</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold">Contact</h6>
            <p className="mb-1 small">Email: support@magicformula.com</p>
            <p className="small">© {new Date().getFullYear()} Magic Formula Screener</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
