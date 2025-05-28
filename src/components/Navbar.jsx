import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaPen, FaExchangeAlt, FaUser, FaCog } from 'react-icons/fa';

// Define navigation items
const navItems = [
  { name: 'Home', path: '/home', icon: <FaHome />, ariaLabel: 'Home' },
  { name: 'Compose', path: '/compose', icon: <FaPen />, ariaLabel: 'Compose' },
  { name: 'Transfer', path: '/transfer', icon: <FaExchangeAlt />, ariaLabel: 'Transfer' },
  { name: 'Profile', path: '/profile', icon: <FaUser />, ariaLabel: 'Profile' },
  { name: 'Settings', path: '/settings', icon: <FaCog />, ariaLabel: 'Settings' },
];

// Animation variants for nav items
const navItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay: index * 0.05,
    },
  }),
};

function Navbar() {
  return (
    <motion.nav
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.1 }}
      className="fixed bottom-0 left-0 right-0 bg-white/90 shadow-lg p-3 flex justify-around items-center border-t border-emerald-100/30 z-50"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {navItems.map((item, index) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center space-y-1 relative ${
              isActive ? 'text-emerald-700' : 'text-gray-500 hover:text-emerald-600'
            } transition-all duration-200`
          }
          aria-label={item.ariaLabel}
        >
          <motion.div
            custom={index}
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`text-xl p-2 rounded-full ${
              item.name === 'Transfer'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'hover:bg-emerald-100/50'
            }`}
          >
            {item.icon}
          </motion.div>
          <span className={`text-xs font-medium ${item.name === 'Transfer' ? 'text-emerald-700' : ''}`}>
            {item.name}
          </span>
          <motion.div
            className="absolute -bottom-1 w-4 h-1 rounded-full bg-emerald-500"
            animate={{ opacity: ({ isActive }) => (isActive ? 1 : 0) }}
            transition={{ duration: 0.2 }}
          />
        </NavLink>
      ))}
    </motion.nav>
  );
}

export default Navbar;