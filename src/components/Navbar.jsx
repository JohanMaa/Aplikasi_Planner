import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaPen, FaExchangeAlt, FaUser, FaCog } from 'react-icons/fa';

// Define navigation items
const navItems = [
  { name: 'Beranda', path: '/home', icon: <FaHome />, ariaLabel: 'Beranda' },
  { name: 'Tulis', path: '/compose', icon: <FaPen />, ariaLabel: 'Tulis' },
  { name: 'Transfer', path: '/transfer', icon: <FaExchangeAlt />, ariaLabel: 'Transfer' },
  { name: 'Profil', path: '/profile', icon: <FaUser />, ariaLabel: 'Profil' },
  { name: 'Pengaturan', path: '/settings', icon: <FaCog />, ariaLabel: 'Pengaturan' },
];

// Animation variants for nav items
const navItemVariants = {
  initial: { opacity: 0, y: 20 },
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
      initial={{ y: 70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.1 }}
      className="fixed bottom-0 left-0 right-0 bg-white/95 shadow-2xl p-5 flex justify-around items-center border-t-2 border-emerald-100/50 z-50"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {navItems.map((item, index) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center space-y-3 relative ${
              isActive ? 'text-emerald-700' : 'text-gray-600 hover:text-emerald-600'
            } transition-all duration-200`
          }
          aria-label={item.ariaLabel}
        >
          <motion.div
            custom={index}
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`text-4xl p-4 rounded-full ${
              item.name === 'Transfer'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl'
                : 'hover:bg-emerald-100/70'
            }`}
          >
            {item.icon}
          </motion.div>
          <span className={`text-base font-medium ${item.name === 'Transfer' ? 'text-emerald-700 font-semibold' : ''}`}>
            {item.name}
          </span>
          <motion.div
            className="absolute -bottom-2 w-6 h-1.5 rounded-full bg-emerald-500"
            animate={{ opacity: ({ isActive }) => (isActive ? 1 : 0) }}
            transition={{ duration: 0.2 }}
          />
        </NavLink>
      ))}
    </motion.nav>
  );
}

export default Navbar;