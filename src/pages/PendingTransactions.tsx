import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { Clock, CheckCircle } from 'lucide-react';

const PendingTransactions = () => {
  const { transactions, updateTransaction } = useTransactions();

  const pendingTransactions = transactions.filter(
    t => t.status === 'pending'
  ).sort((a, b) => new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime());

  const markAsPaid = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      updateTransaction(id, { ...transaction, status: 'paid' });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Transactions</h1>

      <div className="grid gap-4">
        {pendingTransactions.map(transaction => (
          <div
            key={transaction.id}
            className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-amber-100">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Due: {new Date(transaction.dueDate || '').toLocaleDateString()}</span>
                  <span>Category: {transaction.category}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </p>
              
              <button
                onClick={() => markAsPaid(transaction.id)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Paid
              </button>
            </div>
          </div>
        ))}

        {pendingTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No pending transactions found
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingTransactions;