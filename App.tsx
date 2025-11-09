
import React from 'react';
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';
import { ResumeProvider } from './hooks/useResumeStore';

const App = () => {
  return (
    <ResumeProvider>
      <div className="flex h-screen w-screen font-sans antialiased">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-900/50">
          <Preview />
        </main>
      </div>
    </ResumeProvider>
  );
};

export default App;