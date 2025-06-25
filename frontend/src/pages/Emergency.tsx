import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Shield, 
  Phone, 
  Clock, 
  CheckCircle,
  X
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  role: 'resident' | 'security';
  flatNumber?: string;
  name?: string;
}

interface EmergencyProps {
  user: User;
}

const Emergency: React.FC<EmergencyProps> = ({ user }) => {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmergencyAlert = () => {
    setShowConfirmation(true);
  };

  const confirmEmergencyAlert = () => {
    setIsLoading(true);
    setShowConfirmation(false);
    
    // Simulate sending alert
    setTimeout(() => {
      setIsLoading(false);
      setAlertSent(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setAlertSent(false);
      }, 5000);
    }, 2000);
  };

  const cancelAlert = () => {
    setShowConfirmation(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (alertSent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">{t('emergency.sent')}</h2>
          <p className="text-green-700 mb-4">
            Security has been notified and will respond immediately.
          </p>
          <div className="text-sm text-green-600">
            <p>Alert sent at {new Date().toLocaleTimeString()}</p>
            <p>From: Flat {user.flatNumber}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <AlertTriangle className="w-20 h-20 text-red-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('emergency.title')}</h1>
        <p className="text-gray-600">{t('emergency.description')}</p>
      </motion.div>

      {/* Warning Card */}
      <motion.div variants={itemVariants} className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900 mb-2">Emergency Alert System</h3>
            <p className="text-red-800 text-sm mb-4">
              This emergency alert will immediately notify all security personnel and the management office. 
              Use this feature only for genuine emergencies such as:
            </p>
            <ul className="text-red-800 text-sm space-y-1 list-disc list-inside">
              <li>Medical emergencies</li>
              <li>Fire or gas leak</li>
              <li>Security threats or suspicious activity</li>
              <li>Break-in or theft</li>
              <li>Any situation requiring immediate assistance</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Emergency Contact Info */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Security Desk</p>
              <p className="text-sm text-gray-600">Available 24/7</p>
              <p className="text-blue-600 font-medium">+91 98765 00001</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
            <Phone className="w-8 h-8 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Management Office</p>
              <p className="text-sm text-gray-600">9 AM - 6 PM</p>
              <p className="text-green-600 font-medium">+91 98765 00002</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Your Information */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Your Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-gray-900">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Flat Number</p>
            <p className="font-medium text-gray-900">{user.flatNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Alert Time</p>
            <p className="font-medium text-gray-900">{new Date().toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-medium text-green-600">Ready to Send</p>
          </div>
        </div>
      </motion.div>

      {/* Emergency Button */}
      <motion.div variants={itemVariants} className="text-center">
        {!isLoading ? (
          <motion.button
            variants={pulseVariants}
            animate="pulse"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEmergencyAlert}
            className="w-48 h-48 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex flex-col items-center justify-center gap-2 mx-auto"
          >
            <AlertTriangle className="w-16 h-16" />
            <span className="text-xl font-bold">EMERGENCY</span>
            <span className="text-sm opacity-90">PRESS HERE</span>
          </motion.button>
        ) : (
          <div className="w-48 h-48 bg-red-600 text-white rounded-full shadow-2xl flex flex-col items-center justify-center gap-2 mx-auto">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
            <span className="text-xl font-bold">SENDING...</span>
          </div>
        )}
      </motion.div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="text-center mb-6">
              <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Confirm Emergency Alert</h2>
              <p className="text-gray-600">
                Are you sure you want to send an emergency alert? This will immediately notify security personnel.
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-yellow-800">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Alert will be sent from:</span>
              </div>
              <p className="text-yellow-800 mt-1">
                {user.name} • Flat {user.flatNumber}
              </p>
              <p className="text-yellow-700 text-sm mt-1">
                {new Date().toLocaleString()}
              </p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={cancelAlert}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
              >
                <X className="w-5 h-5" />
                {t('emergency.cancel')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={confirmEmergencyAlert}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
              >
                <AlertTriangle className="w-5 h-5" />
                {t('emergency.confirm')}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Emergency;