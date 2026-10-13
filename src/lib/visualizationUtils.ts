/**
 * Pure statistical calculation, chart transformation, and Python code generation utilities
 * for Topic 3.3 — Data Visualization using Matplotlib and Seaborn.
 *
 * Implements deterministic algorithms, safe validation, and structured Python templates.
 */

export interface DataPoint2D {
  x: number | string;
  y: number;
  label?: string;
  group?: string;
}

export interface BoxPlotStats {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  iqr: number;
  lowerWhisker: number;
  upperWhisker: number;
  outliers: number[];
}

export interface HistogramBin {
  binIndex: number;
  binStart: number;
  binEnd: number;
  count: number;
  frequencyDensity: number;
  percentage: number;
}

export interface ChartConfig {
  library: 'matplotlib' | 'seaborn';
  chartType:
    | 'line'
    | 'bar'
    | 'histogram'
    | 'scatter'
    | 'box'
    | 'pie'
    | 'count'
    | 'kde'
    | 'violin'
    | 'heatmap';
  datasetId: string;
  xVariable: string;
  yVariable?: string;
  hueVariable?: string;
  title: string;
  xLabel: string;
  yLabel: string;
  showGrid: boolean;
  showLegend: boolean;
  marker: 'none' | 'o' | 's' | '^' | 'D';
  lineStyle: '-' | '--' | '-.' | ':';
  lineWidth: number;
  orientation: 'vertical' | 'horizontal';
  bins?: number;
  bandwidth?: number;
  palette?: string;
}

// -------------------------------------------------------------
// 1. STATISTICAL & AGGREGATION FUNCTIONS
// -------------------------------------------------------------

