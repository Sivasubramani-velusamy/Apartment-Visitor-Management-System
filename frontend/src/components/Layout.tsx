import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

interface User {
  id: string;
  username: string;
  role: 'resident' | 'security';
  flatNumber?: string;
  name?: string;
}

interface LayoutProps {
  children: ReactNode;
  userRole: 'resident' | 'security';
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userRole, user, onLogout }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar userRole={userRole} user={user} onLogout={onLogout} />
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 ml-64 p-6"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;