import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

// Animation variants
const containerVariants = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: 'spring', stiffness: 100 },
};

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { delay: 0.2, type: 'spring', stiffness: 120 },
};

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.password) {
      newErrors.password = 'Kata sandi wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Kata sandi minimal 6 karakter';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    // Simulasi panggilan API
    setTimeout(() => {
      console.log('Login berhasil:', formData);
      // Simpan token ke localStorage (ganti dengan token dari API nyata)
      localStorage.setItem('token', 'example-token');
      setIsSubmitting(false);
      setFormData({ email: '', password: '' });
      alert('Login berhasil!');
      navigate('/home'); // Redirect ke dashboard
    }, 1000);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="w-full max-w-4xl h-48 bg-gradient-to-br from-emerald-600 to-teal-400 flex items-start px-6 pt-6 shadow-lg rounded-xl"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Login</h1>
          <p className="text-sm text-emerald-100 mt-1">Masuk ke akun Anda</p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        className="w-full max-w-md bg-white rounded-2xl shadow-xl -mt-12 p-6 sm:p-8"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Masukkan Data Anda</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            {
              label: 'Email',
              name: 'email',
              type: 'email',
              icon: <FaEnvelope className="w-5 h-5 text-emerald-600" />,
              placeholder: 'Masukkan email',
            },
            {
              label: 'Kata Sandi',
              name: 'password',
              type: 'password',
              icon: <FaLock className="w-5 h-5 text-emerald-600" />,
              placeholder: 'Masukkan kata sandi',
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {field.icon}
                </div>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-gray-50 text-gray-900 placeholder-gray-400"
                  placeholder={field.placeholder}
                  aria-label={field.label}
                  required
                />
              </div>
              {errors[field.name] && (
                <p className="text-red-600 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-2 transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Masuk sekarang"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h-4z"
                  />
                </svg>
                <span>Memproses...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center text-xs text-gray-400"
      >
        <p>© 2025 MyBank Indonesia. Seluruh hak cipta dilindungi.</p>
      </motion.div>
    </div>
  );
}

export default Login;
