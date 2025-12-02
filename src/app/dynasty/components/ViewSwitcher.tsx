'use client';

import { Clock, Grid3x3, Map, Network } from 'lucide-react';
import type { ViewMode } from '../types';

interface ViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const views: Array<{ mode: ViewMode; label: string; icon: React.ComponentType<{ size?: number }> }> = [
  { mode: 'timeline', label: '时间轴', icon: Clock },
  { mode: 'card', label: '卡片', icon: Grid3x3 },
  { mode: 'map', label: '地图', icon: Map },
  { mode: 'graph', label: '关系图', icon: Network },
];

export default function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex gap-2 p-1 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 h-10">
      {views.map(({ mode, label, icon: Icon }) => (
        <button
          key={mode}
          onClick={() => onViewChange(mode)}
          className={`
            flex items-center justify-center gap-2 px-4 h-full rounded-lg transition-all duration-200
            ${currentView === mode
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
            }
          `}
        >
          <Icon size={18} />
          <span className="text-sm font-medium whitespace-nowrap">{label}</span>
        </button>
      ))}
    </div>
  );
}

