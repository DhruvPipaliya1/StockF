import './App.css';
import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from './firebase';
import Home from './components/Home';
import Top50 from './components/Top50';
import AllCompanies from './components/AllCompanies';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MainLayout from './layout/MainLayout';
import News from './components/News/News.jsx';

function PrivateRoute() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

function MainWrapper({ onLogout }) {
  return (
    <MainLayout onLogout={onLogout}>
      <Outlet />
    </MainLayout>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('isLoggedIn') === 'true');
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    navigate('/'); 
  };

  const handleLogout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
    } catch (err) {}
    setLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={loggedIn ? <Navigate to="/" replace /> : <Login onLoginSuccess={handleLoginSuccess} />}
      />
      <Route
        path="/signup"
        element={loggedIn ? <Navigate to="/" replace /> : <SignUp onSignUpSuccess={handleLoginSuccess} />}
      />

      {/* Protected Routes under /backend */}
      <Route path="/backend" element={<PrivateRoute />}>
        <Route element={<MainWrapper onLogout={handleLogout} />}>
          <Route path="top50" element={<Top50 />} />
          <Route path="all-companies" element={<AllCompanies />} />
          <Route index element={<Navigate to="top50" replace />} />
        </Route>
      </Route>

      {/* Home → redirect to /backend */}
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<News key="general" pageSize={5} />} />

      {/* Catch all unknown paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
