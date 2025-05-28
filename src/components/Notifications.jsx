import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';

function Notifications({ notifications, setCurrentDashboard }) {
  const handleNotificationClick = (dashboard) => {
    console.log(`Navigating to ${dashboard}`);
    setCurrentDashboard(dashboard);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl shadow-xl p-6 mb-6 bg-white/90 backdrop-blur-md border border-emerald-100/50"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Notifikasi</h2>
        <p className="text-xs text-gray-500">Terakhir diperbarui 28 Mei 2025, 18:58 WIB</p>
      </div>
      <div className="space-y-3">
        {notifications.map((entry, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
            onClick={() => handleNotificationClick(entry.dashboard)}
            className="flex items-center justify-between bg-white/95 p-4 rounded-lg border border-emerald-100 cursor-pointer shadow-sm transition-all duration-300 backdrop-blur-sm"
            style={{ pointerEvents: 'auto' }}
            aria-label={`Lihat notifikasi: ${entry.message}`}
          >
            <div className="flex items-center">
              <FaBell className="text-emerald-500 mr-3 text-lg" />
              <div>
                <p className="text-sm font-medium text-gray-700">{entry.message}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-600 hover:text-emerald-800">Lihat</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Notifications;