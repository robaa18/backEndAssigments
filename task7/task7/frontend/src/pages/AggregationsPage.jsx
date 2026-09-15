import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { BarChart3, Calendar, RefreshCw, BookOpen } from 'lucide-react';

export const AggregationsPage = () => {
  const [activeTab, setActiveTab] = useState('agg1');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yearParam, setYearParam] = useState(2000);
  const [error, setError] = useState(null);

  const runAggregation = async (tab = activeTab) => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (tab === 'agg1') {
        res = await api.getAggregate1(yearParam);
      } else if (tab === 'agg2') {
        res = await api.getAggregate2(yearParam);
      } else if (tab === 'agg3') {
        res = await api.getAggregate3();
      } else if (tab === 'agg4') {
        res = await api.getAggregate4();
      }
      setResults(res?.data || []);
      setActiveTab(tab);
    } catch (err) {
      setError(err.message || 'Could not load insights.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAggregation('agg1');
  }, []);

  const tabDescriptions = {
    agg1: 'Books published after your chosen year, sorted from newest to oldest.',
    agg2: 'Clean summary showing titles, authors, and years.',
    agg3: 'List of books broken down by each category.',
    agg4: 'History of borrowed and returned books.'
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#D5D5D8] p-6 rounded-3xl shadow-notebook flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-showcard text-2xl md:text-3xl text-[#2C64AC] tracking-wide">
              BOOK INSIGHTS
            </h1>
            <span className="text-[#EDCE4B] text-xl">★</span>
          </div>
          <p className="font-papabear text-sm text-[#595667] mt-1">
            {tabDescriptions[activeTab]}
          </p>
        </div>

        {/* Year Filter for Tab 1 & 2 */}
        {(activeTab === 'agg1' || activeTab === 'agg2') && (
          <div className="flex items-center gap-2 bg-[#EAEAEF] px-4 py-2 rounded-full border border-[#D5D5D8] shadow-xs">
            <Calendar className="w-4 h-4 text-[#2C64AC]" />
            <span className="font-papabear text-xs font-bold text-[#595667]">PUBLISHED AFTER:</span>
            <input
              type="number"
              value={yearParam}
              onChange={(e) => setYearParam(e.target.value)}
              className="w-16 bg-transparent text-center font-papabear font-bold text-[#2C64AC] text-sm focus:outline-none"
            />
            <button
              onClick={() => runAggregation(activeTab)}
              className="px-4 py-1 rounded-full bg-[#2C64AC] text-white text-xs font-showcard tracking-wider hover:bg-[#1E4D8A] transition-all"
            >
              UPDATE
            </button>
          </div>
        )}
      </div>

      {/* Tabs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { id: 'agg1', label: 'RECENT BOOKS', icon: 'auto_stories' },
          { id: 'agg2', label: 'BOOK SUMMARY', icon: 'view_agenda' },
          { id: 'agg3', label: 'CATEGORY VIEW', icon: 'category' },
          { id: 'agg4', label: 'LOAN HISTORY', icon: 'history' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => runAggregation(tab.id)}
            className={`p-4 rounded-2xl text-left transition-all duration-300 border ${
              activeTab === tab.id
                ? 'bg-[#2C64AC] text-white shadow-pop-blue scale-[1.02] border-[#2C64AC]'
                : 'bg-white text-[#595667] hover:bg-[#F4F4F6] hover:text-[#2C64AC] border-[#D5D5D8] shadow-notebook'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="material-symbols-outlined text-2xl">{tab.icon}</span>
            </div>
            <div className="font-showcard text-sm tracking-wide">{tab.label}</div>
          </button>
        ))}
      </div>

      {/* Results Section */}
      <div className="bg-white border border-[#D5D5D8] p-6 rounded-3xl shadow-notebook space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEF]">
          <h4 className="font-showcard text-xl text-[#2C64AC] tracking-wide">
            RESULTS ({results.length})
          </h4>
          <button
            onClick={() => runAggregation(activeTab)}
            className="p-2 rounded-full hover:bg-[#EAEAEF] text-[#2C64AC] transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-papabear font-bold">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-12 text-center text-xs font-papabear font-bold text-[#595667] flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-[#2C64AC] border-t-transparent rounded-full animate-spin" />
            Loading results...
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#D5D5D8] shadow-xs hover:shadow-notebook transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#595667] pb-2 border-b border-[#EAEAEF] mb-2 font-papabear font-bold">
                    <span>#{idx + 1}</span>
                  </div>

                  <h5 className="font-showcard text-lg text-[#2C64AC] tracking-wide">
                    {item.title || item.action || 'Untitled Book'}
                  </h5>

                  {item.author && (
                    <p className="font-papabear text-sm text-[#595667] font-bold mt-1">
                      By {item.author}
                    </p>
                  )}

                  {item.year !== undefined && (
                    <div className="mt-2.5 inline-block px-3 py-0.5 rounded-full bg-[#EDCE4B] text-[#1E1B2E] text-xs font-papabear font-bold">
                      YEAR: {item.year}
                    </div>
                  )}

                  {/* Category View */}
                  {activeTab === 'agg3' && item.genres && (
                    <div className="mt-3 p-2.5 rounded-xl bg-white border border-[#D5D5D8] text-xs font-papabear">
                      <span className="font-bold text-[#ED7CA5] uppercase mr-1.5">CATEGORY:</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#ED7CA5] text-white font-bold text-[11px]">
                        {item.genres}
                      </span>
                    </div>
                  )}

                  {/* Loan History */}
                  {activeTab === 'agg4' && (
                    <div className="mt-3 space-y-2 font-papabear">
                      <div className="text-xs text-[#595667]">
                        <span className="font-bold text-[#ED7CA5] uppercase">STATUS:</span> <span className="font-bold uppercase text-[#2C64AC]">{item.action}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#D5D5D8] text-xs">
                        <span className="font-bold text-[#2C64AC] block mb-1">BOOK DETAILS:</span>
                        {item.books_details && item.books_details.length > 0 ? (
                          item.books_details.map((bd, bidx) => (
                            <div key={bidx} className="font-papabear text-[#1E1B2E]">
                              • {bd.title} ({bd.year}) by {bd.author}
                            </div>
                          ))
                        ) : (
                          <span className="text-[#86837E] italic text-[11px]">
                            Book details recorded
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-xs font-papabear text-[#595667]">
            No records found for this view.
          </div>
        )}
      </div>
    </div>
  );
};
