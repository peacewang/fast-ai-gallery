'use client';

import { X, TrendingUp, Calendar, MapPin, Crown, AlertTriangle } from 'lucide-react';
import type { Dynasty } from '../types';
import { formatYear, calculateDuration } from '../utils/dateUtils';

interface ComparisonPanelProps {
  dynasties: Dynasty[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

export default function ComparisonPanel({
  dynasties,
  onClose,
  onRemove,
}: ComparisonPanelProps) {
  if (dynasties.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">朝代对比</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-3 text-white/90 font-semibold">对比项</th>
                {dynasties.map((dynasty) => (
                  <th
                    key={dynasty.id}
                    className="text-center p-3 min-w-[200px]"
                    style={{ color: dynasty.color }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${dynasty.color}30` }}
                      >
                        <Crown size={24} className="text-white" />
                      </div>
                      <span className="font-bold text-lg">{dynasty.name}</span>
                      <button
                        onClick={() => onRemove(dynasty.id)}
                        className="text-xs text-white/60 hover:text-white transition-colors"
                      >
                        移除
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* 时间范围 */}
              <tr className="border-b border-white/10">
                <td className="p-3 text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>时间范围</span>
                  </div>
                </td>
                {dynasties.map((dynasty) => (
                  <td key={dynasty.id} className="p-3 text-center text-white/90">
                    <div>
                      <div>{formatYear(dynasty.startYear)} - {formatYear(dynasty.endYear)}</div>
                      <div className="text-sm text-white/60">
                        {calculateDuration(dynasty.startYear, dynasty.endYear)}年
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              {/* 开国皇帝 */}
              <tr className="border-b border-white/10">
                <td className="p-3 text-white/80">
                  <div className="flex items-center gap-2">
                    <Crown size={18} />
                    <span>开国皇帝</span>
                  </div>
                </td>
                {dynasties.map((dynasty) => (
                  <td key={dynasty.id} className="p-3 text-center text-white/90">
                    {dynasty.founder}
                  </td>
                ))}
              </tr>

              {/* 都城 */}
              <tr className="border-b border-white/10">
                <td className="p-3 text-white/80">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>都城</span>
                  </div>
                </td>
                {dynasties.map((dynasty) => (
                  <td key={dynasty.id} className="p-3 text-center text-white/90">
                    {Array.isArray(dynasty.capital)
                      ? dynasty.capital.join('、')
                      : dynasty.capital}
                  </td>
                ))}
              </tr>

              {/* 重要事件数量 */}
              <tr className="border-b border-white/10">
                <td className="p-3 text-white/80">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} />
                    <span>重要事件</span>
                  </div>
                </td>
                {dynasties.map((dynasty) => (
                  <td key={dynasty.id} className="p-3 text-center text-white/90">
                    {dynasty.majorEvents.length}件
                  </td>
                ))}
              </tr>

              {/* 衰落原因数量 */}
              <tr className="border-b border-white/10">
                <td className="p-3 text-white/80">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={18} />
                    <span>衰落原因</span>
                  </div>
                </td>
                {dynasties.map((dynasty) => (
                  <td key={dynasty.id} className="p-3 text-center text-white/90">
                    {dynasty.declineReasons.length}个
                  </td>
                ))}
              </tr>

              {/* 文化成就 */}
              <tr className="border-b border-white/10">
                <td className="p-3 text-white/80">文化成就</td>
                {dynasties.map((dynasty) => (
                  <td key={dynasty.id} className="p-3 text-center text-white/90">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {dynasty.culturalAchievements?.slice(0, 3).map((ach, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/10 rounded text-xs"
                        >
                          {ach}
                        </span>
                      ))}
                      {dynasty.culturalAchievements && dynasty.culturalAchievements.length > 3 && (
                        <span className="text-xs text-white/60">
                          +{dynasty.culturalAchievements.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

