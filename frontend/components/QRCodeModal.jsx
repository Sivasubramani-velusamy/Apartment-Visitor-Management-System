import React from 'react';

const QRCodeModal = ({ qrCodeData, onClose }) => {
  if (!qrCodeData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Visitor Pass QR Code</h2>
        <img src={qrCodeData} alt="QR Code" />
        <button
          onClick={onClose}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QRCodeModal;
