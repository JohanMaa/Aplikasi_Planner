import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/96');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#d9e2ec] p-6 flex flex-col items-center">
      {/* Header Profile */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl relative bg-gradient-to-r from-green-500 via-emerald-400 to-green-300 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 13V7a1 1 0 011-1h3l2-2h2l2 2h3a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1zm5-1h2v-2H9v2z" />
              </svg>
            </label>
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-2xl font-bold">Johan Maulana</h2>
            <p className="text-sm opacity-80">UI/UX Designer & Frontend Developer</p>
          </div>
        </div>
      </motion.div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-xl bg-white mt-6 rounded-xl shadow-md p-6 space-y-4"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Profil Saya</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigator.clipboard.writeText('Johan Maulana')}
            className="text-green-600 hover:text-green-800"
          >
            Salin Nama
          </motion.button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium">Email</p>
            <p>johan@example.com</p>
          </div>
          <div>
            <p className="font-medium">Telepon</p>
            <p>+62 812 3456 7890</p>
          </div>
          <div>
            <p className="font-medium">Alamat</p>
            <p>Bandung, Indonesia</p>
          </div>
          <div>
            <p className="font-medium">Status</p>
            <p>Aktif</p>
          </div>
        </div>
        <Link
          to="/profile/userdetail"
          className="inline-block mt-4 text-green-600 font-semibold hover:underline"
        >
          Lihat detail profil
        </Link>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-xl bg-white mt-6 rounded-xl shadow-md p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Cepat</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Fast Menu</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-xl bg-white mt-6 rounded-xl shadow-md p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Kontak Dukungan</h3>

        {/* FAQ */}
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c-.549-1.165-2.03-2-3.228-2 1.511-2.687 4.487-4.5 8-4.5 3.513 0 6.489 1.813 8 4.5-1.198 0-2.679.835-3.228 2-.812 1.72-2.379 3-4.772 3s-3.96-1.28-4.772-3z" />
            </svg>
            <span>Daftar Pertanyaan</span>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Customer Service */}
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all mt-2">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 00-12.728 0M3 10.5a9 9 0 0018 0M9.75 15.75l-1.5 4.5m6-4.5l1.5 4.5M9 9h.01M15 9h.01" />
            </svg>
            <span>Hubungi Customer Service</span>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>

    </div>
  );
}

export default Profile;
