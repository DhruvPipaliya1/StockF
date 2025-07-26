import React from 'react';
import Navbar from './Homepage/Navbar';

function Home() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'; 

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    window.location.href = '/login';
  };

  return (
    <>
      <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Welcome to Magic Formula Screener</h1>
        <p>Explore financial data of top Indian companies.</p>
        
      </div>
    </>
  );
}

export default Home;
