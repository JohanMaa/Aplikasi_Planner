import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaExchangeAlt, FaUser, FaHistory, FaChartLine, FaLeaf } from 'react-icons/fa';

// Define navigation items
const navItems = [
  { name: 'Home', path: '/home', icon: <FaHome />, ariaLabel: 'Home' },
  { name: 'Monitoring', path: '/compose', icon: <FaLeaf />, ariaLabel: 'Monitoring' },
  { name: 'Transfer', path: '/transfer', icon: <FaExchangeAlt />, ariaLabel: 'Transfer' },
  { name: 'History', path: '/history', icon: <FaHistory />, ariaLabel: 'History' },
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
  const location = useLocation();
  const hideNavbar = ['/', '/login'].includes(location.pathname);

  if (hideNavbar) return null;

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl shadow-2xl p-4 flex items-center border-t border-white/10 z-50 md:max-w-lg md:left-1/2 md:-translate-x-1/2 md:bottom-6 md:rounded-full md:shadow-lg"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Left Group: Home, Monitoring */}
      <div className="flex-1 flex justify-end items-center space-x-4">
        {navItems.slice(0, 2).map((item, index) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 group relative ${
                isActive ? 'text-emerald-700' : 'text-gray-600 hover:text-emerald-600'
              } transition-all duration-300`
            }
            aria-label={item.ariaLabel}
          >
            <motion.div
              custom={index}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="p-2.5 rounded-full group-hover:bg-gradient-to-r group-hover:from-emerald-50 group-hover:to-teal-50"
            >
              {item.icon}
              <motion.span
                className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100"
                animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-xs font-medium group-hover:text-emerald-700">{item.name}</span>
            <motion.div
              className="absolute -bottom-2 w-6 h-1 rounded-full bg-emerald-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: location.pathname === item.path ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </NavLink>
        ))}
      </div>

      {/* Center: Transfer */}
      <NavLink
        to="/transfer"
        className="flex flex-col items-center space-y-1 group relative mx-6 -translate-y-6"
        aria-label="Transfer"
      >
        <motion.div
          custom={2}
          variants={navItemVariants}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.1, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 rounded-full shadow-lg ring-4 ring-emerald-200/30"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaExchangeAlt className="text-2xl" />
          </motion.div>
        </motion.div>
        <span className="text-xs font-semibold text-emerald-700">Transfer</span>
        <motion.div
          className="absolute -bottom-2 w-6 h-1 rounded-full bg-emerald-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: location.pathname === '/transfer' ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </NavLink>

      {/* Right Group: History, Akun */}
      <div className="flex-1 flex justify-start items-center space-x-4">
        {navItems.slice(3).map((item, index) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 group relative ${
                isActive ? 'text-emerald-700' : 'text-gray-600 hover:text-emerald-600'
              } transition-all duration-300`
            }
            aria-label={item.ariaLabel}
          >
            <motion.div
              custom={index + 3}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="p-2.5 rounded-full group-hover:bg-gradient-to-r group-hover:from-emerald-50 group-hover:to-teal-50"
            >
              {item.icon}
              <motion.span
                className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100"
                animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-xs font-medium group-hover:text-emerald-700">{item.name}</span>
            <motion.div
              className="absolute -bottom-2 w-6 h-1 rounded-full bg-emerald-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: location.pathname === item.path ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
}

export default Navbar;