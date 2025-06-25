import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  User, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Clock, 
  Camera,
  Send,
  QrCode
} from 'lucide-react';
import QRCodeModal from '../components/QRCodeModal';

interface User {
  id: string;
  username: string;
  role: 'resident' | 'security';
  flatNumber?: string;
  name?: string;
}

interface AddVisitorProps {
  user: User;
}

interface VisitorData {
  name: string;
  phone: string;
  purpose: string;
  date: string;
  time: string;
  photo?: string;
}

const AddVisitor: React.FC<AddVisitorProps> = ({ user }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<VisitorData>({
    name: '',
    phone: '',
    purpose: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    photo: undefined
  });
  const [loading, setLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [generatedPass, setGeneratedPass] = useState<{
    otp: string;
    qrData: string;
    visitorId: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          photo: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const visitorId = Math.random().toString(36).substr(2, 9);
      const qrData = JSON.stringify({
        visitorId,
        otp,
        name: formData.name,
        flatNumber: user.flatNumber,
        date: formData.date,
        time: formData.time
      });

      setGeneratedPass({ otp, qrData, visitorId });
      setShowQRModal(true);
      setLoading(false);
    }, 2000);
  };

  const commonPurposes = [
    'Personal Visit',
    'Delivery',
    'Maintenance',
    'Cab/Taxi',
    'Medical',
    'Cleaning Service',
    'Food Delivery',
    'Other'
  ];

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('visitor.add')}</h1>
        <p className="text-gray-600">Create a digital pass for your visitor</p>
      </motion.div>

      {/* Form */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Visitor Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('visitor.name')} *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter visitor's full name"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('visitor.phone')} *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>
          </div>

          {/* Purpose of Visit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('visitor.purpose')} *
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                required
              >
                <option value="">Select purpose of visit</option>
                {commonPurposes.map(purpose => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('visitor.date')} *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('visitor.time')} *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('visitor.photo')} (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors duration-200">
              {formData.photo ? (
                <div className="space-y-4">
                  <img
                    src={formData.photo}
                    alt="Visitor"
                    className="w-32 h-32 rounded-xl mx-auto object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, photo: undefined })}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove Photo
                  </button>
                </div>
              ) : (
                <div>
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <label className="cursor-pointer">
                    <span className="text-indigo-600 hover:text-indigo-700 font-medium">
                      Click to upload
                    </span>
                    <span className="text-gray-500"> or drag and drop</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating Pass...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <QrCode className="w-5 h-5" />
                {t('visitor.submit')}
              </div>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Visitor Info Display */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
        <h3 className="font-semibold text-gray-900 mb-3">Visitor Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Flat Number</p>
            <p className="font-medium text-gray-900">{user.flatNumber}</p>
          </div>
          <div>
            <p className="text-gray-600">Resident</p>
            <p className="font-medium text-gray-900">{user.name}</p>
          </div>
        </div>
      </motion.div>

      {/* QR Code Modal */}
      {showQRModal && generatedPass && (
        <QRCodeModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          visitorData={{
            ...formData,
            flatNumber: user.flatNumber || '',
            residentName: user.name || ''
          }}
          otp={generatedPass.otp}
          qrData={generatedPass.qrData}
        />
      )}
    </motion.div>
  );
};

export default AddVisitor;