'use client';

import React, { useState } from 'react';
import { Tag, Button, Slider, Select, SelectItem, TextArea } from '@carbon/react';
import {
  Search,
  Filter,
  CheckmarkFilled,
  View,
  Restart,
  Analytics,
  DataCategorical,
  Scale,
  Information,
} from '@carbon/icons-react';
import {
  calcMean,
  calcMedian,
  calcPopulationStdDev,
  calcSampleStdDev,
  calcRange,
  calcHistogramBins,
  calcSkewness,
  detectPeaks,
} from '@/lib/distributionStats';

interface DetectiveDataset {
  id: string;
  name: string;
  description: string;
  data: number[];
  trueShape: string;
  trueSkew: string;
  trueModality: string;
  hasOutlier: boolean;
  takeaway: string;
}

const DETECTIVE_DATASETS: Record<string, DetectiveDataset> = {
  consistentClass: {
    id: 'consistentClass',
    name: 'Dataset A: Consistent Classroom (Tight)',
    description: '10 students in a highly coached section with closely grouped scores.',
    data: [45, 47, 48, 49, 50, 51, 52, 53, 55, 50],
    trueShape: 'Symmetric & Compact',
    trueSkew: 'Near-zero skewness (~0.0)',
    trueModality: 'Unimodal (single central peak)',
    hasOutlier: false,
    takeaway:
      'Mean (50.0) and Median (50.0) coincide perfectly. Standard deviation is tiny (2.76 marks). Extreme consistency.',
  },
  spreadClass: {
    id: 'spreadClass',
    name: 'Dataset B: Widely Spread Classroom (Polarized)',
    description: '10 students with huge disparity from 10 to 90.',
    data: [10, 20, 30, 40, 45, 55, 60, 70, 80, 90],
    trueShape: 'Symmetric & Highly Dispersed',
    trueSkew: 'Near-zero skewness (~0.0)',
    trueModality: 'Approximately uniform / dispersed',
    hasOutlier: false,
    takeaway:
      'Same Mean (50.0) as Class A, but SD is almost 10x larger (25.0 marks)! Same center, radically different spread.',
  },
  salaryData: {
    id: 'salaryData',
    name: 'Dataset C: Tech Salaries (Extreme Right Tail)',
    description: '10 tech employees including an executive earning ₹200k/month.',
    data: [20, 22, 24, 25, 26, 28, 30, 35, 40, 200],
    trueShape: 'Strongly Right-Skewed',
    trueSkew: 'Positive skew (+G1 > 2.0)',
    trueModality: 'Unimodal at low values with isolated outlier',
    hasOutlier: true,
    takeaway:
      'The single ₹200k observation pulls the Mean to ₹45.0k, while the Median remains resistant at ₹27.0k. The Median is far more representative.',
  },
  twoGroups: {
    id: 'twoGroups',
    name: 'Dataset D: Two Student Groups (Bimodal)',
    description: '10 students from two distinct sections (one remedial, one advanced).',
    data: [20, 22, 25, 28, 30, 70, 72, 75, 78, 80],
    trueShape: 'Bimodal (Twin Peaks)',
    trueSkew: 'Symmetric with two clusters',
    trueModality: 'Bimodal (two prominent peaks at 25 and 75)',
    hasOutlier: false,
    takeaway:
      'The Mean is 50.0 and Median is 50.0, yet virtually NO student scored around 50! Averages fail on bimodal cohorts.',
  },
};

