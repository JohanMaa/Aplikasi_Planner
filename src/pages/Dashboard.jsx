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
      transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
      className="sticky top-0 z-20 flex justify-between items-center mb-6 bg-[#2E8B57] p-4 sm:p-6 rounded-xl shadow-sm text-white bg-opacity-95"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{`Selamat Siang, ${userName}`}</h1>
      <div className="flex space-x-3 sm:space-x-4 relative">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          className="cursor-pointer p-2 sm:p-3 rounded-full bg-[#90EE90] hover:bg-[#FFD700] transition-colors duration-200"
          aria-label="Notifikasi"
        >
          <FaBell className="text-lg sm:text-xl text-[#2E8B57]" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleNotificationClick("Settings")}
          className="cursor-pointer p-2 sm:p-3 rounded-full bg-[#90EE90] hover:bg-[#FFD700] transition-colors duration-200"
          aria-label="Pengaturan"
        >
          <FaCog className="text-lg sm:text-xl text-[#2E8B57]" />
        </motion.div>
        <AnimatePresence>
          {isNotifOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-12 right-0 w-64 sm:w-80 bg-[#F5F5F5] rounded-lg shadow-lg border border-[#90EE90] p-4 max-h-80 overflow-y-auto z-30"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-[#2E8B57]">Notifikasi</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsNotifOpen(false)}
                  className="text-[#6B7280] hover:text-[#2E8B57]"
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
                    whileHover={{ backgroundColor: "#90EE90" }}
                    onClick={() => handleNotificationClick(entry.dashboard)}
                    className="flex items-center justify-between p-2 rounded-lg cursor-pointer border-b border-[#90EE90]"
                    aria-label={`Lihat notifikasi: ${entry.message}`}
                  >
                    <div className="flex items-center">
                      <FaBell className="text-[#2E8B57] mr-2 text-sm" />
                      <p className="text-sm text-[#6B7280]">{entry.message}</p>
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="text-xs font-medium text-[#2E8B57]"
                    >
                      Lihat
                    </motion.span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-[#6B7280] mt-3 text-center">Terakhir diperbarui 29 Mei 2025, 02:20 WIB</p>
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
      transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(46,139,87,0.3)" }}
      className="relative bg-gradient-to-br from-[#90EE90] to-[#2E8B57] rounded-xl shadow-lg p-6 sm:p-8 mb-6 text-white overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 animate-pulse" />
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Billing Information</h2>
          <motion.a
            href="#!"
            whileHover={{ scale: 1.1 }}
            className="text-[#FFD700] text-sm font-medium hover:text-[#FFD700]/80 transition-colors"
            aria-label="Atur saldo"
          >
            Atur
          </motion.a>
        </div>
        <div className="flex items-center space-x-3 mb-4">
          <p className="text-3xl sm:text-4xl font-bold tracking-tight">{showBalance ? balance : "Rp ********"}</p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleBalance}
            className="cursor-pointer p-2 sm:p-3 rounded-md bg-[#FFD700] hover:bg-[#FFD700]/80 transition-colors"
            aria-label={showBalance ? "Sembunyikan saldo" : "Tampilkan saldo"}
          >
            {showBalance ? <FaEyeSlash className="text-lg sm:text-xl text-[#2E8B57]" /> : <FaEye className="text-lg sm:text-xl text-[#2E8B57]" />}
          </motion.div>
        </div>
        <p className="text-[#FFD700] text-sm tracking-tight">{accountNumber}</p>
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
      transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
      className="rounded-xl shadow-sm p-6 sm:p-8 mb-6 bg-[#F5F5F5] border border-[#90EE90]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <h2 className="text-lg sm:text-xl font-semibold text-[#2E8B57] mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.05, backgroundColor: "#90EE90" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleActionClick(action.dashboard)}
            className="flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all duration-200 bg-white border border-[#90EE90]"
            aria-label={action.name}
          >
            <div className="text-2xl text-[#2E8B57] mb-2">
              {iconMap[action.icon]}
            </div>
            <span className="text-sm font-medium text-[#2E8B57] text-center">{action.name}</span>
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
      transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
      className="rounded-xl shadow-sm p-6 sm:p-8 bg-[#F5F5F5] border border-[#90EE90]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-[#2E8B57]">Transaction History</h2>
        <p className="text-xs text-[#6B7280]">Last updated 29 May 2025, 02:20 WIB</p>
      </div>
      <div className="space-y-3">
        {transferHistory.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#90EE90] shadow-sm transition-all duration-200"
            aria-label={`Transfer ${entry.type === "out" ? "keluar" : "masuk"}: ${entry.amount}`}
          >
            <div className="flex items-center">
              {entry.type === "out" ? (
                <FaArrowUp className="text-red-500 mr-3 text-lg sm:text-xl" />
              ) : (
                <FaArrowDown className="text-[#2E8B57] mr-3 text-lg sm:text-xl" />
              )}
              <div>
                <p className="text-sm font-medium text-[#6B7280]">
                  {entry.type === "out" ? `Transfer to ${entry.to}` : `Received from ${entry.from}`}
                </p>
                <p className={`text-sm font-semibold ${entry.type === "out" ? "text-red-500" : "text-[#2E8B57]"}`}>{entry.amount}</p>
                <p className="text-xs text-[#6B7280]">{entry.date}</p>
              </div>
            </div>
            {entry.isNew && (
              <span className="text-xs font-semibold text-[#2E8B57] bg-[#90EE90] px-2 py-1 rounded-full">New</span>
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
      transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
      className="rounded-xl shadow-sm p-6 sm:p-8 bg-[#F5F5F5] border border-[#90EE90]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-[#2E8B57]">Event News</h2>
        <p className="text-xs text-[#6B7280]">Last updated 29 May 2025, 02:20 WIB</p>
      </div>
      <div className="space-y-3">
        {eventNews.map((news, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#90EE90] shadow-sm transition-all duration-200"
            aria-label={`Berita: ${news.title}`}
          >
            <span className="text-sm font-medium text-[#6B7280]">{news.title}</span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                news.status === "Baru"
                  ? "text-[#2E8B57] bg-[#90EE90]"
                  : news.status === "Selesai"
                  ? "text-[#2E8B57] bg-[#90EE90]"
                  : "text-red-500 bg-red-100"
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
    <div className="min-h-screen bg-[#90EE90] p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
        className="bg-[#F5F5F5] rounded-xl shadow-sm p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#2E8B57]">Transportation Schedule</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-medium hover:text-[#FFD700] transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Back
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Jadwal: ${item.date} ${item.time}`}
            >
              <p className="text-sm font-semibold text-[#2E8B57]">{item.date} - {item.time}</p>
              <p className="text-sm text-[#6B7280]">Location: {item.location}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
        className="bg-[#F5F5F5] rounded-xl shadow-sm p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#2E8B57]">Report Waste</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-medium hover:text-[#FFD700] transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Back
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Laporan sampah: ${item.id}`}
            >
              <p className="text-sm font-semibold text-[#2E8B57]">ID: {item.id}</p>
              <p className="text-sm text-[#6B7280]">Location: {item.location}</p>
              <p className="text-sm text-[#6B7280]">Status: {item.status}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
        className="bg-[#F5F5F5] rounded-xl shadow-sm p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#2E8B57]">Sort Waste</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-medium hover:text-[#FFD700] transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Back
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Pilah sampah: ${item.type}`}
            >
              <p className="text-sm font-semibold text-[#2E8B57]">{item.type}</p>
              <p className="text-sm text-[#6B7280]">Weight: {item.weight}</p>
              <p className="text-sm text-[#6B7280]">Date: {item.date}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
        className="bg-[#F5F5F5] rounded-xl shadow-sm p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#2E8B57]">Transportation</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-medium hover:text-[#FFD700] transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Back
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Pengangkutan: ${item.id}`}
            >
              <p className="text-sm font-semibold text-[#2E8B57]">ID: {item.id}</p>
              <p className="text-sm text-[#6B7280]">Date: {item.date}</p>
              <p className="text-sm text-[#6B7280]">Status: {item.status}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
        className="bg-[#F5F5F5] rounded-xl shadow-sm p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#2E8B57]">Pay Bills</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-medium hover:text-[#FFD700] transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Back
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Tagihan: ${item.billId}`}
            >
              <p className="text-sm font-semibold text-[#2E8B57]">Bill ID: {item.billId}</p>
              <p className="text-sm text-[#6B7280]">Amount: {item.amount}</p>
              <p className="text-sm text-[#6B7280]">Due Date: {item.dueDate}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
        className="bg-[#F5F5F5] rounded-xl shadow-sm p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#2E8B57]">Waste Statistics</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-medium hover:text-[#FFD700] transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Back
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Statistik: ${item.month}`}
            >
              <p className="text-sm font-semibold text-[#2E8B57]">{item.month}</p>
              <p className="text-sm text-[#6B7280]">Organic: {item.organik}</p>
              <p className="text-sm text-[#6B7280]">Inorganic: {item.anorganik}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
        className="bg-[#F5F5F5] rounded-xl shadow-sm p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#2E8B57]">Waste Education</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-medium hover:text-[#FFD700] transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Back
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Edukasi: ${item.title}`}
            >
              <p className="text-sm font-semibold text-[#2E8B57]">{item.title}</p>
              <p className="text-sm text-[#6B7280]">{item.content}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
        className="bg-[#F5F5F5] rounded-xl shadow-sm p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#2E8B57]">Notifications</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-medium hover:text-[#FFD700] transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Back
          </motion.button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Notifikasi: ${item.message}`}
            >
              <p className="text-sm text-[#6B7280]">{item.message}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
        className="bg-[#F5F5F5] rounded-xl shadow-sm p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#2E8B57]">Settings</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-medium hover:text-[#FFD700] transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Back
          </motion.button>
        </div>
        <p className="text-sm text-[#6B7280]">This is the settings page. (Placeholder)</p>
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
      <div className="min-h-screen bg-[#90EE90] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-[#2E8B57] text-3xl sm:text-4xl"
          aria-label="Memuat"
        >
          <FaRecycle />
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#90EE90] flex items-center justify-center text-center p-4 sm:p-6 text-[#6B7280]" style={{ fontFamily: 'Inter, sans-serif' }}>
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
          transition={{ duration: 0.4, type: "spring", stiffness: 80 }}
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
                  <div className="min-h-screen bg-[#90EE90] flex items-center justify-center text-center p-4 sm:p-6 text-[#6B7280]" style={{ fontFamily: 'Inter, sans-serif' }}>
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
      className="min-h-screen bg-[#90EE90] overflow-y-auto p-6 sm:p-8"
      style={{
        fontFamily: 'Inter, sans-serif',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232E8B57' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <TransferHistory transferHistory={data.transferHistory} />
        <EventNews eventNews={data.eventNews} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-8 text-center text-sm text-[#6B7280]"
      >
        <p>© 2025 MyBank Indonesia. All rights reserved.</p>
      </motion.div>
    </div>
  );
}

export default MainDashboard;