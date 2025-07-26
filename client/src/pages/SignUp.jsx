import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import '../Login.css';

function SignUp({ onSignUpSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Google sign-up handler
  const handleGoogleSignUp = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, provider);
      sessionStorage.setItem('isLoggedIn', 'true');
      if (onSignUpSuccess) onSignUpSuccess();
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
      await createUserWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      if (onSignUpSuccess) onSignUpSuccess();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2 className="text-dark">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-dark">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-dark">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div className="or-divider"><span className="text-dark">OR</span></div>
      <button type="button" className="google-btn" onClick={handleGoogleSignUp} disabled={loading}>
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="google-icon" />
        Sign up with Google
      </button>
    </div>
  );
}

export default SignUp;
// Moved from src/SignUp.jsx
// ...existing code from SignUp.jsx should be placed here...
