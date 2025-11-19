'use client'
import React, { useState, useEffect } from 'react';
import {
  Wifi, Battery, Signal, Lock, Unlock, CloudSun,
  Calendar, Music, MessageSquare, Phone, Camera,
  Settings, Mail, MapPin, ChevronUp, Sun, Moon,
  Bluetooth, Volume2, Mic, Search, Bell, Heart,
  Globe, Video, Compass, Folder, X
} from 'lucide-react';

// --- 基础组件：超真实毛玻璃卡片 ---
const GlassCard = ({ children, className = "", active = false, onClick, style }: any) => (
  <div
    onClick={onClick}
    className={`
      relative overflow-hidden
      backdrop-blur-2xl 
      transition-all duration-500 ease-out
      ${active ? 'bg-white/30 border-white/60 shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'bg-white/10 border-white/20 hover:bg-white/20'}
      border 
      shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]
      before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-50 before:pointer-events-none
      ${className}
    `}
    style={{
      boxShadow: active
        ? 'inset 0 0 20px rgba(255,255,255,0.5), 0 10px 40px rgba(0,0,0,0.2)'
        : 'inset 0 0 1px rgba(255,255,255,0.4), 0 4px 20px rgba(0,0,0,0.1)',
      ...style
    }}
  >
    {children}
  </div>
);

// --- 应用图标组件 ---
const AppIcon = ({ icon: Icon, name, color, onClick }: any) => (
  <div
    onClick={onClick}
    className="flex flex-col items-center gap-2 group cursor-pointer transition-transform active:scale-90 duration-200 z-10"
  >
    <div className={`
      w-16 h-16 rounded-[1.2rem] 
      flex items-center justify-center 
      text-white relative overflow-hidden
      shadow-lg group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all
      backdrop-blur-md border border-white/30
    `}
      style={{ background: `linear-gradient(135deg, ${color}88, ${color}33)` }}
    >
      {/* 玻璃光泽效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
      <Icon size={28} strokeWidth={1.5} className="drop-shadow-md z-10" />
    </div>
    <span className="text-xs font-medium text-white/90 tracking-wide drop-shadow-md">{name}</span>
  </div>
);

// --- 模拟的 App 窗口 ---
const AppWindow = ({ app, onClose }: any) => {
  if (!app) return null;
  const Icon = app.icon;

  return (
    <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-3xl animate-in fade-in zoom-in duration-300 flex flex-col">
      {/* App 头部 */}
      <div className="h-12 flex items-end justify-center pb-2 border-b border-white/10 bg-white/5 relative">
        <span className="font-medium text-white">{app.name}</span>
        <button onClick={onClose} className="absolute right-4 bottom-1.5 p-1 bg-white/10 rounded-full">
          <X size={16} className="text-white" />
        </button>
      </div>

      {/* App 内容区 (占位符) */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center text-white/50">
        <div
          className="w-32 h-32 rounded-[2rem] flex items-center justify-center mb-6 animate-pulse"
          style={{ background: `linear-gradient(135deg, ${app.color}44, ${app.color}11)` }}
        >
          <Icon size={64} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>
        <h2 className="text-2xl font-light text-white mb-2">{app.name}</h2>
        <p className="text-center opacity-60 max-w-[200px]">
          这是一个 iOS 26 概念应用界面。<br />所有的 UI 都是由实时渲染的玻璃层构成的。
        </p>

        {/* 模拟内容块 */}
        <div className="w-full mt-12 space-y-4">
          <div className="h-4 w-3/4 bg-white/10 rounded-full mx-auto" />
          <div className="h-4 w-1/2 bg-white/10 rounded-full mx-auto" />
          <div className="h-4 w-5/6 bg-white/10 rounded-full mx-auto" />
        </div>
      </div>

      {/* 底部 Home Bar 区域 */}
      <div className="h-8 w-full flex justify-center items-start pt-2 cursor-pointer hover:bg-white/5 transition-colors" onClick={onClose}>
        <div className="w-32 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      </div>
    </div>
  );
};

