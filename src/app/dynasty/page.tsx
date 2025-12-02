'use client';

import { useState, useEffect } from 'react';
import { useDynastyData } from './hooks/useDynastyData';
import { useViewMode } from './hooks/useViewMode';
import type { Dynasty, ViewMode } from './types';
import ViewSwitcher from './components/ViewSwitcher';
import TimelineView from './components/TimelineView';
import CardFlowView from './components/CardFlowView';
import MapView from './components/MapView';
import RelationshipGraphView from './components/RelationshipGraphView';
import DynastyDetailPanel from './components/DynastyDetailPanel';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ComparisonPanel from './components/ComparisonPanel';
import AIAssistant from './components/AIAssistant';
import { Filter, Loader2 } from 'lucide-react';

export default function DynastyDemo() {
  const { dynasties, loading } = useDynastyData();
  const { viewMode, changeViewMode } = useViewMode();
  const [selectedDynasty, setSelectedDynasty] = useState<Dynasty | null>(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [filteredDynasties, setFilteredDynasties] = useState<Dynasty[]>([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [comparisonDynasties, setComparisonDynasties] = useState<Dynasty[]>([]);
  const [showComparisonPanel, setShowComparisonPanel] = useState(false);
  const [mapCurrentYear, setMapCurrentYear] = useState(-2070);

  // 初始化筛选后的朝代列表
  useEffect(() => {
    setFilteredDynasties(dynasties);
  }, [dynasties]);

  const handleSelectDynasty = (dynasty: Dynasty) => {
    setSelectedDynasty(dynasty);
    setShowDetailPanel(true);
  };

  const handleCloseDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedDynasty(null);
  };

  const handleAddToComparison = (dynasty: Dynasty) => {
    if (comparisonDynasties.length < 3 && !comparisonDynasties.find(d => d.id === dynasty.id)) {
      setComparisonDynasties([...comparisonDynasties, dynasty]);
      setShowComparisonPanel(true);
    }
  };

  const handleRemoveFromComparison = (id: string) => {
    setComparisonDynasties(comparisonDynasties.filter(d => d.id !== id));
  };

  const displayDynasties = filteredDynasties.length > 0 ? filteredDynasties : dynasties;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 背景动效 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* 顶部导航栏 */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">中国朝代更迭</h1>
            <p className="text-white/70">从夏朝到清朝的历史演示</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* 搜索框 */}
            <SearchBar dynasties={dynasties} onSelectDynasty={handleSelectDynasty} />

            {/* 筛选按钮 */}
            <button
              onClick={() => setShowFilterPanel(true)}
              className="px-4 py-2 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Filter size={18} />
              <span>筛选</span>
            </button>

            {/* 视图切换器 */}
            <ViewSwitcher currentView={viewMode} onViewChange={changeViewMode} />
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="relative z-10 flex-1 min-h-[calc(100vh-120px)]">
        {viewMode === 'timeline' && (
          <TimelineView
            dynasties={displayDynasties}
            selectedDynasty={selectedDynasty}
            onSelectDynasty={handleSelectDynasty}
          />
        )}
        {viewMode === 'card' && (
          <CardFlowView
            dynasties={displayDynasties}
            selectedDynasty={selectedDynasty}
            onSelectDynasty={handleSelectDynasty}
          />
        )}
        {viewMode === 'map' && (
          <MapView
            dynasties={displayDynasties}
            selectedDynasty={selectedDynasty}
            onSelectDynasty={handleSelectDynasty}
            currentYear={mapCurrentYear}
            onYearChange={setMapCurrentYear}
          />
        )}
        {viewMode === 'graph' && (
          <RelationshipGraphView
            dynasties={displayDynasties}
            selectedDynasty={selectedDynasty}
            onSelectDynasty={handleSelectDynasty}
          />
        )}
      </div>

      {/* 详情面板 */}
      {showDetailPanel && selectedDynasty && (
        <DynastyDetailPanel
          dynasty={selectedDynasty}
          onClose={handleCloseDetailPanel}
          onAddToComparison={handleAddToComparison}
        />
      )}

      {/* 筛选面板 */}
      <FilterPanel
        dynasties={dynasties}
        onFilterChange={setFilteredDynasties}
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
      />

      {/* 对比面板 */}
      {showComparisonPanel && (
        <ComparisonPanel
          dynasties={comparisonDynasties}
          onClose={() => setShowComparisonPanel(false)}
          onRemove={handleRemoveFromComparison}
        />
      )}

      {/* 智能助手 */}
      <AIAssistant currentDynasty={selectedDynasty} dynasties={dynasties} />

      {/* 底部信息栏 */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-white/70 text-sm">
          <div className="flex items-center gap-4">
            {selectedDynasty && (
              <span>当前查看：<strong className="text-white">{selectedDynasty.name}</strong></span>
            )}
            {comparisonDynasties.length > 0 && (
              <button
                onClick={() => setShowComparisonPanel(true)}
                className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                对比 ({comparisonDynasties.length})
              </button>
            )}
          </div>
          <div>
            共 {displayDynasties.length} 个朝代
            {filteredDynasties.length !== dynasties.length && (
              <span className="ml-2 text-white/50">
                (已筛选，共 {dynasties.length} 个)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

