import { motion } from 'framer-motion';
import { FaBell, FaCog } from 'react-icons/fa';

function Header({ userName, notifications, setCurrentDashboard }) {
  const handleNotificationClick = (dashboard) => {
    console.log(`Navigating to ${dashboard}`);
    setCurrentDashboard(dashboard);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-10 flex justify-between items-center mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 p-4 rounded-2xl shadow-lg text-white backdrop-blur-md bg-opacity-90"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <h1 className="text-2xl font-bold tracking-tight">{`Selamat Siang, ${userName}`}</h1>
      <div className="flex space-x-4">
        {notifications.map((notif, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleNotificationClick(notif.dashboard)}
            className="cursor-pointer p-2 rounded-full bg-emerald-700/30 backdrop-blur-sm hover:bg-emerald-700/50 transition-colors"
            style={{ pointerEvents: 'auto' }}
            aria-label={index === 0 ? "Notifikasi" : "Pengaturan"}
          >
            {index === 0 ? (
              <FaBell className="text-xl text-white" />
            ) : (
              <FaCog className="text-xl text-white" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Header;