// 朝代数据类型定义

export type EventCategory = 'political' | 'military' | 'cultural' | 'economic' | 'social';
export type EventImpact = 'high' | 'medium' | 'low';
export type DeclineCategory = 'internal' | 'external' | 'natural' | 'economic' | 'military';
export type DeclineSeverity = 'critical' | 'major' | 'minor';

export interface MajorEvent {
  year: number;
  title: string;
  description: string;
  category: EventCategory;
  impact: EventImpact;
}

export interface DeclineReason {
  reason: string;
  category: DeclineCategory;
  severity: DeclineSeverity;
}

export interface FallDetails {
  year: number;
  cause: string;
  successor: string;
}

export interface NotableFigure {
  name: string;
  role: string;
  period: string;
}

export interface Territory {
  description: string;
  mapCoordinates?: number[];
}

export interface Dynasty {
  id: string;
  name: string;
  startYear: number; // 公元前用负数
  endYear: number;
  founder: string;
  capital: string | string[];
  territory: Territory;
  majorEvents: MajorEvent[];
  declineReasons: DeclineReason[];
  fallDetails: FallDetails;
  culturalAchievements?: string[];
  notableFigures?: NotableFigure[];
  color: string;
  icon: string;
}

export type ViewMode = 'timeline' | 'card' | 'map' | 'graph';

