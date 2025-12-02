'use client';

import { useState } from 'react';
import type { Dynasty } from '../types';
import { formatYear } from '../utils/dateUtils';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  dynasties: Dynasty[];
  selectedDynasty: Dynasty | null;
  onSelectDynasty: (dynasty: Dynasty) => void;
  currentYear: number;
  onYearChange?: (year: number) => void;
}

export default function MapView({
  dynasties,
  selectedDynasty,
  onSelectDynasty,
  currentYear,
  onYearChange,
}: MapViewProps) {
  const [hoveredDynasty, setHoveredDynasty] = useState<Dynasty | null>(null);

  // 获取当前年份对应的朝代
  const getDynastyForYear = (year: number): Dynasty | null => {
    return dynasties.find(d => year >= d.startYear && year <= d.endYear) || null;
  };

  const currentDynasty = getDynastyForYear(currentYear);

  // 简化的中国地图坐标（用于演示）
  const mapRegions = [
    { name: '华北', x: 50, y: 30, width: 20, height: 20 },
    { name: '华东', x: 60, y: 40, width: 15, height: 15 },
    { name: '华南', x: 55, y: 60, width: 18, height: 12 },
    { name: '华中', x: 50, y: 45, width: 20, height: 15 },
    { name: '西南', x: 40, y: 50, width: 15, height: 20 },
    { name: '西北', x: 30, y: 25, width: 20, height: 25 },
    { name: '东北', x: 65, y: 15, width: 15, height: 20 },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
      {/* 时间控制 */}
      <div className="mb-6 w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">时间轴</span>
            <span className="text-white font-semibold">{formatYear(currentYear)}</span>
          </div>
          <input
            type="range"
            min={-2070}
            max={1912}
            value={currentYear}
            onChange={(e) => {
              if (onYearChange) {
                onYearChange(parseInt(e.target.value));
              }
            }}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <div className="flex justify-between text-xs text-white/50 mt-1">
            <span>公元前2070年</span>
            <span>1912年</span>
          </div>
        </div>
      </div>

      {/* 地图容器 */}
      <div className="relative w-full max-w-4xl aspect-[4/3] bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 p-8">
        {/* 简化的中国地图轮廓 */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* 地图区域 */}
          {mapRegions.map((region, index) => {
            const dynasty = currentDynasty;
            return (
              <rect
                key={index}
                x={region.x}
                y={region.y}
                width={region.width}
                height={region.height}
                fill={dynasty ? `${dynasty.color}40` : 'rgba(255,255,255,0.1)'}
                stroke={dynasty ? dynasty.color : 'rgba(255,255,255,0.3)'}
                strokeWidth="0.5"
                className="cursor-pointer transition-all duration-300 hover:opacity-80"
                onClick={() => dynasty && onSelectDynasty(dynasty)}
              />
            );
          })}

          {/* 都城标记 */}
          {currentDynasty && (
            <>
              {Array.isArray(currentDynasty.capital) ? (
                currentDynasty.capital.map((cap, idx) => (
                  <g key={idx}>
                    <circle
                      cx={50 + idx * 5}
                      cy={40 + idx * 3}
                      r="2"
                      fill={currentDynasty.color}
                      className="animate-pulse"
                    />
                    <text
                      x={50 + idx * 5}
                      y={40 + idx * 3 - 3}
                      fontSize="1.5"
                      fill="white"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {cap}
                    </text>
                  </g>
                ))
              ) : (
                <g>
                  <circle
                    cx={50}
                    cy={40}
                    r="2"
                    fill={currentDynasty.color}
                    className="animate-pulse"
                  />
                  <text
                    x={50}
                    y={37}
                    fontSize="1.5"
                    fill="white"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {currentDynasty.capital}
                  </text>
                </g>
              )}
            </>
          )}
        </svg>

        {/* 当前朝代信息 */}
        {currentDynasty && (
          <div
            className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md border border-white/20"
            style={{
              backgroundColor: `${currentDynasty.color}30`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{currentDynasty.name}</h3>
                <p className="text-white/80 text-sm">
                  {formatYear(currentDynasty.startYear)} - {formatYear(currentDynasty.endYear)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-white/70" />
                <span className="text-white/90">
                  {Array.isArray(currentDynasty.capital)
                    ? currentDynasty.capital.join('、')
                    : currentDynasty.capital}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 提示文字 */}
      <div className="mt-6 text-center text-white/50 text-sm">
        地图视图开发中，当前显示简化版地图
      </div>
    </div>
  );
}

