/**
 * Pure, deterministic statistical calculation utilities for Topic 3.2: Distributions.
 * Completely type-safe, verified, and adheres to strict mathematical definitions.
 * Zero eval or arbitrary execution.
 */

import {
  cleanNumbers,
  calcMean,
  calcMedian,
  calcMin,
  calcMax,
  calcRange,
  calcPopulationVariance,
  calcSampleVariance,
  calcPopulationStdDev,
  calcSampleStdDev,
  calcPercentile,
  calcQuartiles,
  calcIQR,
  calcFiveNumberSummary,
  calcDescribe,
} from './statistics';

export {
  cleanNumbers,
  calcMean,
  calcMedian,
  calcMin,
  calcMax,
  calcRange,
  calcPopulationVariance,
  calcSampleVariance,
  calcPopulationStdDev,
  calcSampleStdDev,
  calcPercentile,
  calcQuartiles,
  calcIQR,
  calcFiveNumberSummary,
  calcDescribe,
};

export interface FrequencyRow {
  value: number;
  frequency: number;
  relativeFrequency: number;
  percentage: number;
  cumulativeFrequency: number;
  cumulativePercentage: number;
}

export interface HistogramBin {
  binIndex: number;
  x0: number; // Inclusive lower bound (or inclusive of both on single bin)
  x1: number; // Exclusive upper bound (inclusive on final bin)
  label: string;
  midpoint: number;
  count: number;
  relativeFrequency: number;
  density: number; // relativeFrequency / binWidth
  values: number[];
}

export interface HistogramResult {
  bins: HistogramBin[];
  binWidth: number;
  minVal: number;
  maxVal: number;
  totalCount: number;
}

export interface SkewnessResult {
  skewness: number;
  direction: 'right-skewed' | 'left-skewed' | 'symmetric';
  mean: number;
  median: number;
  difference: number;
  interpretation: string;
}

/**
 * Calculates a discrete frequency table for numerical observations.
 */
export function calcFrequencyTable(rawValues: number[]): FrequencyRow[] {
  const clean = cleanNumbers(rawValues);
  const total = clean.length;
  if (total === 0) return [];

  const freqMap = new Map<number, number>();
  for (const v of clean) {
    freqMap.set(v, (freqMap.get(v) || 0) + 1);
  }

  const sortedKeys = Array.from(freqMap.keys()).sort((a, b) => a - b);
  let runningCount = 0;

  return sortedKeys.map((value) => {
    const freq = freqMap.get(value) || 0;
    runningCount += freq;
    const relFreq = freq / total;
    return {
      value,
      frequency: freq,
      relativeFrequency: relFreq,
      percentage: Math.round(relFreq * 10000) / 100, // Two decimals
      cumulativeFrequency: runningCount,
      cumulativePercentage: Math.round((runningCount / total) * 10000) / 100,
    };
  });
}

/**
 * Cumulative frequency distribution up to a specified threshold.
 */
export function calcCumulativeAtThreshold(
  rawValues: number[],
  threshold: number
): {
  countAtOrBelow: number;
  totalCount: number;
  percentage: number;
  includedValues: number[];
} {
  const clean = cleanNumbers(rawValues);
  const total = clean.length;
  if (total === 0) {
    return { countAtOrBelow: 0, totalCount: 0, percentage: 0, includedValues: [] };
  }

  const included = clean.filter((v) => v <= threshold);
  const countAtOrBelow = included.length;
  const percentage = Math.round((countAtOrBelow / total) * 10000) / 100;

  return {
    countAtOrBelow,
    totalCount: total,
    percentage,
    includedValues: included,
  };
}

/**
 * Groups numerical observations into contiguous histogram intervals.
 * Standard boundary rule: [x0, x1) for bins 0 .. k-2, and [x0, x1] for the final bin k-1.
 * Guarantees every finite observation belongs to exactly one bin.
 */
