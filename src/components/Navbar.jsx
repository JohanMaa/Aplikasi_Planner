import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaPen, FaExchangeAlt, FaUser, FaCog, FaHistory } from 'react-icons/fa';

// Define navigation items
const navItems = [
  { name: 'Home', path: '/home', icon: <FaHome />, ariaLabel: 'Home' },
  { name: 'Compose', path: '/compose', icon: <FaPen />, ariaLabel: 'Compose' },
  { name: 'Transfer', path: '/transfer', icon: <FaExchangeAlt />, ariaLabel: 'Transfer' },
  { name: 'History', path: '/settings', icon: <FaHistory />, ariaLabel: 'Settings' },
  { name: 'Akun', path: '/profile', icon: <FaUser />, ariaLabel: 'Profile' },
];

// Animation variants for nav items
const navItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15,
      delay: index * 0.1,
    },
  }),
};

// Navbar component
function Navbar() {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-2xl p-2 flex flex-wrap justify-around items-center border-t border-emerald-100/50 z-50
  sm:justify-around md:max-w-xs md:left-4 md:bottom-4 md:rounded-2xl md:shadow-lg"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {navItems.map((item, index) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center space-y-1 group relative ${
              item.name === 'Transfer'
                ? 'scale-125 -translate-y-4'
                : isActive
                ? 'text-emerald-700'
                : 'text-gray-500 hover:text-emerald-600'
            } transition-all duration-300`
          }
          aria-label={item.ariaLabel}
        >
          <motion.div
            custom={index}
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover={{
              scale: item.name === 'Transfer' ? 1.1 : 1.2,
              rotate: item.name === 'Transfer' ? 360 : 0,
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className={`text-2xl relative ${
              item.name === 'Transfer'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-full shadow-lg ring-4 ring-emerald-200/50'
                : 'p-2 rounded-full group-hover:bg-emerald-100/50'
            }`}
          >
            {item.icon}
            {item.name !== 'Transfer' && (
              <motion.span
                className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100"
                animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
          <span
            className={`text-xs font-medium ${
              item.name === 'Transfer'
                ? 'text-emerald-700 font-semibold'
                : 'group-hover:text-emerald-700'
            }`}
          >
            {item.name}
          </span>
          {/* Active state indicator */}
          <motion.div
            className={`absolute -bottom-2 w-6 h-1 rounded-full ${
              item.name === 'Transfer' ? 'bg-emerald-600' : 'bg-emerald-500'
            } opacity-0`}
            animate={{ opacity: ({ isActive }) => (isActive || item.name === 'Transfer' ? 1 : 0) }}
            transition={{ duration: 0.3 }}
          />
        </NavLink>
      ))}
    </motion.nav>
  );
}

export default Navbar;