import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaCalendarAlt, FaExclamationTriangle, FaRecycle, FaTruck, FaMoneyBillWave, FaChartPie, FaBell, FaCog, FaArrowUp, FaArrowDown, FaLeaf } from 'react-icons/fa';

// Dynamically import Poppins font
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Icon mapping for dynamic rendering
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

// Sample data
const homeData = {
  userName: "LUDANG",
  accountNumber: "1111-2222-3333-44",
  balance: "Rp 10,000,000",
  transferHistory: [
    { type: "out", to: "Budi", amount: "Rp 500,000", date: "28 Mei 2025, 17:45 WIB", isNew: true },
    { type: "out", to: "Ani", amount: "Rp 300,000", date: "27 Mei 2025, 15:15 WIB", isNew: false },
    { type: "in", from: "Joko", amount: "Rp 1,000,000", date: "28 Mei 2025, 16:00 WIB", isNew: true },
    { type: "in", from: "Rina", amount: "Rp 750,000", date: "27 Mei 2025, 12:30 WIB", isNew: false }
  ],
  eventNews: [
    { title: "Pembaruan Kebijakan", status: "Baru" },
    { title: "Promo Baru: Diskon 20%", status: "Baru" },
    { title: "Pembaruan Aplikasi v2.0", status: "Done" },
    { title: "Pemeliharaan Sistem", status: "Done" },
    { title: "Dibatalkan: Event Offline", status: "Cancelled" }
  ],
  quickActions: [
    { name: "Jadwal Pengangkutan", icon: "FaCalendarAlt", color: "from-emerald-500 to-teal-600", dashboard: "JadwalPengangkutan" },
    { name: "Lapor Sampah", icon: "FaExclamationTriangle", color: "from-lime-500 to-green-600", dashboard: "LaporSampah" },
    { name: "Pilah Sampah", icon: "FaRecycle", color: "from-green-500 to-emerald-600", dashboard: "PilahSampah" },
    { name: "Pengangkutan", icon: "FaTruck", color: "from-teal-500 to-green-600", dashboard: "Pengangkutan" },
    { name: "Bayar Tagihan", icon: "FaMoneyBillWave", color: "from-emerald-500 to-lime-600", dashboard: "BayarTagihan" },
    { name: "Statistik Sampah", icon: "FaChartPie", color: "from-green-500 to-teal-600", dashboard: "StatistikSampah" },
    { name: "Edukasi Sampah", icon: "FaLeaf", color: "from-teal-500 to-emerald-600", dashboard: "EdukasiSampah" }
  ],
  quickActionData: {
    JadwalPengangkutan: [
      { date: "29 Mei 2025", time: "23:00 WIB", location: "Jl. Merdeka No. 10" },
      { date: "30 Mei 2025", time: "9:45 WIB", location: "Jl. Sudirman No. 5" }
    ],
    LaporSampah: [
      { id: "001", location: "J. Gl. Gatot Subroto", status: "Menunggu Konfirmasi" },
      { id: "002", location: "J. Thamrin", status: "Selesai" }
    ],
    PilahSampah: [
      { type: "Organik", weight: "5 kg", date: "28 Mei 2025" },
      { type: "Anorganik", weight: "3 kg", date: "27 Mei 2025" }
    ],
    Pengangkutan: [
      { id: "P001", date: "28 Mei 2025", status: "Selesai" },
      { id: "P002", date: "27 Mei 2025", status: "Dijadwalkan" }
    ],
    BayarTagihan: [
      { billId: "B001", amount: "Rp 50,000", dueDate: "31 Mei 2025" },
      { billId: "B002", amount: "Rp 75,000", dueDate: "30 Mei 2025" }
    ],
    StatistikSampah: [
      { month: "Mei 2025", organik: "20 kg", anorganik: "15 kg" },
      { month: "April 2025", organik: "18 kg", anorganik: "12 kg" }
    ],
    EdukasiSampah: [
      { title: "Cara Memilah Sampah", content: "Pelajari cara memisahkan sampah organik dan anorganik." },
      { title: "Daur Ulang 101", content: "Tips dasar untuk mendaur ulang plastik dan kertas." }
    ]
  },
  notifications: [
    { message: "Ada jadwal pengangkutan besok!", dashboard: "Notifications" },
    { message: "Pengaturan baru tersedia", dashboard: "Settings" }
  ]
};

