import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaTimes, FaSpinner } from 'react-icons/fa';

function Transfer({ setCurrentDashboard }) {
  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: '',
    note: '',
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.accountNumber || !/^\d{10,16}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Nomor rekening harus 10-16 digit';
    }
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Jumlah harus angka positif';
    }
    if (formData.note && formData.note.length > 100) {
      newErrors.note = 'Catatan maksimal 100 karakter';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Transferring:', {
        accountNumber: formData.accountNumber,
        amount: Number(formData.amount),
        note: formData.note || 'N/A',
      });
      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({ accountNumber: '', amount: '', note: '' });
      alert('Transfer berhasil!');
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center p-4 sm:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
        className="w-full max-w-5xl h-48 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl shadow-xl flex items-center justify-between px-8 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Transfer Sesama Bank</h1>
          <p className="text-sm sm:text-base text-teal-100 mt-2">Kirim uang dengan cepat dan aman</p>
        </div>
        {/* <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentDashboard('Main')}
          className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors"
          aria-label="Kembali ke dashboard utama"
        >
          Kembali
        </motion.button> */}
      </motion.div>

      {/* Transfer Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 140 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 -mt-16 border border-teal-100/50"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Masukkan Detail Transfer</h2>
        <div className="space-y-5">
          {[
            {
              label: 'Nomor Rekening Tujuan',
              name: 'accountNumber',
              type: 'text',
              placeholder: 'Masukkan 10-16 digit nomor rekening',
            },
            {
              label: 'Jumlah Transfer (Rp)',
              name: 'amount',
              type: 'number',
              placeholder: 'Masukkan jumlah',
            },
            {
              label: 'Catatan (Opsional)',
              name: 'note',
              type: 'text',
              placeholder: 'Masukkan catatan',
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white ${
                  errors[field.name] ? 'border-red-500' : ''
                }`}
                placeholder={field.placeholder}
                aria-label={field.label}
              />
              {errors[field.name] && (
                <p className="text-red-600 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="mt-6 w-full px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center justify-center space-x-2 transition-colors"
          aria-label="Lakukan transfer"
        >
          <FaPaperPlane />
          <span>Transfer Sekarang</span>
        </motion.button>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-xl border border-teal-100/50"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Konfirmasi Transfer</h3>
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
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Nomor Rekening Tujuan</p>
                  <p className="text-sm font-semibold text-gray-800">{formData.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jumlah Transfer</p>
                  <p className="text-sm font-semibold text-gray-800">Rp {Number(formData.amount).toLocaleString('id-ID')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Catatan</p>
                  <p className="text-sm font-semibold text-gray-800">{formData.note || 'Tidak ada'}</p>
                </div>
              </div>
              <div className="flex justify-between mt-6 gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  aria-label="Batal"
                >
                  Batal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center space-x-2 transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  aria-label="Konfirmasi transfer"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Konfirmasi</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Transfer;