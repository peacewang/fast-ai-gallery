'use client';

import { useState, useRef, useEffect } from 'react';
import type { Dynasty } from '../types';
import { formatYear } from '../utils/dateUtils';
import { Network, Crown } from 'lucide-react';

interface RelationshipGraphViewProps {
  dynasties: Dynasty[];
  selectedDynasty: Dynasty | null;
  onSelectDynasty: (dynasty: Dynasty) => void;
}

export default function RelationshipGraphView({
  dynasties,
  selectedDynasty,
  onSelectDynasty,
}: RelationshipGraphViewProps) {
  const [hoveredDynasty, setHoveredDynasty] = useState<Dynasty | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 计算节点位置（圆形布局）
  const centerX = 50;
  const centerY = 50;
  const radius = 35;
  const angleStep = (2 * Math.PI) / dynasties.length;

  const getNodePosition = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  // 获取后继朝代
  const getSuccessor = (dynasty: Dynasty): Dynasty | null => {
    const successorName = dynasty.fallDetails.successor;
    return dynasties.find(d => d.name === successorName || d.name.includes(successorName)) || null;
  };

  return (
    <div className="relative w-full h-full overflow-auto p-8">
      <div ref={containerRef} className="relative w-full min-h-[600px]">
        {/* SVG 画布 */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* 连接线 */}
          {dynasties.map((dynasty, index) => {
            const successor = getSuccessor(dynasty);
            if (!successor) return null;

            const successorIndex = dynasties.findIndex(d => d.id === successor.id);
            if (successorIndex === -1) return null;

            const start = getNodePosition(index);
            const end = getNodePosition(successorIndex);

            return (
              <line
                key={`${dynasty.id}-${successor.id}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={dynasty.color}
                strokeWidth="0.3"
                strokeOpacity="0.5"
                className="transition-all duration-300"
              />
            );
          })}

          {/* 节点 */}
          {dynasties.map((dynasty, index) => {
            const position = getNodePosition(index);
            const isSelected = selectedDynasty?.id === dynasty.id;
            const isHovered = hoveredDynasty?.id === dynasty.id;
            const size = isSelected ? 4 : isHovered ? 3.5 : 3;

            return (
              <g key={dynasty.id}>
                {/* 节点圆 */}
                <circle
                  cx={position.x}
                  cy={position.y}
                  r={size}
                  fill={dynasty.color}
                  stroke={isSelected ? 'white' : 'rgba(255,255,255,0.3)'}
                  strokeWidth={isSelected ? '0.5' : '0.2'}
                  className="cursor-pointer transition-all duration-300 hover:opacity-80"
                  onClick={() => onSelectDynasty(dynasty)}
                  onMouseEnter={() => setHoveredDynasty(dynasty)}
                  onMouseLeave={() => setHoveredDynasty(null)}
                  style={{
                    filter: isSelected ? `drop-shadow(0 0 8px ${dynasty.color})` : undefined,
                  }}
                />

                {/* 标签 */}
                <text
                  x={position.x}
                  y={position.y - size - 1}
                  fontSize="2"
                  fill="white"
                  textAnchor="middle"
                  className="pointer-events-none font-bold"
                  style={{
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                  }}
                >
                  {dynasty.name}
                </text>

                {/* 时间标签 */}
                <text
                  x={position.x}
                  y={position.y + size + 2}
                  fontSize="1.2"
                  fill="rgba(255,255,255,0.7)"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {formatYear(dynasty.startYear)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* 图例 */}
      <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <div className="flex items-center gap-2 mb-2">
          <Network size={18} className="text-white" />
          <h3 className="text-white font-semibold">朝代更迭关系图</h3>
        </div>
        <p className="text-white/70 text-xs">
          节点大小表示朝代重要性，连线表示更迭关系
        </p>
      </div>
    </div>
  );
}

