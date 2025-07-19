



import './App.css';
import Top50 from './components/Top50';
import AllCompanies from './components/AllCompanies';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { app } from './firebase';
import MainLayout from './layout/MainLayout';
import { Routes, Route, Navigate } from 'react-router-dom';


function PrivateRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('isLoggedIn') === 'true');
  const [navKey, setNavKey] = useState('1');

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
    } catch (err) {}
    setLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
  };

  const handleNavChange = (key) => {
    setNavKey(key);
  };

  return (
    <Routes>
      <Route path="/login" element={
        loggedIn ? <Navigate to="/" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
      } />
      <Route path="/signup" element={
        loggedIn ? <Navigate to="/" replace /> : <SignUp onSignUpSuccess={handleLoginSuccess} />
      } />
      <Route path="/" element={
        <PrivateRoute>
          <MainLayout onLogout={handleLogout} navKey={navKey} onNavChange={handleNavChange}>
            {navKey === '1' && <Top50 />}
            {navKey === '2' && <AllCompanies />}
          </MainLayout>
        </PrivateRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
