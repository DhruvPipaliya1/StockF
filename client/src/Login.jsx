
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from './firebase';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Google sign-in handler
  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, provider);
      sessionStorage.setItem('isLoggedIn', 'true');
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Store login state in sessionStorage
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2 className="teaxt-dark">Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="or-divider"><span>OR</span></div>
      <button type="button" className="google-btn" onClick={handleGoogleSignIn} disabled={loading}>
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="google-icon" />
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
