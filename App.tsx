
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { ResumeProvider } from './hooks/useResumeStore';
import { motion, AnimatePresence } from 'framer-motion';

type View = 'auth' | 'dashboard' | 'editor';

const viewVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

const App = () => {
  const [view, setView] = useState<View>('auth');

  const renderView = () => {
    switch (view) {
      case 'auth':
        return <Auth onLoginSuccess={() => setView('dashboard')} />;
      case 'dashboard':
        return <Dashboard onSelectDocument={() => setView('editor')} />;
      case 'editor':
        return (
          <motion.div 
            key="editor"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={viewVariants}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex h-screen w-screen font-sans antialiased"
          >
            <Sidebar onBackToDashboard={() => setView('dashboard')} className="no-print" />
            <main className="flex-1 overflow-y-auto">
              <Preview />
            </main>
          </motion.div>
        );
      default:
        return <Auth onLoginSuccess={() => setView('dashboard')} />;
    }
  };

  return (
    <ResumeProvider>
      <AnimatePresence mode="wait">
        {renderView()}
      </AnimatePresence>
    </ResumeProvider>
  );
};

export default App;
