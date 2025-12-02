// 日期工具函数

/**
 * 格式化年份显示
 * @param year 年份（公元前用负数）
 * @returns 格式化后的年份字符串
 */
export function formatYear(year: number): string {
  if (year < 0) {
    return `公元前${Math.abs(year)}年`;
  }
  return `${year}年`;
}

/**
 * 计算朝代持续时间（年）
 */
export function calculateDuration(startYear: number, endYear: number): number {
  return Math.abs(endYear - startYear);
}

/**
 * 格式化持续时间显示
 */
export function formatDuration(startYear: number, endYear: number): string {
  const duration = calculateDuration(startYear, endYear);
  return `${duration}年`;
}

/**
 * 判断年份是否在某个朝代范围内
 */
export function isYearInRange(year: number, startYear: number, endYear: number): boolean {
  return year >= startYear && year <= endYear;
}

