import React, { useState, useEffect } from 'react';
import api from './services/api';
import { Navbar } from './components/layout/Navbar';
import { FolioPage } from './components/layout/FolioPage';
import { AuthPage } from './pages/AuthPage';
import { LibraryPage } from './pages/LibraryPage';
import { AggregationsPage } from './pages/AggregationsPage';
import { AuthorStudioPage } from './pages/AuthorStudioPage';
import { LogsPage } from './pages/LogsPage';
import { AdminSetupPage } from './pages/AdminSetupPage';

export function App() {
  const [activePage, setActivePage] = useState('library');
  const [currentUser, setCurrentUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = api.getToken();
    const user = api.getUser();
    if (token && user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
    setCheckingAuth(false);
  }, []);

  const handleAuthSuccess = (token, user) => {
    setCurrentUser(user);
    setActivePage('library');
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    setActivePage('auth');
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#D8D8DC] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#2C64AC] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // MANDATORY AUTHENTICATION GATE (Matching Mockup 1)
  if (!currentUser) {
    return (
      <div className="h-screen w-screen max-h-screen bg-[#D8D8DC] flex items-center justify-center p-2 sm:p-4 md:p-6 relative overflow-hidden select-none">
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  // AUTHENTICATED USER EXPERIENCE (The Open Notebook Binder)
  return (
    <div className="min-h-screen bg-[#D8D8DC] text-[#1E1B2E] font-papabear selection:bg-[#ED7CA5] selection:text-white relative overflow-x-hidden flex flex-col justify-between">
      <div className="relative z-10 flex flex-col flex-1">
        {/* Notebook Top Index Tabs Navigation */}
        <Navbar
          activePage={activePage}
          onNavigate={(page) => setActivePage(page)}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* The Open Notebook Binder */}
        <main className="flex-1 flex flex-col pt-0">
          <FolioPage activePage={activePage}>
            {activePage === 'library' && (
              <LibraryPage onNavigate={(page) => setActivePage(page)} />
            )}
            {activePage === 'logs' && (
              <LogsPage />
            )}
            {activePage === 'authors' && (
              <AuthorStudioPage />
            )}
            {activePage === 'aggregations' && (
              <AggregationsPage />
            )}
            {activePage === 'admin' && (
              <AdminSetupPage onNavigate={(page) => setActivePage(page)} />
            )}
          </FolioPage>
        </main>
      </div>

      {/* Project & Creator Footer (Storybook Desk Edition) */}
      <footer className="relative z-10 py-5 px-4 mt-8 border-t border-[#C8C8CC] bg-[#D0D0D4]/70 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-papabear font-bold text-[#595667]">
          
          {/* Route Academy & Instructor */}
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="font-showcard text-base text-[#2C64AC]">MY NOTEBOOK</span>
              <span>•</span>
              <span className="text-[#EE523F]">Task 7 Backend & Frontend </span>
            </div>
            <div className="flex items-center gap-2 text-[12px] flex-wrap justify-center md:justify-start">
              <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-0.5 rounded-full border border-[#D5D5D8] shadow-2xs">
                <img 
                  src="/Route_Logo.png" 
                  alt="Route Academy" 
                  className="w-3.5 h-3.5 rounded-sm object-cover" 
                />
                <span className="font-bold text-[#2C64AC]">Route Academy</span>
              </span>
              <span>•</span>
              <span>Cycle c48 g2</span>
              <span>•</span>
              
            </div>
          </div>

          {/* Developer & Designer Info */}
          <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right">
            <div className="text-sm font-bold text-[#1E1B2E]">
              Built By : Roba Ahmed Moustafa
            </div>
            <p className="text-[12px] text-[#EE523F] font-bold">
              Junior Backend Developer | Professional Graphic Designer
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-xs pt-0.5">
              <a 
                href="https://www.linkedin.com/in/roba-ahmed-6a7450324/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#2C64AC] hover:underline"
              >
                LinkedIn: in/roba-ahmed
              </a>
              <span>•</span>
              <a 
                href="https://github.com/robaa18" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#2C64AC] hover:underline"
              >
                GitHub: robaa18
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default App;
