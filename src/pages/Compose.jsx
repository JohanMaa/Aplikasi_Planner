import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaTemperatureHigh, FaTint, FaRulerVertical, FaWeight } from 'react-icons/fa';

// Dummy data for current IoT readings and history
const currentData = {
  temperature: 28.5, // Celsius
  humidity: 65, // Percentage
  height: 1.2, // Meters
};

const historyData = [
  { id: 1, timestamp: '2025-05-29 11:30 AM', temperature: 28.2, humidity: 64, height: 1.18 },
  { id: 2, timestamp: '2025-05-29 11:00 AM', temperature: 28.7, humidity: 66, height: 1.19 },
  { id: 3, timestamp: '2025-05-29 10:30 AM', temperature: 27.9, humidity: 63, height: 1.17 },
  { id: 4, timestamp: '2025-05-29 10:00 AM', temperature: 28.0, humidity: 65, height: 1.20 },
  { id: 5, timestamp: '2025-05-29 09:30 AM', temperature: 27.8, humidity: 62, height: 1.16 },
  { id: 6, timestamp: '2025-05-29 09:00 AM', temperature: 28.1, humidity: 64, height: 1.15 },
  { id: 7, timestamp: '2025-05-29 08:30 AM', temperature: 27.7, humidity: 61, height: 1.14 },
];

// Animation variants for cards and table
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 120, damping: 15 },
};

const tableRowVariants = {
  initial: { opacity: 0, x: -20 },
  animate: (index) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.05, type: 'spring', stiffness: 100 },
  }),
};

function Compose() {
  const [sortOrder, setSortOrder] = useState('desc'); // For sorting history by timestamp
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sort history data
  const sortedHistory = [...historyData].sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);
  const paginatedData = sortedHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="w-full max-w-4xl h-48 bg-gradient-to-br from-emerald-600 to-teal-400 flex items-start px-6 pt-6 shadow-lg rounded-xl"
      >
        <div className="flex justify-between items-start w-full">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Monitoring Kompos</h1>
            <p className="text-sm text-emerald-100 mt-1">Data terkini dari sensor IoT</p>
          </div>
        </div>
      </motion.div>

      {/* Current Data Cards */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl -mt-12 p-6 sm:p-8"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Data Terkini</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Suhu', value: `${currentData.temperature} °C`, icon: <FaTemperatureHigh className="w-6 h-6 text-emerald-600" /> },
            { label: 'Kelembapan', value: `${currentData.humidity} %`, icon: <FaTint className="w-6 h-6 text-emerald-600" /> },
            { label: 'Kapasitas', value: `${currentData.capacity} m`, icon: <FaWeight className="w-6 h-6 text-emerald-600" /> },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              className="bg-emerald-50 p-4 rounded-lg shadow-md flex items-center space-x-4"
            >
              {item.icon}
              <div>
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="text-lg font-semibold text-gray-900">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* History Table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 mt-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Riwayat Monitoring</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSort}
            className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
            aria-label={`Urutkan ${sortOrder === 'desc' ? 'terlama ke terbaru' : 'terbaru ke terlama'}`}
          >
            Urutkan {sortOrder === 'desc' ? 'Terlama' : 'Terbaru'}
          </motion.button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-emerald-50 text-left">
                <th className="p-3 font-semibold">Waktu</th>
                <th className="p-3 font-semibold">Suhu (°C)</th>
                <th className="p-3 font-semibold">Kelembapan (%)</th>
                <th className="p-3 font-semibold">Tinggi (m)</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <motion.tr
                  key={row.id}
                  custom={index}
                  variants={tableRowVariants}
                  initial="initial"
                  animate="animate"
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">{row.timestamp}</td>
                  <td className="p-3">{row.temperature}</td>
                  <td className="p-3">{row.humidity}</td>
                  <td className="p-3">{row.height}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <motion.button
              key={page}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === page
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
              }`}
              aria-label={`Pindah ke halaman ${page}`}
            >
              {page}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center text-xs text-gray-400"
      >
        <p>© 2025 MyBank Indonesia. Seluruh hak cipta dilindungi.</p>
      </motion.div>
    </div>
  );
}

export default Compose;