export function calculateBoxPlotStats(data: number[]): BoxPlotStats {
  const valid = data.filter((v) => Number.isFinite(v)).sort((a, b) => a - b);
  const n = valid.length;
  if (n === 0) {
    return {
      min: 0,
      q1: 0,
      median: 0,
      q3: 0,
      max: 0,
      iqr: 0,
      lowerWhisker: 0,
      upperWhisker: 0,
      outliers: [],
    };
  }

  const getPercentile = (p: number): number => {
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

  // Standard Tukey 1.5 * IQR convention
  const lowerThreshold = q1 - 1.5 * iqr;
  const upperThreshold = q3 + 1.5 * iqr;

  // Whiskers extend to the most extreme data points within thresholds
  const nonOutliers = valid.filter((v) => v >= lowerThreshold && v <= upperThreshold);
  const lowerWhisker = nonOutliers.length > 0 ? nonOutliers[0] : q1;
  const upperWhisker = nonOutliers.length > 0 ? nonOutliers[nonOutliers.length - 1] : q3;

  const outliers = valid.filter((v) => v < lowerThreshold || v > upperThreshold);

  return {
    min,
    q1,
    median,
    q3,
    max,
    iqr,
    lowerWhisker,
    upperWhisker,
    outliers,
  };
}

export function computeHistogramBins(data: number[], numBins = 5): HistogramBin[] {
  const valid = data.filter((v) => Number.isFinite(v));
  const n = valid.length;
  if (n === 0) return [];

  const min = Math.min(...valid);
  const max = Math.max(...valid);
  const clampedBins = Math.max(1, Math.min(20, numBins));

  if (min === max) {
    return [
      {
        binIndex: 0,
        binStart: min - 0.5,
        binEnd: max + 0.5,
        count: n,
        frequencyDensity: n / 1.0,
        percentage: 100,
      },
    ];
  }

  const range = max - min;
  const binWidth = range / clampedBins;

  const bins: HistogramBin[] = Array.from({ length: clampedBins }, (_, i) => {
    const binStart = min + i * binWidth;
    const binEnd = min + (i + 1) * binWidth;
    return {
      binIndex: i,
      binStart,
      binEnd,
      count: 0,
      frequencyDensity: 0,
      percentage: 0,
    };
  });

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

export function computeKdeDensity(
  data: number[],
  points = 60,
  bandwidth = 1.0
): { x: number; density: number }[] {
  const valid = data.filter((v) => Number.isFinite(v));
  const n = valid.length;
  if (n === 0) return [];

  const min = Math.min(...valid);
  const max = Math.max(...valid);
  const padding = (max - min) * 0.2 || 2;
  const startX = min - padding;
  const endX = max + padding;
  const step = (endX - startX) / (points - 1);

  // Silverman's rule of thumb estimate for bandwidth if not explicitly positive
  const std =
    Math.sqrt(valid.reduce((acc, v) => acc + Math.pow(v - (min + max) / 2, 2), 0) / (n || 1)) || 1;
  const h = Math.max(0.1, bandwidth > 0 ? bandwidth * std * 0.4 : 1.0);

  const gaussianKernel = (u: number): number => {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * u * u);
  };

  const results: { x: number; density: number }[] = [];
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

export function computeCorrelation(x: number[], y: number[]): number {
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

export function computeCorrelationMatrix(
  cols: { name: string; values: number[] }[]
): { names: string[]; matrix: number[][] } {
  const names = cols.map((c) => c.name);
  const matrix: number[][] = [];

  for (let i = 0; i < cols.length; i++) {
    const row: number[] = [];
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

// -------------------------------------------------------------
// 2. SCHEMA COMPATIBILITY VALIDATOR
// -------------------------------------------------------------

export function isChartCompatible(
  chartType: ChartConfig['chartType'],
  xType: 'categorical' | 'numeric',
  yType?: 'categorical' | 'numeric'
): { compatible: boolean; reason?: string } {
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
        return {
          compatible: false,
          reason: 'Scatter plots explore relationships between two numerical variables.',
        };
      }
      return { compatible: true };

    case 'box':
    case 'violin':
      if (yType && yType !== 'numeric') {
        return { compatible: false, reason: 'Box and violin plots require a numeric Y variable for distribution spread.' };
      }
      return { compatible: true };

    case 'pie':
      return { compatible: true };

    case 'count':
      return { compatible: true };

    case 'heatmap':
      return { compatible: true };

    default:
      return { compatible: true };
  }
}

// -------------------------------------------------------------
// 3. STRUCTURED PYTHON CODE TEMPLATE GENERATOR
// -------------------------------------------------------------

export function generatePythonCode(config: ChartConfig, dataSnippet?: string): string {
  const {
    library,
    chartType,
    xVariable,
    yVariable,
    hueVariable,
    title,
    xLabel,
    yLabel,
    showGrid,
    showLegend,
    marker,
    lineStyle,
    lineWidth,
    orientation,
    bins = 5,
  } = config;

  const datasetCode =
    dataSnippet ||
    `import pandas as pd
import numpy as np

# Sample dataset
df = pd.DataFrame({
    "Student": ["Rahul", "Priya", "Arjun", "Sneha", "Kabir", "Meera", "Riya", "Aman"],
    "StudyHours": [3, 5, 2, 6, 4, 7, 5, 3],
    "Marks": [65, 82, 55, 92, 74, 95, 85, 62],
    "Attendance": [78, 88, 70, 96, 84, 92, 90, 75],
    "Class": ["A", "A", "B", "A", "B", "A", "B", "B"]
})`;

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
        if (orientation === 'horizontal') {
          plotCall = `ax.barh(df["${xVariable}"], df["${yVariable || 'Marks'}"], color="royalblue", edgecolor="black")`;
        } else {
          plotCall = `ax.bar(df["${xVariable}"], df["${yVariable || 'Marks'}"], color="royalblue", edgecolor="black")`;
        }
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
        return `${datasetCode}
import matplotlib.pyplot as plt

# Group counts for pie chart
counts = df["${xVariable}"].value_counts()

fig, ax = plt.subplots(figsize=(6, 6))
ax.pie(counts, labels=counts.index, autopct="%1.1f%%", startangle=90, colors=["#4589ff", "#1192e8", "#005d5d", "#9f1853"])
ax.set_title("${safeTitle}", fontsize=14, fontweight="bold")
plt.tight_layout()
plt.show()`;
      default:
        plotCall = `ax.plot(df["${xVariable}"], df["${yVariable || 'Marks'}"])`;
    }

    const gridCall = showGrid ? `\nax.grid(True, linestyle="--", alpha=0.4)` : '';
    const legendCall = showLegend ? `\nax.legend()` : '';

    return `${datasetCode}
import matplotlib.pyplot as plt

# Object-oriented Matplotlib figure creation
fig, ax = plt.subplots(figsize=(8, 4.5))

# Plot generation
${plotCall}

# Chart customization & labels
ax.set_title("${safeTitle}", fontsize=14, fontweight="bold")
ax.set_xlabel("${safeXLabel}", fontsize=11)
ax.set_ylabel("${safeYLabel}", fontsize=11)${gridCall}${legendCall}

plt.tight_layout()
plt.show()`;
  }

  // Seaborn code generation
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
      return `${datasetCode}
import seaborn as sns
import matplotlib.pyplot as plt

# Compute correlation matrix for numeric columns
corr = df.corr(numeric_only=True)

fig, ax = plt.subplots(figsize=(6, 5))
sns.heatmap(corr, annot=True, cmap="coolwarm", vmin=-1, vmax=1, fmt=".2f", linewidths=0.5, ax=ax)
ax.set_title("${safeTitle}", fontsize=14, fontweight="bold")
plt.tight_layout()
plt.show()`;
    default:
      snsCall = `sns.lineplot(data=df, x="${xVariable}", y="${yVariable || 'Marks'}"${hueParam}, marker="o", ax=ax)`;
  }

  const gridCall = showGrid ? `\nax.grid(True, linestyle="--", alpha=0.4)` : '';
  const legendCall = showLegend ? `\n# Legend is automatically managed by Seaborn` : '';

  return `${datasetCode}
import seaborn as sns
import matplotlib.pyplot as plt

# Set Seaborn theme styling
sns.set_theme(style="whitegrid")

fig, ax = plt.subplots(figsize=(8, 4.5))

# Statistical visualization call
${snsCall}

# Titles & axis labeling
ax.set_title("${safeTitle}", fontsize=14, fontweight="bold")
ax.set_xlabel("${safeXLabel}", fontsize=11)
ax.set_ylabel("${safeYLabel}", fontsize=11)${gridCall}${legendCall}

plt.tight_layout()
plt.show()`;
}
