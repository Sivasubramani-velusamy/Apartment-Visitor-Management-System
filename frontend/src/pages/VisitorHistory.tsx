import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  Clock, 
  User,
  Phone,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  role: 'resident' | 'security';
  flatNumber?: string;
  name?: string;
}

interface VisitorHistoryProps {
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
  flatNumber?: string;
  residentName?: string;
  arrivedAt?: string;
}

const VisitorHistory: React.FC<VisitorHistoryProps> = ({ user }) => {
  const { t } = useTranslation();
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [filteredVisitors, setFilteredVisitors] = useState<VisitorRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for visitor history
    const mockVisitors: VisitorRecord[] = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        purpose: 'Delivery',
        date: new Date().toISOString().split('T')[0],
        time: '10:30',
        status: 'arrived',
        otp: '1234',
        arrivedAt: '10:35'
      },
      {
        id: '2',
        name: 'Priya Sharma',
        phone: '+91 87654 32109',
        purpose: 'Personal Visit',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        time: '14:00',
        status: 'denied',
        otp: '5678'
      },
      {
        id: '3',
        name: 'Amit Patel',
        phone: '+91 76543 21098',
        purpose: 'Maintenance',
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        time: '16:30',
        status: 'expired',
        otp: '9012'
      },
      {
        id: '4',
        name: 'Kavya Reddy',
        phone: '+91 65432 10987',
        purpose: 'Food Delivery',
        date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
        time: '19:00',
        status: 'arrived',
        otp: '3456',
        arrivedAt: '19:05'
      },
      {
        id: '5',
        name: 'Suresh Gupta',
        phone: '+91 54321 09876',
        purpose: 'Cab/Taxi',
        date: new Date(Date.now() - 345600000).toISOString().split('T')[0],
        time: '08:15',
        status: 'arrived',
        otp: '7890',
        arrivedAt: '08:15'
      }
    ];

    // Add flat number and resident name for security view
    if (user.role === 'security') {
      mockVisitors.forEach(visitor => {
        visitor.flatNumber = `${String.fromCharCode(65 + Math.floor(Math.random() * 3))}${Math.floor(Math.random() * 300) + 101}`;
        visitor.residentName = `Resident ${Math.floor(Math.random() * 100) + 1}`;
      });
    }

    setVisitors(mockVisitors);
    setFilteredVisitors(mockVisitors);
    setLoading(false);
  }, [user.role]);

  useEffect(() => {
    let filtered = visitors;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(visitor =>
        visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.phone.includes(searchTerm) ||
        visitor.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (visitor.flatNumber && visitor.flatNumber.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(visitor => visitor.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date(now);
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(visitor => new Date(visitor.date) >= filterDate);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(visitor => new Date(visitor.date) >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(visitor => new Date(visitor.date) >= filterDate);
          break;
      }
    }

    setFilteredVisitors(filtered);
  }, [visitors, searchTerm, statusFilter, dateFilter]);

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
      case 'denied': return <XCircle className="w-4 h-4" />;
      case 'expired': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleExportData = () => {
    const csvContent = [
      ['Name', 'Phone', 'Purpose', 'Date', 'Time', 'Status', 'OTP', 'Arrived At'],
      ...filteredVisitors.map(visitor => [
        visitor.name,
        visitor.phone,
        visitor.purpose,
        visitor.date,
        visitor.time,
        visitor.status,
        visitor.otp,
        visitor.arrivedAt || '-'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visitor-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('history.title')}</h1>
          <p className="text-gray-600 mt-1">
            {filteredVisitors.length} of {visitors.length} visitors
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExportData}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
        >
          <Download className="w-5 h-5" />
          Export CSV
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone, or purpose..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="lg:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="all">{t('history.status.all')}</option>
                <option value="pending">{t('history.status.pending')}</option>
                <option value="arrived">{t('history.status.arrived')}</option>
                <option value="denied">{t('history.status.denied')}</option>
                <option value="expired">{t('history.status.expired')}</option>
              </select>
            </div>
          </div>

          {/* Date Filter */}
          <div className="lg:w-48">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Visitor List */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {filteredVisitors.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredVisitors.map((visitor, index) => (
              <motion.div
                key={visitor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{visitor.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(visitor.status)}`}>
                        {getStatusIcon(visitor.status)}
                        {t(`history.status.${visitor.status}`)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{visitor.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          <span>{visitor.purpose}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(visitor.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>
                            Scheduled: {visitor.time}
                            {visitor.arrivedAt && ` • Arrived: ${visitor.arrivedAt}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {user.role === 'security' && visitor.flatNumber && (
                      <div className="mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Flat {visitor.flatNumber} • {visitor.residentName}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">OTP</div>
                    <div className="text-lg font-mono font-bold text-gray-900">{visitor.otp}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No visitors found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default VisitorHistory;