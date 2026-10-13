/**
 * Automated test script verifying the 14 statistical test cases from Section 40.
 * Pure JS implementation matching src/lib/distributionStats.ts
 */

// Core statistical calculations
function cleanNumbers(values) {
  return values.filter((v) => typeof v === 'number' && !isNaN(v));
}

function calcMean(values) {
  const clean = cleanNumbers(values);
  if (clean.length === 0) return 0;
  return clean.reduce((acc, v) => acc + v, 0) / clean.length;
}

function calcPercentile(values, p) {
  const clean = cleanNumbers(values);
  if (clean.length === 0) return 0;
  if (clean.length === 1) return clean[0];
  const sorted = [...clean].sort((a, b) => a - b);
  const clampedP = Math.max(0, Math.min(1, p));
  const index = (sorted.length - 1) * clampedP;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  if (lower === upper) return sorted[lower];
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

function calcMedian(values) {
  return calcPercentile(values, 0.5);
}

function calcPopulationVariance(values) {
  const clean = cleanNumbers(values);
  const n = clean.length;
  if (n <= 1) return 0;
  const mean = calcMean(clean);
  const sumSqDiff = clean.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  return sumSqDiff / n;
}

function calcSampleVariance(values) {
  const clean = cleanNumbers(values);
  const n = clean.length;
  if (n <= 1) return 0;
  const mean = calcMean(clean);
  const sumSqDiff = clean.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  return sumSqDiff / (n - 1);
}

function calcPopulationStdDev(values) {
  return Math.sqrt(calcPopulationVariance(values));
}

function calcSampleStdDev(values) {
  return Math.sqrt(calcSampleVariance(values));
}

function calcFrequencyTable(rawValues) {
  const clean = cleanNumbers(rawValues);
  const total = clean.length;
  if (total === 0) return [];

  const freqMap = new Map();
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
      percentage: Math.round(relFreq * 10000) / 100,
      cumulativeFrequency: runningCount,
      cumulativePercentage: Math.round((runningCount / total) * 10000) / 100,
    };
  });
}

function calcHistogramBins(rawValues, desiredNumBins = 5, forcedRange) {
  const clean = cleanNumbers(rawValues);
  const totalCount = clean.length;
  const k = Math.max(1, Math.min(20, Math.round(desiredNumBins)));

  if (totalCount === 0) {
    return { bins: [], binWidth: 0, minVal: 0, maxVal: 0, totalCount: 0 };
  }

  const dataMin = Math.min(...clean);
  const dataMax = Math.max(...clean);
  const minVal = forcedRange ? forcedRange.min : dataMin;
  const maxVal = forcedRange ? forcedRange.max : dataMax;

  if (maxVal <= minVal) {
    const pad = Math.max(1, Math.abs(minVal) * 0.1);
    const low = minVal - pad;
    const high = maxVal + pad;
    const binWidth = (high - low) / k;
    const bins = Array.from({ length: k }, (_, idx) => {
      const x0 = low + idx * binWidth;
      const x1 = low + (idx + 1) * binWidth;
      const binValues = clean.filter((v) => (idx === k - 1 ? v >= x0 && v <= x1 : v >= x0 && v < x1));
      return {
        binIndex: idx,
        x0,
        x1,
        count: binValues.length,
        relativeFrequency: binValues.length / totalCount,
      };
    });
    return { bins, binWidth, minVal: low, maxVal: high, totalCount };
  }

  const binWidth = (maxVal - minVal) / k;
  const bins = Array.from({ length: k }, (_, idx) => {
    const x0 = minVal + idx * binWidth;
    const x1 = idx === k - 1 ? maxVal : minVal + (idx + 1) * binWidth;
    const binValues = clean.filter((v) => {
      if (idx === k - 1) return v >= x0 && v <= x1;
      return v >= x0 && v < x1;
    });
    return {
      binIndex: idx,
      x0,
      x1,
      count: binValues.length,
      relativeFrequency: binValues.length / totalCount,
    };
  });

  return { bins, binWidth, minVal, maxVal, totalCount };
}

function calcNormalPdf(x, mean, stdDev) {
  if (stdDev <= 0 || isNaN(stdDev) || isNaN(mean) || isNaN(x)) return 0;
  const variance = stdDev * stdDev;
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  const exponent = -0.5 * (Math.pow(x - mean, 2) / variance);
  return coefficient * Math.exp(exponent);
}

let allPassed = true;
function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    allPassed = false;
  } else {
    console.log(`PASS: ${message}`);
  }
}

console.log('--- RUNNING DISTRIBUTION STATISTICAL TEST SUITE (14 TESTS) ---');

// TEST 1: Dataset [45,47,49,50,50,51,53,55] Mean = 50.
const ds1 = [45, 47, 49, 50, 50, 51, 53, 55];
assert(Math.abs(calcMean(ds1) - 50) < 1e-9, `TEST 1: Dataset A Mean = 50 (got ${calcMean(ds1)})`);

// TEST 2: Dataset [10,20,30,40,60,70,80,90] Mean = 50.
const ds2 = [10, 20, 30, 40, 60, 70, 80, 90];
assert(Math.abs(calcMean(ds2) - 50) < 1e-9, `TEST 2: Dataset B Mean = 50 (got ${calcMean(ds2)})`);

