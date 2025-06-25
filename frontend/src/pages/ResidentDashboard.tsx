import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  Calendar,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import EmergencyButton from '../components/EmergencyButton';

interface User {
  id: string;
  username: string;
  role: 'resident' | 'security';
  flatNumber?: string;
  name?: string;
}

interface ResidentDashboardProps {
  user: User;
}

interface VisitorRecord {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  date: string;
  time: string;
  status: 'pending' | 'arrived' | 'denied' | 'expired';
  otp: string;
}

const ResidentDashboard: React.FC<ResidentDashboardProps> = ({ user }) => {
  const { t } = useTranslation();
  const [todayVisitors, setTodayVisitors] = useState<VisitorRecord[]>([]);
  const [stats, setStats] = useState({
    todayVisitors: 3,
    pendingApprovals: 1,
    thisWeekVisitors: 12,
    monthlyVisitors: 45
  });

  useEffect(() => {
    // Mock data for today's visitors
    const mockVisitors: VisitorRecord[] = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        purpose: 'Delivery',
        date: new Date().toISOString().split('T')[0],
        time: '10:30',
        status: 'arrived',
        otp: '1234'
      },
      {
        id: '2',
        name: 'Priya Sharma',
        phone: '+91 87654 32109',
        purpose: 'Personal Visit',
        date: new Date().toISOString().split('T')[0],
        time: '14:00',
        status: 'pending',
        otp: '5678'
      },
      {
        id: '3',
        name: 'Amit Patel',
        phone: '+91 76543 21098',
        purpose: 'Maintenance',
        date: new Date().toISOString().split('T')[0],
        time: '16:30',
        status: 'pending',
        otp: '9012'
      }
    ];
    setTodayVisitors(mockVisitors);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'arrived': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'denied': return 'text-red-600 bg-red-100';
      case 'expired': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'arrived': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'denied': return <AlertCircle className="w-4 h-4" />;
      case 'expired': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('dashboard.welcome')}, {user.name}!
            </h1>
            <p className="text-gray-600 mt-1">Flat {user.flatNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.quickStats')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">{t('dashboard.todayVisitors')}</p>
                <p className="text-3xl font-bold">{stats.todayVisitors}</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">{t('dashboard.pendingApprovals')}</p>
                <p className="text-3xl font-bold">{stats.pendingApprovals}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">This Week</p>
                <p className="text-3xl font-bold">{stats.thisWeekVisitors}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">This Month</p>
                <p className="text-3xl font-bold">{stats.monthlyVisitors}</p>
              </div>
              <Activity className="w-8 h-8 text-purple-200" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/add-visitor">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{t('nav.addVisitor')}</h3>
                  <p className="text-sm text-gray-500">Create new pass</p>
                </div>
              </div>
            </motion.div>
          </Link>

          <Link to="/history">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{t('nav.visitorHistory')}</h3>
                  <p className="text-sm text-gray-500">View past visits</p>
                </div>
              </div>
            </motion.div>
          </Link>

          <Link to="/frequent-visitors">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{t('nav.frequentVisitors')}</h3>
                  <p className="text-sm text-gray-500">Saved contacts</p>
                </div>
              </div>
            </motion.div>
          </Link>

          <Link to="/emergency">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{t('nav.emergency')}</h3>
                  <p className="text-sm text-gray-500">Alert security</p>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Today's Visitors */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{t('dashboard.todayVisitors')}</h2>
          <Link to="/history" className="text-indigo-600 hover:text-indigo-700 font-medium">
            View All
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {todayVisitors.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {todayVisitors.map((visitor, index) => (
                <motion.div
                  key={visitor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{visitor.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{visitor.purpose}</p>
                      <p className="text-sm text-gray-500">{visitor.time} • {visitor.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(visitor.status)}`}>
                        {getStatusIcon(visitor.status)}
                        {t(`history.status.${visitor.status}`)}
                      </span>
                      <div className="text-right">
                        <p className="text-sm font-mono text-gray-900">OTP: {visitor.otp}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No visitors scheduled for today</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Emergency Button */}
      <EmergencyButton />
    </motion.div>
  );
};

export default ResidentDashboard;