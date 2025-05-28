import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaPen, FaExchangeAlt, FaUser, FaCog } from 'react-icons/fa';

const navItems = [
  { name: 'Dashboard', path: '/', icon: <FaHome /> },
  { name: 'Compose', path: '/compose', icon: <FaPen /> },
  { name: 'Transfer', path: '/transfer', icon: <FaExchangeAlt /> },
  { name: 'Profile', path: '/profile', icon: <FaUser /> },
  { name: 'Settings', path: '/settings', icon: <FaCog /> },
];

function Navbar() {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-around items-center border-t border-gray-200"
    >
      {navItems.map((item, index) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center space-y-1 ${
              item.name === 'Transfer'
                ? 'scale-125 text-blue-600'
                : isActive
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-500'
            } transition-colors duration-200`
          }
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: item.name === 'Transfer' ? 360 : 0 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className={`text-2xl ${
              item.name === 'Transfer' ? 'bg-blue-100 p-3 rounded-full' : ''
            }`}
          >
            {item.icon}
          </motion.div>
          <span className="text-xs font-medium">{item.name}</span>
        </NavLink>
      ))}
    </motion.nav>
  );
}

export default Navbar;