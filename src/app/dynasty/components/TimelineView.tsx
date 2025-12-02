'use client';

import { useState, useRef } from 'react';
import type { Dynasty } from '../types';
import { formatYear, calculateDuration } from '../utils/dateUtils';
import { Crown, ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineViewProps {
  dynasties: Dynasty[];
  selectedDynasty: Dynasty | null;
  onSelectDynasty: (dynasty: Dynasty) => void;
}

export default function TimelineView({
  dynasties,
  selectedDynasty,
  onSelectDynasty,
}: TimelineViewProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [hoveredDynasty, setHoveredDynasty] = useState<Dynasty | null>(null);

  // 按开始时间排序
  const sortedDynasties = [...dynasties].sort((a, b) => a.startYear - b.startYear);

  // 计算时间范围
  const minYear = Math.min(...dynasties.map(d => d.startYear));
  const maxYear = Math.max(...dynasties.map(d => d.endYear));
  const totalSpan = maxYear - minYear;

  // 计算每个朝代在时间轴上的位置（水平方向，百分比）
  const getPosition = (year: number) => {
    return ((year - minYear) / totalSpan) * 100;
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
      {/* 朝代信息展示区（顶部） */}
      <div className="w-full max-w-6xl mb-8">
        {selectedDynasty ? (
          <div
            className="p-6 rounded-2xl backdrop-blur-md border transition-all duration-300"
            style={{
              backgroundColor: `${selectedDynasty.color}20`,
              borderColor: selectedDynasty.color,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedDynasty.name}</h2>
                <p className="text-white/80">
                  {formatYear(selectedDynasty.startYear)} - {formatYear(selectedDynasty.endYear)}
                  <span className="mx-2">·</span>
                  {calculateDuration(selectedDynasty.startYear, selectedDynasty.endYear)}年
                  <span className="mx-2">·</span>
                  {selectedDynasty.founder}
                </p>
              </div>
              <button
                onClick={() => onSelectDynasty(null as any)}
                className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                清除选择
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-white/60 text-lg">点击时间轴上的朝代查看详细信息</p>
          </div>
        )}
      </div>

      {/* 进度条样式的时间轴 */}
      <div className="w-full max-w-6xl">
        {/* 时间轴容器 */}
        <div 
          ref={timelineRef}
          className="relative w-full h-24 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-4"
        >
          {/* 进度条背景 */}
          <div className="absolute inset-4 bg-white/10 rounded-full" />

          {/* 朝代进度段 */}
          {sortedDynasties.map((dynasty, index) => {
            const startPos = getPosition(dynasty.startYear);
            const endPos = getPosition(dynasty.endYear);
            const width = endPos - startPos;
            const isSelected = selectedDynasty?.id === dynasty.id;
            const isHovered = hoveredDynasty?.id === dynasty.id;

            return (
              <div
                key={dynasty.id}
                className="absolute top-4 bottom-4 cursor-pointer group transition-all duration-300"
                style={{
                  left: `${startPos}%`,
                  width: `${width}%`,
                  minWidth: '2px',
                }}
                onClick={() => onSelectDynasty(dynasty)}
                onMouseEnter={() => setHoveredDynasty(dynasty)}
                onMouseLeave={() => setHoveredDynasty(null)}
              >
                {/* 朝代进度条 */}
                <div
                  className={`
                    w-full h-full rounded-full transition-all duration-300
                    ${isSelected
                      ? 'opacity-100 shadow-lg ring-2 ring-white/50'
                      : isHovered
                      ? 'opacity-90'
                      : 'opacity-70'
                    }
                  `}
                  style={{
                    backgroundColor: dynasty.color,
                    boxShadow: isSelected
                      ? `0 0 20px ${dynasty.color}, inset 0 0 10px rgba(255,255,255,0.2)`
                      : undefined,
                  }}
                />

                {/* 朝代名称标签（仅在悬停或选中时显示） */}
                {(isSelected || isHovered) && width > 3 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 whitespace-nowrap z-10">
                    <span className="text-white text-sm font-medium">{dynasty.name}</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* 时间刻度标记 */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-xs text-white/50 px-2">
            <span>{formatYear(minYear)}</span>
            <span>{formatYear(Math.floor((minYear + maxYear) / 2))}</span>
            <span>{formatYear(maxYear)}</span>
          </div>
        </div>

        {/* 朝代列表（底部） */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {sortedDynasties.map((dynasty) => {
            const isSelected = selectedDynasty?.id === dynasty.id;
            return (
              <button
                key={dynasty.id}
                onClick={() => onSelectDynasty(dynasty)}
                className={`
                  p-3 rounded-xl backdrop-blur-md border transition-all duration-300 text-left
                  ${isSelected
                    ? 'bg-white/20 border-white/60 shadow-lg scale-105'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }
                `}
                style={{
                  borderColor: isSelected ? dynasty.color : undefined,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dynasty.color }}
                  />
                  <h3 className="text-white font-semibold text-sm">{dynasty.name}</h3>
                </div>
                <p className="text-white/60 text-xs">
                  {formatYear(dynasty.startYear)} - {formatYear(dynasty.endYear)}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

