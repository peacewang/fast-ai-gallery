'use client';

import { useState, useEffect } from 'react';
import type { ViewMode } from '../types';

const VIEW_MODE_KEY = 'dynasty-view-mode';

export function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');

  useEffect(() => {
    // 从 localStorage 读取保存的视图模式
    const saved = localStorage.getItem(VIEW_MODE_KEY);
    if (saved && ['timeline', 'card', 'map', 'graph'].includes(saved)) {
      setViewMode(saved as ViewMode);
    }
  }, []);

  const changeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem(VIEW_MODE_KEY, mode);
  };

  return {
    viewMode,
    changeViewMode,
  };
}

