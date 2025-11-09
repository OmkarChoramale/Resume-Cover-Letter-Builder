
import React, { useState, useCallback } from 'react';
import { ResumeProvider, useResumeStore } from './hooks/useResumeStore.tsx';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';

// The main editor view
const Editor = () => (
  <div className="flex h-screen w-screen font-sans antialiased">
    <Sidebar />
    <main className="flex-1 overflow-y-auto bg-gray-900/50">
      <Preview />
    </main>
  </div>
);

// A component to manage the application's current view
const AppManager = () => {
  // We can use localStorage to persist the auth state
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('is_logged_in'));
  const { activeDocumentId } = useResumeStore();
  
  const handleLoginSuccess = useCallback(() => {
    localStorage.setItem('is_logged_in', 'true');
    setIsAuthenticated(true);
  }, []);
  
  // activeDocumentId determines if we are in the editor or dashboard
  if (!isAuthenticated) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  if (activeDocumentId) {
    return <Editor />;
  }
  
  return <Dashboard />;
};


const App = () => {
  return (
    <ResumeProvider>
      <AppManager />
    </ResumeProvider>
  );
};

export default App;