import React, { useState } from 'react';
import { Bookmark, User, BookOpen, Edit3, Check, ArrowRight } from 'lucide-react';

// Brand Theme Palettes (Style Guide: Blue, Pink, Gold, Coral, Deep Violet, Emerald)
const THEMES = [
  {
    id: 'blue',
    gradient: 'from-[#2C64AC] to-[#1B4377]',
    border: 'border-[#427BC5]',
    text: 'text-white',
    sub: 'text-blue-100',
    badge: 'bg-[#EDCE4B] text-[#1E1B2E]',
    ribbon: 'bg-[#EDCE4B]',
    ribbonIcon: 'text-[#1E1B2E]',
    btnText: 'text-[#2C64AC]',
    btnHover: 'hover:bg-[#EDCE4B] hover:text-[#1E1B2E]',
    accent: '#2C64AC'
  },
  {
    id: 'pink',
    gradient: 'from-[#ED7CA5] to-[#C9547E]',
    border: 'border-[#F4A5C1]',
    text: 'text-white',
    sub: 'text-pink-100',
    badge: 'bg-[#EDCE4B] text-[#1E1B2E]',
    ribbon: 'bg-[#2C64AC]',
    ribbonIcon: 'text-white',
    btnText: 'text-[#ED7CA5]',
    btnHover: 'hover:bg-[#EDCE4B] hover:text-[#1E1B2E]',
    accent: '#ED7CA5'
  },
  {
    id: 'coral',
    gradient: 'from-[#EE523F] to-[#BF3423]',
    border: 'border-[#F58273]',
    text: 'text-white',
    sub: 'text-orange-100',
    badge: 'bg-[#EDCE4B] text-[#1E1B2E]',
    ribbon: 'bg-[#2C64AC]',
    ribbonIcon: 'text-white',
    btnText: 'text-[#EE523F]',
    btnHover: 'hover:bg-[#EDCE4B] hover:text-[#1E1B2E]',
    accent: '#EE523F'
  },
  {
    id: 'gold',
    gradient: 'from-[#EAB308] to-[#CA8A04]',
    border: 'border-[#FDE047]',
    text: 'text-[#1E1B2E]',
    sub: 'text-[#2D283E]',
    badge: 'bg-[#1E1B2E] text-white',
    ribbon: 'bg-[#2C64AC]',
    ribbonIcon: 'text-white',
    btnText: 'text-[#1E1B2E]',
    btnHover: 'hover:bg-[#1E1B2E] hover:text-white',
    accent: '#EAB308'
  },
  {
    id: 'violet',
    gradient: 'from-[#3A3354] to-[#1E1A2E]',
    border: 'border-[#5B5182]',
    text: 'text-white',
    sub: 'text-purple-200',
    badge: 'bg-[#EDCE4B] text-[#1E1B2E]',
    ribbon: 'bg-[#ED7CA5]',
    ribbonIcon: 'text-white',
    btnText: 'text-[#3A3354]',
    btnHover: 'hover:bg-[#EDCE4B] hover:text-[#1E1B2E]',
    accent: '#3A3354'
  },
  {
    id: 'emerald',
    gradient: 'from-[#2B876F] to-[#165645]',
    border: 'border-[#46B396]',
    text: 'text-white',
    sub: 'text-emerald-100',
    badge: 'bg-[#EDCE4B] text-[#1E1B2E]',
    ribbon: 'bg-[#EDCE4B]',
    ribbonIcon: 'text-[#1E1B2E]',
    btnText: 'text-[#2B876F]',
    btnHover: 'hover:bg-[#EDCE4B] hover:text-[#1E1B2E]',
    accent: '#2B876F'
  }
];

