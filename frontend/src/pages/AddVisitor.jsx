import React from 'react';
import VisitorForm from '../../components/VisitorForm';

const AddVisitor = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Visitor</h1>
      <VisitorForm />
    </div>
  );
};

export default AddVisitor;
