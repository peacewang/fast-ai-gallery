'use client';

import { X, Calendar, MapPin, Crown, TrendingDown, BookOpen, Users, GitCompare } from 'lucide-react';
import type { Dynasty } from '../types';
import { formatYear, calculateDuration } from '../utils/dateUtils';

interface DynastyDetailPanelProps {
  dynasty: Dynasty | null;
  onClose: () => void;
  onAddToComparison?: (dynasty: Dynasty) => void;
}

export default function DynastyDetailPanel({ dynasty, onClose, onAddToComparison }: DynastyDetailPanelProps) {
  if (!dynasty) return null;

  const duration = calculateDuration(dynasty.startYear, dynasty.endYear);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto
                   rounded-3xl backdrop-blur-xl border border-white/20
                   shadow-2xl animate-in fade-in zoom-in duration-300"
        style={{
          backgroundColor: `${dynasty.color}15`,
        }}
      >
        {/* 操作按钮 */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          {onAddToComparison && (
            <button
              onClick={() => {
                if (dynasty) onAddToComparison(dynasty);
              }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md
                         border border-white/30 flex items-center justify-center
                         text-white hover:bg-white/30 transition-all duration-200"
              title="添加到对比"
            >
              <GitCompare size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md
                       border border-white/30 flex items-center justify-center
                       text-white hover:bg-white/30 transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* 头部 */}
        <div
          className="relative p-8 rounded-t-3xl text-white"
          style={{
            background: `linear-gradient(135deg, ${dynasty.color}80, ${dynasty.color}40)`,
          }}
        >
          <h1 className="text-5xl font-bold mb-4">{dynasty.name}</h1>
          <div className="flex flex-wrap gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{formatYear(dynasty.startYear)} - {formatYear(dynasty.endYear)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown size={20} />
              <span>{dynasty.founder}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <span>
                {Array.isArray(dynasty.capital)
                  ? dynasty.capital.join('、')
                  : dynasty.capital}
              </span>
            </div>
          </div>
        </div>

        {/* 内容 */}
        <div className="p-8 space-y-8">
          {/* 基本信息 */}
          <section className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">基本信息</h2>
            <div className="grid grid-cols-2 gap-4 text-white/90">
              <div>
                <p className="text-white/60 text-sm mb-1">持续时间</p>
                <p className="text-xl font-semibold">{duration}年</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">疆域</p>
                <p className="text-xl font-semibold">{dynasty.territory.description}</p>
              </div>
            </div>
          </section>

          {/* 重要事件 */}
          <section className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Calendar size={24} />
              重要大事件
            </h2>
            <div className="space-y-4">
              {dynasty.majorEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-4 border-l-4"
                  style={{ borderLeftColor: dynasty.color }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                    <span className="text-white/60 text-sm">{formatYear(event.year)}</span>
                  </div>
                  <p className="text-white/80 text-sm">{event.description}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                      {event.category}
                    </span>
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                      {event.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 衰落原因 */}
          <section className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingDown size={24} />
              衰落原因
            </h2>
            <div className="space-y-3">
              {dynasty.declineReasons.map((reason, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-4 flex items-start gap-3"
                >
                  <div
                    className="w-2 h-2 rounded-full mt-2"
                    style={{ backgroundColor: dynasty.color }}
                  />
                  <div className="flex-1">
                    <p className="text-white/90">{reason.reason}</p>
                    <div className="mt-2 flex gap-2">
                      <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                        {reason.category}
                      </span>
                      <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                        {reason.severity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 灭亡详情 */}
          <section className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">灭亡详情</h2>
            <div className="space-y-2 text-white/90">
              <p>
                <span className="text-white/60">灭亡时间：</span>
                <span className="font-semibold">{formatYear(dynasty.fallDetails.year)}</span>
              </p>
              <p>
                <span className="text-white/60">灭亡原因：</span>
                <span>{dynasty.fallDetails.cause}</span>
              </p>
              <p>
                <span className="text-white/60">后继朝代：</span>
                <span className="font-semibold">{dynasty.fallDetails.successor}</span>
              </p>
            </div>
          </section>

          {/* 文化成就 */}
          {dynasty.culturalAchievements && dynasty.culturalAchievements.length > 0 && (
            <section className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen size={24} />
                文化成就
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {dynasty.culturalAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-3 text-white/90"
                  >
                    {achievement}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 著名人物 */}
          {dynasty.notableFigures && dynasty.notableFigures.length > 0 && (
            <section className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Users size={24} />
                著名人物
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {dynasty.notableFigures.map((figure, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-4"
                  >
                    <p className="text-white font-semibold mb-1">{figure.name}</p>
                    <p className="text-white/70 text-sm mb-1">{figure.role}</p>
                    <p className="text-white/60 text-xs">{figure.period}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

