import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/'))
      .catch((error) => alert(error.message));
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName,
        email: user.email,
        uid: user.uid,
      }, { merge: true });

      navigate('/');
    } catch (error) {
      alert("Gagal login dengan Google: " + error.message);
    }
  };

  return (

    <div className="login-page">

            <div className="logo">
                <img src="/logo.png" alt="logo-img" />
            </div>

      <button className="back-btn-home" onClick={() => navigate('/')}>🏠︎</button>

      <div className="login-form">
        <div className="tulisan-login-wrapper">
          <img src="/tulisan-login.png" alt="Login" className="tulisan-login" />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input-email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input-password"
        />

        <div className="btn-group">
          <button className="login-btn" onClick={handleLogin}>Login</button>
          <button className="register-btn" onClick={() => navigate('/Register')}>Register</button>
        </div>

        <button className="google-login-btn" onClick={handleGoogleLogin}>
          Login dengan Google
        </button>
        
      </div>
    </div>

  );
};

export default Login;