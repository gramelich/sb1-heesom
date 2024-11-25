import React from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';
import { useTransactions } from '../context/TransactionContext';
import { Transaction } from '../types';

const NewTransaction = () => {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  const handleSubmit = (data: Omit<Transaction, 'id'>) => {
    addTransaction(data);
    navigate('/transactions');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">New Transaction</h1>
      <div className="bg-white rounded-xl shadow-md p-6">
        <TransactionForm onSubmit={handleSubmit} buttonText="Create Transaction" />
      </div>
    </div>
  );
};

export default NewTransaction;