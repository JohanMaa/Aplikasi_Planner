import { motion } from 'framer-motion';

function UserDetail() {
  return (
    <div className="min-h-screen bg-[#F3F6FB] flex flex-col items-center font-sans">
      {/* Header */}
      <motion.div
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
  className="w-full h-52 bg-gradient-to-br from-[#0D47A1] to-[#2196F3] flex items-start px-6 pt-6"
>
  <div>
    <h1 className="text-3xl font-bold text-white">Akun Saya</h1>
    <p className="text-sm text-blue-100 mt-1">Kelola data dan perangkat Anda</p>
  </div>
</motion.div>


      {/* Kartu Profil */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl -mt-16 px-6 py-8"
      >
        {/* Avatar & Nama */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-3xl font-bold shadow-inner">
            JM
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">Johan Maulana</h2>
        </div>

        {/* Data Section */}
        <div className="divide-y divide-gray-200 text-sm text-gray-700">

          {/* No HP */}
          <div className="flex justify-between items-center py-4">
            <span className="text-gray-500">Nomor HP</span>
            <span className="font-medium text-gray-900">0822-2036-****</span>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center py-4">
            <span className="text-gray-500">Email</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">joha****@gmail.com</span>
              <svg className="w-4 h-4 text-blue-600 hover:text-blue-800 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536M19.768 5.232a2.5 2.5 0 010 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>

          {/* Perangkat */}
          <div className="flex justify-between items-center py-4">
            <span className="text-gray-500">Perangkat</span>
            <span className="font-medium text-gray-900">Redmi Note 8</span>
          </div>

          {/* Versi Aplikasi */}
          <div className="flex justify-between items-center py-4">
            <span className="text-gray-500">Versi Aplikasi</span>
            <span className="font-medium text-gray-900">1.0.0</span>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-12 text-center text-xs text-gray-400">
        <p>&copy; 2025 MyBank Indonesia. Seluruh hak cipta dilindungi.</p>
      </div>
    </div>
  );
}

export default UserDetail;
