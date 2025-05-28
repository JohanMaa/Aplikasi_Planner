import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Compose from './pages/Compose.jsx';
import Transfer from './pages/Transfer.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import UserDetail from './components/UserDetails.jsx'; // Impor UserDetail

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
        {/* Konten halaman */}
        <div className="flex-grow pb-20"> {/* Tambahkan padding bawah agar konten tidak tertutup navbar */}
          <Routes>
            <Route path="/home" element={<Dashboard />} />
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/compose" element={<Compose />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/userdetail" element={<UserDetail />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>

        {/* Navbar tetap di bawah */}
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
