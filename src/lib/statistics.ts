/**
 * Pure, deterministic statistical calculation utilities for Module 3.
 * Zero external eval/function execution. Completely type-safe and verified.
 */

export interface FiveNumberSummary {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  iqr: number;
  lowerFence: number;
  upperFence: number;
}

export interface DescribeOutput {
  count: number;
  mean: number;
  std: number; // Sample standard deviation by default (ddof=1)
  min: number;
  p25: number;
  p50: number; // Median
  p75: number;
  max: number;
}

export interface DetailedStatistics {
  count: number;
  sum: number;
  mean: number;
  median: number;
  mode: number[];
  min: number;
  max: number;
  range: number;
  populationVariance: number;
  sampleVariance: number;
  populationStdDev: number;
  sampleStdDev: number;
  q1: number;
  q3: number;
  iqr: number;
  sorted: number[];
}

/**
 * Calculates count (excluding NaN and undefined values)
 */
export function calcCount(values: (number | null | undefined)[]): number {
  return values.filter((v): v is number => typeof v === 'number' && !isNaN(v)).length;
}

/**
 * Filters out non-numbers and NaN
 */
export function cleanNumbers(values: (number | null | undefined)[]): number[] {
  return values.filter((v): v is number => typeof v === 'number' && !isNaN(v));
}

/**
 * Arithmetic Mean (μ or x̄)
 */
export function calcMean(values: number[]): number {
  const clean = cleanNumbers(values);
  if (clean.length === 0) return 0;
  const sum = clean.reduce((acc, val) => acc + val, 0);
  return sum / clean.length;
}

/**
 * Linear interpolation percentile calculation matching NumPy/Pandas method='linear'
 */
export function calcPercentile(values: number[], p: number): number {
  const clean = cleanNumbers(values);
  if (clean.length === 0) return 0;
  if (clean.length === 1) return clean[0];
  
  const sorted = [...clean].sort((a, b) => a - b);
  const clampedP = Math.max(0, Math.min(1, p));
  const index = (sorted.length - 1) * clampedP;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;

  if (lower === upper) {
    return sorted[lower];
  }
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

/**
 * Median (50th percentile)
 */
export function calcMedian(values: number[]): number {
  return calcPercentile(values, 0.5);
}

/**
 * Mode(s) of numerical or string values
 */
export function calcMode<T extends number | string>(values: T[]): T[] {
  if (values.length === 0) return [];
  const freqMap = new Map<T, number>();
  let maxFreq = 0;

  for (const val of values) {
    const nextFreq = (freqMap.get(val) || 0) + 1;
    freqMap.set(val, nextFreq);
    if (nextFreq > maxFreq) {
      maxFreq = nextFreq;
    }
  }

  // If every value appears only once and length > 1, conventionally there is no mode or all are modes
  if (maxFreq === 1 && values.length > 1) {
    return [];
  }

  const modes: T[] = [];
  freqMap.forEach((count, key) => {
    if (count === maxFreq) {
      modes.push(key);
    }
  });

  return modes.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

/**
 * Minimum value
 */
export function calcMin(values: number[]): number {
  const clean = cleanNumbers(values);
  if (clean.length === 0) return 0;
  return Math.min(...clean);
}

/**
 * Maximum value
 */
export function calcMax(values: number[]): number {
  const clean = cleanNumbers(values);
  if (clean.length === 0) return 0;
  return Math.max(...clean);
}

/**
 * Range (Max - Min)
 */
export function calcRange(values: number[]): number {
  const clean = cleanNumbers(values);
  if (clean.length === 0) return 0;
  return calcMax(clean) - calcMin(clean);
}

/**
 * Deviations from the mean: (x_i - mean)
 */
export function calcDeviations(values: number[]): { val: number; deviation: number; sqDev: number }[] {
  const clean = cleanNumbers(values);
  const mean = calcMean(clean);
  return clean.map((val) => {
    const deviation = val - mean;
    return {
      val,
      deviation,
      sqDev: deviation * deviation,
    };
  });
}

/**
 * Population Variance: σ² = Σ(x_i - μ)² / N
 */
export function calcPopulationVariance(values: number[]): number {
  const clean = cleanNumbers(values);
  const n = clean.length;
  if (n <= 1) return 0;
  const mean = calcMean(clean);
  const sumSqDiff = clean.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  return sumSqDiff / n;
}

/**
 * Sample Variance: s² = Σ(x_i - x̄)² / (n - 1)
 */
export function calcSampleVariance(values: number[]): number {
  const clean = cleanNumbers(values);
  const n = clean.length;
  if (n <= 1) return 0;
  const mean = calcMean(clean);
  const sumSqDiff = clean.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  return sumSqDiff / (n - 1);
}

/**
 * Population Standard Deviation: σ = sqrt(σ²)
 */
export function calcPopulationStdDev(values: number[]): number {
  return Math.sqrt(calcPopulationVariance(values));
}

/**
 * Sample Standard Deviation: s = sqrt(s²)
 */
export function calcSampleStdDev(values: number[]): number {
  return Math.sqrt(calcSampleVariance(values));
}

/**
 * Quartiles: Q1, Q2 (median), Q3
 */
export function calcQuartiles(values: number[]): { q1: number; q2: number; q3: number } {
  return {
    q1: calcPercentile(values, 0.25),
    q2: calcPercentile(values, 0.5),
    q3: calcPercentile(values, 0.75),
  };
}

/**
 * Interquartile Range: IQR = Q3 - Q1
 */
export function calcIQR(values: number[]): number {
  const { q1, q3 } = calcQuartiles(values);
  return q3 - q1;
}

/**
 * Five-Number Summary with Tukey fences
 */
export function calcFiveNumberSummary(values: number[]): FiveNumberSummary {
  const clean = cleanNumbers(values);
  const min = calcMin(clean);
  const max = calcMax(clean);
  const { q1, q2: median, q3 } = calcQuartiles(clean);
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;

  return {
    min,
    q1,
    median,
    q3,
    max,
    iqr,
    lowerFence,
    upperFence,
  };
}

/**
 * Pandas df.describe() equivalent
 */
export function calcDescribe(values: number[]): DescribeOutput {
  const clean = cleanNumbers(values);
  return {
    count: clean.length,
    mean: calcMean(clean),
    std: calcSampleStdDev(clean),
    min: calcMin(clean),
    p25: calcPercentile(clean, 0.25),
    p50: calcPercentile(clean, 0.5),
    p75: calcPercentile(clean, 0.75),
    max: calcMax(clean),
  };
}

/**
 * Full descriptive statistical breakdown
 */
export function computeAllStatistics(values: number[]): DetailedStatistics {
  const clean = cleanNumbers(values);
  const sorted = [...clean].sort((a, b) => a - b);
  const sum = clean.reduce((acc, v) => acc + v, 0);
  const mean = calcMean(clean);
  const median = calcMedian(clean);
  const mode = calcMode(clean);
  const min = calcMin(clean);
  const max = calcMax(clean);
  const range = max - min;
  const populationVariance = calcPopulationVariance(clean);
  const sampleVariance = calcSampleVariance(clean);
  const populationStdDev = Math.sqrt(populationVariance);
  const sampleStdDev = Math.sqrt(sampleVariance);
  const q1 = calcPercentile(clean, 0.25);
  const q3 = calcPercentile(clean, 0.75);
  const iqr = q3 - q1;

  return {
    count: clean.length,
    sum,
    mean,
    median,
    mode,
    min,
    max,
    range,
    populationVariance,
    sampleVariance,
    populationStdDev,
    sampleStdDev,
    q1,
    q3,
    iqr,
    sorted,
  };
}
