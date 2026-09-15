import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, Check, BookOpen, Edit3, User, Sparkles } from 'lucide-react';

const THEMES = [
  {
    gradient: 'from-[#2C64AC] to-[#1B4377]',
    border: 'border-white/30',
    text: 'text-white',
    sub: 'text-blue-100',
    badge: 'bg-[#EDCE4B] text-[#1E1B2E]',
    ribbon: 'bg-[#EDCE4B]',
    btnText: 'text-[#2C64AC]',
    accent: '#2C64AC'
  },
  {
    gradient: 'from-[#ED7CA5] to-[#C9547E]',
    border: 'border-white/30',
    text: 'text-white',
    sub: 'text-pink-100',
    badge: 'bg-[#EDCE4B] text-[#1E1B2E]',
    ribbon: 'bg-[#2C64AC]',
    btnText: 'text-[#ED7CA5]',
    accent: '#ED7CA5'
  },
  {
    gradient: 'from-[#EE523F] to-[#BF3423]',
    border: 'border-white/30',
    text: 'text-white',
    sub: 'text-orange-100',
    badge: 'bg-[#EDCE4B] text-[#1E1B2E]',
    ribbon: 'bg-[#2C64AC]',
    btnText: 'text-[#EE523F]',
    accent: '#EE523F'
  },
  {
    gradient: 'from-[#EAB308] to-[#CA8A04]',
    border: 'border-black/20',
    text: 'text-[#1E1B2E]',
    sub: 'text-[#2D283E]',
    badge: 'bg-[#1E1B2E] text-white',
    ribbon: 'bg-[#2C64AC]',
    btnText: 'text-[#1E1B2E]',
    accent: '#EAB308'
  },
  {
    gradient: 'from-[#3A3354] to-[#1E1A2E]',
    border: 'border-white/30',
    text: 'text-white',
    sub: 'text-purple-200',
    badge: 'bg-[#EDCE4B] text-[#1E1B2E]',
    ribbon: 'bg-[#ED7CA5]',
    btnText: 'text-[#3A3354]',
    accent: '#3A3354'
  },
  {
    gradient: 'from-[#2B876F] to-[#165645]',
    border: 'border-white/30',
    text: 'text-white',
    sub: 'text-emerald-100',
    badge: 'bg-[#EDCE4B] text-[#1E1B2E]',
    ribbon: 'bg-[#EDCE4B]',
    btnText: 'text-[#2B876F]',
    accent: '#2B876F'
  }
];

const getReaderTheme = (book) => {
  const genre = Array.isArray(book?.genres) && book.genres[0] ? book.genres[0].toLowerCase() : '';
  if (genre.includes('fantasy') || genre.includes('magic')) return THEMES[0];
  if (genre.includes('romance') || genre.includes('drama')) return THEMES[1];
  if (genre.includes('dystopian') || genre.includes('horror') || genre.includes('war')) return THEMES[2];
  if (genre.includes('adventure') || genre.includes('classic') || genre.includes('fiction')) return THEMES[3];
  if (genre.includes('science') || genre.includes('space') || genre.includes('future')) return THEMES[4];
  if (genre.includes('mystery') || genre.includes('crime')) return THEMES[5];
  
  const hash = (book?.title || 'Story').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return THEMES[hash % THEMES.length];
};

