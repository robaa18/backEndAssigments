import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { BookScrollFolio } from '../components/books/BookScrollFolio';
import { FlipbookReader } from '../components/books/FlipbookReader';
import { BookCard3D } from '../components/books/BookCard3D';
import { 
  Search, Plus, Calendar, Layers, RefreshCw, 
  Trash2, Check, AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LibraryPage = ({ onNavigate }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('shelf');
  const [message, setMessage] = useState(null);

  // Borrowed Books State (synced with logs & localStorage)
  const [borrowedBookIds, setBorrowedBookIds] = useState(() => {
    try {
      const saved = localStorage.getItem('borrowed_books');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Starter Books Added State
  const [starterBooksAdded, setStarterBooksAdded] = useState(() => {
    return localStorage.getItem('starter_books_added') === 'true' || localStorage.getItem('setup_completed') === 'true';
  });

  // Filter States
  const [searchTitle, setSearchTitle] = useState('');
  const [year1, setYear1] = useState(1990);
  const [year2, setYear2] = useState(2010);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [deleteYear, setDeleteYear] = useState(2000);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // New Book Form
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newYear, setNewYear] = useState(2023);
  const [newGenres, setNewGenres] = useState('Stories, Adventure');

  // Load books
  const loadBooks = async (filterType = activeFilter) => {
    setLoading(true);
    setMessage(null);
    try {
      let result = [];
      if (filterType === 'title' && searchTitle.trim()) {
        const res = await api.findBookByTitle(searchTitle.trim());
        result = res.data ? [res.data] : [];
      } else if (filterType === 'yearRange') {
        const res = await api.findBooksBetweenYears(year1, year2);
        result = res.data || [];
      } else if (filterType === 'genre' && selectedGenre) {
        const res = await api.findBooksByGenre(selectedGenre);
        result = res.data || [];
      } else if (filterType === 'skipLimit') {
        const res = await api.getSkipAndLimitBooks();
        result = res.data || [];
      } else if (filterType === 'yearInt') {
        const res = await api.getBooksWithYearInteger();
        result = res.data || [];
      } else if (filterType === 'excludeGenres') {
        const res = await api.getBooksExcludeGenres(['Horror', 'Science Fiction']);
        result = res.data || [];
      } else {
        const res = await api.findBooksBetweenYears(1800, 2100);
        result = res.data || [];
      }

      setBooks(result);
      setActiveFilter(filterType);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Could not load books.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks('all');
    // Sync backend borrow logs to keep borrowed status up to date
    const syncBorrowed = async () => {
      try {
        const res = await api.getAggregate4();
        if (res.data && Array.isArray(res.data)) {
          setBorrowedBookIds(prev => {
            const next = new Set(prev);
            res.data.forEach(item => {
              if (item.action === 'borrowed' && item.book_id) {
                next.add(String(item.book_id));
              }
            });
            try {
              localStorage.setItem('borrowed_books', JSON.stringify(Array.from(next)));
            } catch {}
            return next;
          });
        }
      } catch (e) {
        // quiet fallback to localStorage
      }
    };
    syncBorrowed();
  }, []);

  // Update Year
  const handleUpdateYear = async (title, year) => {
    try {
      await api.updateBookWithTitle(title, { year });
      setMessage({ type: 'success', text: `Updated "${title}" year to ${year}!` });
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
      loadBooks(activeFilter);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Could not update book.' });
    }
  };

  // Add Log (by bookId)
  const handleAddLog = async (bookOrId, action = 'borrowed', bookId = null) => {
    try {
      let resolvedBookId = null;
      let displayTitle = '';

      if (typeof bookOrId === 'object' && bookOrId !== null) {
        resolvedBookId = bookOrId._id || bookOrId.id;
        displayTitle = bookOrId.title;
      } else if (typeof bookOrId === 'string') {
        if (/^[0-9a-fA-F]{24}$/.test(bookOrId)) {
          resolvedBookId = bookOrId;
          const found = books.find(b => String(b._id) === bookOrId);
          displayTitle = found?.title || `Book #${bookOrId.slice(-4)}`;
        } else {
          const found = books.find(b => b.title?.toLowerCase() === bookOrId.toLowerCase());
          resolvedBookId = found?._id || bookId;
          displayTitle = bookOrId;
        }
      }

      if (!resolvedBookId && bookId) {
        resolvedBookId = bookId;
      }

      if (!resolvedBookId) {
        throw new Error('Valid bookId required to record activity.');
      }

      await api.insertLog(String(resolvedBookId), action);
      setMessage({ type: 'success', text: `"${displayTitle || 'Book'}" status recorded: "${action}"!` });
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
      if (action === 'borrowed') {
        setBorrowedBookIds(prev => {
          const next = new Set(prev);
          next.add(String(resolvedBookId));
          if (displayTitle) next.add(displayTitle);
          try {
            localStorage.setItem('borrowed_books', JSON.stringify(Array.from(next)));
          } catch {}
          return next;
        });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Could not save status.' });
    }
  };

  // Delete Books Before Year
  const handleDeleteBeforeYear = async () => {
    try {
      await api.deleteBooksBeforeYear(deleteYear);
      setShowDeleteModal(false);
      setMessage({ type: 'success', text: `Deleted books published before ${deleteYear}!` });
      loadBooks(activeFilter);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Could not delete books.' });
    }
  };

  // Add Single Book
  const handleCreateBook = async (e) => {
    e.preventDefault();
    try {
      const genresArray = newGenres.split(',').map(g => g.trim()).filter(Boolean);
      await api.createBook({
        title: newTitle,
        author: newAuthor,
        year: Number(newYear),
        genres: genresArray
      });
      setShowAddModal(false);
      setNewTitle('');
      setNewAuthor('');
      setMessage({ type: 'success', text: `"${newTitle}" was added to your books!` });
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.7 } });
      loadBooks('all');
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Could not add book.' });
    }
  };

  // Batch Insert
  const handleBatchInsert = async () => {
    if (starterBooksAdded) return;
    const sampleBatch = [
      { title: "Dune", author: "Frank Herbert", year: 1965, genres: ["Adventure", "Classic"] },
      { title: "Foundation", author: "Isaac Asimov", year: 1951, genres: ["Classic"] },
      { title: "Pride and Prejudice", author: "Jane Austen", year: 1993, genres: ["Romance", "Literature"] }
    ];
    try {
      await api.createBooksBatch(sampleBatch);
      setShowBatchModal(false);
      setStarterBooksAdded(true);
      try { localStorage.setItem('starter_books_added', 'true'); } catch {}
      setMessage({ type: 'success', text: 'Added 3 starter books to your library!' });
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      loadBooks('all');
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Could not add starter books.' });
    }
  };

  const genresList = ["Adventure", "Fantasy", "Science Fiction", "Classic", "Romance", "Dystopian"];

  return (
    <div className="space-y-3">
      {/* Top Banner - Sleek and compact */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-[#D5D5D8]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-showcard text-xl sm:text-2xl text-[#1E1B2E] tracking-wide">
              MY BOOKS
            </h1>
            <span className="text-[#EDCE4B] text-lg animate-float">★</span>
            <span className="text-[11px] font-papabear font-bold text-[#595667] bg-[#EAEAEF] px-2 py-0.5 rounded-full ml-1">
              {books.length} in collection
            </span>
          </div>
          <p className="font-papabear text-xs text-[#595667] font-semibold">
            Browse, borrow, search, and manage your library catalogue
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2C64AC] hover:bg-[#204E8A] text-white font-showcard text-xs tracking-wider shadow-xs hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" /> ADD BOOK
          </button>

          <button
            onClick={() => !starterBooksAdded && setShowBatchModal(true)}
            disabled={starterBooksAdded}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-showcard text-xs tracking-wider shadow-xs transition-all ${
              starterBooksAdded
                ? 'bg-[#E2E2E2] text-[#86837e] cursor-not-allowed'
                : 'bg-[#EDCE4B] hover:bg-[#DEBD37] text-[#1E1B2E] hover:scale-105 active:scale-95'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{starterBooksAdded ? 'STARTER BOOKS ✓' : 'ADD STARTER'}</span>
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#FDE5E2] hover:bg-[#EE523F] text-[#EE523F] hover:text-white font-showcard text-xs tracking-wider transition-all border border-[#F6A59D]"
          >
            <Trash2 className="w-3 h-3" /> DELETE OLD
          </button>
        </div>
      </div>

      {/* Message alert */}
      {message && (
        <div className={`p-2.5 rounded-xl font-papabear text-xs flex items-center justify-between shadow-xs ${
          message.type === 'success' 
            ? 'bg-[#EAF7EE] text-[#1E6B34] border border-[#A7E3B6]' 
            : 'bg-[#FDE5E2] text-[#8C2216] border border-[#F6A59D]'
        }`}>
          <div className="flex items-center gap-1.5">
            {message.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="font-bold">{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-xs font-bold underline ml-4">Close</button>
        </div>
      )}

      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="bg-[#F7F7F9] border border-[#E2E2E6] p-3 rounded-2xl space-y-2.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          
          {/* Title Search */}
          <form 
            onSubmit={(e) => { e.preventDefault(); loadBooks('title'); }}
            className="relative flex-1 max-w-md flex items-center"
          >
            <Search className="w-4 h-4 text-[#2C64AC] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Search by book title..."
              className="pill-input w-full pl-9 pr-24 py-1.5 text-xs sm:text-sm bg-white border border-[#D5D5D8]"
            />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1 rounded-full bg-[#2C64AC] hover:bg-[#204E8A] text-white font-showcard text-xs tracking-wider transition-all"
            >
              SEARCH
            </button>
          </form>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 self-end sm:self-center bg-[#E4E4E8] p-1 rounded-full border border-[#D5D5D8]">
            <button
              onClick={() => setViewMode('shelf')}
              className={`px-3 py-1 rounded-full font-papabear font-bold text-xs flex items-center gap-1 transition-all ${
                viewMode === 'shelf' ? 'bg-[#2C64AC] text-white shadow-xs' : 'text-[#595667] hover:text-[#1E1B2E]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">auto_stories</span>
              SHELF
            </button>
            <button
              onClick={() => setViewMode('flipbook')}
              className={`px-3 py-1 rounded-full font-papabear font-bold text-xs flex items-center gap-1 transition-all ${
                viewMode === 'flipbook' ? 'bg-[#2C64AC] text-white shadow-xs' : 'text-[#595667] hover:text-[#1E1B2E]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">menu_book</span>
              READER
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-full font-papabear font-bold text-xs flex items-center gap-1 transition-all ${
                viewMode === 'grid' ? 'bg-[#2C64AC] text-white shadow-xs' : 'text-[#595667] hover:text-[#1E1B2E]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">grid_view</span>
              GRID
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-[#E2E2E6]">
          <button
            onClick={() => loadBooks('all')}
            className={`px-3 py-1 rounded-full font-papabear font-bold text-xs tracking-wider transition-all ${
              activeFilter === 'all' ? 'bg-[#2C64AC] text-white shadow-xs' : 'bg-white text-[#595667] hover:bg-[#ECECED] border border-[#D5D5D8]'
            }`}
          >
            ALL BOOKS
          </button>

          {/* Year Range */}
          <div className="flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-full text-xs font-papabear font-bold border border-[#D5D5D8]">
            <Calendar className="w-3 h-3 text-[#2C64AC]" />
            <span className="text-[#595667]">YEARS:</span>
            <input 
              type="number" 
              value={year1} 
              onChange={(e) => setYear1(e.target.value)} 
              className="w-12 bg-transparent text-center font-bold text-[#2C64AC] outline-none"
            />
            <span>-</span>
            <input 
              type="number" 
              value={year2} 
              onChange={(e) => setYear2(e.target.value)} 
              className="w-12 bg-transparent text-center font-bold text-[#2C64AC] outline-none"
            />
            <button
              onClick={() => loadBooks('yearRange')}
              className="ml-1 text-[10px] font-bold text-[#2C64AC] hover:underline"
            >
              FILTER
            </button>
          </div>

          {/* Featured Picks */}
          <button
            onClick={() => loadBooks('skipLimit')}
            className={`px-3 py-1 rounded-full font-papabear font-bold text-xs tracking-wider transition-all ${
              activeFilter === 'skipLimit' ? 'bg-[#EDCE4B] text-[#1E1B2E] shadow-xs' : 'bg-white text-[#595667] hover:bg-[#ECECED] border border-[#D5D5D8]'
            }`}
          >
            FEATURED
          </button>

          {/* Recorded Years */}
          <button
            onClick={() => loadBooks('yearInt')}
            className={`px-3 py-1 rounded-full font-papabear font-bold text-xs tracking-wider transition-all ${
              activeFilter === 'yearInt' ? 'bg-[#ED7CA5] text-white shadow-xs' : 'bg-white text-[#595667] hover:bg-[#ECECED] border border-[#D5D5D8]'
            }`}
          >
            RECORDED YEARS
          </button>

          {/* Other Categories */}
          <button
            onClick={() => loadBooks('excludeGenres')}
            className={`px-3 py-1 rounded-full font-papabear font-bold text-xs tracking-wider transition-all ${
              activeFilter === 'excludeGenres' ? 'bg-[#EE523F] text-white shadow-xs' : 'bg-white text-[#595667] hover:bg-[#ECECED] border border-[#D5D5D8]'
            }`}
          >
            OTHER CATEGORIES
          </button>

          {/* Refresh */}
          <button
            onClick={() => loadBooks(activeFilter)}
            className="p-1 rounded-full hover:bg-white text-[#2C64AC] ml-auto transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="font-papabear text-[11px] font-bold text-[#595667] mr-0.5">CATEGORIES:</span>
          {genresList.map((g) => (
            <button
              key={g}
              onClick={() => {
                setSelectedGenre(g);
                loadBooks('genre');
              }}
              className={`font-papabear text-[11px] px-2.5 py-0.5 rounded-full font-bold transition-all ${
                selectedGenre === g && activeFilter === 'genre'
                  ? 'bg-[#2C64AC] text-white shadow-xs scale-105'
                  : 'bg-[#EAEAEF] text-[#595667] hover:bg-[#2C64AC] hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* VIEWS */}
      {viewMode === 'shelf' && (
        <BookScrollFolio
          books={books}
          borrowedBookIds={borrowedBookIds}
          onUpdateYear={handleUpdateYear}
          onAddLog={handleAddLog}
          onSelectGenre={(g) => {
            setSelectedGenre(g);
            loadBooks('genre');
          }}
        />
      )}

      {viewMode === 'flipbook' && (
        <FlipbookReader
          books={books}
          borrowedBookIds={borrowedBookIds}
          onUpdateYear={handleUpdateYear}
          onAddLog={handleAddLog}
        />
      )}

      {viewMode === 'grid' && (
        <div className="py-2">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-showcard text-lg text-[#2C64AC] flex items-center gap-2">
              <span>BOOK CATALOGUE GRID</span>
              <span className="text-xs font-papabear font-bold text-[#595667] bg-[#EAEAEF] px-2 py-0.5 rounded-full">
                {books.length} {books.length === 1 ? 'Book' : 'Books'}
              </span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 justify-items-center">
            {books.map((book, idx) => (
              <div key={book._id ? String(book._id) : idx} className="flex justify-center w-full">
                <BookCard3D
                  book={book}
                  isBorrowed={borrowedBookIds.has(String(book._id || book.id || book.title))}
                  onUpdateYear={handleUpdateYear}
                  onAddLog={handleAddLog}
                  onSelectGenre={(g) => {
                    setSelectedGenre(g);
                    loadBooks('genre');
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD BOOK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-notebook border border-[#D5D5D8]">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E2E6]">
              <h3 className="font-showcard text-2xl text-[#2C64AC] tracking-wide">
                ADD A NEW BOOK
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="font-papabear text-sm font-bold text-[#595667] hover:text-[#EE523F]"
              >
                CLOSE
              </button>
            </div>

            <form onSubmit={handleCreateBook} className="space-y-4">
              <div>
                <label className="block font-papabear text-sm font-bold text-[#ED7CA5] uppercase tracking-wider mb-1">
                  BOOK TITLE
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. The Hobbit"
                  className="pill-input w-full text-sm bg-white border border-[#D5D5D8]"
                />
              </div>

              <div>
                <label className="block font-papabear text-sm font-bold text-[#ED7CA5] uppercase tracking-wider mb-1">
                  AUTHOR
                </label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. J.R.R. Tolkien"
                  className="pill-input w-full text-sm bg-white border border-[#D5D5D8]"
                />
              </div>

              <div>
                <label className="block font-papabear text-sm font-bold text-[#ED7CA5] uppercase tracking-wider mb-1">
                  PUBLICATION YEAR
                </label>
                <input
                  type="number"
                  required
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  className="pill-input w-full text-sm bg-white border border-[#D5D5D8]"
                />
              </div>

              <div>
                <label className="block font-papabear text-sm font-bold text-[#ED7CA5] uppercase tracking-wider mb-1">
                  CATEGORIES (COMMA SEPARATED)
                </label>
                <input
                  type="text"
                  value={newGenres}
                  onChange={(e) => setNewGenres(e.target.value)}
                  placeholder="e.g. Fantasy, Adventure, Classic"
                  className="pill-input w-full text-sm bg-white border border-[#D5D5D8]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-full font-papabear text-sm font-bold text-[#595667] hover:bg-[#EAEAEF]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#2C64AC] hover:bg-[#204E8A] text-white font-showcard text-sm tracking-wider shadow-md"
                >
                  SAVE BOOK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BATCH INSERT MODAL */}
      {showBatchModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-notebook border border-[#D5D5D8]">
            <h3 className="font-showcard text-2xl text-[#2C64AC] tracking-wide mb-2">
              ADD STARTER BOOKS
            </h3>
            <p className="font-papabear text-sm text-[#595667] mb-6">
              Would you like to add Dune, Foundation, and Pride and Prejudice to your shelf right away?
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowBatchModal(false)}
                className="px-5 py-2 rounded-full font-papabear text-sm font-bold text-[#595667] hover:bg-[#EAEAEF]"
              >
                CANCEL
              </button>
              <button
                onClick={handleBatchInsert}
                className="px-6 py-2.5 rounded-full bg-[#EDCE4B] hover:bg-[#DEBD37] text-[#1E1B2E] font-showcard text-sm tracking-wider shadow-md"
              >
                YES, ADD THEM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE BEFORE YEAR MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-notebook border border-[#D5D5D8]">
            <h3 className="font-showcard text-2xl text-[#EE523F] tracking-wide mb-2">
              DELETE OLDER BOOKS
            </h3>
            <p className="font-papabear text-sm text-[#595667] mb-4">
              Remove all books published before the chosen year.
            </p>
            <div className="my-4">
              <label className="block font-papabear text-sm font-bold text-[#ED7CA5] uppercase tracking-wider mb-1">
                OLDER THAN YEAR:
              </label>
              <input
                type="number"
                value={deleteYear}
                onChange={(e) => setDeleteYear(e.target.value)}
                className="pill-input w-full text-sm bg-white border border-[#D5D5D8]"
              />
            </div>
            <div className="flex items-center justify-end gap-2.5 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2 rounded-full font-papabear text-sm font-bold text-[#595667] hover:bg-[#EAEAEF]"
              >
                CANCEL
              </button>
              <button
                onClick={handleDeleteBeforeYear}
                className="px-6 py-2.5 rounded-full bg-[#EE523F] hover:bg-[#D73E2C] text-white font-showcard text-sm tracking-wider shadow-md"
              >
                CONFIRM DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
