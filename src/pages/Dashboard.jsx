import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaCalendarAlt, FaExclamationTriangle, FaRecycle, FaTruck, FaMoneyBillWave, FaChartPie, FaBell, FaCog, FaArrowUp, FaArrowDown, FaLeaf, FaTimes } from 'react-icons/fa';
import { homeData } from '../data/data'; // Adjust path based on your project structure
import Profile from './Profile'; // Adjust path based on your project structure

// Map icon names to actual icons for dynamic rendering
const iconMap = {
  FaCalendarAlt: <FaCalendarAlt />,
  FaExclamationTriangle: <FaExclamationTriangle />,
  FaRecycle: <FaRecycle />,
  FaTruck: <FaTruck />,
  FaMoneyBillWave: <FaMoneyBillWave />,
  FaChartPie: <FaChartPie />,
  FaLeaf: <FaLeaf />,
  FaBell: <FaBell />,
  FaCog: <FaCog />
};

// Header Component
function Header({ userName, notifications, setCurrentDashboard }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const handleNotificationClick = (dashboard) => {
    console.log(`Navigating to ${dashboard}`);
    setCurrentDashboard(dashboard);
    setIsNotifOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="sticky top-0 z-20 flex justify-between items-center mb-6 bg-white p-4 sm:p-6 rounded-2xl shadow-md text-gray-800 border border-gray-100"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{`Selamat Siang, ${userName}`}</h1>
      <div className="flex space-x-3 sm:space-x-4 relative">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          className="cursor-pointer p-2 sm:p-3 rounded-full bg-green-100 hover:bg-green-200 transition-colors duration-200"
          aria-label="Notifikasi"
        >
          <FaBell className="text-lg sm:text-xl text-green-600" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleNotificationClick("Settings")}
          className="cursor-pointer p-2 sm:p-3 rounded-full bg-green-100 hover:bg-green-200 transition-colors duration-200"
          aria-label="Pengaturan"
        >
          <FaCog className="text-lg sm:text-xl text-green-600" />
        </motion.div>
        <AnimatePresence>
          {isNotifOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-12 right-0 w-64 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-100 p-4 max-h-80 overflow-y-auto z-30"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-800">Notifikasi</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsNotifOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Tutup notifikasi"
                >
                  <FaTimes className="text-sm" />
                </motion.button>
              </div>
              <div className="space-y-2">
                {notifications.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    onClick={() => handleNotificationClick(entry.dashboard)}
                    className="flex items-center justify-between p-2 rounded-lg cursor-pointer border-b border-gray-100"
                    aria-label={`Lihat notifikasi: ${entry.message}`}
                  >
                    <div className="flex items-center">
                      <FaBell className="text-green-600 mr-2 text-sm" />
                      <p className="text-sm text-gray-600">{entry.message}</p>
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="text-xs font-medium text-green-600"
                    >
                      Lihat
                    </motion.span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">Terakhir diperbarui 28 Mei 2025, 18:58 WIB</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Balance Card Component
function BalanceCard({ balance, accountNumber }) {
  const [showBalance, setShowBalance] = useState(false);

  const handleToggleBalance = () => {
    console.log(`Toggling balance visibility: ${!showBalance}`);
    setShowBalance(!showBalance);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
      className="relative bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-6 text-gray-800 border border-gray-100"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Saldo Rekening</h2>
          {/* <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            className="text-green-600 text-sm font-medium hover:text-green-800 transition-colors"
            aria-label="Atur saldo"
          >
            Atur
          </motion.a> */}
        </div>
        <div className="flex items-center space-x-3 mb-4">
          <p className="text-2xl sm:text-3xl font-semibold tracking-wide">{showBalance ? balance : "Rp ********"}</p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleBalance}
            className="cursor-pointer p-2 sm:p-3 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
            aria-label={showBalance ? "Sembunyikan saldo" : "Tampilkan saldo"}
          >
            {showBalance ? <FaEyeSlash className="text-lg sm:text-xl text-green-600" /> : <FaEye className="text-lg sm:text-xl text-green-600" />}
          </motion.div>
        </div>
        <p className="text-gray-600 text-sm tracking-wide">{accountNumber}</p>
      </div>
    </motion.div>
  );
}

// Quick Actions Component
function QuickActions({ quickActions, setCurrentDashboard }) {
  const handleActionClick = (dashboard) => {
    console.log(`Navigating to ${dashboard}`);
    setCurrentDashboard(dashboard);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="rounded-2xl shadow-md p-6 sm:p-8 mb-6 bg-white border border-gray-100"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleActionClick(action.dashboard)}
            className="flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all duration-200 bg-white border border-gray-100 hover:bg-green-50"
            aria-label={action.name}
          >
            <div className="text-2xl sm:text-3xl text-green-600 mb-2">
              {iconMap[action.icon]}
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">{action.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Transfer History Component
function TransferHistory({ transferHistory }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="rounded-2xl shadow-md p-6 sm:p-8 mb-6 bg-white border border-gray-100"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Histori Transfer</h2>
        <p className="text-xs text-gray-500">Terakhir diperbarui 28 Mei 2025, 18:58 WIB</p>
      </div>
      <div className="space-y-3">
        {transferHistory.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-100 shadow-sm transition-all duration-200"
            aria-label={`Transfer ${entry.type === "out" ? "keluar" : "masuk"}: ${entry.amount}`}
          >
            <div className="flex items-center">
              {entry.type === "out" ? (
                <FaArrowUp className="text-red-500 mr-3 text-lg sm:text-xl" />
              ) : (
                <FaArrowDown className="text-green-600 mr-3 text-lg sm:text-xl" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {entry.type === "out" ? `Transfer ke ${entry.to}` : `Diterima dari ${entry.from}`}
                </p>
                <p className={`text-sm font-semibold ${entry.type === "out" ? "text-red-500" : "text-green-600"}`}>{entry.amount}</p>
                <p className="text-xs text-gray-500">{entry.date}</p>
              </div>
            </div>
            {entry.isNew && (
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Baru</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Event News Component
function EventNews({ eventNews }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="rounded-2xl shadow-md p-6 sm:p-8 mb-6 bg-white border border-gray-100"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Berita Acara</h2>
        <p className="text-xs text-gray-500">Terakhir diperbarui 28 Mei 2025, 18:58 WIB</p>
      </div>
      <div className="space-y-3">
        {eventNews.map((news, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-100 shadow-sm transition-all duration-200"
            aria-label={`Berita: ${news.title}`}
          >
            <span className="text-sm font-medium text-gray-700">{news.title}</span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                news.status === "Baru"
                  ? "text-green-600 bg-green-100"
                  : news.status === "Selesai"
                  ? "text-green-700 bg-green-200"
                  : "text-red-600 bg-red-100"
              }`}
            >
              {news.status}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Dashboard Components
function JadwalPengangkutanDashboard({ data, onBack }) {
  const handleBackClick = () => {
    console.log("Navigating back to Main");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Jadwal Pengangkutan</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-green-600 text-sm font-medium hover:text-green-800 transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-gray-100 pb-3"
              aria-label={`Jadwal: ${item.date} ${item.time}`}
            >
              <p className="text-sm font-semibold text-gray-800">{item.date} - {item.time}</p>
              <p className="text-sm text-gray-600">Lokasi: {item.location}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function LaporSampahDashboard({ data, onBack }) {
  const handleBackClick = () => {
    console.log("Navigating back to Main");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Lapor Sampah</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-green-600 text-sm font-medium hover:text-green-800 transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-gray-100 pb-3"
              aria-label={`Laporan sampah: ${item.id}`}
            >
              <p className="text-sm font-semibold text-gray-800">ID: {item.id}</p>
              <p className="text-sm text-gray-600">Lokasi: {item.location}</p>
              <p className="text-sm text-gray-600">Status: {item.status}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function PilahSampahDashboard({ data, onBack }) {
  const handleBackClick = () => {
    console.log("Navigating back to Main");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Pilah Sampah</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-green-600 text-sm font-medium hover:text-green-800 transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-gray-100 pb-3"
              aria-label={`Pilah sampah: ${item.type}`}
            >
              <p className="text-sm font-semibold text-gray-800">{item.type}</p>
              <p className="text-sm text-gray-600">Berat: {item.weight}</p>
              <p className="text-sm text-gray-600">Tanggal: {item.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function PengangkutanDashboard({ data, onBack }) {
  const handleBackClick = () => {
    console.log("Navigating back to Main");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Pengangkutan</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-green-600 text-sm font-medium hover:text-green-800 transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-gray-100 pb-3"
              aria-label={`Pengangkutan: ${item.id}`}
            >
              <p className="text-sm font-semibold text-gray-800">ID: {item.id}</p>
              <p className="text-sm text-gray-600">Tanggal: {item.date}</p>
              <p className="text-sm text-gray-600">Status: {item.status}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function BayarTagihanDashboard({ data, onBack }) {
  const handleBackClick = () => {
    console.log("Navigating back to Main");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Bayar Tagihan</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-green-600 text-sm font-medium hover:text-green-800 transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-gray-100 pb-3"
              aria-label={`Tagihan: ${item.billId}`}
            >
              <p className="text-sm font-semibold text-gray-800">ID Tagihan: {item.billId}</p>
              <p className="text-sm text-gray-600">Jumlah: {item.amount}</p>
              <p className="text-sm text-gray-600">Jatuh Tempo: {item.dueDate}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function StatistikSampahDashboard({ data, onBack }) {
  const handleBackClick = () => {
    console.log("Navigating back to Main");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Statistik Sampah</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-green-600 text-sm font-medium hover:text-green-800 transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-gray-100 pb-3"
              aria-label={`Statistik: ${item.month}`}
            >
              <p className="text-sm font-semibold text-gray-800">{item.month}</p>
              <p className="text-sm text-gray-600">Organik: {item.organik}</p>
              <p className="text-sm text-gray-600">Anorganik: {item.anorganik}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function EdukasiSampahDashboard({ data, onBack }) {
  const handleBackClick = () => {
    console.log("Navigating back to Main");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Edukasi Sampah</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-green-600 text-sm font-medium hover:text-green-800 transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-gray-100 pb-3"
              aria-label={`Edukasi: ${item.title}`}
            >
              <p className="text-sm font-semibold text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-600">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function NotificationsDashboard({ data, onBack }) {
  const handleBackClick = () => {
    console.log("Navigating back to Main");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Notifikasi</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-green-600 text-sm font-medium hover:text-green-800 transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-gray-100 pb-3"
              aria-label={`Notifikasi: ${item.message}`}
            >
              <p className="text-sm text-gray-600">{item.message}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function SettingsDashboard({ onBack }) {
  const handleBackClick = () => {
    console.log("Navigating back to Main");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Pengaturan</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-green-600 text-sm font-medium hover:text-green-800 transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </motion.button>
        </div>
        <p className="text-sm text-gray-600">Ini adalah halaman pengaturan. (Placeholder)</p>
      </motion.div>
    </div>
  );
}

// Main Dashboard Component
function MainDashboard() {
  const [data, setData] = useState(null);
  const [currentDashboard, setCurrentDashboard] = useState("Main");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching data with a delay
    setTimeout(() => {
      setData(homeData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-green-600 text-3xl sm:text-4xl"
          aria-label="Memuat"
        >
          <FaRecycle />
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-center p-4 sm:p-6 text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Data tidak tersedia
      </div>
    );
  }

  if (currentDashboard !== "Main") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDashboard}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
        >
          {(() => {
            switch (currentDashboard) {
              case "JadwalPengangkutan":
                return <JadwalPengangkutanDashboard data={data.quickActionData.JadwalPengangkutan} onBack={() => setCurrentDashboard("Main")} />;
              case "LaporSampah":
                return <LaporSampahDashboard data={data.quickActionData.LaporSampah} onBack={() => setCurrentDashboard("Main")} />;
              case "PilahSampah":
                return <PilahSampahDashboard data={data.quickActionData.PilahSampah} onBack={() => setCurrentDashboard("Main")} />;
              case "Pengangkutan":
                return <PengangkutanDashboard data={data.quickActionData.Pengangkutan} onBack={() => setCurrentDashboard("Main")} />;
              case "BayarTagihan":
                return <BayarTagihanDashboard data={data.quickActionData.BayarTagihan} onBack={() => setCurrentDashboard("Main")} />;
              case "StatistikSampah":
                return <StatistikSampahDashboard data={data.quickActionData.StatistikSampah} onBack={() => setCurrentDashboard("Main")} />;
              case "EdukasiSampah":
                return <EdukasiSampahDashboard data={data.quickActionData.EdukasiSampah} onBack={() => setCurrentDashboard("Main")} />;
              case "Notifications":
                return <NotificationsDashboard data={data.notifications} onBack={() => setCurrentDashboard("Main")} />;
              case "Settings":
                return <SettingsDashboard onBack={() => setCurrentDashboard("Main")} />;
              case "Profile":
                return <Profile setCurrentDashboard={setCurrentDashboard} />;
              default:
                return (
                  <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-center p-4 sm:p-6 text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Dashboard tidak ditemukan
                  </div>
                );
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 overflow-y-auto p-4 sm:p-6 relative"
      style={{
        fontFamily: 'Poppins, sans-serif',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316A34A' fill-opacity='0.1'%3E%3Cpath d='M36 34c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79  4-4zm10 0c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4zm-20 0c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      <Header
        userName={data.userName}
        notifications={data.notifications}
        setCurrentDashboard={setCurrentDashboard}
      />
      <BalanceCard
        balance={data.balance}
        accountNumber={data.accountNumber}
      />
      <QuickActions
        quickActions={data.quickActions}
        setCurrentDashboard={setCurrentDashboard}
      />
      <TransferHistory transferHistory={data.transferHistory} />
      <EventNews eventNews={data.eventNews} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center text-xs text-gray-400"
      >
        <p></p>
      </motion.div>
    </div>
  );
}

export default MainDashboard;