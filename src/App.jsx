import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GameInfo from './pages/GameInfo';
import Achievement from './pages/Achievment';
import Login from './pages/Login';
import Tutorial from './pages/Tutorial';
import LevelPage from './pages/LevelPage';
import Register from './pages/Register';
import Profile from './pages/Profile';
import LightbotEmbed from './components/LightbotEmbed';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/gameinfo" element={<GameInfo />} />
      <Route path="/achievement" element={<Achievement />} />
      <Route path="/login" element={<Login />} />
      <Route path="/levelpage" element={<LevelPage/>} />
      <Route path="/tutorial" element={<Tutorial/>} />
      <Route path="/register" element={<Register />} />
      <Route path="profile" element={<Profile />}/> 
      <Route path="/game" element={<LightbotEmbed />} />
    </Routes>
  )
}

export default App
