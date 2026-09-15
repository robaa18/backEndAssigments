import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { LogOut } from 'lucide-react';

export const Navbar = ({ activePage, onNavigate, onLogout, currentUser }) => {
  const [serverOnline, setServerOnline] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      try {
        await api.health();
        if (isMounted) setServerOnline(true);
      } catch (err) {
        if (isMounted) setServerOnline(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { id: 'library', label: 'BOOKS', icon: 'auto_stories' },
    { id: 'logs', label: 'ACTIVITY', icon: 'history' },
    { id: 'authors', label: 'AUTHORS', icon: 'edit_note' },
    { id: 'aggregations', label: 'INSIGHTS', icon: 'bar_chart' },
    { id: 'admin', label: 'SETTINGS', icon: 'tune' },
  ];

  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-2 relative z-30 select-none shrink-0">
      
      {/* Top Utility Bar: Logo, Server Status & Profile */}
      <div className="flex items-center justify-between pb-1.5 px-2">
        {/* Storybook Brand Logo */}
        <div 
          onClick={() => onNavigate('library')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#2C64AC] flex items-center justify-center text-white shadow-pop-blue group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl font-bold">menu_book</span>
          </div>
          <div>
            <span className="font-showcard text-xl sm:text-2xl tracking-wide text-[#2C64AC]">
              MY NOTEBOOK
            </span>
            <span className="hidden sm:inline-block ml-2 font-papabear text-xs text-[#595667] font-bold">
              • Library Edition
            </span>
          </div>
        </div>

        {/* Status Indicator & User Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-papabear font-bold bg-white border border-[#D5D5D8] shadow-xs">
            <span className={`w-2 h-2 rounded-full ${
              serverOnline ? 'bg-[#2C64AC] animate-pulse' : 'bg-[#EE523F]'
            }`} />
            <span className="text-[#1E1B2E]">
              {serverOnline ? 'Online' : 'Reconnecting...'}
            </span>
          </div>

          {currentUser && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="px-3 py-0.5 rounded-full bg-[#ED7CA5] text-white text-xs font-papabear font-bold shadow-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">person</span>
                <span className="max-w-[120px] truncate">{currentUser.name || currentUser.email}</span>
              </div>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-1 rounded-full bg-white hover:bg-[#EE523F] hover:text-white text-[#EE523F] border border-[#D5D5D8] shadow-xs transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* THE NOTEBOOK TOP TABS (Matching Mockup 3) - Completely Locked, No Scroll */}
      <div className="relative flex items-end pl-14 sm:pl-20 pr-2 pt-1 border-b-2 border-[#D5D5D8] overflow-visible select-none">
        
        {/* Pink Ribbon Bookmark Hanging on Left */}
        <div className="absolute left-4 sm:left-6 -top-1 z-40 hidden sm:block pointer-events-none">
          <div className="ribbon-bookmark">
            <div className="w-full pt-2 text-center text-white/90 font-showcard text-[10px]">
              ★
            </div>
          </div>
        </div>

        {/* Tab Row - All 5 Tabs Visible, Non-Scrollable */}
        <div className="flex items-end gap-1 sm:gap-2 overflow-visible">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-t-2xl font-papabear font-bold text-xs sm:text-sm tracking-wider transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white text-[#2C64AC] shadow-tab-active z-20 border-t-[3.5px] border-t-[#2C64AC] border-x border-[#D5D5D8] -mb-[2px]'
                    : 'bg-[#E4E4E8] hover:bg-[#ECECEF] text-[#595667] hover:text-[#1E1B2E] border-t border-x border-[#D5D5D8] z-10'
                }`}
              >
                <span className="material-symbols-outlined text-sm sm:text-base">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
