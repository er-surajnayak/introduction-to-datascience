'use client';

import React, { useState } from 'react';
import { Tag, Button, Slider, Select, SelectItem } from '@carbon/react';
import {
  ChartLine,
  Restart,
  Analytics,
  Information,
  View,
} from '@carbon/icons-react';
import {
  calcHistogramBins,
  calcMean,
  calcMedian,
  calcSampleStdDev,
  HistogramBin,
} from '@/lib/distributionStats';

const PRESET_DATASETS: Record<string, { label: string; data: number[]; description: string }> = {
  examMarks: {
    label: 'Exam Marks (n=50, Bell-shaped)',
    description: 'Realistic engineering exam scores clustering around 65 marks.',
    data: [
      38, 42, 45, 48, 50, 52, 54, 55, 56, 58,
      60, 61, 62, 63, 64, 65, 65, 66, 67, 68,
      68, 69, 70, 70, 71, 72, 72, 73, 74, 75,
      76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
      86, 88, 89, 90, 92, 94, 95, 96, 98, 99,
    ],
  },
  salaries: {
    label: 'Tech Salaries (n=20, Right-Skewed)',
    description: 'Monthly salaries in ₹k with a long upper executive tail.',
    data: [20, 22, 23, 24, 25, 25, 26, 27, 28, 29, 30, 32, 34, 36, 40, 45, 55, 75, 120, 180],
  },
  bimodal: {
    label: 'Two Student Cohorts (n=30, Bimodal)',
    description: 'Two mixed classrooms: one beginners cohort and one advanced cohort.',
    data: [
      20, 22, 23, 25, 26, 28, 30, 31, 32, 35,
      28, 29, 30, 32, 34, 70, 72, 73, 75, 76,
      78, 80, 81, 82, 85, 76, 77, 79, 82, 84,
    ],
  },
  uniform: {
    label: 'Uniform Sensor Readings (n=24, Flat)',
    description: 'Equal probabilities across all intervals from 10 to 90.',
    data: [
      12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48,
      52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88,
    ],
  },
};

