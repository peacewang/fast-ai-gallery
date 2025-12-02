'use client';

import { useState } from 'react';
import type { Dynasty } from '../types';
import { formatYear, calculateDuration } from '../utils/dateUtils';
import { ChevronLeft, ChevronRight, Crown } from 'lucide-react';

interface CardFlowViewProps {
  dynasties: Dynasty[];
  selectedDynasty: Dynasty | null;
  onSelectDynasty: (dynasty: Dynasty) => void;
}

export default function CardFlowView({
  dynasties,
  selectedDynasty,
  onSelectDynasty,
}: CardFlowViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % dynasties.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + dynasties.length) % dynasties.length);
  };

  const goToCard = (index: number) => {
    setCurrentIndex(index);
  };

  const currentDynasty = dynasties[currentIndex];
  const duration = calculateDuration(currentDynasty.startYear, currentDynasty.endYear);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* 主卡片 */}
      <div className="relative w-full max-w-2xl">
        {/* 导航按钮 */}
        <button
          onClick={prevCard}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10
                     w-12 h-12 rounded-full bg-white/20 backdrop-blur-md
                     border border-white/30 flex items-center justify-center
                     text-white hover:bg-white/30 transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextCard}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10
                     w-12 h-12 rounded-full bg-white/20 backdrop-blur-md
                     border border-white/30 flex items-center justify-center
                     text-white hover:bg-white/30 transition-all duration-200"
        >
          <ChevronRight size={24} />
        </button>

        {/* 卡片容器 */}
        <div
          key={currentDynasty.id}
          className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden
                     backdrop-blur-xl border border-white/20 shadow-2xl
                     cursor-pointer transition-all duration-500
                     hover:scale-105 hover:shadow-3xl"
          style={{
            backgroundColor: `${currentDynasty.color}20`,
            borderColor: currentDynasty.color,
          }}
          onClick={() => onSelectDynasty(currentDynasty)}
        >
          {/* 背景渐变 */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(135deg, ${currentDynasty.color}40, ${currentDynasty.color}10)`,
            }}
          />

          {/* 内容 */}
          <div className="relative z-10 h-full flex flex-col p-8 text-white">
            {/* 顶部：朝代名称和图标 */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: currentDynasty.color }}
              >
                <Crown size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-1">{currentDynasty.name}</h2>
                <p className="text-white/80 text-sm">
                  {formatYear(currentDynasty.startYear)} - {formatYear(currentDynasty.endYear)}
                </p>
              </div>
            </div>

            {/* 中间：主要信息 */}
            <div className="flex-1 grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm mb-1">开国皇帝</p>
                  <p className="text-xl font-semibold">{currentDynasty.founder}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">持续时间</p>
                  <p className="text-xl font-semibold">{duration}年</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm mb-1">都城</p>
                  <p className="text-xl font-semibold">
                    {Array.isArray(currentDynasty.capital)
                      ? currentDynasty.capital.join('、')
                      : currentDynasty.capital}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">重要事件</p>
                  <p className="text-xl font-semibold">{currentDynasty.majorEvents.length}件</p>
                </div>
              </div>
            </div>

            {/* 底部：提示 */}
            <div className="mt-6 text-center text-white/60 text-sm">
              点击卡片查看详细信息
            </div>
          </div>
        </div>

        {/* 缩略图指示器 */}
        <div className="flex justify-center gap-2 mt-8">
          {dynasties.map((dynasty, index) => (
            <button
              key={dynasty.id}
              onClick={() => goToCard(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${index === currentIndex
                  ? 'w-8 bg-white'
                  : 'bg-white/30 hover:bg-white/50'
                }
              `}
              style={{
                backgroundColor: index === currentIndex ? currentDynasty.color : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