// Header Component
function Header({ userName, notifications, setCurrentDashboard }) {
  const handleNotificationClick = (dashboard) => {
    console.log(`Navigating to ${dashboard}`);
    setCurrentDashboard(dashboard);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-10 flex justify-between items-center mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-3xl shadow-xl text-white"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <h1 className="text-3xl font-bold tracking-tight">{`Hai, ${userName}`}</h1>
      <div className="flex space-x-5">
        {notifications.map((notif, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleNotificationClick(notif.dashboard)}
            className="p-4 rounded-full bg-emerald-700/50 hover:bg-emerald-700/70 transition-colors"
            style={{ pointerEvents: 'auto' }}
            aria-label={index === 0 ? "Notifikasi" : "Pengaturan"}
          >
            {index === 0 ? <FaBell className="text-3xl" /> : <FaCog className="text-3xl" />}
          </motion.div>
        ))}
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
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-emerald-600 to-teal-500 rounded-3xl shadow-xl p-6 mb-8 text-white"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">Saldo Rekening</h2>
        <motion.a
          href="#"
          whileHover={{ scale: 1.2 }}
          className="text-teal-200 text-base font-medium"
          aria-label="Atur saldo"
        >
          Atur
        </motion.a>
      </div>
      <div className="flex items-center space-x-4 mb-5">
        <p className="text-3xl font-bold">{showBalance ? balance : 'Rp ********'}</p>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleBalance}
          className="p-4 rounded-full bg-emerald-800/50 hover:bg-emerald-800/70"
          style={{ pointerEvents: 'auto' }}
          aria-label={showBalance ? "Sembunyikan saldo" : "Tampilkan saldo"}
        >
          {showBalance ? <FaEyeSlash className="text-3xl" /> : <FaEye className="text-3xl" />}
        </motion.div>
      </div>
      <p className="text-base text-teal-200">{accountNumber}</p>
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
      transition={{ duration: 0.3 }}
      className="rounded-3xl shadow-xl p-6 mb-8 bg-white/95 border border-emerald-100/30"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-5">Aksi Cepat</h2>
      <div className="grid grid-cols-2 gap-5">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleActionClick(action.dashboard)}
            className={`flex flex-col items-center p-5 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-lg`}
            style={{ pointerEvents: 'auto' }}
            aria-label={action.name}
          >
            <div className="p-4 rounded-full bg-white/20 text-4xl">
              {iconMap[action.icon]}
            </div>
            <span className="text-base font-medium text-center mt-4">{action.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Notifications Component
function Notifications({ notifications, setCurrentDashboard }) {
  const handleNotificationClick = (dashboard) => {
    console.log(`Navigating to ${dashboard}`);
    setCurrentDashboard(dashboard);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl shadow-xl p-6 mb-8 bg-white/95 border border-emerald-100/30"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800">Notifikasi</h2>
        <p className="text-base text-gray-500">28 Mei 2025, 18:58 WIB</p>
      </div>
      <div className="space-y-4">
        {notifications.map((entry, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleNotificationClick(entry.dashboard)}
            className="flex items-center justify-between bg-white p-5 rounded-lg border border-emerald-100 shadow-md"
            style={{ pointerEvents: 'auto' }}
            aria-label={`Lihat notifikasi: ${entry.message}`}
          >
            <div className="flex items-center">
              <FaBell className="text-emerald-500 mr-4 text-2xl" />
              <p className="text-base font-medium text-gray-700">{entry.message}</p>
            </div>
            <span className="text-base font-semibold text-emerald-600">Lihat</span>
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
      transition={{ duration: 0.3 }}
      className="rounded-3xl shadow-xl p-6 mb-8 bg-white/95 border border-emerald-100/30"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800">Histori Transfer</h2>
        <p className="text-base text-gray-500">28 Mei 2025, 18:58 WIB</p>
      </div>
      <div className="space-y-4">
        {transferHistory.map((entry, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between bg-white p-5 rounded-lg border border-emerald-100 shadow-md"
            aria-label={`Transfer ${entry.type === "out" ? "keluar" : "masuk"}: ${entry.amount}`}
          >
            <div className="flex items-center">
              {entry.type === "out" ? (
                <FaArrowUp className="text-red-500 mr-4 text-2xl" />
              ) : (
                <FaArrowDown className="text-emerald-500 mr-4 text-2xl" />
              )}
              <div>
                <p className="text-base font-medium text-gray-700">
                  {entry.type === "out" ? `Ke ${entry.to}` : `Dari ${entry.from}`}
                </p>
                <p className={`text-base font-semibold ${entry.type === "out" ? "text-red-500" : "text-emerald-500"}`}>{entry.amount}</p>
                <p className="text-base text-gray-500">{entry.date}</p>
              </div>
            </div>
            {entry.isNew && (
              <span className="text-base font-semibold text-emerald-600 bg-emerald-100 px-4 py-2 rounded-full">Baru</span>
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
      transition={{ duration: 0.3 }}
      className="rounded-3xl shadow-xl p-6 bg-white/95 border border-emerald-100/30"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800">Berita Acara</h2>
        <p className="text-base text-gray-500">28 Mei 2025, 18:58 WIB</p>
      </div>
      <div className="space-y-4">
        {eventNews.map((news, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between bg-white p-5 rounded-lg border border-emerald-100 shadow-md"
            aria-label={`Berita: ${news.title}`}
          >
            <span className="text-base font-medium text-gray-700">{news.title}</span>
            <span
              className={`text-base font-semibold px-4 py-2 rounded-full ${
                news.status === "Baru"
                  ? "text-emerald-600 bg-emerald-100"
                  : news.status === "Done"
                  ? "text-teal-600 bg-teal-100"
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 rounded-3xl shadow-xl p-6"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Jadwal Pengangkutan</h2>
          <button
            onClick={() => onBack()}
            className="text-emerald-600 text-base font-medium hover:text-emerald-800"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </button>
        </div>
        <div className="space-y-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border-b border-emerald-100 pb-4"
              aria-label={`Jadwal: ${item.date} ${item.time}`}
            >
              <p className="text-base font-semibold text-gray-800">{item.date} - {item.time}</p>
              <p className="text-base text-gray-600">Lokasi: {item.location}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function LaporSampahDashboard({ data, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 rounded-3xl shadow-xl p-6"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Lapor Sampah</h2>
          <button
            onClick={() => onBack()}
            className="text-emerald-600 text-base font-medium hover:text-emerald-800"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </button>
        </div>
        <div className="space-y-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border-b border-emerald-100 pb-4"
              aria-label={`Laporan sampah: ${item.id}`}
            >
              <p className="text-base font-semibold text-gray-800">ID: {item.id}</p>
              <p className="text-base text-gray-600">Lokasi: {item.location}</p>
              <p className="text-base text-gray-600">Status: {item.status}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function PilahSampahDashboard({ data, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 rounded-3xl shadow-xl p-6"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Pilah Sampah</h2>
          <button
            onClick={() => onBack()}
            className="text-emerald-600 text-base font-medium hover:text-emerald-800"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </button>
        </div>
        <div className="space-y-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border-b border-emerald-100 pb-4"
              aria-label={`Pilah sampah: ${item.type}`}
            >
              <p className="text-base font-semibold text-gray-800">{item.type}</p>
              <p className="text-base text-gray-600">Berat: {item.weight}</p>
              <p className="text-base text-gray-600">Tanggal: {item.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function PengangkutanDashboard({ data, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 rounded-3xl shadow-xl p-6"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Pengangkutan</h2>
          <button
            onClick={() => onBack()}
            className="text-emerald-600 text-base font-medium hover:text-emerald-800"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </button>
        </div>
        <div className="space-y-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border-b border-emerald-100 pb-4"
              aria-label={`Pengangkutan: ${item.id}`}
            >
              <p className="text-base font-semibold text-gray-800">ID: {item.id}</p>
              <p className="text-base text-gray-600">Tanggal: {item.date}</p>
              <p className="text-base text-gray-600">Status: {item.status}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function BayarTagihanDashboard({ data, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 rounded-3xl shadow-xl p-6"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Bayar Tagihan</h2>
          <button
            onClick={() => onBack()}
            className="text-emerald-600 text-base font-medium hover:text-emerald-800"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </button>
        </div>
        <div className="space-y-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border-b border-emerald-100 pb-4"
              aria-label={`Tagihan: ${item.billId}`}
            >
              <p className="text-base font-semibold text-gray-800">ID Tagihan: {item.billId}</p>
              <p className="text-base text-gray-600">Jumlah: {item.amount}</p>
              <p className="text-base text-gray-600">Jatuh Tempo: {item.dueDate}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function StatistikSampahDashboard({ data, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 rounded-3xl shadow-xl p-6"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Statistik Sampah</h2>
          <button
            onClick={() => onBack()}
            className="text-emerald-600 text-base font-medium hover:text-emerald-800"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </button>
        </div>
        <div className="space-y-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border-b border-emerald-100 pb-4"
              aria-label={`Statistik: ${item.month}`}
            >
              <p className="text-base font-semibold text-gray-800">{item.month}</p>
              <p className="text-base text-gray-600">Organik: {item.organik}</p>
              <p className="text-base text-gray-600">Anorganik: {item.anorganik}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function EdukasiSampahDashboard({ data, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 rounded-3xl shadow-xl p-6"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Edukasi Sampah</h2>
          <button
            onClick={() => onBack()}
            className="text-emerald-600 text-base font-medium hover:text-emerald-800"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </button>
        </div>
        <div className="space-y-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border-b border-emerald-100 pb-4"
              aria-label={`Edukasi: ${item.title}`}
            >
              <p className="text-base font-semibold text-gray-800">{item.title}</p>
              <p className="text-base text-gray-600">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function NotificationsDashboard({ data, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 rounded-3xl shadow-xl p-6"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Notifikasi</h2>
          <button
            onClick={() => onBack()}
            className="text-emerald-600 text-base font-medium hover:text-emerald-800"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </button>
        </div>
        <div className="space-y-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border-b border-emerald-100 pb-4"
              aria-label={`Notifikasi: ${item.message}`}
            >
              <p className="text-base text-gray-600">{item.message}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function SettingsDashboard({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 rounded-3xl shadow-xl p-6"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Pengaturan</h2>
          <button
            onClick={() => onBack()}
            className="text-emerald-600 text-base font-medium hover:text-emerald-800"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </button>
        </div>
        <p className="text-base text-gray-600">Pengaturan akun Anda</p>
      </motion.div>
    </div>
  );
}

// Main Dashboard Component
function Dashboard() {
  const [data, setData] = useState(null);
  const [currentDashboard, setCurrentDashboard] = useState("Main");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(homeData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-emerald-600 text-3xl"
          aria-label="Memuat"
        >
          <FaRecycle />
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center p-8 text-gray-600 text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>Data tidak tersedia</div>;
  }

  if (currentDashboard !== "Main") {
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
      default:
        return <div className="text-center p-8 text-gray-600 text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>Dashboard tidak ditemukan</div>;
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-8"
      style={{ fontFamily: 'Poppins, sans-serif' }}
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
      <Notifications
        notifications={data.notifications}
        setCurrentDashboard={setCurrentDashboard}
      />
      <TransferHistory transferHistory={data.transferHistory} />
      <EventNews eventNews={data.eventNews} />
    </div>
  );
}

export default Dashboard;