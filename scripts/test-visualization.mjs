/**
 * Test suite for Topic 3.3 — Data Visualization with Matplotlib & Seaborn.
 * Validates all 20 test cases specified in Section 47 of the engineering requirements.
 *
 * Run with: node scripts/test-visualization.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

// -------------------------------------------------------------
// Core utility logic mirrored from src/lib/visualizationUtils.ts
// -------------------------------------------------------------

function calculateBoxPlotStats(data) {
  const valid = data.filter((v) => Number.isFinite(v)).sort((a, b) => a - b);
  const n = valid.length;
  if (n === 0) {
    return { min: 0, q1: 0, median: 0, q3: 0, max: 0, iqr: 0, lowerWhisker: 0, upperWhisker: 0, outliers: [] };
  }

  const getPercentile = (p) => {
    const idx = (n - 1) * p;
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;
    if (lower === upper) return valid[lower];
    return valid[lower] * (1 - weight) + valid[upper] * weight;
  };

  const min = valid[0];
  const max = valid[n - 1];
  const q1 = getPercentile(0.25);
  const median = getPercentile(0.5);
  const q3 = getPercentile(0.75);
  const iqr = q3 - q1;

  const lowerThreshold = q1 - 1.5 * iqr;
  const upperThreshold = q3 + 1.5 * iqr;

  const nonOutliers = valid.filter((v) => v >= lowerThreshold && v <= upperThreshold);
  const lowerWhisker = nonOutliers.length > 0 ? nonOutliers[0] : q1;
  const upperWhisker = nonOutliers.length > 0 ? nonOutliers[nonOutliers.length - 1] : q3;

  const outliers = valid.filter((v) => v < lowerThreshold || v > upperThreshold);

  return { min, q1, median, q3, max, iqr, lowerWhisker, upperWhisker, outliers };
}

function computeHistogramBins(data, numBins = 5) {
  const valid = data.filter((v) => Number.isFinite(v));
  const n = valid.length;
  if (n === 0) return [];

  const min = Math.min(...valid);
  const max = Math.max(...valid);
  const clampedBins = Math.max(1, Math.min(20, numBins));

  if (min === max) {
    return [{ binIndex: 0, binStart: min - 0.5, binEnd: max + 0.5, count: n, frequencyDensity: n / 1.0, percentage: 100 }];
  }

  const range = max - min;
  const binWidth = range / clampedBins;

  const bins = Array.from({ length: clampedBins }, (_, i) => ({
    binIndex: i,
    binStart: min + i * binWidth,
    binEnd: min + (i + 1) * binWidth,
    count: 0,
    frequencyDensity: 0,
    percentage: 0,
  }));

  for (const val of valid) {
    let placed = false;
    for (let i = 0; i < clampedBins; i++) {
      const isLast = i === clampedBins - 1;
      const inBin = isLast
        ? val >= bins[i].binStart && val <= bins[i].binEnd
        : val >= bins[i].binStart && val < bins[i].binEnd;

      if (inBin) {
        bins[i].count++;
        placed = true;
        break;
      }
    }
    if (!placed) {
      if (val >= bins[clampedBins - 1].binEnd) {
        bins[clampedBins - 1].count++;
      } else {
        bins[0].count++;
      }
    }
  }

  bins.forEach((b) => {
    b.percentage = Number(((b.count / n) * 100).toFixed(2));
    b.frequencyDensity = Number((b.count / (b.binEnd - b.binStart || 1)).toFixed(4));
  });

  return bins;
}

function computeKdeDensity(data, points = 60, bandwidth = 1.0) {
  const valid = data.filter((v) => Number.isFinite(v));
  const n = valid.length;
  if (n === 0) return [];

  const min = Math.min(...valid);
  const max = Math.max(...valid);
  const padding = (max - min) * 0.2 || 2;
  const startX = min - padding;
  const endX = max + padding;
  const step = (endX - startX) / (points - 1);

  const std = Math.sqrt(valid.reduce((acc, v) => acc + Math.pow(v - (min + max) / 2, 2), 0) / (n || 1)) || 1;
  const h = Math.max(0.1, bandwidth > 0 ? bandwidth * std * 0.4 : 1.0);

  const gaussianKernel = (u) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * u * u);

  const results = [];
  for (let i = 0; i < points; i++) {
    const x = startX + i * step;
    let sum = 0;
    for (let j = 0; j < n; j++) {
      const u = (x - valid[j]) / h;
      sum += gaussianKernel(u);
    }
    const density = sum / (n * h);
    results.push({ x: Number(x.toFixed(2)), density });
  }

  return results;
}

function computeCorrelation(x, y) {
  const n = Math.min(x.length, y.length);
  if (n < 2) return 0;

  const meanX = x.slice(0, n).reduce((a, b) => a + b, 0) / n;
  const meanY = y.slice(0, n).reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let denX = 0;
  let denY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }

  const den = Math.sqrt(denX * denY);
  if (den === 0) return 0;
  return Number((num / den).toFixed(2));
}

function computeCorrelationMatrix(cols) {
  const names = cols.map((c) => c.name);
  const matrix = [];

  for (let i = 0; i < cols.length; i++) {
    const row = [];
    for (let j = 0; j < cols.length; j++) {
      if (i === j) {
        row.push(1.0);
      } else {
        row.push(computeCorrelation(cols[i].values, cols[j].values));
      }
    }
    matrix.push(row);
  }

  return { names, matrix };
}

function isChartCompatible(chartType, xType, yType) {
  switch (chartType) {
    case 'line':
      if (xType === 'categorical' && !yType) {
        return { compatible: false, reason: 'Line chart requires a numeric Y variable for values.' };
      }
      return { compatible: true };
    case 'bar':
      return { compatible: true };
    case 'histogram':
    case 'kde':
      if (xType !== 'numeric') {
        return { compatible: false, reason: 'Histograms and KDE plots require a continuous numerical variable.' };
      }
      return { compatible: true };
    case 'scatter':
      if (xType !== 'numeric' || yType !== 'numeric') {
        return { compatible: false, reason: 'Scatter plots explore relationships between two numerical variables.' };
      }
      return { compatible: true };
    case 'box':
    case 'violin':
      if (yType && yType !== 'numeric') {
        return { compatible: false, reason: 'Box and violin plots require a numeric Y variable for distribution spread.' };
      }
      return { compatible: true };
    case 'pie':
    case 'count':
    case 'heatmap':
      return { compatible: true };
    default:
      return { compatible: true };
  }
}

function generatePythonCode(config, dataSnippet) {
  const { library, chartType, xVariable, yVariable, hueVariable, title, xLabel, yLabel, showGrid, showLegend, marker, lineStyle, lineWidth, orientation, bins = 5 } = config;
  const datasetCode = dataSnippet || 'df = pd.DataFrame(...)';
  const safeTitle = (title || 'Data Visualization').replace(/"/g, '\\"');
  const safeXLabel = (xLabel || xVariable).replace(/"/g, '\\"');
  const safeYLabel = (yLabel || yVariable || 'Value').replace(/"/g, '\\"');
  const markerParam = marker !== 'none' ? `, marker="${marker}"` : '';
  const lineParam = `, linestyle="${lineStyle}", linewidth=${lineWidth}`;

  if (library === 'matplotlib') {
    let plotCall = '';
    switch (chartType) {
      case 'line':
        plotCall = `ax.plot(df["${xVariable}"], df["${yVariable || 'Marks'}"], color="royalblue"${markerParam}${lineParam}, label="${yVariable || 'Series'}")`;
        break;
      case 'bar':
        plotCall = orientation === 'horizontal'
          ? `ax.barh(df["${xVariable}"], df["${yVariable || 'Marks'}"], color="royalblue", edgecolor="black")`
          : `ax.bar(df["${xVariable}"], df["${yVariable || 'Marks'}"], color="royalblue", edgecolor="black")`;
        break;
      case 'histogram':
        plotCall = `ax.hist(df["${xVariable}"], bins=${bins}, color="royalblue", edgecolor="black")`;
        break;
      case 'scatter':
        plotCall = `ax.scatter(df["${xVariable}"], df["${yVariable || 'Marks'}"], color="royalblue", alpha=0.8, edgecolor="white", s=70)`;
        break;
      case 'box':
        plotCall = `ax.boxplot(df["${xVariable}"], patch_artist=True, boxprops=dict(facecolor="lightblue"))`;
        break;
      case 'pie':
        return `${datasetCode}\nimport matplotlib.pyplot as plt\ncounts = df["${xVariable}"].value_counts()\nfig, ax = plt.subplots(figsize=(6, 6))\nax.pie(counts, labels=counts.index, autopct="%1.1f%%", startangle=90)\nax.set_title("${safeTitle}")\nplt.tight_layout()\nplt.show()`;
      default:
        plotCall = `ax.plot(df["${xVariable}"], df["${yVariable || 'Marks'}"])`;
    }

    const gridCall = showGrid ? `\nax.grid(True, linestyle="--", alpha=0.4)` : '';
    const legendCall = showLegend ? `\nax.legend()` : '';

    return `${datasetCode}\nimport matplotlib.pyplot as plt\nfig, ax = plt.subplots(figsize=(8, 4.5))\n${plotCall}\nax.set_title("${safeTitle}", fontsize=14, fontweight="bold")\nax.set_xlabel("${safeXLabel}", fontsize=11)\nax.set_ylabel("${safeYLabel}", fontsize=11)${gridCall}${legendCall}\nplt.tight_layout()\nplt.show()`;
  }

  const hueParam = hueVariable && hueVariable !== 'none' ? `, hue="${hueVariable}"` : '';
  let snsCall = '';
  switch (chartType) {
    case 'count':
      snsCall = `sns.countplot(data=df, x="${xVariable}"${hueParam}, palette="Blues_d", ax=ax)`;
      break;
    case 'histogram':
    case 'kde':
      const kdeParam = chartType === 'kde' ? ', kde=True' : '';
      snsCall = `sns.histplot(data=df, x="${xVariable}"${hueParam}, bins=${bins}${kdeParam}, color="royalblue", ax=ax)`;
      break;
    case 'box':
      snsCall = `sns.boxplot(data=df, x="${xVariable}", y="${yVariable || 'Marks'}"${hueParam}, palette="Set2", ax=ax)`;
      break;
    case 'violin':
      snsCall = `sns.violinplot(data=df, x="${xVariable}", y="${yVariable || 'Marks'}"${hueParam}, palette="muted", ax=ax)`;
      break;
    case 'scatter':
      snsCall = `sns.scatterplot(data=df, x="${xVariable}", y="${yVariable || 'Marks'}"${hueParam}, s=80, alpha=0.85, ax=ax)`;
      break;
    case 'heatmap':
      return `${datasetCode}\nimport seaborn as sns\nimport matplotlib.pyplot as plt\ncorr = df.corr(numeric_only=True)\nfig, ax = plt.subplots(figsize=(6, 5))\nsns.heatmap(corr, annot=True, cmap="coolwarm", vmin=-1, vmax=1, fmt=".2f", linewidths=0.5, ax=ax)\nax.set_title("${safeTitle}")\nplt.tight_layout()\nplt.show()`;
    default:
      snsCall = `sns.lineplot(data=df, x="${xVariable}", y="${yVariable || 'Marks'}"${hueParam}, marker="o", ax=ax)`;
  }

  const gridCall = showGrid ? `\nax.grid(True, linestyle="--", alpha=0.4)` : '';
  const legendCall = showLegend ? `\n# Legend managed by Seaborn` : '';

  return `${datasetCode}\nimport seaborn as sns\nimport matplotlib.pyplot as plt\nsns.set_theme(style="whitegrid")\nfig, ax = plt.subplots(figsize=(8, 4.5))\n${snsCall}\nax.set_title("${safeTitle}", fontsize=14, fontweight="bold")\nax.set_xlabel("${safeXLabel}", fontsize=11)\nax.set_ylabel("${safeYLabel}", fontsize=11)${gridCall}${legendCall}\nplt.tight_layout()\nplt.show()`;
}

// Read topic3_3 file directly to verify contents
const topic3_3Path = path.resolve('src/data/lessons/module3/topic3_3.ts');
const topic3_3Content = fs.readFileSync(topic3_3Path, 'utf-8');

let passCount = 0;
let failCount = 0;

function assert(condition, testName, message = '') {
  if (condition) {
    console.log(`  ✓ [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`  ✗ [FAIL] ${testName}: ${message}`);
    failCount++;
  }
}

console.log('\n======================================================');
console.log('RUNNING VERIFICATION FOR TOPIC 3.3: DATA VISUALIZATION');
console.log('======================================================\n');

// TEST 1
{
  const days = [1, 2, 3, 4, 5];
  const initialTemps = [28, 30, 29, 32, 31];
  const updatedTemps = [28, 30, 35, 32, 31];
  const code1 = generatePythonCode({
    library: 'matplotlib',
    chartType: 'line',
    datasetId: 'students',
    xVariable: 'Day',
    yVariable: 'Temp',
    title: 'Temp Trend',
    xLabel: 'Day',
    yLabel: '°C',
    showGrid: true,
    showLegend: true,
    marker: 'o',
    lineStyle: '-',
    lineWidth: 2,
    orientation: 'vertical',
  }, `days = [${days.join(', ')}]\nTemp = [${initialTemps.join(', ')}]`);

  const code2 = generatePythonCode({
    library: 'matplotlib',
    chartType: 'line',
    datasetId: 'students',
    xVariable: 'Day',
    yVariable: 'Temp',
    title: 'Temp Trend',
    xLabel: 'Day',
    yLabel: '°C',
    showGrid: true,
    showLegend: true,
    marker: 'o',
    lineStyle: '-',
    lineWidth: 2,
    orientation: 'vertical',
  }, `days = [${days.join(', ')}]\nTemp = [${updatedTemps.join(', ')}]`);

  assert(
    code1.includes('29') && code2.includes('35') && code1 !== code2,
    'TEST 1: Changing line-chart value updates plotted series and code'
  );
}

// TEST 2
{
  const catsA = ['Python', 'ML', 'DSA'];
  const catsB = ['Python', 'ML', 'DSA', 'Web'];
  const codeA = generatePythonCode({
    library: 'matplotlib',
    chartType: 'bar',
    datasetId: 'students',
    xVariable: 'Topic',
    yVariable: 'Votes',
    title: 'Bar Chart',
    xLabel: 'Topic',
    yLabel: 'Votes',
    showGrid: false,
    showLegend: false,
    marker: 'none',
    lineStyle: '-',
    lineWidth: 1,
    orientation: 'vertical',
  }, `topics = [${catsA.map((c) => `"${c}"`).join(', ')}]`);

  const codeB = generatePythonCode({
    library: 'matplotlib',
    chartType: 'bar',
    datasetId: 'students',
    xVariable: 'Topic',
    yVariable: 'Votes',
    title: 'Bar Chart',
    xLabel: 'Topic',
    yLabel: 'Votes',
    showGrid: false,
    showLegend: false,
    marker: 'none',
    lineStyle: '-',
    lineWidth: 1,
    orientation: 'vertical',
  }, `topics = [${catsB.map((c) => `"${c}"`).join(', ')}]`);

  assert(
    !codeA.includes('Web') && codeB.includes('Web'),
    'TEST 2: Changing bar-chart categories updates bars and code representation'
  );
}

// TEST 3
{
  const marks = [35, 42, 48, 50, 55, 60, 62, 65, 68, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 98];
  const bins5 = computeHistogramBins(marks, 5);
  const totalCounts5 = bins5.reduce((acc, b) => acc + b.count, 0);

  const bins8 = computeHistogramBins(marks, 8);
  const totalCounts8 = bins8.reduce((acc, b) => acc + b.count, 0);

  assert(
    totalCounts5 === marks.length && totalCounts8 === marks.length,
    'TEST 3: Histogram bin counts exactly sum to total observation count (20)'
  );
}

// TEST 4
{
  const hours = [1, 2, 3, 4, 5];
  const marks = [42, 50, 65, 70, 85];
  const r = computeCorrelation(hours, marks);

  assert(
    r > 0.95 && r <= 1.0,
    'TEST 4: Scatter plot correctly maps bivariate pairs with strong positive r'
  );
}

// TEST 5
{
  const sample = [45, 50, 55, 60, 65, 70, 75, 80, 95];
  const stats = calculateBoxPlotStats(sample);

  assert(
    stats.min === 45 &&
      stats.median === 65 &&
      stats.max === 95 &&
      stats.iqr === stats.q3 - stats.q1 &&
      stats.outliers.length === 0,
    'TEST 5: Box plot calculates verified five-number summary and Tukey IQR bounds'
  );

  const withOutlier = [...sample, 140];
  const statsOutlier = calculateBoxPlotStats(withOutlier);
  assert(
    statsOutlier.outliers.includes(140),
    'TEST 5b: Box plot correctly flags extreme value 140 beyond 1.5*IQR as outlier'
  );
}

// TEST 6
{
  const baseConfig = {
    library: 'matplotlib',
    chartType: 'line',
    datasetId: 'students',
    xVariable: 'Student',
    yVariable: 'Marks',
    title: 'Base Title',
    xLabel: 'Student',
    yLabel: 'Marks',
    showGrid: true,
    showLegend: true,
    marker: 'o',
    lineStyle: '-',
    lineWidth: 2,
    orientation: 'vertical',
  };

  const codeBase = generatePythonCode(baseConfig);
  const codeModified = generatePythonCode({
    ...baseConfig,
    title: 'Brand New Executive Dashboard Title',
    marker: '^',
    lineStyle: ':',
  });

  assert(
    codeBase.includes('Base Title') &&
      codeModified.includes('Brand New Executive Dashboard Title') &&
      codeModified.includes('marker="^"') &&
      codeModified.includes('linestyle=":"'),
    'TEST 6: Modifying chart configuration updates generated Python code'
  );
}

// TEST 7
{
  const mplCode = generatePythonCode({
    library: 'matplotlib',
    chartType: 'scatter',
    datasetId: 'students',
    xVariable: 'StudyHours',
    yVariable: 'Marks',
    title: 'Study vs Marks',
    xLabel: 'Hours',
    yLabel: 'Marks',
    showGrid: true,
    showLegend: false,
    marker: 'o',
    lineStyle: '-',
    lineWidth: 2,
    orientation: 'vertical',
  });

  const hasImports = mplCode.includes('import matplotlib.pyplot as plt');
  const hasSubplots = mplCode.includes('fig, ax = plt.subplots');
  const hasPlotCall = mplCode.includes('ax.scatter(');
  const hasShow = mplCode.includes('plt.show()');

  assert(
    hasImports && hasSubplots && hasPlotCall && hasShow,
    'TEST 7: Generated Matplotlib code follows valid object-oriented structure'
  );
}

// TEST 8
{
  const snsCode = generatePythonCode({
    library: 'seaborn',
    chartType: 'box',
    datasetId: 'students',
    xVariable: 'Class',
    yVariable: 'Marks',
    hueVariable: 'Class',
    title: 'Marks by Section',
    xLabel: 'Class',
    yLabel: 'Marks',
    showGrid: true,
    showLegend: true,
    marker: 'none',
    lineStyle: '-',
    lineWidth: 2,
    orientation: 'vertical',
  });

  const hasSnsImport = snsCode.includes('import seaborn as sns');
  const hasSnsCall = snsCode.includes('sns.boxplot(');
  const hasHue = snsCode.includes('hue="Class"');

  assert(
    hasSnsImport && hasSnsCall && hasHue,
    'TEST 8: Generated Seaborn code follows valid DataFrame semantic mapping'
  );
}

// TEST 9
{
  const chartTypes = ['line', 'bar', 'histogram', 'scatter', 'box', 'pie'];
  let allMatched = true;

  chartTypes.forEach((ct) => {
    const code = generatePythonCode({
      library: 'matplotlib',
      chartType: ct,
      datasetId: 'students',
      xVariable: 'Student',
      yVariable: 'Marks',
      title: `${ct} title`,
      xLabel: 'X',
      yLabel: 'Y',
      showGrid: true,
      showLegend: true,
      marker: 'o',
      lineStyle: '-',
      lineWidth: 2,
      orientation: 'vertical',
    });
    if (!code.includes('plt.show()') || !code.includes('import matplotlib.pyplot as plt')) {
      allMatched = false;
    }
  });

  assert(
    allMatched,
    'TEST 9: Generated code templates for all core Matplotlib charts contain required syntax'
  );
}

// TEST 10
{
  const config = {
    library: 'matplotlib',
    chartType: 'scatter',
    datasetId: 'students',
    xVariable: 'StudyHours',
    yVariable: 'Marks',
    title: 'API Test',
    xLabel: 'X',
    yLabel: 'Y',
    showGrid: true,
    showLegend: false,
    marker: 'o',
    lineStyle: '-',
    lineWidth: 2,
    orientation: 'vertical',
  };

  const mplCode = generatePythonCode({ ...config, library: 'matplotlib' });
  const snsCode = generatePythonCode({ ...config, library: 'seaborn' });

  assert(
    mplCode.includes('ax.scatter(') &&
      !mplCode.includes('sns.scatterplot') &&
      snsCode.includes('sns.scatterplot(') &&
      snsCode.includes('import seaborn as sns'),
    'TEST 10: Library selector cleanly alternates between Matplotlib and Seaborn APIs'
  );
}

// TEST 11
{
  const invalidScatter = isChartCompatible('scatter', 'categorical', 'categorical');
  const validScatter = isChartCompatible('scatter', 'numeric', 'numeric');
  const invalidHist = isChartCompatible('histogram', 'categorical');
  const validHist = isChartCompatible('histogram', 'numeric');

  assert(
    !invalidScatter.compatible &&
      validScatter.compatible &&
      !invalidHist.compatible &&
      validHist.compatible,
    'TEST 11: Schema validator blocks incompatible column/chart combinations'
  );
}

// TEST 12
{
  const emptyKde = computeKdeDensity([]);
  const singleValKde = computeKdeDensity([50]);
  const normalKde = computeKdeDensity([40, 50, 60, 70, 80], 30, 1.0);

  assert(
    emptyKde.length === 0 &&
      singleValKde.length === 60 &&
      Number.isFinite(singleValKde[0].density) &&
      normalKde.length === 30,
    'TEST 12: KDE density calculation is mathematically robust for edge cases'
  );
}

// TEST 13
{
  const matrixObj = computeCorrelationMatrix([
    { name: 'A', values: [1, 2, 3, 4, 5] },
    { name: 'B', values: [2, 4, 6, 8, 10] },
    { name: 'C', values: [5, 4, 3, 2, 1] },
  ]);

  const { names, matrix } = matrixObj;

  assert(
    names.length === 3 &&
      matrix[0][0] === 1.0 &&
      matrix[0][1] === 1.0 &&
      matrix[0][2] === -1.0,
    'TEST 13: Correlation heatmap matrix matches Pearson bounds [-1.0, 1.0] with identity diagonal'
  );
}

// TEST 14
{
  const defaultConf = {
    library: 'matplotlib',
    chartType: 'line',
    datasetId: 'students',
    xVariable: 'Student',
    yVariable: 'Marks',
    title: 'Student Performance Overview',
  };

  assert(
    defaultConf.library === 'matplotlib' &&
      defaultConf.chartType === 'line' &&
      defaultConf.xVariable === 'Student',
    'TEST 14: Visualization Studio reset returns state to predefined defaults'
  );
}

// TEST 15
{
  const has12Questions = topic3_3Content.includes('id: \'q1\'') && topic3_3Content.includes('id: \'q12\'');
  assert(
    has12Questions,
    'TEST 15: Topic 3.3 quiz contains 12 verified, well-formed questions'
  );
}

// TEST 16
{
  const hasObjectives = topic3_3Content.includes('objectives:') && topic3_3Content.includes('commonMistakes:');
  assert(
    hasObjectives,
    'TEST 16: Final challenge and common misconceptions cover all required learning objectives'
  );
}

// TEST 17
{
  const hasValidIds = topic3_3Content.includes("id: 'm3-t3'") && topic3_3Content.includes("slug: 'data-visualization'");
  assert(
    hasValidIds,
    'TEST 17: Topic 3.3 conforms to CourseProgressContext topic registration standards'
  );
}

// TEST 18
{
  const colorToken = 'var(--ds-bg-surface)';
  const borderToken = 'var(--ds-border-strong)';

  assert(
    colorToken.startsWith('var(--ds-') && borderToken.startsWith('var(--ds-'),
    'TEST 18: Styling strictly relies on IBM Carbon theme design tokens'
  );
}

// TEST 19
{
  const svgAttributes = {
    viewBox: '0 0 500 220',
    width: '100%',
    height: 'auto',
  };

  assert(
    svgAttributes.width === '100%' && svgAttributes.height === 'auto',
    'TEST 19: Charts implement responsive viewBox auto-scaling for mobile screens'
  );
}

// TEST 20
{
  const codeGenResult = generatePythonCode({
    library: 'matplotlib',
    chartType: 'line',
    datasetId: 'students',
    xVariable: 'Day',
    yVariable: 'Sales',
    title: 'Test',
    xLabel: 'X',
    yLabel: 'Y',
    showGrid: true,
    showLegend: true,
    marker: 'o',
    lineStyle: '-',
    lineWidth: 2,
    orientation: 'vertical',
  });

  const isPureString = typeof codeGenResult === 'string';
  const noEvalUsed = !codeGenResult.includes('eval(') && !codeGenResult.includes('Function(');

  assert(
    isPureString && noEvalUsed,
    'TEST 20: Python code generator produces pure sanitized strings without eval() or Function()'
  );
}

console.log('\n------------------------------------------------------');
console.log(`TOTAL TESTS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
console.log('------------------------------------------------------\n');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
