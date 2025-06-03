import { useNavigate } from 'react-router-dom';
import './Achievment.css';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

function LevelPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [levels, setLevels] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userDocRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          console.log(userData.levels)
          setLevels(userData.levels || {});
        } else {
          alert('User data not found, logging out...');
          auth.signOut();
          navigate('/login');
        }
        setLoading(false);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleClose = () => {
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;

  const achievements = [
    { title: 'Novabyte', level: 1, medal: 'tes 1' },
    { title: 'Codewalker', level: 2, medal: 'tes 2' },
    { title: 'Syntaxion', level: 3, medal: 'tes 3' },
    { title: 'Quantum Seeker', level: 4, medal: 'tes 4' },
    { title: 'Algorithmics Overmind', level: 5, medal: 'tes 5' },
  ];

  return (
    <div className="achie-page-container">
      <div className="logo">
        <img src="/logo.png" alt="logo-img" />
      </div>
      <button className="close-btn-home" onClick={handleClose}>🏠︎</button>
      <div className="achie-container">
        {achievements.map((item) => {
          const isUnlocked = !!levels[`level${item.level}`];
          return (
            <div key={item.level} className="achie-item">
              {!isUnlocked && <div className='achie-locked'>
                <img src='lock.png' alt='' className='achie-lock' /></div>}
              <p className="achie-title">{item.title}</p>
              <div className="achie-side">
                <p className="achie-level">complete {item.level} level</p>
                <img src={`/achie${item.level}.png`} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LevelPage;
