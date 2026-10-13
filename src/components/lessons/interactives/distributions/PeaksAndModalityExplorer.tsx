'use client';

import React, { useState } from 'react';
import { Tag, Button, Slider, Select, SelectItem } from '@carbon/react';
import {
  DataCategorical,
  Analytics,
  Restart,
  CheckmarkFilled,
  Help,
  Information,
} from '@carbon/icons-react';
import {
  calcHistogramBins,
  detectPeaks,
} from '@/lib/distributionStats';

const COHORT_DATASETS: Record<
  string,
  {
    name: string;
    description: string;
    trueModality: 'unimodal' | 'bimodal' | 'multimodal' | 'uniform';
    data: number[];
    subgroupsInfo: string;
  }
> = {
  singleCohort: {
    name: '1. Single Class (Homogeneous Unimodal)',
    description: 'A single 40-student section with scores clustering around 65.',
    trueModality: 'unimodal',
    data: [
      42, 45, 48, 52, 55, 56, 58, 60, 61, 62,
      63, 64, 65, 65, 66, 67, 68, 68, 69, 70,
      71, 72, 73, 74, 75, 76, 78, 80, 82, 85,
    ],
    subgroupsInfo: 'One homogeneous student cohort with normal test variance.',
  },
  mergedCohorts: {
    name: '2. Merged Beginner & Advanced Sections (Bimodal)',
    description: 'Two separate student cohorts combined into one grade sheet.',
    trueModality: 'bimodal',
    data: [
      22, 24, 25, 26, 28, 30, 31, 32, 34, 35,
      28, 30, 32, 33, 70, 72, 74, 75, 76, 78,
      80, 81, 82, 84, 85, 75, 77, 80, 82, 84,
    ],
    subgroupsInfo:
      'Beginners peaked around 30; Advanced peaked around 80. The average (~55) falls in an empty valley!',
  },
  multiShift: {
    name: '3. Three-Shift Factory Production (Multimodal)',
    description: 'Widget production across Morning, Evening, and Night shifts.',
    trueModality: 'multimodal',
    data: [
      15, 18, 20, 22, 24, 25, 20, 22, 50, 52,
      55, 56, 58, 60, 54, 55, 85, 88, 90, 92,
      94, 95, 90, 92,
    ],
    subgroupsInfo: 'Night shift (20), Evening shift (55), Day shift (90).',
  },
};

