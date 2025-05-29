import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaCalendarAlt, FaExclamationTriangle, FaRecycle, FaTruck, FaMoneyBillWave, FaChartPie, FaLeaf, FaBell, FaCog, FaArrowUp, FaArrowDown, FaTimes } from 'react-icons/fa';
import { homeData } from '../data/data'; // Adjust path based on your project structure
import Profile from './Profile'; // Adjust path based on your project structure

// Map icon names to actual icons for dynamic rendering
const iconMap = {
  FaCalendarAlt: <FaCalendarAlt className="text-teal-600" />,
  FaExclamationTriangle: <FaExclamationTriangle className="text-teal-600" />,
  FaRecycle: <FaRecycle className="text-teal-600" />,
  FaTruck: <FaTruck className="text-teal-600" />,
  FaMoneyBillWave: <FaMoneyBillWave className="text-teal-600" />,
  FaChartPie: <FaChartPie className="text-teal-600" />,
  FaLeaf: <FaLeaf className="text-teal-600" />,
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
      transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
      className="sticky top-0 z-20 flex justify-between items-center mb-6 bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-xl border border-teal-100/50"
    >
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">{`Selamat Siang, ${userName}`}</h1>
      <div className="flex space-x-4 relative">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          className="cursor-pointer p-3 rounded-full bg-teal-100 hover:bg-teal-200 transition-colors duration-200"
          aria-label="Notifikasi"
        >
          <FaBell className="text-xl text-teal-600" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleNotificationClick('Profile')}
          className="cursor-pointer p-3 rounded-full bg-teal-100 hover:bg-teal-200 transition-colors duration-200"
          aria-label="Profil"
        >
          <FaCog className="text-xl text-teal-600" />
        </motion.div>
        <AnimatePresence>
          {isNotifOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-14 right-0 w-80 bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-teal-100/50 p-4 max-h-80 overflow-y-auto z-30"
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
                    whileHover={{ backgroundColor: 'rgba(20, 184, 166, 0.1)' }}
                    onClick={() => handleNotificationClick(entry.dashboard)}
                    className="flex items-center justify-between p-3 rounded-lg cursor-pointer border-b border-teal-100/50"
                    aria-label={`Lihat notifikasi: ${entry.message}`}
                  >
                    <div className="flex items-center">
                      <FaBell className="text-teal-600 mr-3 text-sm" />
                      <p className="text-sm text-gray-600">{entry.message}</p>
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="text-xs font-medium text-teal-600"
                    >
                      Lihat
                    </motion.span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">Terakhir diperbarui 28 Mei 2025, 18:58 WIB</p>
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
      transition={{ duration: 0.6, type: 'spring', stiffness: 140 }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
      className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 text-white border border-teal-100/50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Saldo Rekening</h2>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <p className="text-3xl sm:text-4xl font-semibold tracking-wide">{showBalance ? balance : 'Rp ********'}</p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleBalance}
          className="cursor-pointer p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          aria-label={showBalance ? 'Sembunyikan saldo' : 'Tampilkan saldo'}
        >
          {showBalance ? <FaEyeSlash className="text-xl text-white" /> : <FaEye className="text-xl text-white" />}
        </motion.div>
      </div>
      <p className="text-sm text-teal-100 tracking-wide">{accountNumber}</p>
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
      transition={{ duration: 0.6, type: 'spring', stiffness: 140 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-teal-100/50"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleActionClick(action.dashboard)}
            className="flex flex-col items-center p-4 rounded-xl cursor-pointer bg-white/50 border border-teal-100/50 hover:bg-teal-50 transition-all duration-200"
            aria-label={action.name}
          >
            <div className="text-3xl mb-2">{iconMap[action.icon]}</div>
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
      transition={{ duration: 0.6, type: 'spring', stiffness: 140 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-teal-100/50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Histori Transfer</h2>
        <p className="text-xs text-gray-500">Terakhir diperbarui 28 Mei 2025, 18:58 WIB</p>
      </div>
      <div className="space-y-3">
        {transferHistory.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(20, 184, 166, 0.1)' }}
            className={`flex items-center justify-between p-4 rounded-lg border border-teal-100/50 ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white/50'} transition-all duration-200`}
            aria-label={`Transfer ${entry.type === 'out' ? 'keluar' : 'masuk'}: ${entry.amount}`}
          >
            <div className="flex items-center">
              {entry.type === 'out' ? (
                <FaArrowUp className="text-red-500 mr-3 text-lg" />
              ) : (
                <FaArrowDown className="text-teal-600 mr-3 text-lg" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {entry.type === 'out' ? `Transfer ke ${entry.to}` : `Diterima dari ${entry.from}`}
                </p>
                <p className={`text-sm font-semibold ${entry.type === 'out' ? 'text-red-500' : 'text-teal-600'}`}>{entry.amount}</p>
                <p className="text-xs text-gray-500">{entry.date}</p>
              </div>
            </div>
            {entry.isNew && (
              <span className="text-xs font-semibold text-teal-600 bg-teal-100 px-2 py-1 rounded-full">Baru</span>
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
      transition={{ duration: 0.6, type: 'spring', stiffness: 140 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-teal-100/50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Berita Acara</h2>
        <p className="text-xs text-gray-500">Terakhir diperbarui 28 Mei 2025, 18:58 WIB</p>
      </div>
      <div className="space-y-3">
        {eventNews.map((news, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(20, 184, 166, 0.1)' }}
            className={`flex items-center justify-between p-4 rounded-lg border border-teal-100/50 ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white/50'} transition-all duration-200`}
            aria-label={`Berita: ${news.title}`}
          >
            <span className="text-sm font-medium text-gray-700">{news.title}</span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                news.status === 'Baru'
                  ? 'text-teal-600 bg-teal-100'
                  : news.status === 'Selesai'
                  ? 'text-teal-700 bg-teal-200'
                  : 'text-red-600 bg-red-100'
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

// Generic Sub-Dashboard Component
function SubDashboard({ title, data, onBack, renderItem }) {
  const handleBackClick = () => {
    console.log('Navigating back to Main');
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 140 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 border border-teal-100/50"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackClick}
            className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </motion.button>
        </div>
        <div className="space-y-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-lg border border-teal-100/50 ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white/50'} transition-all duration-200`}
              aria-label={`${title}: ${item.id || item.date || item.title || item.month}`}
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Sub-Dashboard Components
const JadwalPengangkutanDashboard = ({ data, onBack }) => (
  <SubDashboard
    title="Jadwal Pengangkutan"
    data={data}
    onBack={onBack}
    renderItem={(item) => (
      <>
        <p className="text-sm font-semibold text-gray-800">{item.date} - {item.time}</p>
        <p className="text-sm text-gray-600">Lokasi: {item.location}</p>
      </>
    )}
  />
);

const LaporSampahDashboard = ({ data, onBack }) => (
  <SubDashboard
    title="Lapor Sampah"
    data={data}
    onBack={onBack}
    renderItem={(item) => (
      <>
        <p className="text-sm font-semibold text-gray-800">ID: {item.id}</p>
        <p className="text-sm text-gray-600">Lokasi: {item.location}</p>
        <p className="text-sm text-gray-600">Status: {item.status}</p>
      </>
    )}
  />
);

const PilahSampahDashboard = ({ data, onBack }) => (
  <SubDashboard
    title="Pilah Sampah"
    data={data}
    onBack={onBack}
    renderItem={(item) => (
      <>
        <p className="text-sm font-semibold text-gray-800">{item.type}</p>
        <p className="text-sm text-gray-600">Berat: {item.weight}</p>
        <p className="text-sm text-gray-600">Tanggal: {item.date}</p>
      </>
    )}
  />
);

const PengangkutanDashboard = ({ data, onBack }) => (
  <SubDashboard
    title="Pengangkutan"
    data={data}
    onBack={onBack}
    renderItem={(item) => (
      <>
        <p className="text-sm font-semibold text-gray-800">ID: {item.id}</p>
        <p className="text-sm text-gray-600">Tanggal: {item.date}</p>
        <p className="text-sm text-gray-600">Status: {item.status}</p>
      </>
    )}
  />
);

const BayarTagihanDashboard = ({ data, onBack }) => (
  <SubDashboard
    title="Bayar Tagihan"
    data={data}
    onBack={onBack}
    renderItem={(item) => (
      <>
        <p className="text-sm font-semibold text-gray-800">ID Tagihan: {item.billId}</p>
        <p className="text-sm text-gray-600">Jumlah: {item.amount}</p>
        <p className="text-sm text-gray-600">Jatuh Tempo: {item.dueDate}</p>
      </>
    )}
  />
);

const StatistikSampahDashboard = ({ data, onBack }) => (
  <SubDashboard
    title="Statistik Sampah"
    data={data}
    onBack={onBack}
    renderItem={(item) => (
      <>
        <p className="text-sm font-semibold text-gray-800">{item.month}</p>
        <p className="text-sm text-gray-600">Organik: {item.organik}</p>
        <p className="text-sm text-gray-600">Anorganik: {item.anorganik}</p>
      </>
    )}
  />
);

const EdukasiSampahDashboard = ({ data, onBack }) => (
  <SubDashboard
    title="Edukasi Sampah"
    data={data}
    onBack={onBack}
    renderItem={(item) => (
      <>
        <p className="text-sm font-semibold text-gray-800">{item.title}</p>
        <p className="text-sm text-gray-600">{item.content}</p>
      </>
    )}
  />
);

const NotificationsDashboard = ({ data, onBack }) => (
  <SubDashboard
    title="Notifikasi"
    data={data}
    onBack={onBack}
    renderItem={(item) => (
      <p className="text-sm text-gray-600">{item.message}</p>
    )}
  />
);

const SettingsDashboard = ({ onBack }) => (
  <SubDashboard
    title="Pengaturan"
    data={[{ message: 'Ini adalah halaman pengaturan. (Placeholder)' }]}
    onBack={onBack}
    renderItem={(item) => (
      <p className="text-sm text-gray-600">{item.message}</p>
    )}
  />
);

// Main Dashboard Component
function MainDashboard() {
  const [data, setData] = useState(null);
  const [currentDashboard, setCurrentDashboard] = useState('Main');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(homeData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-teal-600 text-4xl"
          aria-label="Memuat"
        >
          <FaRecycle />
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center text-center p-4 sm:p-6 text-gray-600">
        Data tidak tersedia
      </div>
    );
  }

  if (currentDashboard !== 'Main') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDashboard}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 140 }}
        >
          {(() => {
            switch (currentDashboard) {
              case 'JadwalPengangkutan':
                return <JadwalPengangkutanDashboard data={data.quickActionData.JadwalPengangkutan} onBack={() => setCurrentDashboard('Main')} />;
              case 'LaporSampah':
                return <LaporSampahDashboard data={data.quickActionData.LaporSampah} onBack={() => setCurrentDashboard('Main')} />;
              case 'PilahSampah':
                return <PilahSampahDashboard data={data.quickActionData.PilahSampah} onBack={() => setCurrentDashboard('Main')} />;
              case 'Pengangkutan':
                return <PengangkutanDashboard data={data.quickActionData.Pengangkutan} onBack={() => setCurrentDashboard('Main')} />;
              case 'BayarTagihan':
                return <BayarTagihanDashboard data={data.quickActionData.BayarTagihan} onBack={() => setCurrentDashboard('Main')} />;
              case 'StatistikSampah':
                return <StatistikSampahDashboard data={data.quickActionData.StatistikSampah} onBack={() => setCurrentDashboard('Main')} />;
              case 'EdukasiSampah':
                return <EdukasiSampahDashboard data={data.quickActionData.EdukasiSampah} onBack={() => setCurrentDashboard('Main')} />;
              case 'Notifications':
                return <NotificationsDashboard data={data.notifications} onBack={() => setCurrentDashboard('Main')} />;
              case 'Settings':
                return <SettingsDashboard onBack={() => setCurrentDashboard('Main')} />;
              case 'Profile':
                return <Profile setCurrentDashboard={setCurrentDashboard} />;
              default:
                return (
                  <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center text-center p-4 sm:p-6 text-gray-600">
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 sm:p-6">
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
        transition={{ delay: 0.7 }}
        className="mt-12 text-center text-sm text-gray-500"
      >
        <p>© 2025 MyBank Indonesia. Seluruh hak cipta dilindungi.</p>
      </motion.div>
    </div>
  );
}

export default MainDashboard;