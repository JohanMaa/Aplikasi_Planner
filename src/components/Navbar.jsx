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
      className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 flex justify-around items-center border-t border-gray-200"
    >
      {navItems.map((item, index) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center space-y-1 ${
              item.name === 'Transfer'
                ? 'scale-150 -translate-y-6'
                : isActive
                ? 'text-blue-700'
                : 'text-gray-500 hover:text-blue-600'
            } transition-colors duration-300`
          }
        >
          <motion.div
            whileHover={{
              scale: item.name === 'Transfer' ? 1.1 : 1.2,
              rotate: item.name === 'Transfer' ? 180 : 0,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className={`text-2xl ${
              item.name === 'Transfer'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg ring-2 ring-blue-200'
                : 'p-2'
            }`}
          >
            {item.icon}
          </motion.div>
          <span
            className={`text-xs font-medium ${
              item.name === 'Transfer' ? 'text-blue-700 font-semibold' : ''
            }`}
          >
            {item.name}
          </span>
        </NavLink>
      ))}
    </motion.nav>
  );
}

export default Navbar;