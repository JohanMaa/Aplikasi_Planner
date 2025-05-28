import { motion } from 'framer-motion';
import { FaCalendarAlt, FaExclamationTriangle, FaRecycle, FaTruck, FaMoneyBillWave, FaChartPie, FaLeaf } from 'react-icons/fa';

// Map icon names to actual icons
const iconMap = {
  FaCalendarAlt: <FaCalendarAlt />,
  FaExclamationTriangle: <FaExclamationTriangle />,
  FaRecycle: <FaRecycle />,
  FaTruck: <FaTruck />,
  FaMoneyBillWave: <FaMoneyBillWave />,
  FaChartPie: <FaChartPie />,
  FaLeaf: <FaLeaf />
};

function QuickActions({ quickActions, setCurrentDashboard }) {
  const handleActionClick = (dashboard) => {
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
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.1, boxShadow: '0 10px 20px rgba(0,0,0,0.1)', backgroundColor: 'rgba(255,255,255,0.95)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleActionClick(action.dashboard)}
            className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all duration-300 bg-gradient-to-br ${action.color} text-white shadow-md relative overflow-hidden group`}
            style={{ pointerEvents: 'auto' }}
            aria-label={action.name}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-3 rounded-full bg-white/20 text-3xl">
              {iconMap[action.icon]}
            </div>
            <span className="text-sm font-medium text-center mt-2">{action.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default QuickActions;