export function calcHistogramBins(
  rawValues: number[],
  desiredNumBins: number = 5,
  forcedRange?: { min: number; max: number }
): HistogramResult {
  const clean = cleanNumbers(rawValues);
  const totalCount = clean.length;
  const k = Math.max(1, Math.min(20, Math.round(desiredNumBins)));

  if (totalCount === 0) {
    return {
      bins: [],
      binWidth: 0,
      minVal: 0,
      maxVal: 0,
      totalCount: 0,
    };
  }

  const dataMin = Math.min(...clean);
  const dataMax = Math.max(...clean);

  const minVal = forcedRange ? forcedRange.min : dataMin;
  const maxVal = forcedRange ? forcedRange.max : dataMax;

  // Handle zero spread: all values identical
  if (maxVal <= minVal) {
    const pad = Math.max(1, Math.abs(minVal) * 0.1);
    const low = minVal - pad;
    const high = maxVal + pad;
    const binWidth = (high - low) / k;
    const bins: HistogramBin[] = Array.from({ length: k }, (_, idx) => {
      const x0 = low + idx * binWidth;
      const x1 = low + (idx + 1) * binWidth;
      const mid = (x0 + x1) / 2;
      const binValues = clean.filter((v) => (idx === k - 1 ? v >= x0 && v <= x1 : v >= x0 && v < x1));
      const count = binValues.length;
      const relFreq = totalCount > 0 ? count / totalCount : 0;
      return {
        binIndex: idx,
        x0: Math.round(x0 * 100) / 100,
        x1: Math.round(x1 * 100) / 100,
        label: `${Math.round(x0 * 10) / 10}–${Math.round(x1 * 10) / 10}`,
        midpoint: Math.round(mid * 100) / 100,
        count,
        relativeFrequency: relFreq,
        density: binWidth > 0 ? relFreq / binWidth : 0,
        values: binValues,
      };
    });
    return { bins, binWidth, minVal: low, maxVal: high, totalCount };
  }

  const rawWidth = (maxVal - minVal) / k;
  const binWidth = rawWidth;

  const bins: HistogramBin[] = Array.from({ length: k }, (_, idx) => {
    const x0 = minVal + idx * binWidth;
    const x1 = idx === k - 1 ? maxVal : minVal + (idx + 1) * binWidth;
    const mid = (x0 + x1) / 2;

    const binValues = clean.filter((v) => {
      if (idx === k - 1) {
        return v >= x0 && v <= x1;
      }
      return v >= x0 && v < x1;
    });

    const count = binValues.length;
    const relFreq = totalCount > 0 ? count / totalCount : 0;
    const density = binWidth > 0 ? relFreq / binWidth : 0;

    return {
      binIndex: idx,
      x0: Math.round(x0 * 100) / 100,
      x1: Math.round(x1 * 100) / 100,
      label: `${Math.round(x0 * 10) / 10}–${Math.round(x1 * 10) / 10}`,
      midpoint: Math.round(mid * 100) / 100,
      count,
      relativeFrequency: relFreq,
      density,
      values: binValues,
    };
  });

  return {
    bins,
    binWidth,
    minVal,
    maxVal,
    totalCount,
  };
}

/**
 * Mathematically exact Gaussian / Normal Probability Density Function:
 * f(x) = (1 / (sigma * sqrt(2*pi))) * exp(-0.5 * ((x - mu) / sigma)^2)
 * Requires sigma > 0.
 */
export function calcNormalPdf(x: number, mean: number, stdDev: number): number {
  if (stdDev <= 0 || isNaN(stdDev) || isNaN(mean) || isNaN(x)) {
    return 0;
  }
  const variance = stdDev * stdDev;
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  const exponent = -0.5 * (Math.pow(x - mean, 2) / variance);
  return coefficient * Math.exp(exponent);
}

/**
 * Evaluates the normal curve over a range of points for SVG rendering.
 */
export function generateNormalCurvePoints(
  mean: number,
  stdDev: number,
  numPoints: number = 80,
  numSigmas: number = 3.5
): { x: number; y: number }[] {
  if (stdDev <= 0) return [];
  const startX = mean - numSigmas * stdDev;
  const endX = mean + numSigmas * stdDev;
  const step = (endX - startX) / (numPoints - 1);

  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < numPoints; i++) {
    const x = startX + i * step;
    const y = calcNormalPdf(x, mean, stdDev);
    points.push({ x, y });
  }
  return points;
}

