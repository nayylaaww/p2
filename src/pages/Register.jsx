import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import './Register.css';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: username,
        createdAt: new Date(),
        levels: {
          level1: false,
          level2: false,
          level3: false,
          level4: false,
          level5: false,
        }
      });

      navigate('/');
    } catch (error) {
      alert(error.message);
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
          <img src="/tulisan-register.png" alt="Register" className="tulisan-login" />
        </div>

        <input
          type="text"
          placeholder="Username"
          className="input-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="btn-group">
          <button className="register-btn" onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
