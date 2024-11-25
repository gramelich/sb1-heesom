import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import PendingTransactions from './pages/PendingTransactions';
import Settings from './pages/Settings';
import NewTransaction from './pages/NewTransaction';
import EditTransaction from './pages/EditTransaction';
import { TransactionProvider } from './context/TransactionContext';
import { TelegramProvider } from './context/TelegramContext';

const App = () => {
  return (
    <TransactionProvider>
      <TelegramProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 flex">
            <Navbar />
            <main className="flex-1 ml-64 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/pending" element={<PendingTransactions />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/new" element={<NewTransaction />} />
                <Route path="/edit/:id" element={<EditTransaction />} />
              </Routes>
            </main>
          </div>
        </Router>
      </TelegramProvider>
    </TransactionProvider>
  );
};

export default App;