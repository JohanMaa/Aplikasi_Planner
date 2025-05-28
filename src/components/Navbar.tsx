import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, PencilSquareIcon, ArrowUpCircleIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-lg" data-aos="slide-up">
      <div className="flex justify-around items-center h-16">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-400`
          }
        >
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <HomeIcon className="h-6 w-6" />
          </motion.div>
          <span className="text-xs">Dashboard</span>
        </NavLink>
        <NavLink
          to="/compose"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-400`
          }
        >
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <PencilSquareIcon className="h-6 w-6" />
          </motion.div>
          <span className="text-xs">Compose</span>
        </NavLink>
        <NavLink
          to="/transfer"
          className={({ isActive }) =>
            `flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3 -mt-8 shadow-xl ${
              isActive ? 'text-white' : 'text-white'
            }`
          }
        >
          <motion.div
            whileHover={{ scale: 1.3, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpCircleIcon className="h-8 w-8" />
          </motion.div>
          <span className="text-xs mt-1">Transfer</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-400`
          }
        >
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <UserIcon className="h-6 w-6" />
          </motion.div>
          <span className="text-xs">Profile</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-400`
          }
        >
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Cog6ToothIcon className="h-6 w-6" />
          </motion.div>
          <span className="text-xs">Settings</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;