import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRecycle } from 'react-icons/fa';
import homeData from '../data/homeData';
import Header from '../components/Header.jsx';
import BalanceCard from '../components/BalanceCard.jsx';
import QuickActions from '../components/QuickActions.jsx';
import Notifications from '../components/Notifications.jsx';
import TransferHistory from '../components/TransferHistory.jsx';
import EventNews from '../components/EventNews.jsx';
import JadwalPengangkutanDashboard from '../components/dashboards/JadwalPengangkutanDashboard.jsx';
import LaporSampahDashboard from '../components/dashboards/LaporSampahDashboard.jsx';
import PilahSampahDashboard from '../components/dashboards/PilahSampahDashboard.jsx';
import PengangkutanDashboard from '../components/dashboards/PengangkutanDashboard.jsx';
import BayarTagihanDashboard from '../components/dashboards/BayarTagihanDashboard.jsx';
import StatistikSampahDashboard from '../components/dashboards/StatistikSampahDashboard.jsx';
import EdukasiSampahDashboard from '../components/dashboards/EdukasiSampahDashboard.jsx';
import NotificationsDashboard from '../components/dashboards/NotificationsDashboard.jsx';
import SettingsDashboard from '../components/dashboards/SettingsDashboard.jsx';

function Dashboard() {
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: 'infinity', ease: 'linear' }}
          className="text-emerald-600 text-2xl"
          aria-label="Memuat"
        >
          <FaRecycle />
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center p-4 text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>Data tidak tersedia</div>;
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
        return <div className="text-center p-4 text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>Dashboard tidak ditemukan</div>;
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 overflow-y-auto p-4 relative"
      style={{
        fontFamily: 'Poppins, sans-serif',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314B8A6' fill-opacity='0.1'%3E%3Cpath d='M36 34c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4zm10 0c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4zm-20 0c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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