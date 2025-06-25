import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Share, Copy, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode';

interface VisitorData {
  name: string;
  phone: string;
  purpose: string;
  date: string;
  time: string;
  flatNumber: string;
  residentName: string;
}

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  visitorData: VisitorData;
  otp: string;
  qrData: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  visitorData,
  otp,
  qrData
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#1F2937',
          light: '#FFFFFF'
        }
      });
    }
  }, [isOpen, qrData]);

  const handleCopyOTP = async () => {
    try {
      await navigator.clipboard.writeText(otp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy OTP:', err);
    }
  };

  const handleDownloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `visitor-pass-${visitorData.name.replace(/\s+/g, '-')}-${otp}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const handleShare = async () => {
    if (navigator.share && canvasRef.current) {
      try {
        const canvas = canvasRef.current;
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `visitor-pass-${otp}.png`, { type: 'image/png' });
            await navigator.share({
              title: 'Visitor Pass',
              text: `Visitor Pass for ${visitorData.name} - OTP: ${otp}`,
              files: [file]
            });
          }
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `Visitor Pass for ${visitorData.name}\nOTP: ${otp}\nDate: ${visitorData.date} at ${visitorData.time}\nFlat: ${visitorData.flatNumber}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText);
        alert('Pass details copied to clipboard!');
      }
    }
  };

  if (!isOpen) return null;

  return (
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
        className="bg-white rounded-2xl p-6 w-full max-w-md max-h-screen overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Visitor Pass Generated</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">Pass Generated Successfully!</h3>
              <p className="text-sm text-green-700">Share this with your visitor</p>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="text-center mb-6">
          <div className="bg-white p-4 rounded-xl border-2 border-gray-200 inline-block mb-4">
            <canvas ref={canvasRef} className="block" />
          </div>
          <p className="text-sm text-gray-600">
            Visitor can scan this QR code or use the OTP below
          </p>
        </div>

        {/* OTP Display */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">One-Time Password (OTP)</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-mono font-bold text-gray-900 tracking-wider">
                {otp}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCopyOTP}
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-lg transition-all duration-200"
              >
                {copied ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              </motion.button>
            </div>
            {copied && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-green-600 mt-2"
              >
                OTP copied to clipboard!
              </motion.p>
            )}
          </div>
        </div>

        {/* Visitor Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Pass Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Visitor:</span>
              <span className="font-medium text-gray-900">{visitorData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium text-gray-900">{visitorData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Purpose:</span>
              <span className="font-medium text-gray-900">{visitorData.purpose}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-medium text-gray-900">
                {new Date(visitorData.date).toLocaleDateString()} • {visitorData.time}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Flat:</span>
              <span className="font-medium text-gray-900">{visitorData.flatNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Host:</span>
              <span className="font-medium text-gray-900">{visitorData.residentName}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadQR}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            Download
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
          >
            <Share className="w-4 h-4" />
            Share
          </motion.button>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Instructions for Visitor:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Show the QR code to security at the gate</li>
            <li>• Or provide the 4-digit OTP: <strong>{otp}</strong></li>
            <li>• Valid for the scheduled date and time only</li>
            <li>• Carry a valid ID for verification</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QRCodeModal;