'use client';

import { useState, useEffect } from 'react';
import type { Dynasty } from '../types';
import { dynastiesData } from '../data/dynasties';

export function useDynastyData() {
  const [dynasties, setDynasties] = useState<Dynasty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟数据加载（实际可以直接使用）
    setLoading(true);
    setTimeout(() => {
      setDynasties(dynastiesData.dynasties);
      setLoading(false);
    }, 100);
  }, []);

  const getDynastyById = (id: string): Dynasty | undefined => {
    return dynasties.find(d => d.id === id);
  };

  const getDynastyByYear = (year: number): Dynasty | undefined => {
    return dynasties.find(d => year >= d.startYear && year <= d.endYear);
  };

  return {
    dynasties,
    loading,
    getDynastyById,
    getDynastyByYear,
  };
}

