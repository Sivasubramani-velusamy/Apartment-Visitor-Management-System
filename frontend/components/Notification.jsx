import React from 'react';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`${bgColor} text-white p-3 rounded fixed top-4 right-4 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>{message}</div>
        <button onClick={onClose} className="ml-4 font-bold">X</button>
      </div>
    </div>
  );
};

export default Notification;
