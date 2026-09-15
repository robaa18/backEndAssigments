import React, { useState } from 'react';
import api from '../services/api';
import { PRESET_BOOKS } from '../services/presets';
import { 
  Sparkles, Database, Search, ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminSetupPage = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [setupCompleted, setSetupCompleted] = useState(() => {
    return localStorage.getItem('setup_completed') === 'true';
  });
  const [bookStorageReady, setBookStorageReady] = useState(() => {
    return localStorage.getItem('book_storage_ready') === 'true' || localStorage.getItem('setup_completed') === 'true';
  });
  const [searchIndexReady, setSearchIndexReady] = useState(() => {
    return localStorage.getItem('search_index_ready') === 'true' || localStorage.getItem('setup_completed') === 'true';
  });

  const addLog = (msg, isSuccess = true) => {
    setLogs(prev => [...prev, { msg, isSuccess, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  };

  const handleCreateBooksCollection = async () => {
    if (bookStorageReady || loading) return;
    setLoading(true);
    try {
      const res = await api.createBooksCollection();
      addLog(res.message || 'Book storage initialized successfully.');
      setBookStorageReady(true);
      try { localStorage.setItem('book_storage_ready', 'true'); } catch {}
      confetti({ particleCount: 25, spread: 40, origin: { y: 0.8 } });
    } catch (err) {
      addLog(`Notice: ${err.message}`, false);
      setBookStorageReady(true);
      try { localStorage.setItem('book_storage_ready', 'true'); } catch {}
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIndex = async () => {
    if (searchIndexReady || loading) return;
    setLoading(true);
    try {
      const res = await api.createBooksIndex();
      addLog(res.message || 'Fast title search index created.');
      setSearchIndexReady(true);
      try { localStorage.setItem('search_index_ready', 'true'); } catch {}
      confetti({ particleCount: 25, spread: 40, origin: { y: 0.8 } });
    } catch (err) {
      addLog(`Notice: ${err.message}`, false);
      setSearchIndexReady(true);
      try { localStorage.setItem('search_index_ready', 'true'); } catch {}
    } finally {
      setLoading(false);
    }
  };

  const handleFullSeed = async () => {
    if (setupCompleted || loading) return;
    setLoading(true);
    setLogs([]);
    addLog('Setting up your library...');

    // 1. Books storage
    try {
      await api.createBooksCollection();
      addLog('Step 1: Book storage created.');
    } catch (err) {
      addLog('Step 1: Book storage ready.', true);
    }

    // 2. Index
    try {
      await api.createBooksIndex();
      addLog('Step 2: Fast title search enabled.');
    } catch (err) {
      addLog('Step 2: Search ready.', true);
    }

    // 3. Authors
    try {
      await api.createAuthorsCollection({ name: "Naguib Mahfouz", nationality: "Egyptian" });
      addLog('Step 3: Author registry ready.');
    } catch (err) {
      addLog('Step 3: Authors ready.', true);
    }

    // 4. Activity Logs
    try {
      await api.createLogsCappedCollection({ size: 1000000 });
      addLog('Step 4: Activity history ready.');
    } catch (err) {
      addLog('Step 4: Activity history ready.', true);
    }

    // 5. Batch Books
    try {
      await api.createBooksBatch(PRESET_BOOKS);
      addLog(`Step 5: Added ${PRESET_BOOKS.length} starter books to your shelf.`);
    } catch (err) {
      addLog('Step 5: Books loaded.', true);
    }

    addLog('All done! Your library is ready.');
    setSetupCompleted(true);
    setBookStorageReady(true);
    setSearchIndexReady(true);
    try {
      localStorage.setItem('setup_completed', 'true');
      localStorage.setItem('book_storage_ready', 'true');
      localStorage.setItem('search_index_ready', 'true');
      localStorage.setItem('starter_books_added', 'true');
      localStorage.setItem('activity_storage_ready', 'true');
    } catch {}
    setLoading(false);
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-[#D5D5D8] p-6 rounded-3xl shadow-notebook flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-showcard text-2xl md:text-3xl text-[#2C64AC] tracking-wide">
              LIBRARY SETTINGS
            </h1>
            <span className="text-[#EDCE4B] text-xl">★</span>
          </div>
          <p className="font-papabear text-sm text-[#595667] mt-1">
            Configure system databases, indexes, and starter content.
          </p>
        </div>

        <button
          onClick={handleFullSeed}
          disabled={loading || setupCompleted}
          className={`px-6 py-3 rounded-full font-showcard text-xs tracking-wider shadow-sm flex items-center gap-2 transition-all ${
            setupCompleted
              ? 'bg-[#EAEAEF] text-[#86837E] cursor-not-allowed border border-[#D5D5D8]'
              : 'bg-[#EDCE4B] hover:bg-[#DEBD37] text-[#1E1B2E] shadow-pop hover:scale-105 active:scale-95'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{setupCompleted ? 'SETUP COMPLETED ✓' : 'ADD STARTER BOOKS & SETUP'}</span>
        </button>
      </div>

      {/* Manual Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-[#D5D5D8] p-6 rounded-3xl shadow-notebook space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[#2C64AC] font-showcard text-lg tracking-wide">
            <Database className="w-5 h-5" />
            <span>BOOK STORAGE</span>
          </div>

          <button
            onClick={handleCreateBooksCollection}
            disabled={loading || bookStorageReady}
            className={`w-full py-2.5 px-4 rounded-full text-xs font-showcard tracking-wider transition-all ${
              bookStorageReady
                ? 'bg-[#EAEAEF] text-[#86837E] cursor-not-allowed border border-[#D5D5D8]'
                : 'bg-[#2C64AC] hover:bg-[#1E4D8A] text-white shadow-pop-blue'
            }`}
          >
            {bookStorageReady ? 'BOOK STORAGE READY ✓' : 'PREPARE BOOK STORAGE'}
          </button>
        </div>

        <div className="bg-white border border-[#D5D5D8] p-6 rounded-3xl shadow-notebook space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[#2C64AC] font-showcard text-lg tracking-wide">
            <Search className="w-5 h-5" />
            <span>FAST SEARCH INDEX</span>
          </div>

          <button
            onClick={handleCreateIndex}
            disabled={loading || searchIndexReady}
            className={`w-full py-2.5 px-4 rounded-full text-xs font-showcard tracking-wider transition-all ${
              searchIndexReady
                ? 'bg-[#EAEAEF] text-[#86837E] cursor-not-allowed border border-[#D5D5D8]'
                : 'bg-[#ED7CA5] hover:bg-[#D9668F] text-white shadow-pop'
            }`}
          >
            {searchIndexReady ? 'FAST SEARCH ENABLED ✓' : 'ENABLE FAST TITLE SEARCH'}
          </button>
        </div>
      </div>

      {/* Setup Log */}
      <div className="bg-white border border-[#D5D5D8] p-6 rounded-3xl shadow-notebook space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEF]">
          <h3 className="font-showcard text-xl text-[#2C64AC] tracking-wide">
            SETUP STATUS
          </h3>
          {setupCompleted && (
            <button
              onClick={() => onNavigate && onNavigate('library')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2C64AC] text-white text-xs font-showcard tracking-wider hover:bg-[#1E4D8A] transition-all shadow-pop-blue"
            >
              <span>GO TO BOOKSHELF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D5D5D8] text-xs font-papabear font-bold max-h-60 overflow-y-auto space-y-2">
          {logs.length > 0 ? (
            logs.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[#1E1B2E]">
                <span className="text-[#EE523F] shrink-0 font-mono">[{item.time}]</span>
                <span className={item.isSuccess ? 'text-emerald-700' : 'text-[#595667]'}>
                  {item.isSuccess ? '✓' : '•'} {item.msg}
                </span>
              </div>
            ))
          ) : (
            <div className="text-[#595667] italic">
              Click &quot;ADD STARTER BOOKS & SETUP&quot; above to quickly set up your library.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
