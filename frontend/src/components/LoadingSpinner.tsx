import React from 'react';
import { motion } from 'framer-motion';
import { Building } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4"
        >
          <Building className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">AVMS</h2>
        <p className="text-gray-500">Loading...</p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;