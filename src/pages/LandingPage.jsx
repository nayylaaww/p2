import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FiMenu } from 'react-icons/fi';

import Navbar from '../components/Navbar';
import Contact from '../components/ContactUs';
import { auth, db } from '../firebase/firebaseConfig';
import './LandingPage.css';

function LandingPage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [showContact, setShowContact] = useState(false);
  const [sidebar, setSidebar] = useState(false);

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

  return (
    <div className="landing-container" style={{ backgroundImage: `url('/background.png')` }}>
      <Navbar onContactClick={() => setShowContact(true)} />

      <button className="hamburger" onClick={() => setSidebar(!sidebar)} aria-label="Toggle Sidebar">
        <FiMenu size={28} color="#fff" />
      </button>

      {sidebar && (
        <aside className="sidebar">
          <ul>
            <li><Link to="/gameinfo">GAME INFO</Link></li>
            <li><Link to="/achievement">ACHIEVEMENTS</Link></li>
            <li><button className="contact-nav" onClick={() => setShowContact(true)}>CONTACT US</button></li>
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
        </aside>
      )}

      <div className="play-button-wrapper">
        <Link to={user ? "/levelpage" : "/login"} className="play-btn">Play</Link>
      </div>

      <div className="tutorial-button-wrapper">
        <Link to="/tutorial" className="tutorial-btn">Tutorial</Link>
      </div>

      {showContact && <Contact onClose={() => setShowContact(false)} />}
    </div>
  );
}

export default LandingPage;