const getBookTheme = (book) => {
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

export const BookCard3D = ({ 
  book, 
  onUpdateYear, 
  onAddLog, 
  onSelectGenre,
  isBorrowed: propIsBorrowed,
  onBorrow: propOnBorrow
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingYear, setEditingYear] = useState(false);
  const [newYear, setNewYear] = useState(book.year || 2022);
  const [borrowLoading, setBorrowLoading] = useState(false);

  const bookKey = book._id ? String(book._id) : (book.id ? String(book.id) : book.title);

  const [localBorrowed, setLocalBorrowed] = useState(() => {
    try {
      const saved = localStorage.getItem('borrowed_books');
      const list = saved ? JSON.parse(saved) : [];
      return list.includes(bookKey);
    } catch {
      return false;
    }
  });

  const isBorrowed = propIsBorrowed !== undefined ? propIsBorrowed : localBorrowed;

  const handleBorrow = async (e) => {
    e.stopPropagation();
    if (isBorrowed || borrowLoading) return;
    setBorrowLoading(true);
    try {
      if (propOnBorrow) {
        await propOnBorrow(book);
      } else if (onAddLog) {
        await onAddLog(book._id || book.id || book, 'borrowed', book._id || book.id);
      }
      setLocalBorrowed(true);
      try {
        const saved = localStorage.getItem('borrowed_books');
        const list = saved ? JSON.parse(saved) : [];
        if (!list.includes(bookKey)) {
          list.push(bookKey);
          localStorage.setItem('borrowed_books', JSON.stringify(list));
        }
      } catch {}
    } catch (err) {
      console.error('Error borrowing book:', err);
    } finally {
      setBorrowLoading(false);
    }
  };

  const currentTheme = getBookTheme(book);

  const handleUpdate = async (e) => {
    e.stopPropagation();
    if (onUpdateYear) {
      await onUpdateYear(book.title, Number(newYear));
      setEditingYear(false);
    }
  };

  return (
    <div className="relative w-[215px] sm:w-[230px] h-[270px] perspective-1500 shrink-0 select-none group">
      {/* 3D Book Container */}
      <div 
        className="relative w-full h-full transform-style-3d transition-transform duration-500"
        style={{
          transform: isOpen ? 'rotateY(0deg)' : undefined
        }}
      >
        {/* INTERIOR PAGE (Revealed when book is opened) */}
        <div className="absolute inset-0 bg-[#FFFDF5] rounded-2xl p-3.5 border border-[#E6E2D8] shadow-inner flex flex-col justify-between z-10 font-papabear">
          <div>
            <div className="flex items-center justify-between border-b border-[#EAE6DC] pb-1.5 mb-1.5">
              <span className="font-showcard text-[11px] uppercase tracking-wider text-[#2C64AC]">
                BOOK DETAILS
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="font-papabear text-xs text-[#EE523F] font-bold hover:underline"
              >
                CLOSE
              </button>
            </div>

            <h4 className="font-showcard text-sm sm:text-base text-[#1E1B2E] line-clamp-2 leading-tight">
              {book.title}
            </h4>
            <p className="text-[11px] text-[#2C64AC] font-bold mt-0.5 flex items-center gap-1">
              <User className="w-3 h-3" /> {book.author || 'Unknown Author'}
            </p>

            <div className="mt-2 p-1.5 rounded-lg bg-white border border-[#E6E2D8] text-[10px] text-[#595667]">
              <div><span className="font-bold text-[#1E1B2E]">PUBLISHED:</span> {book.year || 'N/A'}</div>
            </div>

            {/* Categories */}
            <div className="mt-1.5">
              <span className="text-[10px] font-bold text-[#595667] block mb-0.5">CATEGORIES:</span>
              <div className="flex flex-wrap gap-1 max-h-10 overflow-y-auto">
                {Array.isArray(book.genres) && book.genres.length > 0 ? (
                  book.genres.map((g, idx) => (
                    <span
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectGenre && onSelectGenre(g);
                      }}
                      className="cursor-pointer text-[9px] px-2 py-0.5 rounded-full bg-[#EAEAEF] text-[#1E1B2E] font-bold hover:bg-[#2C64AC] hover:text-white transition-colors"
                    >
                      {g}
                    </span>
                  ))
                ) : (
                  <span className="text-[9px] text-[#595667]">General</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Tools Inside Book */}
          <div className="space-y-1 pt-1.5 border-t border-[#EAE6DC]">
            {/* Quick Update Year Tool */}
            {editingYear ? (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  className="w-16 px-1.5 py-0.5 text-xs rounded-lg border border-[#D5D5D8] bg-white outline-none font-bold text-center"
                  placeholder="Year"
                />
                <button
                  onClick={handleUpdate}
                  className="px-2 py-0.5 rounded-lg bg-[#2C64AC] text-white text-[10px] font-bold hover:bg-[#204E8A] transition-colors"
                >
                  SAVE
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setEditingYear(false); }}
                  className="px-1 py-0.5 text-[10px] text-[#595667]"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); setEditingYear(true); }}
                className="w-full flex items-center justify-center gap-1 py-1 rounded-lg text-[10px] font-bold bg-[#EAEAEF] hover:bg-[#DEDEE4] text-[#1E1B2E] transition-all"
              >
                <Edit3 className="w-3 h-3" /> CHANGE YEAR
              </button>
            )}

            {/* Borrow Action Button */}
            <div>
              <button
                onClick={handleBorrow}
                disabled={isBorrowed || borrowLoading}
                className={`w-full py-1.5 px-2 rounded-xl text-[11px] font-showcard tracking-wider flex items-center justify-center gap-1 transition-all ${
                  isBorrowed
                    ? 'bg-[#EAE7DE] text-[#86837E] cursor-not-allowed border border-[#D6D3CA]'
                    : 'bg-[#2C64AC] hover:bg-[#204E8A] text-white shadow-xs hover:scale-[1.01]'
                }`}
              >
                {isBorrowed ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                    <span>BORROWED</span>
                  </>
                ) : borrowLoading ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>SAVING...</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3 h-3" />
                    <span>BORROW BOOK</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* FRONT HARDCOVER (Hinges open in 3D) */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`book-cover-hinge absolute inset-0 rounded-2xl bg-gradient-to-br ${currentTheme.gradient} p-3.5 shadow-book flex flex-col justify-between cursor-pointer book-spine-effect z-20 ${
            isOpen ? 'is-open' : ''
          }`}
          style={{
            transformOrigin: 'left center',
          }}
        >
          {/* Borrowed Status Badge on Front Cover */}
          {isBorrowed && (
            <div className="absolute top-2.5 left-2.5 bg-white text-emerald-800 border border-emerald-300 text-[8px] font-showcard px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs z-10">
              <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
              <span>BORROWED</span>
            </div>
          )}

          {/* Spine Ribbon Marker */}
          <div className={`absolute top-0 right-4 w-3.5 h-6 ${currentTheme.ribbon} shadow-xs rounded-b-xs flex items-center justify-center ${currentTheme.ribbonIcon}`}>
            <Bookmark className="w-2 h-2" />
          </div>

          {/* Year Top Tag */}
          <div className={`flex items-center gap-1 ${currentTheme.text} text-[10px] font-showcard uppercase tracking-wider opacity-90`}>
            <BookOpen className="w-3 h-3" />
            <span>{book.year ? `YEAR ${book.year}` : 'STORY'}</span>
          </div>

          {/* Book Title & Author in Showcard & Papa Bear */}
          <div className="my-auto text-center px-1">
            <div className="w-6 h-0.5 bg-white/40 mx-auto mb-2 rounded-full" />
            <h3 className={`font-showcard text-base sm:text-lg leading-tight line-clamp-2 drop-shadow-xs ${currentTheme.text}`}>
              {book.title}
            </h3>
            <div className="w-6 h-0.5 bg-white/40 mx-auto mt-2 rounded-full" />
            <p className={`font-papabear text-[11px] font-bold mt-1 tracking-wide line-clamp-1 ${currentTheme.sub}`}>
              {book.author || 'Unknown'}
            </p>
          </div>

          {/* Cover Footer & Actions */}
          <div className="pt-1.5 border-t border-white/20 flex items-center justify-between text-xs">
            <span className={`text-[9px] font-papabear font-bold px-2 py-0.5 rounded-full ${currentTheme.badge} line-clamp-1 max-w-[80px]`}>
              {Array.isArray(book.genres) && book.genres[0] ? book.genres[0] : 'General'}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleBorrow}
                disabled={isBorrowed || borrowLoading}
                className={`px-2 py-0.5 rounded-full text-[9px] font-showcard tracking-wider flex items-center gap-0.5 transition-all ${
                  isBorrowed
                    ? 'bg-white/85 text-[#595667] cursor-not-allowed'
                    : `bg-white ${currentTheme.btnText} ${currentTheme.btnHover} shadow-2xs hover:scale-105 active:scale-95`
                }`}
              >
                {isBorrowed ? (
                  <>
                    <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" /> BORROWED
                  </>
                ) : borrowLoading ? (
                  <>
                    <span className="w-2 h-2 border-2 border-current border-t-transparent rounded-full animate-spin" /> ...
                  </>
                ) : (
                  <>
                    <Bookmark className="w-2.5 h-2.5" /> BORROW
                  </>
                )}
              </button>
              <span className={`text-[8px] font-papabear font-bold ${currentTheme.text} flex items-center gap-0.5 opacity-90`}>
                OPEN <ArrowRight className="w-2 h-2" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