export default function IOS26Simulator() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLocked, setIsLocked] = useState(true);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [activeApp, setActiveApp] = useState<any>(null);
  const [brightness, setBrightness] = useState(80);
  const [volume, setVolume] = useState(60);

  // App 数据定义
  const apps = [
    { id: 'phone', name: '电话', icon: Phone, color: '#4ade80' },
    { id: 'messages', name: '信息', icon: MessageSquare, color: '#60a5fa' },
    { id: 'maps', name: '地图', icon: MapPin, color: '#f87171' },
    { id: 'music', name: '音乐', icon: Music, color: '#f472b6' },
    { id: 'photos', name: '照片', icon: Globe, color: '#fb7185' }, // Using Globe as placeholder
    { id: 'camera', name: '相机', icon: Camera, color: '#94a3b8' },
    { id: 'weather', name: '天气', icon: CloudSun, color: '#38bdf8' },
    { id: 'home', name: '家庭', icon: Bell, color: '#fbbf24' },
    { id: 'notes', name: '备忘录', icon: Folder, color: '#fbbf24' },
    { id: 'settings', name: '设置', icon: Settings, color: '#94a3b8' },
    { id: 'safari', name: 'Safari', icon: Compass, color: '#3b82f6' },
    { id: 'facetime', name: 'FaceTime', icon: Video, color: '#22c55e' },
  ];

  const dockApps = [
    { id: 'phone_dock', name: '', icon: Phone, color: '#22c55e' },
    { id: 'safari_dock', name: '', icon: Compass, color: '#3b82f6' },
    { id: 'messages_dock', name: '', icon: MessageSquare, color: '#22c55e' },
    { id: 'music_dock', name: '', icon: Music, color: '#ef4444' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  // 处理应用打开
  const openApp = (app: any) => {
    setActiveApp(app);
  };

  return (
    <div className="min-h-screen w-full bg-[#111] flex items-center justify-center p-4 font-sans select-none">

      {/* --- 设备外框 (钛金属/玻璃机身) --- */}
      <div className="relative w-[390px] h-[844px] rounded-[3.5rem] shadow-[0_0_0_12px_#2d2d2d,0_0_0_14px_#555,0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden bg-black ring-1 ring-white/20">

        {/* --- 动态环境壁纸 (极光流体) --- */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[#000000]">
            {/* 动态光斑 1 */}
            <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-purple-600/60 rounded-full mix-blend-screen blur-[100px] animate-pulse duration-[4s]" />
            {/* 动态光斑 2 */}
            <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-blue-500/60 rounded-full mix-blend-screen blur-[90px] animate-bounce duration-[10s]" />
            {/* 动态光斑 3 */}
            <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-pink-500/50 rounded-full mix-blend-screen blur-[80px] animate-pulse duration-[7s]" />
            {/* 噪点纹理层 */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          </div>
        </div>

        {/* --- 屏幕内容容器 --- */}
        <div className={`relative w-full h-full flex flex-col transition-all duration-700 ${isLocked ? 'scale-100' : 'scale-[1]'}`}>

          {/* --- 状态栏 & 灵动岛 (iOS 26 悬浮设计) --- */}
          <div
            className="h-14 w-full flex items-end justify-between px-8 pb-2 z-[60] relative"
            onClick={() => !isLocked && setShowControlCenter(!showControlCenter)}
          >
            <span className="text-white font-medium text-sm tracking-wider shadow-black drop-shadow-md">{formatTime(currentTime)}</span>

            {/* 灵动岛 - 纯玻璃形态 */}
            <div className="absolute left-1/2 -translate-x-1/2 top-3 w-[120px] h-[36px] bg-black/40 backdrop-blur-2xl rounded-full border border-white/10 flex items-center justify-center gap-3 shadow-lg transition-all duration-300 z-[60]">
              {!isLocked && <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]" />}
              {isLocked && <Lock size={12} className="text-white/70" />}
            </div>

            <div className="flex items-center gap-2 text-white drop-shadow-md">
              <Signal size={16} />
              <Wifi size={16} />
              <Battery size={18} />
            </div>
          </div>

          {/* --- 锁屏界面 --- */}
          <div
            className={`
              absolute inset-0 flex flex-col items-center pt-24 pb-10 px-6 transition-all duration-700 ease-in-out z-40
              ${isLocked ? 'opacity-100 translate-y-0 backdrop-blur-none delay-100' : 'opacity-0 -translate-y-full pointer-events-none'}
            `}
          >
            <div className="flex flex-col items-center gap-2 mt-8 animate-in fade-in slide-in-from-top-10 duration-1000">
              <Lock size={24} className="text-white/50 mb-4" />
              <span className="text-2xl text-white/80 font-light tracking-wide">{formatDate(currentTime)}</span>
              {/* 深度效果时间 (Depth Effect) */}
              <h1 className="text-[5.5rem] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] tracking-tight">
                {formatTime(currentTime)}
              </h1>
            </div>

            {/* 玻璃通知堆叠 */}
            <div className="flex-1 w-full flex flex-col justify-end gap-3 mb-12">
              <GlassCard className="rounded-3xl p-4 flex gap-4 items-center backdrop-blur-xl bg-white/5 active:scale-95 cursor-pointer transition-transform">
                <div className="w-10 h-10 rounded-xl bg-blue-500/80 flex items-center justify-center text-white shadow-inner">
                  <MessageSquare size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-white font-semibold text-sm">Sarah</span>
                    <span className="text-white/40 text-xs">2m ago</span>
                  </div>
                  <p className="text-white/70 text-sm leading-tight mt-0.5">今晚去吃火锅吗？在这个新开的全息餐厅。</p>
                </div>
              </GlassCard>

              <GlassCard className="rounded-3xl p-4 flex gap-4 items-center backdrop-blur-md bg-white/5 scale-95 opacity-80 -mt-6 -z-10">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-white">
                  <Mail size={20} />
                </div>
                <div className="flex-1">
                  <span className="text-white font-semibold text-sm">System</span>
                  <p className="text-white/70 text-sm mt-0.5">iOS 26.2 更新已准备就绪。</p>
                </div>
              </GlassCard>
            </div>

            {/* 底部快捷键 */}
            <div className="w-full flex justify-between px-8 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                <MapPin size={20} />
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                <Camera size={20} />
              </div>
            </div>

            {/* 隐形解锁触发区 & 底部条 */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3 z-50 flex flex-col justify-end items-center pb-4 cursor-pointer bg-gradient-to-t from-black/20 to-transparent"
              onClick={() => setIsLocked(false)}
            >
              <span className="text-white/50 text-xs font-medium mb-2 animate-pulse">点击解锁</span>
              <div className="w-32 h-1.5 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
          </div>

          {/* --- 主界面 (Home Screen) --- */}
          <div
            className={`
              absolute inset-0 pt-20 px-6 pb-8 flex flex-col transition-all duration-700 ease-out
              ${!isLocked && !activeApp ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-xl pointer-events-none'}
            `}
          >
            {/* 顶部小组件区 */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* 天气组件 */}
              <GlassCard className="rounded-[2rem] p-5 flex flex-col justify-between h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 cursor-pointer active:scale-95">
                <div className="flex justify-between items-start text-white">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium opacity-80">上海</span>
                    <span className="text-4xl font-light mt-1">24°</span>
                  </div>
                  <CloudSun size={28} className="text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.6)]" />
                </div>
                <div className="text-white/70 text-xs space-y-1">
                  <div className="flex justify-between"><span>空气质量</span><span>优</span></div>
                  <div className="flex justify-between"><span>降水</span><span>0%</span></div>
                </div>
              </GlassCard>

              {/* 音乐组件 - 唱片风格 */}
              <GlassCard className="rounded-[2rem] p-4 flex flex-col justify-between h-40 bg-white/5 relative overflow-hidden group cursor-pointer active:scale-95">
                {/* 动态模糊唱片封面背景 */}
                <div className="absolute right-[-20%] bottom-[-20%] w-32 h-32 rounded-full bg-pink-500/30 blur-xl group-hover:rotate-12 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-white/60 text-xs mb-2">
                    <Music size={12} />
                    <span>正在播放</span>
                  </div>
                  <div className="text-white text-lg font-medium leading-tight w-3/4">Midnight City</div>
                  <div className="text-white/50 text-xs">M83</div>
                </div>
                <div className="flex justify-between items-center mt-2 relative z-10">
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-white rounded-full animate-[bounce_1s_infinite]" />
                    <div className="w-1 h-5 bg-white rounded-full animate-[bounce_1.2s_infinite]" />
                    <div className="w-1 h-2 bg-white rounded-full animate-[bounce_0.8s_infinite]" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* APP 网格 */}
            <div className="grid grid-cols-4 gap-x-4 gap-y-6 mb-auto">
              {apps.map((app) => (
                <AppIcon
                  key={app.id}
                  icon={app.icon}
                  name={app.name}
                  color={app.color}
                  onClick={() => openApp(app)}
                />
              ))}
            </div>

            {/* 分页指示器 */}
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-2 h-2 bg-white rounded-full" />
              <div className="w-2 h-2 bg-white/30 rounded-full" />
              <div className="w-2 h-2 bg-white/30 rounded-full" />
            </div>

            {/* 玻璃 Dock 栏 */}
            <div className="relative mb-2">
              <GlassCard className="rounded-[2.5rem] h-24 w-full flex items-center justify-around px-4 bg-white/10 border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                {dockApps.map((app) => (
                  <AppIcon
                    key={app.id}
                    icon={app.icon}
                    name={app.name}
                    color={app.color}
                    onClick={() => openApp({ ...app, name: app.id.split('_')[0] })} // fix name for dock apps
                  />
                ))}
              </GlassCard>
            </div>

            {/* 底部指示条 */}
            <div className="w-32 h-1.5 bg-white/30 rounded-full mx-auto mt-2" />
          </div>

          {/* --- 打开的 App 窗口 (全屏覆盖) --- */}
          {activeApp && (
            <AppWindow app={activeApp} onClose={() => setActiveApp(null)} />
          )}

          {/* --- 控制中心 (Control Center) --- */}
          <div
            className={`
               absolute inset-0 bg-black/20 backdrop-blur-3xl z-[70] px-6 pt-16 pb-8 transition-all duration-500
               ${showControlCenter ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
             `}
            onClick={(e) => e.target === e.currentTarget && setShowControlCenter(false)}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* 连接模块 */}
              <GlassCard className="rounded-[2rem] p-4 grid grid-cols-2 gap-4 bg-white/10 aspect-square">
                <div className="flex flex-col items-center justify-center gap-2 bg-white/10 rounded-2xl aspect-square active:bg-white/30 transition-colors">
                  <Wifi size={24} className="text-white" />
                </div>
                <div className="flex flex-col items-center justify-center gap-2 bg-white/10 rounded-2xl aspect-square active:bg-white/30 transition-colors">
                  <Bluetooth size={24} className="text-white" />
                </div>
                <div className="flex flex-col items-center justify-center gap-2 bg-white/10 rounded-2xl aspect-square active:bg-white/30 transition-colors">
                  <Signal size={24} className="text-white" />
                </div>
                <div className="flex flex-col items-center justify-center gap-2 bg-white/10 rounded-2xl aspect-square active:bg-white/30 transition-colors">
                  <PlaneModeIcon />
                </div>
              </GlassCard>

              {/* 音乐控制 */}
              <GlassCard className="rounded-[2rem] p-4 flex flex-col justify-center items-center gap-3 bg-white/10 aspect-square">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-blue-500 shadow-lg flex items-center justify-center">
                  <Music size={32} className="text-white" />
                </div>
                <div className="text-white text-center">
                  <div className="font-medium">M83</div>
                  <div className="text-xs text-white/60">Midnight City</div>
                </div>
              </GlassCard>

              {/* 亮度调节器 (玻璃滑块) */}
              <GlassCard className="col-span-2 rounded-[2rem] p-4 h-24 bg-white/5 flex items-center gap-4">
                <Sun size={24} className="text-white/80" />
                <div className="flex-1 h-12 bg-white/10 rounded-full relative overflow-hidden cursor-pointer group">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.5)] rounded-r-full transition-all duration-150"
                    style={{ width: `${brightness}%` }}
                  />
                  <input
                    type="range"
                    min="0" max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
                  />
                </div>
              </GlassCard>

              {/* 音量调节器 */}
              <GlassCard className="col-span-2 rounded-[2rem] p-4 h-24 bg-white/5 flex items-center gap-4">
                <Volume2 size={24} className="text-white/80" />
                <div className="flex-1 h-12 bg-white/10 rounded-full relative overflow-hidden cursor-pointer">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.5)] rounded-r-full transition-all duration-150"
                    style={{ width: `${volume}%` }}
                  />
                  <input
                    type="range"
                    min="0" max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
                  />
                </div>
              </GlassCard>
            </div>

            <div className="mt-8 flex justify-center">
              <div
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
                onClick={() => setShowControlCenter(false)}
              >
                <ChevronUp className="text-white" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 右侧说明文字 */}
      <div className="hidden lg:block absolute right-10 text-white/30 font-light tracking-widest writing-vertical-lr">
        iOS 26 CONCEPT / GLASS PHYSICS / UNLOCKED
      </div>
    </div>
  );
}

// 简单的 SVG 图标补充
const PlaneModeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 14h20" /><path d="M12 2L2 14" /><path d="M12 2l10 12" />
  </svg>
);