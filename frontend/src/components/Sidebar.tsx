import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Home,
  UserPlus,
  History,
  Users,
  AlertTriangle,
  Shield,
  QrCode,
  LogOut,
  Building
} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

interface User {
  id: string;
  username: string;
  role: 'resident' | 'security';
  flatNumber?: string;
  name?: string;
}

interface SidebarProps {
  userRole: 'resident' | 'security';
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, user, onLogout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const residentNavItems = [
    { to: '/dashboard', icon: Home, label: t('nav.dashboard') },
    { to: '/add-visitor', icon: UserPlus, label: t('nav.addVisitor') },
    { to: '/history', icon: History, label: t('nav.visitorHistory') },
    { to: '/frequent-visitors', icon: Users, label: t('nav.frequentVisitors') },
    { to: '/emergency', icon: AlertTriangle, label: t('nav.emergency') },
  ];

  const securityNavItems = [
    { to: '/security', icon: Shield, label: t('security.title') },
    { to: '/qr-scanner', icon: QrCode, label: t('security.scanQR') },
    { to: '/history', icon: History, label: t('nav.visitorHistory') },
  ];

  const navItems = userRole === 'resident' ? residentNavItems : securityNavItems;

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-gray-100 z-50"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">AVMS</h1>
              <p className="text-xs text-gray-500">Visitor Management</p>
            </div>
          </div>
          
          {/* User Info */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-semibold">
                {user.name ? user.name.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {user.name || user.username}
                </p>
                <p className="text-sm text-gray-600">
                  {userRole === 'resident' ? `Flat ${user.flatNumber || 'A101'}` : 'Security'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  className="flex items-center gap-3 w-full"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 space-y-4">
          {/* Language Switcher */}
          <LanguageSwitcher variant="sidebar" />
          
          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">{t('nav.logout')}</span>
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;