// TEST 3: Dataset [60,70,70,80,80,80,90] Frequency of 80 = 3.
const ds3 = [60, 70, 70, 80, 80, 80, 90];
const freqTable3 = calcFrequencyTable(ds3);
const row80 = freqTable3.find((r) => r.value === 80);
assert(row80 && row80.frequency === 3, `TEST 3: Frequency of 80 = 3 (got ${row80?.frequency})`);

// TEST 4: Relative frequency of 80 = 3/7.
const expectedRelFreq = 3 / 7;
assert(
  row80 && Math.abs(row80.relativeFrequency - expectedRelFreq) < 1e-5,
  `TEST 4: Relative frequency of 80 = 3/7 (got ${row80?.relativeFrequency})`
);

// TEST 5: Sum of histogram bin frequencies equals valid observation count.
const hist5 = calcHistogramBins(ds3, 5);
const sumBins = hist5.bins.reduce((acc, b) => acc + b.count, 0);
assert(sumBins === ds3.length, `TEST 5: Sum of bin frequencies equals valid observation count (${sumBins} == ${ds3.length})`);

// TEST 6: Final cumulative frequency equals dataset size.
const lastCum = freqTable3[freqTable3.length - 1].cumulativeFrequency;
assert(lastCum === ds3.length, `TEST 6: Final cumulative frequency equals dataset size (${lastCum} == ${ds3.length})`);

// TEST 7: All observations exactly equal. Population variance = 0. Population SD = 0.
const ds7 = [50, 50, 50, 50, 50];
const popVar7 = calcPopulationVariance(ds7);
const popStd7 = calcPopulationStdDev(ds7);
assert(popVar7 === 0 && popStd7 === 0, `TEST 7: Identical observations have Pop Variance = 0, Pop SD = 0 (got var=${popVar7}, sd=${popStd7})`);

// TEST 8: Normal density input sigma <= 0 must be rejected.
const pdfReject = calcNormalPdf(50, 50, 0);
const pdfRejectNeg = calcNormalPdf(50, 50, -2);
assert(pdfReject === 0 && pdfRejectNeg === 0, `TEST 8: Normal density with sigma <= 0 is safely rejected (got ${pdfReject}, ${pdfRejectNeg})`);

// TEST 9: Mean and median of salary challenge match independent calculations.
const salaries = [22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 36, 38, 45, 150];
const salaryCount = salaries.length;
const salaryMean = calcMean(salaries);
const salaryMedian = calcMedian(salaries);
assert(salaryCount === 15, `TEST 9a: Salary count = 15`);
assert(Math.abs(salaryMean - 38.466666) < 0.01, `TEST 9b: Salary Mean approx 38.47 (got ${salaryMean})`);
assert(salaryMedian === 30, `TEST 9c: Salary Median = 30 (got ${salaryMedian})`);

// TEST 10: Changing histogram bins preserves the original dataset.
const originalClone = [...salaries];
calcHistogramBins(salaries, 3);
calcHistogramBins(salaries, 8);
calcHistogramBins(salaries, 12);
assert(
  JSON.stringify(salaries) === JSON.stringify(originalClone),
  `TEST 10: Changing histogram bins preserves original data`
);

// TEST 11: Empty dataset shows a safe empty state.
const emptyHist = calcHistogramBins([], 5);
const emptyFreq = calcFrequencyTable([]);
const emptyMean = calcMean([]);
assert(emptyHist.bins.length === 0 && emptyFreq.length === 0 && emptyMean === 0, `TEST 11: Empty dataset handled safely without errors`);

// TEST 12: Non-numeric inputs are rejected or clearly reported.
const messy = [10, NaN, undefined, 20, null, 30];
const cleaned = cleanNumbers(messy);
assert(cleaned.length === 3 && cleaned[0] === 10 && cleaned[1] === 20 && cleaned[2] === 30, `TEST 12: Non-numeric values filtered safely`);

// TEST 13: Population SD and sample SD use their respective denominators.
const ds13 = [10, 20, 30, 40];
const popSd13 = calcPopulationStdDev(ds13);
const sampleSd13 = calcSampleStdDev(ds13);
assert(Math.abs(popSd13 - Math.sqrt(125)) < 1e-5, `TEST 13a: Pop SD uses denominator N (got ${popSd13})`);
assert(Math.abs(sampleSd13 - Math.sqrt(500 / 3)) < 1e-5, `TEST 13b: Sample SD uses denominator n-1 (got ${sampleSd13})`);

// TEST 14: Normal curve movement and spread behave consistently with mean and SD.
const peak1 = calcNormalPdf(50, 50, 10);
const peak2 = calcNormalPdf(50, 50, 20);
assert(peak1 > peak2, `TEST 14a: Wider normal curve (higher SD) has lower peak (${peak1} > ${peak2})`);
const symLeft = calcNormalPdf(40, 50, 10);
const symRight = calcNormalPdf(60, 50, 10);
assert(Math.abs(symLeft - symRight) < 1e-9, `TEST 14b: Normal curve is symmetric around mean (${symLeft} == ${symRight})`);

if (allPassed) {
  console.log('\n>>> ALL 14 STATISTICAL TEST CASES PASSED SUCCESSFULLY! <<<');
} else {
  console.error('\n>>> SOME TESTS FAILED! <<<');
  process.exit(1);
}
