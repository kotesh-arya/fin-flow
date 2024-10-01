// components/TransactionModal.js
import React, { useState } from "react";
const TransactionModal = ({ isOpen, onClose, onSubmit }) => {
 

 

  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ transactionType, amount, description });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg text-black font-bold text-center mb-4">
          New Transaction
        </h2>

        <form
          onSubmit={handleSubmit}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">
              Transaction Type
            </label>
            <input
              type="text"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="border rounded w-full p-2 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border rounded w-full p-2 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full p-2 text-black"
              required
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="text-gray-600">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
