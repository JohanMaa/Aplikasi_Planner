import { motion } from 'framer-motion';

function PengangkutanDashboard({ data, onBack }) {
  const handleBackClick = () => {
    console.log("Navigating back to Main");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/95 rounded-2xl shadow-xl p-6 backdrop-blur-md border border-emerald-100/50"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Pengangkutan</h2>
          <button
            onClick={handleBackClick}
            className="text-emerald-600 text-sm font-medium hover:text-emerald-800 transition-colors"
            aria-label="Kembali ke dashboard utama"
          >
            Kembali
          </button>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-emerald-100 pb-2"
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

export default PengangkutanDashboard;