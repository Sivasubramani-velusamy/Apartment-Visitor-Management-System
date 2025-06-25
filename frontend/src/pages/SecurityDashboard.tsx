import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Shield, 
  QrCode, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Search,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  username: string;
  role: 'resident' | 'security';
  flatNumber?: string;
  name?: string;
}

interface SecurityDashboardProps {
  user: User;
}

interface VisitorRecord {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  flatNumber: string;
  residentName: string;
  date: string;
  time: string;
  status: 'pending' | 'arrived' | 'denied' | 'expired';
  otp: string;
}

interface EmergencyAlert {
  id: string;
  flatNumber: string;
  residentName: string;
  timestamp: string;
  status: 'active' | 'resolved';
}

const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ user }) => {
  const { t } = useTranslation();
  const [visitorQueue, setVisitorQueue] = useState<VisitorRecord[]>([]);
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    todayVisitors: 15,
    pendingVisitors: 3,
    activeAlerts: 1,
    completedVerifications: 12
  });

  useEffect(() => {
    // Mock data for visitor queue
    const mockVisitors: VisitorRecord[] = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        purpose: 'Delivery',
        flatNumber: 'A101',
        residentName: 'Priya Sharma',
        date: new Date().toISOString().split('T')[0],
        time: '10:30',
        status: 'pending',
        otp: '1234'
      },
      {
        id: '2',
        name: 'Amit Patel',
        phone: '+91 87654 32109',
        purpose: 'Personal Visit',
        flatNumber: 'B205',
        residentName: 'Suresh Kumar',
        date: new Date().toISOString().split('T')[0],
        time: '14:00',
        status: 'pending',
        otp: '5678'
      },
      {
        id: '3',
        name: 'Kavya Reddy',
        phone: '+91 76543 21098',
        purpose: 'Maintenance',
        flatNumber: 'C301',
        residentName: 'Ravi Gupta',
        date: new Date().toISOString().split('T')[0],
        time: '16:30',
        status: 'arrived',
        otp: '9012'
      }
    ];
    setVisitorQueue(mockVisitors);

    // Mock emergency alerts
    const mockAlerts: EmergencyAlert[] = [
      {
        id: '1',
        flatNumber: 'B205',
        residentName: 'Suresh Kumar',
        timestamp: new Date().toISOString(),
        status: 'active'
      }
    ];
    setEmergencyAlerts(mockAlerts);
  }, []);

  const handleVisitorAction = (visitorId: string, action: 'allow' | 'deny') => {
    setVisitorQueue(queue =>
      queue.map(visitor =>
        visitor.id === visitorId
          ? { ...visitor, status: action === 'allow' ? 'arrived' : 'denied' }
          : visitor
      )
    );
  };

  const handleResolveAlert = (alertId: string) => {
    setEmergencyAlerts(alerts =>
      alerts.map(alert =>
        alert.id === alertId
          ? { ...alert, status: 'resolved' }
          : alert
      )
    );
  };

  const filteredVisitors = visitorQueue.filter(visitor =>
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.phone.includes(searchTerm) ||
    visitor.flatNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'arrived': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'denied': return 'text-red-600 bg-red-100';
      case 'expired': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('security.title')}
            </h1>
            <p className="text-gray-600 mt-1">Welcome, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/qr-scanner">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
              >
                <QrCode className="w-5 h-5" />
                {t('security.scanQR')}
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Emergency Alerts */}
      {emergencyAlerts.filter(alert => alert.status === 'active').length > 0 && (
        <motion.div variants={itemVariants} className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-red-900">Emergency Alerts</h2>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              {emergencyAlerts.filter(alert => alert.status === 'active').length} Active
            </span>
          </div>
          <div className="space-y-3">
            {emergencyAlerts
              .filter(alert => alert.status === 'active')
              .map(alert => (
                <div key={alert.id} className="bg-white rounded-xl p-4 border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Emergency Alert - Flat {alert.flatNumber}
                      </h3>
                      <p className="text-sm text-gray-600">
                        From: {alert.residentName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleResolveAlert(alert.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                    >
                      Resolve
                    </motion.button>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Today's Visitors</p>
                <p className="text-3xl font-bold">{stats.todayVisitors}</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Pending</p>
                <p className="text-3xl font-bold">{stats.pendingVisitors}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Active Alerts</p>
                <p className="text-3xl font-bold">{stats.activeAlerts}</p>
              </div>
              <Bell className="w-8 h-8 text-red-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Completed</p>
                <p className="text-3xl font-bold">{stats.completedVerifications}</p>
              </div>
              <Shield className="w-8 h-8 text-green-200" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Visitor Queue */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{t('security.visitorQueue')}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search visitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {filteredVisitors.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredVisitors.map((visitor, index) => (
                <motion.div
                  key={visitor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{visitor.name}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visitor.status)}`}>
                          {t(`history.status.${visitor.status}`)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{visitor.purpose}</p>
                      <p className="text-sm text-gray-500">
                        Flat {visitor.flatNumber} • {visitor.residentName}
                      </p>
                      <p className="text-sm text-gray-500">{visitor.time} • {visitor.phone}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">OTP</p>
                        <p className="text-lg font-mono font-bold text-gray-900">{visitor.otp}</p>
                      </div>
                      
                      {visitor.status === 'pending' && (
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleVisitorAction(visitor.id, 'allow')}
                            className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Allow
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleVisitorAction(visitor.id, 'deny')}
                            className="flex items-center gap-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200"
                          >
                            <XCircle className="w-4 h-4" />
                            Deny
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No visitors in queue</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SecurityDashboard;