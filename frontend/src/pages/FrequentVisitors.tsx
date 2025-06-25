import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  User, 
  Phone, 
  MessageCircle,
  Star,
  Clock,
  Calendar,
  Send
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  role: 'resident' | 'security';
  flatNumber?: string;
  name?: string;
}

interface FrequentVisitorsProps {
  user: User;
}

interface FrequentVisitor {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  photo?: string;
  lastVisit?: string;
  visitCount: number;
}

const FrequentVisitors: React.FC<FrequentVisitorsProps> = ({ user }) => {
  const { t } = useTranslation();
  const [visitors, setVisitors] = useState<FrequentVisitor[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVisitor, setEditingVisitor] = useState<FrequentVisitor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    purpose: '',
    photo: ''
  });

  useEffect(() => {
    // Mock data for frequent visitors
    const mockVisitors: FrequentVisitor[] = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        purpose: 'Delivery',
        lastVisit: '2024-01-15',
        visitCount: 8
      },
      {
        id: '2',
        name: 'Priya Sharma',
        phone: '+91 87654 32109',
        purpose: 'Cleaning Service',
        lastVisit: '2024-01-12',
        visitCount: 15
      },
      {
        id: '3',
        name: 'Dr. Amit Patel',
        phone: '+91 76543 21098',
        purpose: 'Medical Visit',
        lastVisit: '2024-01-10',
        visitCount: 5
      },
      {
        id: '4',
        name: 'Kavya Reddy',
        phone: '+91 65432 10987',
        purpose: 'Personal Visit',
        lastVisit: '2024-01-08',
        visitCount: 12
      }
    ];
    setVisitors(mockVisitors);
  }, []);

  const handleAddVisitor = () => {
    setEditingVisitor(null);
    setFormData({ name: '', phone: '', purpose: '', photo: '' });
    setShowAddModal(true);
  };

  const handleEditVisitor = (visitor: FrequentVisitor) => {
    setEditingVisitor(visitor);
    setFormData({
      name: visitor.name,
      phone: visitor.phone,
      purpose: visitor.purpose,
      photo: visitor.photo || ''
    });
    setShowAddModal(true);
  };

  const handleDeleteVisitor = (visitorId: string) => {
    setVisitors(visitors.filter(v => v.id !== visitorId));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingVisitor) {
      // Update existing visitor
      setVisitors(visitors.map(v => 
        v.id === editingVisitor.id 
          ? { ...v, ...formData }
          : v
      ));
    } else {
      // Add new visitor
      const newVisitor: FrequentVisitor = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        visitCount: 0
      };
      setVisitors([...visitors, newVisitor]);
    }
    
    setShowAddModal(false);
    setFormData({ name: '', phone: '', purpose: '', photo: '' });
  };

  const handleQuickInvite = (visitor: FrequentVisitor) => {
    // This would typically open the add visitor form with pre-filled data
    console.log('Quick invite for:', visitor.name);
    // For demo purposes, just show an alert
    alert(`Quick invite sent to ${visitor.name}!`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
          <h1 className="text-3xl font-bold text-gray-900">{t('nav.frequentVisitors')}</h1>
          <p className="text-gray-600 mt-1">Save and manage your regular visitors</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddVisitor}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Visitor
        </motion.button>
      </motion.div>

      {/* Visitors Grid */}
      <motion.div variants={itemVariants}>
        {visitors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visitors.map((visitor, index) => (
              <motion.div
                key={visitor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-semibold">
                      {visitor.photo ? (
                        <img src={visitor.photo} alt={visitor.name} className="w-12 h-12 rounded-xl object-cover" />
                      ) : (
                        visitor.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{visitor.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-yellow-600">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{visitor.visitCount} visits</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditVisitor(visitor)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteVisitor(visitor.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{visitor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MessageCircle className="w-4 h-4" />
                    <span>{visitor.purpose}</span>
                  </div>
                  {visitor.lastVisit && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Last visit: {new Date(visitor.lastVisit).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickInvite(visitor)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  Quick Invite
                </motion.button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No frequent visitors yet</h3>
            <p className="text-gray-500 mb-6">Add visitors you frequently invite to save time</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddVisitor}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add Your First Visitor
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Add/Edit Modal */}
      {showAddModal && (
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingVisitor ? 'Edit Visitor' : 'Add Frequent Visitor'}
            </h2>
            
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter visitor's name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose *
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                    required
                  >
                    <option value="">Select purpose</option>
                    {commonPurposes.map(purpose => (
                      <option key={purpose} value={purpose}>{purpose}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                >
                  {editingVisitor ? 'Update' : 'Add'} Visitor
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FrequentVisitors;