export function HistogramBuilder() {
  const [selectedDatasetKey, setSelectedDatasetKey] = useState<string>('examMarks');
  const [numBins, setNumBins] = useState<number>(6);
  const [showDensity, setShowDensity] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(true);

  const activeDataset = PRESET_DATASETS[selectedDatasetKey];
  const data = activeDataset.data;

  const hist = calcHistogramBins(data, numBins);
  const mean = calcMean(data);
  const median = calcMedian(data);
  const std = calcSampleStdDev(data);

  const maxBinCount = Math.max(...hist.bins.map((b) => b.count), 1);
  const maxDensity = Math.max(...hist.bins.map((b) => b.density), 0.001);

  // SVG dimensions
  const svgWidth = 640;
  const svgHeight = 220;
  const padding = { top: 20, right: 20, bottom: 40, left: 45 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const binStepWidth = plotWidth / Math.max(1, hist.bins.length);

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
      }}
    >
      {/* Header Badge & Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="cyan" size="md">
            Section 3.2.5
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Hero Interaction
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Histogram Builder
        </span>
      </div>

      <h3
        style={{
          fontSize: '1.35rem',
          fontWeight: 600,
          color: 'var(--ds-text-primary)',
          marginBottom: '0.5rem',
        }}
      >
        Histogram: Seeing How the Numbers Are Arranged
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        A histogram groups numerical observations into intervals and graphs their frequencies as contiguous, touching rectangles. Notice how <strong>changing the number of bins</strong> alters the patterns we detect without changing the raw data:
      </p>

      {/* Prominent Golden Banner */}
      <div
        style={{
          padding: '12px 16px',
          background: 'var(--ds-cyan-dim)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--ds-text-primary)',
        }}
      >
        &ldquo;Changing bins can change the patterns we notice.&rdquo;
      </div>

      {/* Control Switcher Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          padding: '16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid var(--ds-border-subtle)',
          alignItems: 'center',
        }}
      >
        {/* Dataset Selector */}
        <div>
          <Select
            id="hist-dataset-select"
            labelText="Choose Dataset"
            value={selectedDatasetKey}
            onChange={(e) => setSelectedDatasetKey(e.target.value)}
            size="sm"
          >
            {Object.keys(PRESET_DATASETS).map((key) => (
              <SelectItem key={key} value={key} text={PRESET_DATASETS[key].label} />
            ))}
          </Select>
        </div>

        {/* Bin Count Slider */}
        <div>
          <Slider
            id="hist-bins-slider"
            labelText={`Number of Bins: ${numBins} (Intervals)`}
            min={3}
            max={12}
            step={1}
            value={numBins}
            onChange={({ value }: { value: number }) => setNumBins(value)}
          />
        </div>

        {/* Action Toggles */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            size="sm"
            kind={showDensity ? 'primary' : 'secondary'}
            onClick={() => setShowDensity(!showDensity)}
          >
            {showDensity ? 'Show Frequency (Counts)' : 'Show Density (Area=1)'}
          </Button>
          <Button
            size="sm"
            kind="ghost"
            renderIcon={Restart}
            onClick={() => {
              setNumBins(6);
              setShowDensity(false);
            }}
          >
            Reset Bins
          </Button>
        </div>
      </div>

      {/* SVG Histogram Display */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
          overflowX: 'auto',
        }}
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ width: '100%', height: 'auto', maxHeight: '280px', display: 'block' }}
          role="img"
          aria-label={`Histogram with ${hist.bins.length} bins showing distribution`}
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = padding.top + plotHeight * (1 - pct);
            const valLabel = showDensity
              ? (maxDensity * pct).toFixed(3)
              : Math.round(maxBinCount * pct);
            return (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="var(--ds-border-subtle)"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 6}
                  y={y + 4}
                  fill="var(--ds-text-muted)"
                  fontSize="10"
                  fontFamily="var(--ds-font-mono)"
                  textAnchor="end"
                >
                  {valLabel}
                </text>
              </g>
            );
          })}

          {/* Histogram Bars */}
          {hist.bins.map((bin, idx) => {
            const barLeft = padding.left + idx * binStepWidth;
            const barW = binStepWidth;
            const heightFactor = showDensity
              ? bin.density / maxDensity
              : bin.count / maxBinCount;
            const barH = Math.max(2, plotHeight * heightFactor);
            const barTop = padding.top + plotHeight - barH;

            return (
              <g key={idx}>
                {/* Bar rectangle */}
                <rect
                  x={barLeft}
                  y={barTop}
                  width={Math.max(1, barW - 1)} // 1px border separation between adjacent bins
                  height={barH}
                  fill="var(--ds-blue)"
                  opacity="0.85"
                  stroke="var(--ds-cyan)"
                  strokeWidth="1"
                  rx="1"
                />

                {/* Count label above bar */}
                {bin.count > 0 && (
                  <text
                    x={barLeft + barW / 2}
                    y={barTop - 4}
                    fill="var(--ds-text-primary)"
                    fontSize="10"
                    fontFamily="var(--ds-font-mono)"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {showDensity ? bin.density.toFixed(3) : bin.count}
                  </text>
                )}

                {/* Bin interval label below axis */}
                <text
                  x={barLeft + barW / 2}
                  y={svgHeight - padding.bottom + 14}
                  fill="var(--ds-text-muted)"
                  fontSize="9"
                  fontFamily="var(--ds-font-mono)"
                  textAnchor="middle"
                >
                  {bin.label}
                </text>
              </g>
            );
          })}

          {/* X and Y axes */}
          <line
            x1={padding.left}
            y1={padding.top + plotHeight}
            x2={svgWidth - padding.right}
            y2={padding.top + plotHeight}
            stroke="var(--ds-border-strong)"
            strokeWidth="1.5"
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + plotHeight}
            stroke="var(--ds-border-strong)"
            strokeWidth="1.5"
          />

          {/* Axis Titles */}
          <text
            x={padding.left + plotWidth / 2}
            y={svgHeight - 6}
            fill="var(--ds-text-secondary)"
            fontSize="11"
            fontWeight="600"
            textAnchor="middle"
          >
            Numeric Class Intervals ({selectedDatasetKey === 'salaries' ? '₹ Thousands' : 'Scores'})
          </text>
          <text
            x={-svgHeight / 2}
            y={14}
            fill="var(--ds-text-secondary)"
            fontSize="10"
            fontWeight="600"
            textAnchor="middle"
            transform="rotate(-90)"
          >
            {showDensity ? 'Density' : 'Frequency (Count)'}
          </text>
        </svg>
      </div>

      {/* Summary Statistics Card */}
      {showStats && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>TOTAL OBSERVATIONS</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
              n = {hist.totalCount}
            </div>
          </div>
          <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>BIN WIDTH</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>
              w = {hist.binWidth.toFixed(2)}
            </div>
          </div>
          <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>MEAN (μ)</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-blue)' }}>
              {mean.toFixed(2)}
            </div>
          </div>
          <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>MEDIAN</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>
              {median.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {/* Detailed Bin Frequency Table */}
      <div
        style={{
          overflowX: 'auto',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.8125rem',
            textAlign: 'left',
            background: 'var(--ds-bg-core)',
          }}
        >
          <thead>
            <tr style={{ background: 'var(--ds-bg-surface-elevated)', borderBottom: '1px solid var(--ds-border-strong)' }}>
              <th style={{ padding: '10px 14px' }}>Bin #</th>
              <th style={{ padding: '10px 14px' }}>Interval [x0, x1)</th>
              <th style={{ padding: '10px 14px' }}>Midpoint</th>
              <th style={{ padding: '10px 14px' }}>Frequency (Count)</th>
              <th style={{ padding: '10px 14px' }}>Relative Freq</th>
              <th style={{ padding: '10px 14px' }}>Density</th>
            </tr>
          </thead>
          <tbody>
            {hist.bins.map((b) => (
              <tr key={b.binIndex} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)' }}>Bin {b.binIndex + 1}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)', fontWeight: 600 }}>{b.label}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)' }}>{b.midpoint}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', fontWeight: 600 }}>
                  {b.count}
                </td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)' }}>
                  {(b.relativeFrequency * 100).toFixed(1)}%
                </td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--ds-font-mono)' }}>
                  {b.density.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
