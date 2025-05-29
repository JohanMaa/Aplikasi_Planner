import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaCamera, FaCog, FaQuestionCircle, FaHeadset, FaSave, FaTimes, FaSpinner, FaEdit } from 'react-icons/fa';
import { homeData } from '../data/data'; // Adjust path based on your project structure

function Profile({ setCurrentDashboard }) {
  const [profileImage, setProfileImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...homeData });
  const [isSaving, setIsSaving] = useState(false);

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

  const handleNavigation = (dashboard) => {
    console.log(`Navigating to ${dashboard}`);
    setCurrentDashboard(dashboard);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
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
  };

  const handleFinish = () => {
    setIsSaving(true);
    setTimeout(() => {
      console.log('Finishing and saving data:', formData);
      Object.assign(homeData, formData); // Save data before resetting
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
  };

  const handleClear = () => {
    setFormData((prev) => ({
      ...prev,
      role: '',
      phone: '',
      email: '',
    }));
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.length > 1
      ? `${names[0][0]}${names[1][0]}`
      : name.slice(0, 2).toUpperCase();
  };

  const obscurePhone = (phone) => {
    if (!phone) return 'N/A';
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 8
      ? `${digits.slice(0, 4)}-${digits.slice(4, 8)}-****`
      : phone;
  };

  const obscureEmail = (email) => {
    if (!email) return 'N/A';
    const [user, domain] = email.split('@');
    return user && domain ? `${user.slice(0, 4)}****@${domain}` : email;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="w-full max-w-4xl h-48 bg-gradient-to-br from-green-600 to-green-400 flex items-start px-6 pt-6 shadow-lg rounded-xl"
      >
        <div className="flex justify-between items-start w-full">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Akun Saya</h1>
            <p className="text-sm text-green-100 mt-1">Kelola data dan perangkat Anda</p>
          </div>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl -mt-12 p-6 sm:p-8"
      >
        {/* Edit Button */}
        <div className="flex justify-end mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEdit}
            className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
            aria-label="Edit profil"
          >
            <FaEdit className="mr-2" /> Edit Profil
          </motion.button>
        </div>
        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold shadow-md border-4 border-green-300"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-200 to-teal-200 text-green-800 rounded-full flex items-center justify-center">
                {getInitials(homeData.userName)}
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer border-2 border-green-200 hover:bg-green-50">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <FaCamera className="w-5 h-5 text-green-600" />
            </label>
          </motion.div>
          <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-gray-800">{homeData.userName}</h2>
          <p className="text-sm text-gray-500">{homeData.role || 'N/A'}</p>
        </div>

        {/* Data Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-500">Nomor HP</span>
            <span className="font-medium text-gray-900">{obscurePhone(homeData.phone)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-gray-900">{obscureEmail(homeData.email)}</span>
          </div>

          <div className="flex justify-between items-center py-3">
            <span className="text-gray-500">Versi Aplikasi</span>
            <span className="font-medium text-gray-900">{homeData.appVersion}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-500">Status</span>
            <span className="font-medium text-gray-900">{homeData.status}</span>
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
            className="fixed inset-0 bg-white z-50 flex flex-col sm:items-center sm:justify-center sm:bg-black/60 h-screen w-screen sm:h-auto sm:w-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
              className="bg-white sm:rounded-2xl p-6 sm:p-8 w-full sm:max-w-lg h-full sm:h-auto flex flex-col sm:shadow-2xl sm:border sm:border-green-100/50 pb-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Edit Profil</h3>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFinish}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    aria-label="Selesai"
                  >
                    Selesai
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 transition-colors ${
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
              </div>
              <div className="flex-1 overflow-y-auto space-y-5">
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
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white"
                      placeholder={`Masukkan ${field.label.toLowerCase()}`}
                      required={field.required}
                    />
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClear}
                className="mt-5 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors w-full sm:w-auto"
                aria-label="Datanya berhasil diubah"
              >
                Datanya Berhasil Diubah
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Settings */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 mt-6"
      >
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Pengaturan Cepat</h3>
        <motion.div
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
          onClick={() => handleNavigation('Settings')}
          className="flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all"
          aria-label="Buka pengaturan"
        >
          <div className="flex items-center space-x-3">
            <FaCog className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">Pengaturan</span>
          </div>
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 mt-6"
      >
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Kontak Dukungan</h3>
        <div className="space-y-2">
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
            className="flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all"
            aria-label="Lihat daftar pertanyaan"
          >
            <div className="flex items-center space-x-3">
              <FaQuestionCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Daftar Pertanyaan</span>
            </div>
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
            className="flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all"
            aria-label="Hubungi customer service"
          >
            <div className="flex items-center space-x-3">
              <FaHeadset className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Hubungi Customer Service</span>
            </div>
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        className="mt-12 text-center text-xs text-gray-400"
      >
        <p>© 2025 MyBank Indonesia. Seluruh hak cipta dilindungi.</p>
      </motion.div>
    </div>
  );
}

export default Profile;
// -------------- 1