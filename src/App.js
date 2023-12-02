import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ChallengeTemplate from './pages/ChallengeTemplate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:day/:chall" element={<ChallengeTemplate/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
