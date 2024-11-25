import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';
import { useTransactions } from '../context/TransactionContext';
import { Transaction } from '../types';

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions, updateTransaction } = useTransactions();
  const transaction = transactions.find(t => t.id === id);

  if (!transaction) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Transaction not found
        </div>
      </div>
    );
  }

  const handleSubmit = (data: Omit<Transaction, 'id'>) => {
    updateTransaction(id!, { ...data, id: id! });
    navigate('/transactions');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Transaction</h1>
      <div className="bg-white rounded-xl shadow-md p-6">
        <TransactionForm 
          onSubmit={handleSubmit} 
          initialData={transaction}
          buttonText="Update Transaction" 
        />
      </div>
    </div>
  );
};

export default EditTransaction;