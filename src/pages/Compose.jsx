import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaTemperatureHigh, FaTint, FaRulerVertical } from 'react-icons/fa';

// Unified JSON data
const sensorData = [
  { id: 1, timestamp: '2025-05-29 11:30 AM', temperature: 28.5, humidity: 64, height: 1.2 },
  { id: 2, timestamp: '2025-05-29 11:00 AM', temperature: 28.7, humidity: 66, height: 1.19 },
  { id: 3, timestamp: '2025-05-29 10:30 AM', temperature: 27.9, humidity: 63, height: 1.17 },
  { id: 4, timestamp: '2025-05-29 10:00 AM', temperature: 28.0, humidity: 65, height: 1.20 },
  { id: 5, timestamp: '2025-05-29 09:30 AM', temperature: 27.8, humidity: 62, height: 1.16 },
  { id: 6, timestamp: '2025-05-29 09:00 AM', temperature: 28.1, humidity: 64, height: 1.15 },
  { id: 7, timestamp: '2025-05-29 08:30 AM', temperature: 27.7, humidity: 61, height: 1.14 },
];

// Animation variants
const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 15 } },
};

const tableRowVariants = {
  initial: { opacity: 0, x: -30 },
  animate: (index) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.1, type: 'spring', stiffness: 120 },
  }),
};

function Compose() {
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Get the latest data for current readings
  const currentData = sensorData[0];

  // Sort history data
  const sortedHistory = [...sensorData].sort((a, b) => {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
        className="w-full max-w-5xl h-48 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl shadow-2xl flex items-center justify-between px-8"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Monitoring Kompos</h1>
          <p className="text-sm sm:text-base text-teal-100 mt-2">Pantau data real-time dari sensor IoT</p>
        </div>
      </motion.div>

      {/* Current Data Cards */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 140 }}
        className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl -mt-16 p-6 sm:p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Terkini</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Suhu', value: `${currentData.temperature} °C`, icon: <FaTemperatureHigh className="w-8 h-8 text-teal-600" /> },
            { label: 'Kelembapan', value: `${currentData.humidity} %`, icon: <FaTint className="w-8 h-8 text-teal-600" /> },
            { label: 'Kedalaman', value: `${currentData.height} m`, icon: <FaRulerVertical className="w-8 h-8 text-teal-600" /> },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.05 }}
              className="bg-white/50 backdrop-blur-sm p-5 rounded-xl shadow-md flex items-center space-x-4 border border-gray-100/50"
            >
              {item.icon}
              <div>
                <p className="text-sm text-gray-600 font-medium">{item.label}</p>
                <p className="text-xl font-semibold text-gray-900">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* History Table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mt-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Riwayat Monitoring</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-teal-50 text-left text-gray-800">
                <th className="p-4 font-semibold rounded-tl-lg">Waktu</th>
                <th className="p-4 font-semibold">Suhu (°C)</th>
                <th className="p-4 font-semibold">Kelembapan (%)</th>
                <th className="p-4 font-semibold rounded-tr-lg">Tinggi (m)</th>
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
                  className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white/50'} hover:bg-teal-50/50 transition-colors`}
                >
                  <td className="p-4">{row.timestamp}</td>
                  <td className="p-4">{row.temperature}</td>
                  <td className="p-4">{row.humidity}</td>
                  <td className="p-4">{row.height}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-3">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <motion.button
              key={page}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                currentPage === page
                  ? 'bg-teal-600 text-white'
                  : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
              } transition-colors duration-200`}
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
        transition={{ delay: 0.7 }}
        className="mt-12 text-center text-sm text-gray-500"
      >
        <p>© 2025 MyBank Indonesia. Seluruh hak cipta dilindungi.</p>
      </motion.div>
    </div>
  );
}

export default Compose;