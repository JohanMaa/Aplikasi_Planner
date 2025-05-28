import { motion } from 'framer-motion';

function EventNews({ eventNews }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl shadow-xl p-6 bg-white/90 backdrop-blur-md border border-emerald-100/50"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Berita Acara</h2>
        <p className="text-xs text-gray-500">Terakhir diperbarui 28 Mei 2025, 18:58 WIB</p>
      </div>
      <div className="space-y-3">
        {eventNews.map((news, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
            className="flex items-center justify-between bg-white/95 p-4 rounded-lg border border-emerald-100 shadow-sm transition-all duration-300 backdrop-blur-sm"
            aria-label={`Berita: ${news.title}`}
          >
            <span className="text-sm font-medium text-gray-700">{news.title}</span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                news.status === "Baru"
                  ? "text-emerald-600 bg-emerald-100"
                  : news.status === "Selesai"
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

export default EventNews;