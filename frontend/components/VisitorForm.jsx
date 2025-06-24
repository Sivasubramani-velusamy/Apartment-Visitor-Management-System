import React, { useState } from 'react';

const VisitorForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);
  const [visitDateTime, setVisitDateTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit visitor data to backend API
    console.log({ name, phone, photo, visitDateTime });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1 font-semibold">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Date & Time of Visit</label>
        <input
          type="datetime-local"
          value={visitDateTime}
          onChange={(e) => setVisitDateTime(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Visitor
      </button>
    </form>
  );
};

export default VisitorForm;
