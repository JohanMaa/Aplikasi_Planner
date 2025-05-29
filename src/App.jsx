// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar.jsx';
// import Dashboard from './pages/Dashboard.jsx';
// import Compose from './pages/Compose.jsx';
// import Transfer from './pages/Transfer.jsx';
// import Profile from './pages/Profile.jsx';
// import History from './pages/History.jsx';
// import UserDetail from './components/UserDetails.jsx'; // Impor UserDetail
// // import EditProfileForm from './pages/EditProfileForm.jsx'; 

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
//         {/* Konten halaman */}
//         <div className="flex-grow pb-20"> {/* Tambahkan padding bawah agar konten tidak tertutup navbar */}
//           <Routes>
//             <Route path="/Home" element={<Dashboard />} />
//             {/* <Route path="/" element={<Dashboard />} /> */}
//             <Route path="/compose" element={<Compose />} />
//             <Route path="/EditProfileForm" element={<Compose />} />
//             <Route path="/transfer" element={<Transfer />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/profile/userdetail" element={<UserDetail />} />
//             <Route path="/History" element={<History />} />
//           </Routes>
//         </div>

//         {/* Navbar tetap di bawah */}
//         <Navbar />
//       </div>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Compose from './pages/Compose.jsx';
import Transfer from './pages/Transfer.jsx';
import Profile from './pages/Profile.jsx';
import UserDetail from './components/UserDetails.jsx';
import Login from './pages/login.jsx';
import History from './pages/History.jsx';

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); // Periksa token di localStorage

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
        <div className="flex-grow pb-16">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/compose" element={<Compose />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/userdetail" element={<UserDetail />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;