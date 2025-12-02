'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import type { Dynasty } from '../types';

interface SearchBarProps {
  dynasties: Dynasty[];
  onSelectDynasty: (dynasty: Dynasty) => void;
}

export default function SearchBar({ dynasties, onSelectDynasty }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return dynasties.filter(dynasty => {
      // 搜索朝代名称
      if (dynasty.name.toLowerCase().includes(query)) return true;
      
      // 搜索开国皇帝
      if (dynasty.founder.toLowerCase().includes(query)) return true;
      
      // 搜索都城
      const capitals = Array.isArray(dynasty.capital) 
        ? dynasty.capital 
        : [dynasty.capital];
      if (capitals.some(cap => cap.toLowerCase().includes(query))) return true;
      
      // 搜索重要事件
      if (dynasty.majorEvents.some(event => 
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query)
      )) return true;
      
      return false;
    });
  }, [searchQuery, dynasties]);

  const handleSelect = (dynasty: Dynasty) => {
    onSelectDynasty(dynasty);
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
        <input
          type="text"
          placeholder="搜索朝代、皇帝、都城..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          className="w-full h-10 pl-10 pr-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setShowResults(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* 搜索结果 */}
      {showResults && searchQuery && searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl max-h-96 overflow-y-auto z-50">
          {searchResults.map((dynasty) => (
            <button
              key={dynasty.id}
              onClick={() => handleSelect(dynasty)}
              className="w-full p-4 text-left hover:bg-white/10 transition-colors border-b border-white/10 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: dynasty.color }}
                />
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{dynasty.name}</h4>
                  <p className="text-white/70 text-sm">
                    {dynasty.founder} · {Array.isArray(dynasty.capital) ? dynasty.capital.join('、') : dynasty.capital}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showResults && searchQuery && searchResults.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl p-4 text-white/70 text-sm z-50">
          未找到相关结果
        </div>
      )}
    </div>
  );
}

