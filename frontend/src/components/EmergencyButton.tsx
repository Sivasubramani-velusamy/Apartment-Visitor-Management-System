import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmergencyButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to="/emergency">
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.button
          animate={{
            scale: isHovered ? [1, 1.05, 1] : 1,
            boxShadow: isHovered 
              ? ['0 4px 20px rgba(239, 68, 68, 0.4)', '0 8px 30px rgba(239, 68, 68, 0.6)', '0 4px 20px rgba(239, 68, 68, 0.4)']
              : '0 4px 20px rgba(239, 68, 68, 0.3)'
          }}
          transition={{ 
            duration: 1.5, 
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut" 
          }}
          className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
        >
          <AlertTriangle className="w-8 h-8" />
        </motion.button>
        
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
          >
            Emergency Alert
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
};

export default EmergencyButton;