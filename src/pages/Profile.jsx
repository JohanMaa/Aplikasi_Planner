import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaUser, FaLock, FaSignOutAlt, FaInfoCircle, FaQuestionCircle, FaHeadset, FaSave, FaTimes, FaSpinner } from 'react-icons/fa';
import { homeData } from '../data/data'; // Adjust path based on your project structure

function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...homeData });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleNavigation = (dashboard) => {
    if (dashboard === 'AccountSettings') {
      setIsEditMode(true); // Open edit modal langsung
    } else if (dashboard === 'Logout') {
      localStorage.removeItem('token'); // Hapus token
      navigate('/login'); // Redirect ke login
    } else {
      console.log(`Navigating to ${dashboard}`); // Placeholder untuk navigasi lain
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateInput = () => {
    const newErrors = {};
    if (!formData.userName) newErrors.userName = 'Nama wajib diisi';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }
    if (formData.phone && !/^\+?\d{10,13}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Nomor telepon tidak valid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateInput()) return;
    setIsSaving(true);
    setTimeout(() => {
      console.log('Saving data:', formData);
      Object.assign(homeData, formData);
      setIsEditMode(false);
      setIsSaving(false);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({ ...homeData });
    setIsEditMode(false);
    setErrors({});
  };

  const handleFinish = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset data profil?')) {
      setIsSaving(true);
      setTimeout(() => {
        console.log('Finishing and saving data:', formData);
        Object.assign(homeData, formData);
        setFormData({
          userName: 'New User',
          role: '',
          phone: '',
          email: '',
          device: 'Unknown Device',
          appVersion: '1.0.0',
          status: 'Aktif',
        });
        setIsEditMode(false);
        setIsSaving(false);
      }, 1000);
    }
  };

  const handleClear = () => {
    setFormData((prev) => ({
      ...prev,
      role: '',
      phone: '',
      email: '',
    }));
    setErrors({});
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.length > 1
      ? `${names[0][0]}${names[1][0]}`
      : name.slice(0, 2).toUpperCase();
  };

  const obscurePhone = (phone) => {
    if (!phone) return 'Belum diatur';
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 8
      ? `${digits.slice(0, 4)}-${digits.slice(4, 8)}-****`
      : phone;
  };

  const obscureEmail = (email) => {
    if (!email) return 'Belum diatur';
    const [user, domain] = email.split('@');
    return user && domain ? `${user.slice(0, 4)}****@${domain}` : email;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
        className="w-full max-w-5xl h-48 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl shadow-2xl flex items-center justify-between px-8"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Akun Saya</h1>
          <p className="text-sm sm:text-base text-teal-100 mt-2">Kelola data dan perangkat Anda</p>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 140 }}
        className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl -mt-16 p-6 sm:p-8"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold shadow-md border-4 border-teal-300"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-teal-200 to-emerald-200 text-teal-800 rounded-full flex items-center justify-center">
                {getInitials(homeData.userName)}
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer border-2 border-teal-200 hover:bg-teal-50">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                aria-label="Ubah foto profil"
              />
              <FaCamera className="w-5 h-5 text-teal-600" />
            </label>
          </motion.div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{homeData.userName}</h2>
            <p className="text-sm text-gray-500 mt-1">{homeData.role || 'Belum diatur'}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">Nomor HP</span>
                <span className="font-medium text-gray-900">{obscurePhone(homeData.phone)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-gray-900">{obscureEmail(homeData.email)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">Versi Aplikasi</span>
                <span className="font-medium text-gray-900">{homeData.appVersion}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-gray-900">{homeData.status}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-teal-100/50"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Edit Profil</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Tutup modal"
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="space-y-5">
                {[
                  { label: 'Nama', name: 'userName', type: 'text', required: true },
                  { label: 'Nomor HP', name: 'phone', type: 'tel' },
                  { label: 'Email', name: 'email', type: 'email' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white ${
                        errors[field.name] ? 'border-red-500' : ''
                      }`}
                      placeholder={`Masukkan ${field.label.toLowerCase()}`}
                      required={field.required}
                    />
                    {errors[field.name] && (
                      <p className="text-red-600 text-xs mt-1">{errors[field.name]}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6 gap-3">
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFinish}
                    className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors"
                    aria-label="Selesai"
                  >
                    Selesai
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center space-x-2 transition-colors ${
                      isSaving ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label="Simpan perubahan"
                  >
                    {isSaving ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <FaSave />
                        <span>Simpan</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mt-8"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Pengaturan</h3>
        <div className="space-y-2">
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(209, 250, 229, 0.3)' }}
            onClick={() => handleNavigation('AccountSettings')}
            className="flex justify-between items-center p-4 rounded-lg cursor-pointer transition-all"
            aria-label="Edit profil"
          >
            <div className="flex items-center space-x-3">
              <FaUser className="w-5 h-5 text-teal-600" />
              <span className="text-gray-700">Edit Profil</span>
            </div>
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(209, 250, 229, 0.3)' }}
            onClick={() => handleNavigation('Security')}
            className="flex justify-between items-center p-4 rounded-lg cursor-pointer transition-all"
            aria-label="Buka pengaturan keamanan"
          >
            <div className="flex items-center space-x-3">
              <FaLock className="w-5 h-5 text-teal-600" />
              <span className="text-gray-700">Keamanan & Privasi</span>
            </div>
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(254, 202, 202, 0.3)' }}
            onClick={() => handleNavigation('Logout')}
            className="flex justify-between items-center p-4 rounded-lg cursor-pointer transition-all"
            aria-label="Keluar dari akun"
          >
            <div className="flex items-center space-x-3">
              <FaSignOutAlt className="w-5 h-5 text-red-600" />
              <span className="text-gray-700">Keluar</span>
            </div>
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Informasi */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mt-8"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Informasi</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-4">
            <span className="text-gray-700">Versi Aplikasi</span>
            <span className="text-gray-900 font-medium">{homeData.appVersion}</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-gray-700">Lisensi</span>
            <span className="text-gray-900 font-medium">© 2025 MyBank Indonesia</span>
          </div>
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(209, 250, 229, 0.3)' }}
            onClick={() => handleNavigation('Informasi')}
            className="flex justify-between items-center p-4 rounded-lg cursor-pointer transition-all"
            aria-label="Buka informasi lengkap"
          >
            <div className="flex items-center space-x-3">
              <FaInfoCircle className="w-5 h-5 text-teal-600" />
              <span className="text-gray-700">Tentang Aplikasi</span>
            </div>
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mt-8"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Kontak Dukungan</h3>
        <div className="space-y-2">
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(209, 250, 229, 0.3)' }}
            onClick={() => handleNavigation('FAQ')}
            className="flex justify-between items-center p-4 rounded-lg cursor-pointer transition-all"
            aria-label="Lihat daftar pertanyaan"
          >
            <div className="flex items-center space-x-3">
              <FaQuestionCircle className="w-5 h-5 text-teal-600" />
              <span className="text-gray-700">Daftar Pertanyaan</span>
            </div>
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(209, 250, 229, 0.3)' }}
            onClick={() => window.open('mailto:support@mybank.co.id', '_blank')}
            className="flex justify-between items-center p-4 rounded-lg cursor-pointer transition-all"
            aria-label="Hubungi customer service"
          >
            <div className="flex items-center space-x-3">
              <FaHeadset className="w-5 h-5 text-teal-600" />
              <span className="text-gray-700">Hubungi Customer Service</span>
            </div>
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
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

export default Profile;