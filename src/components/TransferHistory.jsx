import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function TransferHistory({ transferHistory }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl shadow-xl p-6 mb-6 bg-white/90 backdrop-blur-md border border-emerald-100/50"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Histori Transfer</h2>
        <p className="text-xs text-gray-500">Terakhir diperbarui 28 Mei 2025, 18:58 WIB</p>
      </div>
      <div className="space-y-3">
        {transferHistory.map((entry, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
            className="flex items-center justify-between bg-white/95 p-4 rounded-lg border border-emerald-100 shadow-sm transition-all duration-300 backdrop-blur-sm"
            aria-label={`Transfer ${entry.type === "out" ? "keluar" : "masuk"}: ${entry.amount}`}
          >
            <div className="flex items-center">
              {entry.type === "out" ? (
                <FaArrowUp className="text-red-500 mr-3 text-lg" />
              ) : (
                <FaArrowDown className="text-emerald-500 mr-3 text-lg" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {entry.type === "out" ? `Transfer ke ${entry.to}` : `Diterima dari ${entry.from}`}
                </p>
                <p className={`text-sm font-semibold ${entry.type === "out" ? "text-red-500" : "text-emerald-500"}`}>{entry.amount}</p>
                <p className="text-xs text-gray-500">{entry.date}</p>
              </div>
            </div>
            {entry.isNew && (
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Baru</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default TransferHistory;