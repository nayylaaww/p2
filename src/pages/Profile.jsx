import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        setUserData({
          username: docSnap.exists() ? docSnap.data().username : user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (!userData) return <p>Loading...</p>;

  return (
    
    <div className="profile-container">
      <img
        src={userData.photoURL || '/default-profile.png'}
        alt="Profile"
        className="profile-img"
      />
      <button className="close-btn-home" onClick={() => navigate('/')}>🏠︎</button>
      <h2>{userData.username}</h2>
      <p>{userData.email}</p>

      <button className="logout-btn"
      onClick={handleLogout}>Log Out</button>
      
    </div>
  );
}

export default Profile;
