import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaSearch, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { homeData } from '../data/data'; // Adjust path based on your project structure

function History({ setCurrentDashboard }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Calculate total incoming and outgoing amounts
  const totalIncoming = homeData.transferHistory
    .filter((entry) => entry.type === 'in')
    .reduce((sum, entry) => sum + parseInt(entry.amount.replace(/[^0-9]/g, '')), 0)
    .toLocaleString('id-ID');

  const totalOutgoing = homeData.transferHistory
    .filter((entry) => entry.type === 'out')
    .reduce((sum, entry) => sum + parseInt(entry.amount.replace(/[^0-9]/g, '')), 0)
    .toLocaleString('id-ID');

  // Filter transfers
  const filteredHistory = homeData.transferHistory.filter((entry) => {
    const matchesSearch = searchQuery
      ? (entry.to && entry.to.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (entry.from && entry.from.toLowerCase().includes(searchQuery.toLowerCase())) ||
        entry.date.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesType = filterType === 'all' || entry.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterType('all');
  };

  const handleTransactionClick = (entry) => {
    setSelectedTransaction(entry);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center p-4 sm:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
        className="w-full max-w-5xl h-48 bg-gradient-to-r from-green-600 to-green-400 rounded-2xl shadow-xl flex items-center justify-between px-6 sm:px-8 mb-8 relative overflow-hidden"
      >
        <div className="z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Hai, {homeData.userName}!
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">Riwayat Transfer</h2>
          <p className="text-sm sm:text-base text-green-100 mt-2">Lihat semua transaksi Anda</p>
        </div>
        {/* <motion.button
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentDashboard('Main')}
          className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-colors z-10"
          aria-label="Kembali ke dashboard utama"
        >
          Kembali
        </motion.button> */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-400/20 opacity-50" />
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 140, delay: 0.2 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mb-6 border border-green-100/50"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Ringkasan Transaksi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            className="p-4 bg-green-50 rounded-lg"
          >
            <p className="text-sm font-medium text-gray-600">Total Masuk</p>
            <p className="text-lg font-bold text-green-600">Rp {totalIncoming}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            className="p-4 bg-red-50 rounded-lg"
          >
            <p className="text-sm font-medium text-gray-600">Total Keluar</p>
            <p className="text-lg font-bold text-red-600">Rp {totalOutgoing}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 140, delay: 0.4 }}
        className="w-full max-w-lg mb-6 sticky top-4 z-20"
      >
        <div className="flex flex-col sm:flex-row gap-3 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-green-100/50">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Cari nama atau tanggal..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-colors"
              aria-label="Cari riwayat transfer"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'in', 'out'].map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFilterChange(type)}
                className={`px-3 py-2 rounded-lg font-medium text-sm ${
                  filterType === type
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
                aria-label={`Filter ${type === 'all' ? 'semua' : type === 'in' ? 'masuk' : 'keluar'}`}
              >
                {type === 'all' ? 'Semua' : type === 'in' ? 'Masuk' : 'Keluar'}
              </motion.button>
            ))}
          </div>
          {/* {(searchQuery || filterType !== 'all') && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearFilters}
              className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
              aria-label="Hapus filter"
            >
              Hapus
            </motion.button>
          )} */}
        </div>
      </motion.div>

      {/* Transfer History */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 140, delay: 0.6 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 border border-green-100/50"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Daftar Riwayat Transfer</h2>
        <div className="space-y-3">
          <AnimatePresence>
            {filteredHistory.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-gray-600 text-center py-4"
              >
                Tidak ada riwayat transfer yang ditemukan
              </motion.p>
            ) : (
              filteredHistory.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3, delay: index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                  onClick={() => handleTransactionClick(entry)}
                  className={`flex items-center justify-between p-4 rounded-lg border border-green-100/50 ${
                    index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white/50'
                  } cursor-pointer transition-all duration-200`}
                  aria-label={`Lihat detail transfer ${entry.type === 'out' ? 'ke' : 'dari'} ${
                    entry.to || entry.from
                  }`}
                >
                  <div className="flex items-center">
                    {entry.type === 'out' ? (
                      <FaArrowUp className="text-red-500 mr-3 text-lg" />
                    ) : (
                      <FaArrowDown className="text-green-600 mr-3 text-lg" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {entry.type === 'out' ? `Ke ${entry.to}` : `Dari ${entry.from}`}
                      </p>
                      <p className={`text-sm font-semibold ${entry.type === 'out' ? 'text-red-500' : 'text-green-600'}`}>
                        {entry.amount}
                      </p>
                      <p className="text-xs text-gray-500">{entry.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {entry.isNew && (
                      <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full animate-pulse">
                        Baru
                      </span>
                    )}
                    <FaInfoCircle className="text-green-500 text-lg" />
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        <p className="text-xs text-gray-500 mt-6 text-center">
          Terakhir diperbarui 29 Mei 2025, 15:19 WIB
        </p>
      </motion.div>

      {/* Transaction Detail Modal */}
      <AnimatePresence>
        {selectedTransaction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-xl border border-green-100/50"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Detail Transaksi</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Tutup modal"
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Tipe Transaksi</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedTransaction.type === 'out' ? 'Keluar' : 'Masuk'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {selectedTransaction.type === 'out' ? 'Tujuan' : 'Pengirim'}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedTransaction.to || selectedTransaction.from}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jumlah</p>
                  <p className={`text-sm font-semibold ${selectedTransaction.type === 'out' ? 'text-red-500' : 'text-green-600'}`}>
                    {selectedTransaction.amount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tanggal</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedTransaction.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedTransaction.isNew ? 'Baru' : 'Selesai'}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCloseModal}
                className="mt-6 w-full px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 transition-colors"
                aria-label="Tutup detail transaksi"
              >
                <FaTimes />
                <span>Tutup</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default History;