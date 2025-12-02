'use client';

import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import type { Dynasty, EventCategory, DeclineCategory } from '../types';

interface FilterPanelProps {
  dynasties: Dynasty[];
  onFilterChange: (filtered: Dynasty[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterPanel({
  dynasties,
  onFilterChange,
  isOpen,
  onClose,
}: FilterPanelProps) {
  const [timeRange, setTimeRange] = useState<{ start: number; end: number }>({
    start: -2070,
    end: 1912,
  });
  const [dynastyType, setDynastyType] = useState<'all' | 'unified' | 'divided'>('all');
  const [eventCategory, setEventCategory] = useState<EventCategory | 'all'>('all');
  const [declineCategory, setDeclineCategory] = useState<DeclineCategory | 'all'>('all');

  const applyFilters = () => {
    let filtered = [...dynasties];

    // 时间范围筛选
    filtered = filtered.filter(d => 
      d.startYear <= timeRange.end && d.endYear >= timeRange.start
    );

    // 朝代类型筛选（简化版）
    if (dynastyType === 'unified') {
      // 统一朝代：持续时间较长的主要朝代
      filtered = filtered.filter(d => 
        (d.endYear - d.startYear) > 100 && 
        !['sanguo', 'nanbeichao', 'wudai'].includes(d.id)
      );
    } else if (dynastyType === 'divided') {
      // 分裂时期
      filtered = filtered.filter(d => 
        ['sanguo', 'nanbeichao', 'wudai'].includes(d.id)
      );
    }

    // 事件类别筛选
    if (eventCategory !== 'all') {
      filtered = filtered.filter(d =>
        d.majorEvents.some(e => e.category === eventCategory)
      );
    }

    // 衰落原因类别筛选
    if (declineCategory !== 'all') {
      filtered = filtered.filter(d =>
        d.declineReasons.some(r => r.category === declineCategory)
      );
    }

    onFilterChange(filtered);
  };

  useEffect(() => {
    if (isOpen) {
      applyFilters();
    }
  }, [isOpen, timeRange, dynastyType, eventCategory, declineCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter size={24} className="text-white" />
            <h2 className="text-2xl font-bold text-white">筛选条件</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* 时间范围 */}
          <div>
            <label className="block text-white/90 mb-2">时间范围</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-1">起始年份</label>
                <input
                  type="number"
                  value={timeRange.start}
                  onChange={(e) => setTimeRange({ ...timeRange, start: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-1">结束年份</label>
                <input
                  type="number"
                  value={timeRange.end}
                  onChange={(e) => setTimeRange({ ...timeRange, end: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>
          </div>

          {/* 朝代类型 */}
          <div>
            <label className="block text-white/90 mb-2">朝代类型</label>
            <div className="flex gap-2">
              {(['all', 'unified', 'divided'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setDynastyType(type)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    dynastyType === type
                      ? 'bg-white/30 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {type === 'all' ? '全部' : type === 'unified' ? '统一朝代' : '分裂时期'}
                </button>
              ))}
            </div>
          </div>

          {/* 事件类别 */}
          <div>
            <label className="block text-white/90 mb-2">事件类别</label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'political', 'military', 'cultural', 'economic', 'social'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setEventCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    eventCategory === cat
                      ? 'bg-white/30 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {cat === 'all' ? '全部' : 
                   cat === 'political' ? '政治' :
                   cat === 'military' ? '军事' :
                   cat === 'cultural' ? '文化' :
                   cat === 'economic' ? '经济' : '社会'}
                </button>
              ))}
            </div>
          </div>

          {/* 衰落原因类别 */}
          <div>
            <label className="block text-white/90 mb-2">衰落原因类别</label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'internal', 'external', 'natural', 'economic'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setDeclineCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    declineCategory === cat
                      ? 'bg-white/30 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {cat === 'all' ? '全部' :
                   cat === 'internal' ? '内部' :
                   cat === 'external' ? '外部' :
                   cat === 'natural' ? '自然' : '经济'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              setTimeRange({ start: -2070, end: 1912 });
              setDynastyType('all');
              setEventCategory('all');
              setDeclineCategory('all');
              onFilterChange(dynasties);
            }}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            重置
          </button>
          <button
            onClick={() => {
              applyFilters();
              onClose();
            }}
            className="px-4 py-2 bg-white/30 text-white rounded-lg hover:bg-white/40 transition-colors"
          >
            应用筛选
          </button>
        </div>
      </div>
    </div>
  );
}

