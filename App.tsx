import React, { useState, useEffect } from 'react';
import DebtAssistant from './components/DebtAssistant';
import MonthlyTracker from './components/MonthlyTracker';
import Dashboard from './components/Dashboard';
import BottomNav from './components/BottomNav';
import AddTransactionModal from './components/AddTransactionModal';
import type { MonthlyExpense, AnalysisResult } from './types';

export type Page = 'dashboard' | 'monthly' | 'debt';

const useStickyState = <T,>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [transactions, setTransactions] = useStickyState<MonthlyExpense[]>([], 'transactions');
  const [analysisResult, setAnalysisResult] = useStickyState<AnalysisResult | null>(null, 'analysisResult');

  const handleAddTransaction = (transaction: Omit<MonthlyExpense, 'id'>) => {
    const newTransaction: MonthlyExpense = {
      ...transaction,
      id: new Date().toISOString(),
    };
    setTransactions(prev => [...prev, newTransaction]);
    setIsModalOpen(false);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard 
                  transactions={transactions} 
                  creditCardAnalysis={analysisResult} 
                />;
      case 'monthly':
        return <MonthlyTracker 
                  transactions={transactions}
                  setTransactions={setTransactions}
                />;
      case 'debt':
        return <DebtAssistant 
                  analysisResult={analysisResult}
                  setAnalysisResult={setAnalysisResult}
                />;
      default:
        return <Dashboard 
                  transactions={transactions} 
                  creditCardAnalysis={analysisResult} 
                />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      <main className="flex-grow p-4 sm:p-6 pb-24"> {/* Padding bottom to avoid overlap with nav */}
        <div className="container mx-auto max-w-lg">
          {renderContent()}
        </div>
      </main>
      <BottomNav activePage={activePage} setActivePage={setActivePage} onAddClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <AddTransactionModal 
          onClose={() => setIsModalOpen(false)} 
          onAddTransaction={handleAddTransaction} 
        />
      )}
    </div>
  );
};

export default App;