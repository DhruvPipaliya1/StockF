import React from 'react';
import Navbar from './Homepage/Navbar';
import TitlePage1 from './Frontend/TitlePage1';
import TitlePage2 from './Frontend/TitlePage2';
import Footer from './Homepage/Footer';

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
      <TitlePage1/>
      <TitlePage2/>
      <Footer/>
    </>
  );
}

export default Home;