export function PeaksAndModalityExplorer() {
  const [datasetKey, setDatasetKey] = useState<string>('mergedCohorts');
  const [binCount, setBinCount] = useState<number>(8);
  const [userGuess, setUserGuess] = useState<number | null>(null);
  const [hypothesisAnswered, setHypothesisAnswered] = useState<boolean | null>(null);

  const active = COHORT_DATASETS[datasetKey];
  const hist = calcHistogramBins(active.data, binCount);
  const { peakIndices, modality } = detectPeaks(hist.bins);

  const handleDatasetChange = (key: string) => {
    setDatasetKey(key);
    setUserGuess(null);
    setHypothesisAnswered(null);
  };

  const svgW = 540;
  const svgH = 180;
  const pad = { top: 15, right: 15, bottom: 35, left: 35 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;
  const barW = plotW / Math.max(1, hist.bins.length);
  const maxCount = Math.max(...hist.bins.map((b) => b.count), 1);

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
            Section 3.2.8
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Peaks and Modality
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Peaks &rarr; Subgroup Hypotheses
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
        Peaks Explorer: Investigating Modality &amp; Mixture Models
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        A distribution can be <strong>Unimodal</strong> (one peak), <strong>Bimodal</strong> (two peaks), or <strong>Multimodal</strong> (multiple peaks). Select an example dataset and adjust the bin count slider to see how bin width influences apparent peaks:
      </p>

      {/* Dataset & Slider Controller */}
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
        <Select
          id="modality-dataset-select"
          labelText="Choose Scenario"
          value={datasetKey}
          onChange={(e) => handleDatasetChange(e.target.value)}
          size="sm"
        >
          {Object.keys(COHORT_DATASETS).map((key) => (
            <SelectItem key={key} value={key} text={COHORT_DATASETS[key].name} />
          ))}
        </Select>

        <Slider
          id="modality-bins-slider"
          labelText={`Adjust Bin Width (${binCount} Bins)`}
          min={4}
          max={15}
          step={1}
          value={binCount}
          onChange={({ value }: { value: number }) => setBinCount(value)}
        />
      </div>

      {/* SVG Binned Bar Chart */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8125rem' }}>
          <span style={{ color: 'var(--ds-text-secondary)', fontWeight: 600 }}>
            {active.description}
          </span>
          <span style={{ fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', fontWeight: 600 }}>
            Detected: {peakIndices.length} Prominent Peak{peakIndices.length === 1 ? '' : 's'} ({modality.toUpperCase()})
          </span>
        </div>

        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img"
          aria-label="Histogram showing peaks and modality"
        >
          {/* Baseline */}
          <line x1={pad.left} y1={pad.top + plotH} x2={svgW - pad.right} y2={pad.top + plotH} stroke="var(--ds-border-strong)" strokeWidth="1.5" />

          {/* Histogram Bars */}
          {hist.bins.map((bin, idx) => {
            const isPeak = peakIndices.includes(idx);
            const x = pad.left + idx * barW;
            const h = (bin.count / maxCount) * plotH;
            const y = pad.top + plotH - h;

            return (
              <g key={idx}>
                <rect
                  x={x}
                  y={y}
                  width={Math.max(1, barW - 1)}
                  height={h}
                  fill={isPeak ? 'var(--ds-amber)' : 'var(--ds-blue)'}
                  opacity="0.85"
                  stroke={isPeak ? '#fff' : 'var(--ds-cyan)'}
                  strokeWidth={isPeak ? '2' : '1'}
                  rx="1"
                />
                {bin.count > 0 && (
                  <text
                    x={x + barW / 2}
                    y={y - 4}
                    fill={isPeak ? 'var(--ds-amber)' : 'var(--ds-text-muted)'}
                    fontSize="9"
                    fontFamily="var(--ds-font-mono)"
                    fontWeight={isPeak ? '700' : '400'}
                    textAnchor="middle"
                  >
                    {bin.count}
                  </text>
                )}
                <text
                  x={x + barW / 2}
                  y={svgH - 8}
                  fill="var(--ds-text-muted)"
                  fontSize="8"
                  fontFamily="var(--ds-font-mono)"
                  textAnchor="middle"
                >
                  {Math.round(bin.x0)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Guided Investigation Interactive Questions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Question 1: Count Peaks */}
        <div style={{ padding: '14px', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            Question 1: How many major peaks do you observe?
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {[1, 2, 3].map((num) => (
              <Button
                key={num}
                size="sm"
                kind={userGuess === num ? 'primary' : 'secondary'}
                onClick={() => setUserGuess(num)}
              >
                {num} Peak{num === 1 ? '' : 's'}
              </Button>
            ))}
          </div>
          {userGuess !== null && (
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              {userGuess === peakIndices.length ? (
                <span style={{ color: 'var(--ds-emerald)', fontWeight: 600 }}>
                  &check; Correct! With {binCount} bins, {peakIndices.length} distinct peak(s) are highlighted in yellow.
                </span>
              ) : (
                <span style={{ color: 'var(--ds-amber)' }}>
                  Notice the highlighted gold bars: exactly {peakIndices.length} local peak(s) dominate the silhouette.
                </span>
              )}
            </div>
          )}
        </div>

        {/* Question 2: Does this prove separate groups? */}
        <div style={{ padding: '14px', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            Question 2: Do these peaks prove distinct sub-populations?
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
            <Button
              size="sm"
              kind={hypothesisAnswered === true ? 'primary' : 'secondary'}
              onClick={() => setHypothesisAnswered(true)}
            >
              Yes, definitive proof
            </Button>
            <Button
              size="sm"
              kind={hypothesisAnswered === false ? 'primary' : 'secondary'}
              onClick={() => setHypothesisAnswered(false)}
            >
              No, a hypothesis to investigate
            </Button>
          </div>
          {hypothesisAnswered !== null && (
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              {hypothesisAnswered === false ? (
                <span style={{ color: 'var(--ds-emerald)', fontWeight: 600 }}>
                  &check; Exactly right! Modality creates a hypothesis. Random noise or bin width can mimic peaks. Independent confirmation is required.
                </span>
              ) : (
                <span style={{ color: '#fa4d56' }}>
                  Caution! A bimodal histogram suggests two groups, but does not prove it. Sampling variability can also cause artificial split peaks.
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Explanatory Dossier */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-amber)',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-amber)', marginBottom: '4px', fontSize: '0.9375rem' }}>
          Underlying Ground Truth for this Scenario
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
          {active.subgroupsInfo}{' '}
          <em>Try moving the bin width slider:</em> notice that if you make bins too wide (e.g. 4 bins), the twin peaks artificially merge into one smooth blob! Binning choices directly influence apparent modality.
        </p>
      </div>
    </div>
  );
}
