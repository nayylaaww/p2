import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig';
import './Navbar.css';

function Navbar({ onContactClick }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        setUsername(docSnap.exists() ? docSnap.data().username : currentUser.displayName);
      } else {
        setUser(null);
        setUsername('');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      <ul className="nav-links">
        <li><Link to="/gameinfo">GAME INFO</Link></li>
        <li><Link to="/achievement">ACHIEVMENTS</Link></li>
        <li><button className="contact-nav" onClick={onContactClick}>CONTACT US</button></li>
        {user ? (
          <li className="profile-menu">
            <img
              src={user.photoURL || '/default-profile.png'}
              alt="Profile"
              className="profile-icon"
              onClick={() => navigate('/profile')}
              title={username}
            />
          </li>
        ) : (
          <li><Link to="/login">LOGIN</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