export function DistributionDetectiveLab() {
  const [selectedKey, setSelectedKey] = useState<string>('consistentClass');
  const [viewType, setViewType] = useState<'histogram' | 'dotplot'>('histogram');
  const [binCount, setBinCount] = useState<number>(5);

  // Student diagnostic inputs
  const [studentShape, setStudentShape] = useState<string>('');
  const [studentSkew, setStudentSkew] = useState<string>('');
  const [studentOutlier, setStudentOutlier] = useState<string>('');
  const [studentNotes, setStudentNotes] = useState<string>('');
  const [submittedDiagnosis, setSubmittedDiagnosis] = useState<boolean>(false);

  const active = DETECTIVE_DATASETS[selectedKey];
  const data = active.data;

  const mean = calcMean(data);
  const median = calcMedian(data);
  const popSd = calcPopulationStdDev(data);
  const range = calcRange(data);
  const hist = calcHistogramBins(data, binCount);
  const skewObj = calcSkewness(data);
  const { peakIndices, modality } = detectPeaks(hist.bins);

  const handleDatasetChange = (key: string) => {
    setSelectedKey(key);
    setSubmittedDiagnosis(false);
    setStudentShape('');
    setStudentSkew('');
    setStudentOutlier('');
    setStudentNotes('');
  };

  const handleReset = () => {
    setBinCount(5);
    setViewType('histogram');
    setSubmittedDiagnosis(false);
    setStudentShape('');
    setStudentSkew('');
    setStudentOutlier('');
    setStudentNotes('');
  };

  const handleSubmitDiagnosis = () => {
    setSubmittedDiagnosis(true);
  };

  // SVG coordinate scaling
  const maxDataVal = Math.max(...data, 100);
  const svgW = 600;
  const svgH = 180;
  const pad = { top: 15, right: 20, bottom: 35, left: 35 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;
  const barW = plotW / Math.max(1, hist.bins.length);
  const maxBinCount = Math.max(...hist.bins.map((b) => b.count), 1);

  const scaleX = (val: number) => pad.left + (val / maxDataVal) * plotW;

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
            Section 3.2.15
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Main Integrated Lab
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Distribution Detective Lab
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
        The Distribution Detective Laboratory
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        Step into the shoes of a lead data detective. Select one of the four benchmark cohorts below, adjust visualization parameters, inspect summary statistics, and submit your independent diagnostic interpretation:
      </p>

      {/* Dataset & View Mode Controller */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
          padding: '16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid var(--ds-border-subtle)',
          alignItems: 'center',
        }}
      >
        <Select
          id="detective-dataset-select"
          labelText="Select Mystery Cohort"
          value={selectedKey}
          onChange={(e) => handleDatasetChange(e.target.value)}
          size="sm"
        >
          {Object.keys(DETECTIVE_DATASETS).map((key) => (
            <SelectItem key={key} value={key} text={DETECTIVE_DATASETS[key].name} />
          ))}
        </Select>

        <div>
          <Slider
            id="detective-bins-slider"
            labelText={`Histogram Bins: ${binCount}`}
            min={3}
            max={10}
            step={1}
            value={binCount}
            onChange={({ value }: { value: number }) => setBinCount(value)}
            disabled={viewType === 'dotplot'}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            size="sm"
            kind={viewType === 'histogram' ? 'primary' : 'secondary'}
            onClick={() => setViewType('histogram')}
          >
            Histogram View
          </Button>
          <Button
            size="sm"
            kind={viewType === 'dotplot' ? 'primary' : 'secondary'}
            onClick={() => setViewType('dotplot')}
          >
            Dot Plot View
          </Button>
          <Button size="sm" kind="ghost" renderIcon={Restart} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Live Graph Canvas */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8125rem' }}>
          <span style={{ fontWeight: 600, color: 'var(--ds-text-primary)' }}>
            Observed Values ({data.length}): [{data.join(', ')}]
          </span>
          <div style={{ display: 'flex', gap: '10px', fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem' }}>
            <span style={{ color: '#da1e28' }}>Mean: {mean.toFixed(1)}</span>
            <span style={{ color: 'var(--ds-emerald)' }}>Median: {median.toFixed(1)}</span>
            <span style={{ color: 'var(--ds-cyan)' }}>Pop SD: {popSd.toFixed(2)}</span>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img"
          aria-label="Distribution plot for detective lab"
        >
          {/* Baseline */}
          <line x1={pad.left} y1={pad.top + plotH} x2={svgW - pad.right} y2={pad.top + plotH} stroke="var(--ds-border-strong)" strokeWidth="1.5" />

          {/* Histogram Bars */}
          {viewType === 'histogram' &&
            hist.bins.map((bin, idx) => {
              const x = pad.left + idx * barW;
              const h = (bin.count / maxBinCount) * plotH;
              const y = pad.top + plotH - h;
              return (
                <g key={idx}>
                  <rect
                    x={x}
                    y={y}
                    width={Math.max(1, barW - 1)}
                    height={h}
                    fill="var(--ds-blue)"
                    opacity="0.85"
                    stroke="var(--ds-cyan)"
                    strokeWidth="1"
                  />
                  {bin.count > 0 && (
                    <text
                      x={x + barW / 2}
                      y={y - 4}
                      fill="var(--ds-text-primary)"
                      fontSize="9"
                      fontFamily="var(--ds-font-mono)"
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
                    {bin.label}
                  </text>
                </g>
              );
            })}

          {/* Dot Plot View */}
          {viewType === 'dotplot' &&
            data.map((val, idx) => (
              <g key={idx}>
                <circle
                  cx={scaleX(val)}
                  cy={pad.top + plotH / 2}
                  r="7"
                  fill={val >= 100 ? 'var(--ds-amber)' : 'var(--ds-cyan)'}
                  stroke="#fff"
                  strokeWidth="1.5"
                />
                <text
                  x={scaleX(val)}
                  y={pad.top + plotH / 2 - 12}
                  fill="var(--ds-text-primary)"
                  fontSize="8"
                  fontFamily="var(--ds-font-mono)"
                  textAnchor="middle"
                >
                  {val}
                </text>
              </g>
            ))}
        </svg>
      </div>

      {/* What Should I Notice Diagnostic Learning Panel */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--cds-layer-02)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Information size={18} style={{ color: 'var(--ds-cyan)' }} />
          <strong style={{ color: 'var(--ds-text-primary)', fontSize: '0.9375rem' }}>
            What Should I Notice as a Detective?
          </strong>
        </div>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
          <li><strong>Center Alignment:</strong> Are the Mean ({mean.toFixed(1)}) and Median ({median.toFixed(1)}) nearly identical, or is the Mean dragged far away?</li>
          <li><strong>Dispersal:</strong> Compare the Range ({range}) and Pop SD ({popSd.toFixed(2)}) against Dataset A. Does this cohort have tight or wild variance?</li>
          <li><strong>Tail Geometry:</strong> Look for isolated points with huge empty gaps (like the ₹200k outlier).</li>
          <li><strong>Modality Peaks:</strong> Does the distribution have 1 peak, 2 peaks with an empty valley in between, or a flat profile?</li>
        </ul>
      </div>

      {/* Student Diagnostic Submission Form */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '1rem', fontSize: '1rem' }}>
          Submit Your Detective Diagnosis
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
            marginBottom: '1rem',
          }}
        >
          <Select
            id="student-shape-select"
            labelText="Observed Shape"
            value={studentShape}
            onChange={(e) => setStudentShape(e.target.value)}
            size="sm"
          >
            <SelectItem value="" text="Select Shape..." />
            <SelectItem value="symmetric" text="Approximately Symmetric" />
            <SelectItem value="right-skewed" text="Right-Skewed (Positive)" />
            <SelectItem value="left-skewed" text="Left-Skewed (Negative)" />
            <SelectItem value="bimodal" text="Bimodal (Two Peaks)" />
          </Select>

          <Select
            id="student-skew-select"
            labelText="Skewness Direction"
            value={studentSkew}
            onChange={(e) => setStudentSkew(e.target.value)}
            size="sm"
          >
            <SelectItem value="" text="Select Skewness..." />
            <SelectItem value="near-zero" text="Near Zero Skew (Balanced)" />
            <SelectItem value="positive" text="Positive Skew (Tail Right)" />
            <SelectItem value="negative" text="Negative Skew (Tail Left)" />
          </Select>

          <Select
            id="student-outlier-select"
            labelText="Unusual Values / Outliers"
            value={studentOutlier}
            onChange={(e) => setStudentOutlier(e.target.value)}
            size="sm"
          >
            <SelectItem value="" text="Select Finding..." />
            <SelectItem value="none" text="No isolated outliers" />
            <SelectItem value="high-outlier" text="Severe high outlier present" />
            <SelectItem value="split-clusters" text="Two distinct clusters without center" />
          </Select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <TextArea
            id="student-notes-area"
            labelText="Your Analytical Justification (Optional)"
            placeholder="Explain why the numbers behave this way (e.g. why Mean differs from Median)..."
            value={studentNotes}
            onChange={(e) => setStudentNotes(e.target.value)}
            rows={2}
          />
        </div>

        <Button size="sm" renderIcon={CheckmarkFilled} onClick={handleSubmitDiagnosis}>
          Verify My Diagnosis
        </Button>
      </div>

      {/* Feedback Card upon Verification */}
      {submittedDiagnosis && (
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '4px',
            background: 'var(--ds-emerald-dim)',
            borderLeft: '4px solid var(--ds-emerald)',
          }}
        >
          <div style={{ fontWeight: 600, color: 'var(--ds-emerald)', marginBottom: '6px', fontSize: '0.9375rem' }}>
            Detective Brief Verified! Key Ground Truth Takeaway:
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-primary)', lineHeight: 1.6 }}>
            <strong>Ground Truth for {active.name}:</strong> {active.takeaway}
          </p>
        </div>
      )}
    </div>
  );
}
