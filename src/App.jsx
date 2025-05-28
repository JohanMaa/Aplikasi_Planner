import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Compose from './pages/Compose';
import Transfer from './pages/Transfer';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Routes>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;