import React, { useState, useEffect, useRef } from 'react';

const PAGE_ORDER = ['library', 'logs', 'authors', 'aggregations', 'admin'];

export const FolioPage = ({ activePage, children }) => {
  const [currentPage, setCurrentPage] = useState(activePage);
  const [animating, setAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const prevPageRef = useRef(activePage);

  useEffect(() => {
    if (activePage === currentPage) return;

    const oldIndex = PAGE_ORDER.indexOf(prevPageRef.current);
    const newIndex = PAGE_ORDER.indexOf(activePage);
    const isForward = newIndex >= oldIndex;

    setAnimating(true);
    setAnimationClass(isForward ? 'page-folding-out-next' : 'page-folding-out-prev');

    const timeout = setTimeout(() => {
      setCurrentPage(activePage);
      setAnimationClass(isForward ? 'page-folding-in-next' : 'page-folding-in-prev');
      prevPageRef.current = activePage;

      const finishTimeout = setTimeout(() => {
        setAnimating(false);
        setAnimationClass('');
      }, 400);

      return () => clearTimeout(finishTimeout);
    }, 400);

    return () => clearTimeout(timeout);
  }, [activePage, currentPage]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-12 pt-0 select-none relative">
      
      {/* THE OPEN NOTEBOOK BINDER (Matching Mockup 3) */}
      <div className="w-full bg-white rounded-b-3xl md:rounded-3xl shadow-notebook border border-[#D5D5D8] flex flex-col md:flex-row relative min-h-[680px] md:min-h-[720px]">
        
        {/* LEFT BLUE BINDER SPINE (Matching Image 3 left blue strip) */}
        <div className="w-full md:w-16 lg:w-20 bg-[#2C64AC] shrink-0 relative flex md:flex-col items-center justify-between p-3 py-4 shadow-book-spine border-b-2 md:border-b-0 md:border-r-2 border-[#1E4A83] rounded-t-2xl md:rounded-tr-none md:rounded-l-3xl">
          
          {/* Rivets / Stitching details */}
          <div className="w-4 h-4 rounded-full bg-[#1E4A83] border border-white/30 shadow-inner" />
          
          <div className="hidden md:flex flex-col items-center gap-6 py-6 opacity-60">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>

          <div className="w-4 h-4 rounded-full bg-[#1E4A83] border border-white/30 shadow-inner" />
        </div>

        {/* MAIN CRISP WHITE NOTEBOOK INTERIOR PAGE */}
        <div className="flex-1 bg-white relative flex flex-col justify-start border-r-[14px] md:border-r-[22px] border-[#DDD8CE] shadow-2xl rounded-r-3xl">
          
          {/* Subtle Crease at the spine boundary */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-10" />

          {/* Page Content Sheet */}
          <div 
            className={`w-full flex-1 p-4 sm:p-6 lg:p-7 pb-12 relative z-20 transition-all duration-300 ${animationClass}`}
            style={{ willChange: 'transform, opacity' }}
          >
            {children}
          </div>

          {/* Floating Girl Mascot: Always visible at bottom-right corner of the screen/notebook */}
          <div className="fixed bottom-3 right-3 sm:right-6 md:right-8 z-40 pointer-events-none select-none animate-float">
            <img 
              src="/girl_floating_cropped.png" 
              alt="Girl riding book mascot" 
              className="w-24 sm:w-32 md:w-40 lg:w-44 h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>

      </div>

    </div>
  );
};