export const FlipbookReader = ({ books = [], onUpdateYear, onAddLog, borrowedBookIds }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [turningPage, setTurningPage] = useState(false);
  const [turnDirection, setTurnDirection] = useState('next');
  const [borrowLoading, setBorrowLoading] = useState(false);
  const [editingYear, setEditingYear] = useState(false);
  const [newYear, setNewYear] = useState(2022);

  const [localBorrowedList, setLocalBorrowedList] = useState(() => {
    try {
      const saved = localStorage.getItem('borrowed_books');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  if (!books || books.length === 0) return null;

  const currentBook = books[currentIndex] || books[0];
  const currentBookKey = currentBook?._id ? String(currentBook._id) : (currentBook?.id ? String(currentBook.id) : currentBook?.title);
  const isCurrentBorrowed = (borrowedBookIds && borrowedBookIds.has(currentBookKey)) || localBorrowedList.includes(currentBookKey);
  const theme = getReaderTheme(currentBook);

  const handleBorrow = async () => {
    if (!currentBook || isCurrentBorrowed || borrowLoading) return;
    setBorrowLoading(true);
    try {
      if (onAddLog && currentBook) {
        await onAddLog(currentBook._id || currentBook.id || currentBook, 'borrowed', currentBook._id || currentBook.id);
      }
      setLocalBorrowedList(prev => {
        const next = [...prev, currentBookKey];
        try {
          localStorage.setItem('borrowed_books', JSON.stringify(next));
        } catch {}
        return next;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setBorrowLoading(false);
    }
  };

  const handleTurn = (direction) => {
    if (turningPage) return;
    const nextIdx = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIdx < 0 || nextIdx >= books.length) return;

    setTurnDirection(direction);
    setTurningPage(true);
    setEditingYear(false);

    setTimeout(() => {
      setCurrentIndex(nextIdx);
      setTimeout(() => {
        setTurningPage(false);
      }, 350);
    }, 350);
  };

  const handleSaveYear = async () => {
    if (onUpdateYear && currentBook) {
      await onUpdateYear(currentBook.title, Number(newYear));
      setEditingYear(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-1 p-3 sm:p-4 bg-white rounded-3xl shadow-notebook border border-[#D5D5D8]">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#EAEAEF]">
        <div className="flex items-center gap-2 text-[#2C64AC]">
          <BookOpen className="w-4 h-4 text-[#2C64AC]" />
          <h3 className="font-showcard text-base sm:text-lg text-[#2C64AC] tracking-wide flex items-center gap-2">
            <span>FLIPBOOK READER</span>
            <span className="text-[11px] font-papabear font-bold text-[#595667] bg-[#EAEAEF] px-2 py-0.5 rounded-full">
              {currentIndex + 1} / {books.length}
            </span>
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleTurn('prev')}
            disabled={currentIndex === 0 || turningPage}
            className="p-1 rounded-full bg-[#EAEAEF] hover:bg-[#DDD8CE] disabled:opacity-30 text-[#2C64AC] shadow-xs transition-all active:scale-95"
            title="Previous Book"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleTurn('next')}
            disabled={currentIndex === books.length - 1 || turningPage}
            className="p-1 rounded-full bg-[#EAEAEF] hover:bg-[#DDD8CE] disabled:opacity-30 text-[#2C64AC] shadow-xs transition-all active:scale-95"
            title="Next Book"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dual Page Open Book Spread */}
      <div 
        className="relative w-full min-h-[250px] sm:min-h-[280px] rounded-2xl shadow-book border border-[#D5D5D8] overflow-hidden flex flex-col md:flex-row transform-style-3d"
        style={{ perspective: '1600px' }}
      >
        {/* Central Spine Shadow */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/10 via-black/25 to-black/10 pointer-events-none z-30" />

        {/* Left Page: Storybook Hardcover Visual */}
        <div className={`w-full md:w-1/2 p-4 sm:p-5 border-b md:border-b-0 md:border-r border-[#EAEAEF] flex flex-col justify-between bg-gradient-to-br ${theme.gradient} relative z-20`}>
          {/* Top Tag & Bookmark Ribbon */}
          <div className="flex items-center justify-between text-xs font-papabear font-bold text-white/90">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> STORYBOOK EDITION
            </span>
            <div className={`w-4 h-7 ${theme.ribbon} rounded-b-xs shadow-sm flex items-center justify-center text-white`}>
              <Bookmark className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* Book Title & Cover Art */}
          <div className="my-auto text-center px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto mb-2.5 shadow-inner">
              <Sparkles className="w-5 h-5 text-[#EDCE4B]" />
            </div>
            <h2 className={`font-showcard text-xl sm:text-2xl ${theme.text} leading-tight drop-shadow-md line-clamp-2`}>
              {currentBook?.title}
            </h2>
            <div className="w-8 h-0.5 bg-white/40 mx-auto my-2 rounded-full" />
            <p className={`font-papabear text-xs sm:text-sm font-bold ${theme.sub}`}>
              By {currentBook?.author || 'Unknown Author'}
            </p>
            <span className={`inline-block mt-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-papabear font-bold ${theme.badge} shadow-xs`}>
              YEAR {currentBook?.year || 'N/A'}
            </span>
          </div>

          {/* Cover Bottom Status */}
          <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.badge}`}>
              {Array.isArray(currentBook?.genres) && currentBook.genres[0] ? currentBook.genres[0] : 'General'}
            </span>
            {isCurrentBorrowed && (
              <span className="inline-flex items-center gap-1 bg-white text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                <Check className="w-3 h-3 text-emerald-600 stroke-[3]" /> BORROWED
              </span>
            )}
          </div>
        </div>

        {/* Right Page: Book Parchment Details */}
        <div 
          className={`w-full md:w-1/2 p-6 flex flex-col justify-between bg-[#FFFDF8] transition-all duration-300 relative z-20 ${
            turningPage 
              ? turnDirection === 'next' ? 'page-folding-out-next' : 'page-folding-in-prev'
              : ''
          }`}
          style={{ transformOrigin: 'left center' }}
        >
          <div>
            <div className="pb-2 border-b border-[#EAE6DC] flex items-center justify-between">
              <span className="font-showcard text-xs text-[#2C64AC] tracking-wider uppercase">LIBRARY ARCHIVE SHEET</span>
              <span className="text-[11px] font-papabear font-bold text-[#595667]">NO. #{currentIndex + 1}</span>
            </div>

            <div className="mt-3 space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider font-papabear font-bold text-[#ED7CA5] block">
                  AUTHOR / CREATOR
                </label>
                <p className="font-papabear text-sm font-bold text-[#1E1B2E] flex items-center gap-1.5 mt-0.5">
                  <User className="w-3.5 h-3.5 text-[#2C64AC]" /> {currentBook?.author || 'Not specified'}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-wider font-papabear font-bold text-[#ED7CA5] block">
                    PUBLICATION YEAR
                  </label>
                  {!editingYear && (
                    <button 
                      onClick={() => { setEditingYear(true); setNewYear(currentBook?.year || 2022); }}
                      className="text-[10px] font-bold text-[#2C64AC] hover:underline flex items-center gap-0.5"
                    >
                      <Edit3 className="w-2.5 h-2.5" /> Edit
                    </button>
                  )}
                </div>
                {editingYear ? (
                  <div className="flex items-center gap-1.5 mt-1">
                    <input
                      type="number"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-20 px-2 py-0.5 text-xs rounded-lg border border-[#D5D5D8] bg-white font-bold"
                    />
                    <button
                      onClick={handleSaveYear}
                      className="px-2.5 py-0.5 rounded-lg bg-[#2C64AC] text-white text-[10px] font-bold hover:bg-[#204E8A]"
                    >
                      SAVE
                    </button>
                    <button
                      onClick={() => setEditingYear(false)}
                      className="text-xs text-[#595667]"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <p className="font-papabear text-sm font-bold text-[#1E1B2E] mt-0.5">
                    {currentBook?.year || 'N/A'}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider font-papabear font-bold text-[#ED7CA5] block">
                  CATEGORIES & TAGS
                </label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {Array.isArray(currentBook?.genres) && currentBook.genres.length > 0 ? (
                    currentBook.genres.map((g, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-[#EAEAEF] text-[#1E1B2E] text-[10px] font-papabear font-bold"
                      >
                        {g}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] font-papabear text-[#595667] italic">General</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Borrow Action */}
          <div className="pt-3 flex items-center justify-between border-t border-[#EAE6DC]">
            <button
              onClick={handleBorrow}
              disabled={isCurrentBorrowed || borrowLoading}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-showcard tracking-wider transition-all ${
                isCurrentBorrowed
                  ? 'bg-[#EAEAEF] text-[#86837E] cursor-not-allowed border border-[#D5D5D8]'
                  : 'bg-[#2C64AC] text-white hover:bg-[#204E8A] hover:scale-105 shadow-md'
              }`}
            >
              {isCurrentBorrowed ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> BOOK BORROWED
                </>
              ) : borrowLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> BORROWING...
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" /> BORROW THIS BOOK
                </>
              )}
            </button>
            <span className="text-[10px] font-papabear font-bold text-[#595667]">
              Page {currentIndex + 1} of {books.length}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Jump Book Thumbnails Strip */}
      {books.length > 1 && (
        <div className="mt-3 pt-2 border-t border-[#EAEAEF] flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <span className="text-[10px] font-papabear font-bold text-[#595667] shrink-0 mr-1">JUMP TO:</span>
          {books.map((b, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrentIndex(idx); setEditingYear(false); }}
              className={`px-2.5 py-1 rounded-full text-[10px] font-papabear font-bold shrink-0 transition-all ${
                idx === currentIndex
                  ? 'bg-[#2C64AC] text-white shadow-xs scale-105'
                  : 'bg-[#F0F0F4] text-[#595667] hover:bg-[#E2E2E8]'
              }`}
            >
              {b.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
