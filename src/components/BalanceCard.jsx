import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
      className="relative bg-gradient-to-br from-emerald-700 to-teal-500 rounded-2xl shadow-xl p-6 mb-6 text-white backdrop-blur-md bg-opacity-90 overflow-hidden"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Saldo Rekening</h2>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            className="text-teal-200 text-sm font-medium hover:text-teal-100"
            aria-label="Atur saldo"
          >
            Atur
          </motion.a>
        </div>
        <div className="flex items-center space-x-3 mb-4">
          <p className="text-3xl font-bold tracking-wide">{showBalance ? balance : 'Rp ********'}</p>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleBalance}
            className="cursor-pointer p-2 rounded-full bg-emerald-800/30 hover:bg-emerald-800/50"
            style={{ pointerEvents: 'auto' }}
            aria-label={showBalance ? "Sembunyikan saldo" : "Tampilkan saldo"}
          >
            {showBalance ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
          </motion.div>
        </div>
        <p className="text-teal-200 text-sm tracking-wide">{accountNumber}</p>
      </div>
    </motion.div>
  );
}

export default BalanceCard;