/**
 * Adjusted Fisher-Pearson standardized moment coefficient of skewness G1.
 * Matches scipy.stats.skew(bias=False).
 * Handles n < 3 and zero variance.
 */
export function calcSkewness(rawValues: number[]): SkewnessResult {
  const clean = cleanNumbers(rawValues);
  const n = clean.length;

  if (n < 3) {
    const mean = calcMean(clean);
    const median = calcMedian(clean);
    return {
      skewness: 0,
      direction: 'symmetric',
      mean,
      median,
      difference: mean - median,
      interpretation: 'Sample size too small to evaluate skewness.',
    };
  }

  const mean = calcMean(clean);
  const median = calcMedian(clean);
  const sampleStd = calcSampleStdDev(clean);

  if (sampleStd <= 0) {
    return {
      skewness: 0,
      direction: 'symmetric',
      mean,
      median,
      difference: 0,
      interpretation: 'Zero variability; all observations are identical.',
    };
  }

  // Sum of cubed standardized deviations
  let sumCubedZ = 0;
  for (const v of clean) {
    const z = (v - mean) / sampleStd;
    sumCubedZ += Math.pow(z, 3);
  }

  // Adjusted Fisher-Pearson coefficient
  const factor = (n / ((n - 1) * (n - 2)));
  const g1 = factor * sumCubedZ;
  const roundedSkew = Math.round(g1 * 1000) / 1000;

  let direction: 'right-skewed' | 'left-skewed' | 'symmetric';
  let interpretation: string;

  if (roundedSkew > 0.3) {
    direction = 'right-skewed';
    interpretation =
      'Positive skew: Longer tail extends toward larger values. High values pull the mean above the median.';
  } else if (roundedSkew < -0.3) {
    direction = 'left-skewed';
    interpretation =
      'Negative skew: Longer tail extends toward smaller values. Lower values pull the mean below the median.';
  } else {
    direction = 'symmetric';
    interpretation =
      'Approximately symmetric: Little measured asymmetry; observations are evenly balanced around center.';
  }

  return {
    skewness: roundedSkew,
    direction,
    mean: Math.round(mean * 100) / 100,
    median: Math.round(median * 100) / 100,
    difference: Math.round((mean - median) * 100) / 100,
    interpretation,
  };
}

/**
 * Detects peaks (local modes) in binned distribution to inspect modality.
 */
export function detectPeaks(
  bins: HistogramBin[]
): {
  peakIndices: number[];
  modality: 'unimodal' | 'bimodal' | 'multimodal' | 'uniform';
} {
  if (bins.length === 0) {
    return { peakIndices: [], modality: 'uniform' };
  }

  const counts = bins.map((b) => b.count);
  const maxCount = Math.max(...counts);

  if (maxCount === 0) {
    return { peakIndices: [], modality: 'uniform' };
  }

  // Check uniform if all bins are approximately equal
  const minCount = Math.min(...counts);
  if (counts.length >= 3 && maxCount - minCount <= 1 && maxCount > 0) {
    return { peakIndices: [], modality: 'uniform' };
  }

  const peakIndices: number[] = [];
  const threshold = Math.max(1, maxCount * 0.45);

  for (let i = 0; i < counts.length; i++) {
    const curr = counts[i];
    if (curr < threshold) continue;

    const prev = i > 0 ? counts[i - 1] : -1;
    const next = i < counts.length - 1 ? counts[i + 1] : -1;

    if (curr >= prev && curr >= next && (curr > prev || curr > next)) {
      peakIndices.push(i);
    }
  }

  let modality: 'unimodal' | 'bimodal' | 'multimodal' | 'uniform';
  if (peakIndices.length === 1) {
    modality = 'unimodal';
  } else if (peakIndices.length === 2) {
    modality = 'bimodal';
  } else if (peakIndices.length > 2) {
    modality = 'multimodal';
  } else {
    modality = 'unimodal';
  }

  return { peakIndices, modality };
}
