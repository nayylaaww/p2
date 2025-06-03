import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig';
import './levelPage.css';

const lightBot = {
  map: {
    getNbrOfLevels: () => 5,
  },
  medals: {
    gold: 4,
    silver: 3,
    bronze: 2,
    noMedal: 1,
  }
};

function LevelPage() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [levels, setLevels] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          await signOut(auth);
          navigate('/login');
          return;
        }

        setUser(userSnap.data());

        const userData = userSnap.data();
        const levelsData = userData.levels || {};

        const tempLevels = [];

        for (let i = 1; i <= lightBot.map.getNbrOfLevels(); i++) {
          const levelKey = `level${i}`;
          const unlocked = !!levelsData[levelKey];
          let medal = unlocked ? 'medal-gold' : '';

          tempLevels.push({ index: i, medal, unlocked });
        }
        console.log(tempLevels)
        setLevels(tempLevels);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSkip = () => {
    setShowIntro(false);
  };

  return (
    <div className="level-page-container">


      {showIntro && (
        <div className="video-overlay">
          <div className="video-wrapper">
            <video
              src="/public/intro.mp4"
              autoPlay
              onEnded={handleSkip}
              className="intro-video"
            />
            <button className="skip-button" onClick={handleSkip}>▶▶</button>
          </div>
        </div>
      )}

      {/* levelannnn */}
      <div className="logo">
        <img src="/logo.png" alt="logo-img" />
      </div>

      <div className="transparant">
        <button className="close-btn-home" onClick={() => navigate('/')}>🏠︎</button>
        <div id='level-container' className="level-container">
          <div className="level-row">
            {levels.slice(0, 3).map(level => (
              <button
                key={level.index}
                className={`level-button ${level.index > 1 && levels[level.index - 2]?.medal === '' ? "locked" : "unlocked"}`}
                disabled={level.index > 1 && levels[level.index - 2]?.medal === ''}
                onClick={() => {
                  localStorage.setItem("level", level.index)
                  navigate('/game')
                }}
              >
                {levels[level.index - 2]?.medal === '' ? <img src="/lock.png" alt="" className='lock'/> : level.index}
              </button>
            ))}
          </div>
          <div className="level-row center-2">
            {levels.slice(3, 5).map(level => (
              <button
                key={level.index}
                className={`level-button ${level.index > 1 && levels[level.index - 2]?.medal === '' ? "locked" : "unlocked"}`}
                disabled={level.index > 1 && levels[level.index - 2]?.medal === ''}
                onClick={() => {
                  localStorage.setItem("level", level.index)
                  navigate('/game')
                }}
              >
                {levels[level.index - 2]?.medal === '' ? <img src="/lock.png" alt="" className='lock'/> : level.index}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelPage;
