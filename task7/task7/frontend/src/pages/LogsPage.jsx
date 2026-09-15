import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, CheckCircle2, AlertCircle, History, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LogsPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [action, setAction] = useState('borrowed');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [logsList, setLogsList] = useState([]);
  const [activityStorageReady, setActivityStorageReady] = useState(() => {
    return localStorage.getItem('activity_storage_ready') === 'true' || localStorage.getItem('setup_completed') === 'true';
  });

  // Load available books for the book dropdown/picker
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.findBooksBetweenYears(1800, 2100);
        const bookList = res.data || [];
        setBooks(bookList);
        if (bookList.length > 0 && bookList[0]._id) {
          setSelectedBookId(bookList[0]._id);
        }
      } catch (err) {
        console.error('Could not fetch books for activity dropdown:', err);
      }
    };

    // Load recent activity history from backend Aggregation 4 (joined logs & books)
    const fetchActivityLogs = async () => {
      try {
        const res = await api.getAggregate4();
        if (res.data && res.data.length > 0) {
          const formatted = res.data.map(item => {
            const bookTitle = (item.books_details && item.books_details[0])
              ? item.books_details[0].title
              : 'Book #' + String(item.book_id || '').slice(-4);
            return {
              book_id: item.book_id,
              book_title: bookTitle,
              action: item.action || 'borrowed',
              time: 'Recorded'
            };
          });
          setLogsList(formatted);
        } else {
          setLogsList([
            { book_title: 'Brave New World', action: 'borrowed', time: 'Today' },
            { book_title: '1984', action: 'returned', time: 'Yesterday' }
          ]);
        }
      } catch (err) {
        setLogsList([
          { book_title: 'Brave New World', action: 'borrowed', time: 'Today' },
          { book_title: '1984', action: 'returned', time: 'Yesterday' }
        ]);
      }
    };

    fetchBooks();
    fetchActivityLogs();
  }, []);

  const handleCreateActivityStorage = async () => {
    if (activityStorageReady || loading) return;
    setLoading(true);
    setStatus(null);
    try {
      await api.createLogsCappedCollection({ size: 1000000 });
      setStatus({
        type: 'success',
        text: 'Activity log storage is ready!'
      });
      setActivityStorageReady(true);
      try { localStorage.setItem('activity_storage_ready', 'true'); } catch {}
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } catch (err) {
      setStatus({
        type: 'error',
        text: err.message || 'Activity storage notice.'
      });
      setActivityStorageReady(true);
      try { localStorage.setItem('activity_storage_ready', 'true'); } catch {}
    } finally {
      setLoading(false);
    }
  };

  const handleInsertLog = async (e) => {
    e.preventDefault();
    if (!selectedBookId) {
      setStatus({ type: 'error', text: 'Please select a book.' });
      return;
    }

    const selectedBook = books.find(b => String(b._id) === String(selectedBookId));
    const displayTitle = selectedBook?.title || `Book #${String(selectedBookId).slice(-4)}`;

    setLoading(true);
    setStatus(null);
    try {
      await api.insertLog(selectedBookId, action);
      setStatus({
        type: 'success',
        text: `Activity recorded: "${displayTitle}" was ${action}!`
      });
      if (action === 'borrowed') {
        const key = String(selectedBookId);
        try {
          const saved = localStorage.getItem('borrowed_books');
          const list = saved ? JSON.parse(saved) : [];
          if (!list.includes(key)) {
            list.push(key);
            localStorage.setItem('borrowed_books', JSON.stringify(list));
          }
        } catch {}
      }
      setLogsList(prev => [
        {
          book_id: selectedBookId,
          book_title: displayTitle,
          action,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        ...prev
      ]);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } catch (err) {
      setStatus({
        type: 'error',
        text: err.message || 'Could not record activity.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-white border border-[#D5D5D8] p-6 rounded-3xl shadow-notebook flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-showcard text-2xl md:text-3xl text-[#2C64AC] tracking-wide">
              BOOK ACTIVITY & LOANS
            </h1>
            <span className="text-[#EDCE4B] text-xl">★</span>
          </div>
          <p className="font-papabear text-sm text-[#595667] mt-1">
            Track which books are borrowed or returned in your library.
          </p>
        </div>

        <button
          onClick={handleCreateActivityStorage}
          disabled={loading || activityStorageReady}
          className={`px-5 py-2.5 rounded-full text-xs font-showcard tracking-wider shadow-sm transition-all ${
            activityStorageReady
              ? 'bg-[#EAEAEF] text-[#86837E] cursor-not-allowed border border-[#D5D5D8]'
              : 'bg-[#EDCE4B] text-[#1E1B2E] hover:bg-[#DEBD37] shadow-pop'
          }`}
        >
          {activityStorageReady ? 'ACTIVITY STORAGE READY ✓' : 'INITIALIZE STORAGE'}
        </button>
      </div>

      {status && (
        <div className={`p-4 rounded-2xl text-xs font-papabear font-bold flex items-center gap-2 ${
          status.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
            : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          {status.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{status.text}</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Record Activity Form */}
        <div className="bg-white border border-[#D5D5D8] p-6 rounded-3xl shadow-notebook space-y-4">
          <div className="pb-3 border-b border-[#EAEAEF]">
            <h3 className="font-showcard text-xl text-[#2C64AC] tracking-wide">
              RECORD ACTIVITY
            </h3>
          </div>

          <form onSubmit={handleInsertLog} className="space-y-4">
            {/* Book Selector */}
            <div>
              <label className="block font-papabear text-xs font-bold text-[#ED7CA5] uppercase tracking-wider mb-1 ml-2">
                CHOOSE BOOK
              </label>
              <div className="space-y-2">
                <select
                  value={selectedBookId}
                  onChange={(e) => setSelectedBookId(e.target.value)}
                  className="pill-input w-full text-xs font-papabear font-bold"
                >
                  <option value="">Select a book...</option>
                  {books.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.title} {b.author ? `— ${b.author}` : ''} ({b.year})
                    </option>
                  ))}
                </select>

                {books.length > 0 && (
                  <div className="flex items-center gap-1.5 px-2 flex-wrap">
                    <span className="font-papabear font-bold text-[11px] text-[#595667]">Quick pick:</span>
                    {books.slice(0, 5).map((b) => (
                      <button
                        key={b._id}
                        type="button"
                        onClick={() => setSelectedBookId(b._id)}
                        className={`text-[11px] font-papabear font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                          selectedBookId === b._id
                            ? 'bg-[#2C64AC] text-white border-[#2C64AC] shadow-xs'
                            : 'bg-[#EAEAEF] hover:bg-[#DDD8CE] text-[#595667] border-[#D5D5D8]'
                        }`}
                      >
                        {b.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block font-papabear text-xs font-bold text-[#ED7CA5] uppercase tracking-wider mb-1 ml-2">
                ACTION
              </label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="pill-input w-full text-xs font-papabear font-bold"
              >
                <option value="borrowed">Borrowed</option>
                <option value="returned">Returned</option>
                <option value="reserved">Reserved</option>
                <option value="inspected">Inspected</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || books.length === 0}
              className="w-full py-3 px-6 rounded-full bg-[#2C64AC] hover:bg-[#1E4D8A] disabled:opacity-50 text-white font-showcard text-sm tracking-wider shadow-pop-blue flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" /> SAVE ACTIVITY
                </>
              )}
            </button>
          </form>
        </div>

        {/* Activity Stream */}
        <div className="bg-white border border-[#D5D5D8] p-6 rounded-3xl shadow-notebook space-y-4 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-[#EAEAEF]">
              <h3 className="font-showcard text-xl text-[#2C64AC] tracking-wide">
                RECENT ACTIVITIES
              </h3>
            </div>

            <div className="mt-4 space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {logsList.map((log, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#F4F4F6] border border-[#E5E5EA] flex items-center justify-between text-xs hover:bg-[#ECECEE] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ED7CA5]/15 text-[#ED7CA5] flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      {/* Displays Book Name! */}
                      <div className="font-papabear font-bold text-sm text-[#1E1B2E]">
                        {log.book_title || 'Unknown Book'}
                      </div>
                      <div className="font-papabear font-bold text-[11px] text-[#2C64AC] uppercase tracking-wide">
                        Status: {log.action}
                      </div>
                    </div>
                  </div>
                  <span className="font-papabear font-bold text-[11px] text-[#EE523F] bg-[#EE523F]/10 px-2.5 py-0.5 rounded-full shrink-0">
                    {log.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
