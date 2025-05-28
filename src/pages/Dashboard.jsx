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
      className="sticky top-0 z-20 flex justify-between items-center mb-8 bg-transparent backdrop-blur-md p-4 sm:p-6 rounded-full border border-[#90EE90] shadow-sm"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <h1 className="text-lg sm:text-xl font-bold text-[#2E8B57] tracking-tight">{`Selamat Siang, ${userName}`}</h1>
      <div className="flex space-x-2 sm:space-x-3 relative">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          className="cursor-pointer p-2 rounded-full bg-[#F5F5F5] hover:bg-[#90EE90] transition-colors duration-200"
          aria-label="Notifikasi"
        >
          <FaBell className="text-base sm:text-lg text-[#2E8B57]" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleNotificationClick("Settings")}
          className="cursor-pointer p-2 rounded-full bg-[#F5F5F5] hover:bg-[#90EE90] transition-colors duration-200"
          aria-label="Pengaturan"
        >
          <FaCog className="text-base sm:text-lg text-[#2E8B57]" />
        </motion.div>
        <AnimatePresence>
          {isNotifOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-12 right-0 w-60 sm:w-72 bg-[#F5F5F5] rounded-lg shadow-lg border border-[#90EE90] p-4 max-h-72 overflow-y-auto z-30"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-[#2E8B57]">Notifikasi</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsNotifOpen(false)}
                  className="text-[#6B7280] hover:text-[#2E8B57]"
                  aria-label="Tutup notifikasi"
                >
                  <FaTimes className="text-xs" />
                </motion.button>
              </div>
              <div className="space-y-1">
                {notifications.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "#90EE90" }}
                    onClick={() => handleNotificationClick(entry.dashboard)}
                    className="flex items-center justify-between p-2 rounded-md cursor-pointer border-b border-[#90EE90]"
                    aria-label={`Lihat notifikasi: ${entry.message}`}
                  >
                    <div className="flex items-center">
                      <FaBell className="text-[#2E8B57] mr-2 text-xs" />
                      <p className="text-sm text-[#000000]">{entry.message}</p>
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="text-xs font-bold text-[#2E8B57]"
                    >
                      Lihat
                    </motion.span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-[#6B7280] mt-2 text-center">Terakhir diperbarui 29 Mei 2025, 02:25 WIB</p>
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
      whileHover={{ translateY: -2, boxShadow: "0 12px 24px rgba(46,139,87,0.2)", borderColor: "#FFD700" }}
      className="relative bg-[#2E8B57] rounded-2xl shadow-lg p-6 sm:p-8 mb-12 text-white border-2 border-transparent overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.2'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")` }} />
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Saldo Rekening</h2>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            className="text-[#FFD700] text-sm font-bold hover:text-[#FFD700]/80 transition-colors"
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
            className="cursor-pointer p-2 rounded-full bg-[#F5F5F5] hover:bg-[#90EE90] transition-colors"
            aria-label={showBalance ? "Sembunyikan saldo" : "Tampilkan saldo"}
          >
            {showBalance ? <FaEyeSlash className="text-base sm:text-lg text-[#2E8B57]" /> : <FaEye className="text-base sm:text-lg text-[#2E8B57]" />}
          </motion.div>
        </div>
        <p className="text-[#000000] text-sm font-bold tracking-tight">{accountNumber}</p>
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
      className="mb-12 overflow-x-auto flex space-x-4 p-4 bg-transparent"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {quickActions.map((action, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1, type: "spring" }}
          whileHover={{ scale: 1.1, translateY: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleActionClick(action.dashboard)}
          className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#F5F5F5] border border-[#90EE90] cursor-pointer transition-all duration-200 hover:bg-[#90EE90]"
          aria-label={action.name}
        >
          <div className="text-xl text-[#2E8B57]">
            {iconMap[action.icon]}
          </div>
          <span className="text-xs font-normal text-[#000000] mt-1 text-center">{action.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Transfer History Component
function TransferHistory({ transferHistory }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, rotate: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="rounded-2xl shadow-lg p-6 sm:p-8 mb-8 bg-[#F5F5F5] border border-[#90EE90] transform"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#2E8B57]">Histori Transfer</h2>
        <p className="text-xs text-[#6B7280]">Terakhir diperbarui 29 Mei 2025, 02:25 WIB</p>
      </div>
      <div className="space-y-3">
        {transferHistory.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ translateY: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#90EE90] transition-all duration-200"
            aria-label={`Transfer ${entry.type === "out" ? "keluar" : "masuk"}: ${entry.amount}`}
          >
            <div className="flex items-center">
              {entry.type === "out" ? (
                <FaArrowUp className="text-red-500 mr-3 text-base sm:text-lg" />
              ) : (
                <FaArrowDown className="text-[#2E8B57] mr-3 text-base sm:text-lg" />
              )}
              <div>
                <p className="text-sm font-normal text-[#000000]">
                  {entry.type === "out" ? `Transfer ke ${entry.to}` : `Diterima dari ${entry.from}`}
                </p>
                <p className={`text-sm font-bold ${entry.type === "out" ? "text-red-500" : "text-[#2E8B57]"}`}>{entry.amount}</p>
                <p className="text-xs text-[#6B7280]">{entry.date}</p>
              </div>
            </div>
            {entry.isNew && (
              <span className="text-xs font-bold text-[#2E8B57] bg-[#90EE90] px-2 py-1 rounded-full">Baru</span>
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
      animate={{ opacity: 1, y: 0, rotate: -1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="rounded-2xl shadow-lg p-6 sm:p-8 bg-[#F5F5F5] border border-[#90EE90] transform"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#2E8B57]">Berita Acara</h2>
        <p className="text-xs text-[#6B7280]">Terakhir diperbarui 29 Mei 2025, 02:25 WIB</p>
      </div>
      <div className="space-y-3">
        {eventNews.map((news, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ translateY: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#90EE90] transition-all duration-200"
            aria-label={`Berita: ${news.title}`}
          >
            <span className="text-sm font-normal text-[#000000]">{news.title}</span>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${
                news.status === "Baru"
                  ? "text-[#2E8B57] bg-[#90EE90]"
                  : news.status === "Selesai"
                  ? "text-[#6B7280] bg-[#F5F5F5]"
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
    <div className="min-h-screen bg-[#90EE90] p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-[#F5F5F5] rounded-2xl shadow-lg p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#2E8B57]">Jadwal Pengangkutan</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-bold hover:text-[#FFD700] transition-colors"
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
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Jadwal: ${item.date} ${item.time}`}
            >
              <p className="text-sm font-bold text-[#2E8B57]">{item.date} - {item.time}</p>
              <p className="text-sm text-[#000000]">Lokasi: {item.location}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-[#F5F5F5] rounded-2xl shadow-lg p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#2E8B57]">Lapor Sampah</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-bold hover:text-[#FFD700] transition-colors"
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
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Laporan sampah: ${item.id}`}
            >
              <p className="text-sm font-bold text-[#2E8B57]">ID: {item.id}</p>
              <p className="text-sm text-[#000000]">Lokasi: {item.location}</p>
              <p className="text-sm text-[#000000]">Status: {item.status}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-[#F5F5F5] rounded-2xl shadow-lg p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#2E8B57]">Pilah Sampah</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-bold hover:text-[#FFD700] transition-colors"
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
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Pilah sampah: ${item.type}`}
            >
              <p className="text-sm font-bold text-[#2E8B57]">{item.type}</p>
              <p className="text-sm text-[#000000]">Berat: {item.weight}</p>
              <p className="text-sm text-[#000000]">Tanggal: {item.date}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-[#F5F5F5] rounded-2xl shadow-lg p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#2E8B57]">Pengangkutan</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-bold hover:text-[#FFD700] transition-colors"
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
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Pengangkutan: ${item.id}`}
            >
              <p className="text-sm font-bold text-[#2E8B57]">ID: {item.id}</p>
              <p className="text-sm text-[#000000]">Tanggal: {item.date}</p>
              <p className="text-sm text-[#000000]">Status: {item.status}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-[#F5F5F5] rounded-2xl shadow-lg p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#2E8B57]">Bayar Tagihan</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-bold hover:text-[#FFD700] transition-colors"
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
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Tagihan: ${item.billId}`}
            >
              <p className="text-sm font-bold text-[#2E8B57]">ID Tagihan: {item.billId}</p>
              <p className="text-sm text-[#000000]">Jumlah: {item.amount}</p>
              <p className="text-sm text-[#000000]">Jatuh Tempo: {item.dueDate}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-[#F5F5F5] rounded-2xl shadow-lg p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#2E8B57]">Statistik Sampah</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-bold hover:text-[#FFD700] transition-colors"
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
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Statistik: ${item.month}`}
            >
              <p className="text-sm font-bold text-[#2E8B57]">{item.month}</p>
              <p className="text-sm text-[#000000]">Organik: {item.organik}</p>
              <p className="text-sm text-[#000000]">Anorganik: {item.anorganik}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-[#F5F5F5] rounded-2xl shadow-lg p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#2E8B57]">Edukasi Sampah</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-bold hover:text-[#FFD700] transition-colors"
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
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Edukasi: ${item.title}`}
            >
              <p className="text-sm font-bold text-[#2E8B57]">{item.title}</p>
              <p className="text-sm text-[#000000]">{item.content}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-[#F5F5F5] rounded-2xl shadow-lg p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#2E8B57]">Notifikasi</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-bold hover:text-[#FFD700] transition-colors"
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
              className="border-b border-[#90EE90] pb-3"
              aria-label={`Notifikasi: ${item.message}`}
            >
              <p className="text-sm text-[#000000]">{item.message}</p>
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
    <div className="min-h-screen bg-[#90EE90] p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-[#F5F5F5] rounded-2xl shadow-lg p-6 sm:p-8 border border-[#90EE90]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#2E8B57]">Pengaturan</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="text-[#2E8B57] text-sm font-bold hover:text-[#FFD700] transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </motion.button>
        </div>
        <p className="text-sm text-[#000000]">Ini adalah halaman pengaturan. (Placeholder)</p>
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
          transition={{ duration: 1, repeat: 'Infinity', ease: "linear" }}
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
      <div className="min-h-screen bg-[#90EE90] flex items-center justify-center text-center p-6 sm:p-8 text-[#000000]" style={{ fontFamily: 'Inter, sans-serif' }}>
        Data tidak tersedia
      </div>
    );
  }

  if (currentDashboard !== "Main") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDashboard}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
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
                  <div className="min-h-screen bg-[#90EE90] flex items-center justify-center text-center p-6 sm:p-8 text-[#000000]" style={{ fontFamily: 'Inter, sans-serif' }}>
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
      className="min-h-screen bg-[#90EE90] overflow-y-auto p-8 sm:p-12"
      style={{
        fontFamily: 'Inter, sans-serif',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'15\' height=\'15\' viewBox=\'0 0 15 15\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%232E8B57\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M7.5 2a1 1 0 0 0-1 1v2.5H4 a1 1 0 0 0 0 2h2.5V10a1 1 0 0 0 2 0V7.5H11a1 1 0 0 0 0-2H8.5V3a1 1 0 0 0-1-1z\'/%3E%3C/g%3E%3C/svg%3E")'
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
        transition={{ duration: 0.6 }}
        className="mt-8 text-center text-sm text-[#000000]"
      >
        <p>© 2025 MyBank Indonesia. Seluruh hak cipta dilindungi.</p>
      </motion.div>
    </div>
  );
}

export default MainDashboard;