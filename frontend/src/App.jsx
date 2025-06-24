import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddVisitor from './pages/AddVisitor';
import ViewVisitors from './pages/ViewVisitors';
import SecurityDashboard from './pages/SecurityDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddVisitor />} />
        <Route path="/view-visitors" element={<ViewVisitors />} />
        <Route path="/security-dashboard" element={<SecurityDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
