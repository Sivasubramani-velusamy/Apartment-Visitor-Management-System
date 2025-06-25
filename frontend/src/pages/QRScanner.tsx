import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  Camera, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  User,
  Phone,
  Calendar,
  Clock,
  Home,
  KeyRound
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  role: 'resident' | 'security';
  flatNumber?: string;
  name?: string;
}

interface QRScannerProps {
  user: User;
}

interface VisitorData {
  visitorId: string;
  otp: string;
  name: string;
  flatNumber: string;
  date: string;
  time: string;
  phone?: string;
  purpose?: string;
  residentName?: string;
}

const QRScanner: React.FC<QRScannerProps> = ({ user }) => {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    data?: VisitorData;
    error?: string;
  } | null>(null);
  const [manualOTP, setManualOTP] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please use manual OTP entry.');
      setShowManualEntry(true);
    }
  };

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const simulateQRScan = () => {
    // Simulate successful QR code scan
    const mockData: VisitorData = {
      visitorId: 'vis_123456',
      otp: '1234',
      name: 'Rajesh Kumar',
      flatNumber: 'A101',
      date: new Date().toISOString().split('T')[0],
      time: '10:30',
      phone: '+91 98765 43210',
      purpose: 'Delivery',
      residentName: 'Priya Sharma'
    };

    setScanResult({
      success: true,
      data: mockData
    });
    stopScanning();
  };

  const handleManualOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate OTP verification
    if (manualOTP === '1234') {
      const mockData: VisitorData = {
        visitorId: 'vis_123456',
        otp: manualOTP,
        name: 'Rajesh Kumar',
        flatNumber: 'A101',
        date: new Date().toISOString().split('T')[0],
        time: '10:30',
        phone: '+91 98765 43210',
        purpose: 'Delivery',
        residentName: 'Priya Sharma'
      };

      setScanResult({
        success: true,
        data: mockData
      });
    } else {
      setScanResult({
        success: false,
        error: 'Invalid OTP. Please check and try again.'
      });
    }
    
    setManualOTP('');
    setShowManualEntry(false);
  };

  const handleAllowEntry = () => {
    if (scanResult?.data) {
      alert(`Entry approved for ${scanResult.data.name}`);
      setScanResult(null);
    }
  };

  const handleDenyEntry = () => {
    if (scanResult?.data) {
      alert(`Entry denied for ${scanResult.data.name}`);
      setScanResult(null);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setManualOTP('');
    setShowManualEntry(false);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('security.scanQR')}</h1>
        <p className="text-gray-600">Scan visitor QR code or enter OTP manually</p>
      </motion.div>

      {!scanResult ? (
        <>
          {/* Scanner Section */}
          {!showManualEntry ? (
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="text-center mb-6">
                <QrCode className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">QR Code Scanner</h2>
                <p className="text-gray-600">Position the QR code within the frame</p>
              </div>

              {!isScanning ? (
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startScanning}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    <Camera className="w-5 h-5" />
                    Start Camera
                  </motion.button>

                  {/* Demo Scan Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={simulateQRScan}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                  >
                    <QrCode className="w-5 h-5" />
                    Demo Scan (Success)
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowManualEntry(true)}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                  >
                    <KeyRound className="w-5 h-5" />
                    Enter OTP Manually
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative bg-black rounded-xl overflow-hidden aspect-square max-w-sm mx-auto">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 border-4 border-dashed border-white opacity-50 m-8 rounded-xl"></div>
                  </div>
                  
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={simulateQRScan}
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition-all duration-200"
                    >
                      Simulate Scan
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={stopScanning}
                      className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-700 transition-all duration-200"
                    >
                      Stop Camera
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            /* Manual OTP Entry */
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="text-center mb-6">
                <KeyRound className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Manual OTP Entry</h2>
                <p className="text-gray-600">Enter the 4-digit OTP from visitor's pass</p>
              </div>

              <form onSubmit={handleManualOTPSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={manualOTP}
                    onChange={(e) => setManualOTP(e.target.value)}
                    className="w-full text-center text-3xl font-mono font-bold py-4 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent tracking-widest"
                    placeholder="0000"
                    maxLength={4}
                    pattern="[0-9]{4}"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                  >
                    Verify OTP
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setShowManualEntry(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                  >
                    Back to Scanner
                  </motion.button>
                </div>
              </form>

              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Demo OTP: <span className="font-mono font-bold">1234</span></p>
              </div>
            </motion.div>
          )}
        </>
      ) : (
        /* Scan Result */
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
        >
          <div className="text-center mb-6">
            {scanResult.success ? (
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            ) : (
              <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            )}
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {scanResult.success ? 'Visitor Verified' : 'Verification Failed'}
            </h2>
          </div>

          {scanResult.success && scanResult.data ? (
            <div className="space-y-6">
              {/* Visitor Details */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Visitor Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{scanResult.data.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{scanResult.data.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Visiting</p>
                      <p className="font-medium text-gray-900">
                        Flat {scanResult.data.flatNumber} • {scanResult.data.residentName}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Date & Time</p>
                      <p className="font-medium text-gray-900">
                        {new Date(scanResult.data.date).toLocaleDateString()} • {scanResult.data.time}
                      </p>
                    </div>
                  </div>
                </div>
                
                {scanResult.data.purpose && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Purpose of Visit</p>
                    <p className="font-medium text-gray-900">{scanResult.data.purpose}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAllowEntry}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                >
                  <CheckCircle className="w-5 h-5" />
                  Allow Entry
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDenyEntry}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                >
                  <XCircle className="w-5 h-5" />
                  Deny Entry
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-red-50 rounded-2xl p-6 mb-6">
                <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <p className="text-red-800 font-medium">{scanResult.error}</p>
              </div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetScanner}
            className="w-full mt-6 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
          >
            Scan Another Code
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QRScanner;