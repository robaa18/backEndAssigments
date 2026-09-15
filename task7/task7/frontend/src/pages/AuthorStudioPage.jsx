import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, CheckCircle2, AlertCircle, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AuthorStudioPage = () => {
  const [authorName, setAuthorName] = useState('George Orwell');
  const [nationality, setNationality] = useState('British');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [createdAuthors, setCreatedAuthors] = useState([
    { name: "Naguib Mahfouz", nationality: "Egyptian" },
    { name: "Aldous Huxley", nationality: "British" }
  ]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await api.getAuthors();
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setCreatedAuthors(res.data);
        }
      } catch (err) {
        console.error('Could not load authors:', err);
      }
    };
    fetchAuthors();
  }, []);

  const handleCreateAuthor = async (doc) => {
    setLoading(true);
    setStatus(null);
    try {
      const payload = doc || { name: authorName, nationality };
      const res = await api.createAuthorsCollection(payload);
      setStatus({
        type: 'success',
        text: `Author "${payload.name}" saved successfully!`
      });
      setCreatedAuthors(prev => {
        const exists = prev.some(a => a.name.toLowerCase() === payload.name.toLowerCase());
        return exists ? prev : [{ ...payload }, ...prev];
      });
      if (!doc) {
        setAuthorName('');
        setNationality('');
      }
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } catch (err) {
      setStatus({
        type: 'error',
        text: err.message || 'Could not save author.'
      });
    } finally {
      setLoading(false);
    }
  };

  const sampleAuthors = [
    { name: "Taha Hussein", nationality: "Egyptian" },
    { name: "Tawfiq al-Hakim", nationality: "Egyptian" },
    { name: "George Orwell", nationality: "British" },
    { name: "Jane Austen", nationality: "British" }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-white border border-[#D5D5D8] p-6 rounded-3xl shadow-notebook flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-showcard text-2xl md:text-3xl text-[#2C64AC] tracking-wide">
              AUTHORS & WRITERS
            </h1>
            <span className="text-[#EDCE4B] text-xl">★</span>
          </div>
          <p className="font-papabear text-sm text-[#595667] mt-1">
            Manage celebrated authors and storytellers.
          </p>
        </div>
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

      {/* Form and List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Creation Form */}
        <div className="bg-white border border-[#D5D5D8] p-6 rounded-3xl shadow-notebook space-y-4">
          <div className="pb-3 border-b border-[#EAEAEF]">
            <h3 className="font-showcard text-xl text-[#2C64AC] tracking-wide">
              ADD AN AUTHOR
            </h3>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleCreateAuthor(); }} className="space-y-4">
            <div>
              <label className="block font-papabear text-xs font-bold text-[#ED7CA5] uppercase tracking-wider mb-1 ml-2">
                AUTHOR FULL NAME
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Naguib Mahfouz"
                className="pill-input w-full text-xs"
              />
            </div>

            <div>
              <label className="block font-papabear text-xs font-bold text-[#ED7CA5] uppercase tracking-wider mb-1 ml-2">
                COUNTRY / NATIONALITY
              </label>
              <input
                type="text"
                required
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="e.g. Egyptian"
                className="pill-input w-full text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-full bg-[#2C64AC] hover:bg-[#1E4D8A] text-white font-showcard text-sm tracking-wider shadow-pop-blue flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" /> SAVE AUTHOR
                </>
              )}
            </button>
          </form>

          {/* Quick Examples */}
          <div className="pt-4 border-t border-[#EAEAEF]">
            <span className="font-papabear text-xs font-bold text-[#ED7CA5] uppercase tracking-wider block mb-2">
              QUICK EXAMPLES:
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleAuthors.map((p, idx) => {
                const isAdded = createdAuthors.some(
                  a => a.name.trim().toLowerCase() === p.name.trim().toLowerCase()
                );
                return (
                  <button
                    key={idx}
                    onClick={() => !isAdded && handleCreateAuthor(p)}
                    disabled={isAdded || loading}
                    className={`text-xs px-3 py-1 rounded-full font-papabear font-bold transition-colors ${
                      isAdded
                        ? 'bg-[#EAEAEF] text-[#86837E] cursor-not-allowed border border-[#D5D5D8]'
                        : 'bg-[#EDCE4B]/30 hover:bg-[#EDCE4B] text-[#1E1B2E] border border-[#EDCE4B]/60'
                    }`}
                  >
                    {isAdded ? `✓ ${p.name}` : `+ ${p.name} (${p.nationality})`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Authors List */}
        <div className="bg-white border border-[#D5D5D8] p-6 rounded-3xl shadow-notebook space-y-4">
          <div className="pb-3 border-b border-[#EAEAEF]">
            <h3 className="font-showcard text-xl text-[#2C64AC] tracking-wide">
              REGISTERED AUTHORS
            </h3>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {createdAuthors.map((author, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-2xl bg-[#F4F4F6] border border-[#E5E5EA] flex items-center justify-between text-xs hover:bg-[#ECECEE] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2C64AC] text-white font-showcard flex items-center justify-center text-xs">
                    {author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-papabear font-bold text-sm text-[#1E1B2E]">{author.name}</div>
                    <div className="font-papabear text-xs text-[#595667]">{author.nationality}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
