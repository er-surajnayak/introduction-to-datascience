'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import {
  DataCategorical,
  CheckmarkFilled,
  CloseFilled,
  Information,
} from '@carbon/icons-react';

interface ShapeProfile {
  id: string;
  name: string;
  tag: string;
  category: 'Symmetry/Skew' | 'Modality' | 'Uniformity';
  explanation: string;
  realWorldScenario: string;
  data: number[];
  meanVsMedian: string;
  svgPath: string; // smooth path representing the silhouette
  color: string;
  checkQuestion: string;
  checkOptions: string[];
  correctAnswer: number;
  checkExplanation: string;
}

const SHAPES: ShapeProfile[] = [
  {
    id: 'symmetric',
    name: 'A. Symmetric Distribution',
    tag: 'Balanced',
    category: 'Symmetry/Skew',
    explanation:
      'Observations are evenly balanced around the center. The left and right halves mirror each other. In an idealized symmetric distribution, Mean ≈ Median ≈ Mode.',
    realWorldScenario:
      'Adult human heights within a single demographic cohort, factory machine screw tolerances, or well-designed exam scores.',
    data: [40, 45, 50, 52, 55, 58, 60, 60, 62, 65, 68, 70, 75, 80],
    meanVsMedian: 'Mean ≈ Median ≈ Mode',
    svgPath: 'M 20 120 Q 150 120 180 80 Q 210 20 240 20 Q 270 20 300 80 Q 330 120 460 120',
    color: 'var(--ds-cyan)',
    checkQuestion: 'If a distribution is symmetric, does that automatically mean it is a Normal distribution?',
    checkOptions: [
      'Yes, symmetry is identical to normality.',
      'No, a distribution can be symmetric without being bell-shaped (e.g. uniform or bimodal).',
      'Yes, provided it has more than 10 observations.',
    ],
    correctAnswer: 1,
    checkExplanation:
      'Correct! Symmetry simply means left and right sides balance. A flat uniform distribution or a double-peak bimodal distribution are symmetric, but neither is a normal bell curve.',
  },
  {
    id: 'right-skewed',
    name: 'B. Right-Skewed (Positive Skew)',
    tag: 'Tail to Right',
    category: 'Symmetry/Skew',
    explanation:
      'The bulk of observations cluster at lower values, while an elongated tail stretches toward the positive (right) side. The high values pull the Mean above the Median.',
    realWorldScenario:
      'Software engineer salaries, household net worth, consumer purchase cart values, or city house prices.',
    data: [20, 22, 24, 25, 26, 28, 30, 35, 42, 55, 75, 120, 180],
    meanVsMedian: 'Mean > Median (typically)',
    svgPath: 'M 20 120 Q 60 120 90 40 Q 120 20 150 40 Q 200 85 460 120',
    color: 'var(--ds-blue)',
    checkQuestion: 'In a heavily right-skewed salary dataset, which metric best represents the typical worker?',
    checkOptions: [
      'The Mean, because it uses the CEO’s salary.',
      'The Median, because it resists distortion from extreme upper outliers.',
      'The Standard Deviation multiplied by 2.',
    ],
    correctAnswer: 1,
    checkExplanation:
      'Correct! Extreme high executive salaries drag the mean upward, making the median a much more representative measure of typical worker pay.',
  },
  {
    id: 'left-skewed',
    name: 'C. Left-Skewed (Negative Skew)',
    tag: 'Tail to Left',
    category: 'Symmetry/Skew',
    explanation:
      'The bulk of observations bunch at higher values, with an elongated tail stretching toward the negative (left) side. The low values pull the Mean below the Median.',
    realWorldScenario:
      'Scores on an easy exam where most students scored 85–95, age at natural retirement, or human lifespan in developed nations.',
    data: [15, 35, 55, 68, 75, 82, 85, 88, 90, 92, 94, 96, 98],
    meanVsMedian: 'Mean < Median (typically)',
    svgPath: 'M 20 120 Q 260 120 310 85 Q 360 40 390 20 Q 420 40 460 120',
    color: 'var(--ds-purple)',
    checkQuestion: 'What causes a distribution to be left-skewed?',
    checkOptions: [
      'A prolonged tail of exceptionally low values extending to the left.',
      'Most values being strictly less than zero.',
      'The standard deviation being larger than the range.',
    ],
    correctAnswer: 0,
    checkExplanation:
      'Correct! Left-skew means the tail stretches toward the left (lower values), pulling the mean down.',
  },
  {
    id: 'uniform',
    name: 'D. Uniform Distribution',
    tag: 'Flat / Constant',
    category: 'Uniformity',
    explanation:
      'Observations are spread with approximately equal frequency across all intervals. The silhouette is flat like a rectangle without distinct peaks.',
    realWorldScenario:
      'Rolling a fair 6-sided die, lottery ticket numbers, or random number generators drawing values in [0, 1].',
    data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90],
    meanVsMedian: 'Mean ≈ Median ≈ Midpoint',
    svgPath: 'M 20 120 L 50 40 L 430 40 L 460 120',
    color: 'var(--ds-teal)',
    checkQuestion: 'Does a uniform distribution have a mode?',
    checkOptions: [
      'Yes, the mode is always zero.',
      'No unique mode exists because all intervals occur with roughly equal frequency.',
      'Yes, the mode is strictly the maximum value.',
    ],
    correctAnswer: 1,
    checkExplanation:
      'Correct! In a uniform distribution, no single value or bin dominates, so there is no unique peak (mode).',
  },
  {
    id: 'unimodal',
    name: 'E. Unimodal Distribution',
    tag: 'One Peak',
    category: 'Modality',
    explanation:
      'Exhibits exactly one dominant prominent peak (local mode). Most homogeneous, single-population datasets produce unimodal distributions.',
    realWorldScenario:
      'Student test marks in a single well-taught classroom, daily outdoor temperatures in June, or package shipping weights.',
    data: [30, 40, 48, 55, 60, 62, 65, 65, 68, 70, 75, 82, 90],
    meanVsMedian: 'Single central concentration',
    svgPath: 'M 20 120 Q 180 120 220 70 Q 240 20 260 70 Q 300 120 460 120',
    color: 'var(--ds-emerald)',
    checkQuestion: 'What does the prefix "uni-" signify in unimodal?',
    checkOptions: ['Universal applicability', 'Single / One peak', 'Uniform frequency'],
    correctAnswer: 1,
    checkExplanation:
      'Correct! "Uni-" means one: exactly one prominent peak or mode exists.',
  },
  {
    id: 'bimodal',
    name: 'F. Bimodal Distribution',
    tag: 'Two Peaks',
    category: 'Modality',
    explanation:
      'Features two prominent, distinct peaks. This strongly suggests that the dataset may contain a mixture of two distinct sub-populations or operating regimes.',
    realWorldScenario:
      'Highway traffic speeds during rush hour vs midnight, combined heights of adult males and females, or customer arrival times (lunch vs dinner).',
    data: [20, 22, 25, 26, 28, 30, 32, 68, 70, 72, 75, 78, 80, 82],
    meanVsMedian: 'Average sits in the valley between peaks!',
    svgPath: 'M 20 120 Q 90 120 120 50 Q 140 20 160 50 Q 220 105 260 105 Q 300 105 340 50 Q 360 20 380 50 Q 420 120 460 120',
    color: 'var(--ds-amber)',
    checkQuestion: 'If a dataset has two peaks, does its mean accurately represent typical observations?',
    checkOptions: [
      'Yes, the mean is always the best single number.',
      'No, the mean often falls right into the valley between the two peaks where almost no data exists!',
      'Yes, because bimodal means the variance is zero.',
    ],
    correctAnswer: 1,
    checkExplanation:
      'Correct! The mean of 30 and 70 is 50, but in a bimodal cohort, virtually no one actually scored 50!',
  },
  {
    id: 'multimodal',
    name: 'G. Multimodal Distribution',
    tag: 'Multiple Peaks',
    category: 'Modality',
    explanation:
      'Has more than two prominent peaks. Indicates complex mixtures of several underlying data-generating mechanisms, product tiers, or shifts.',
    realWorldScenario:
      'T-shirt sales sizes (S, M, L, XL clusters), server request sizes across different API endpoints, or multi-shift manufacturing outputs.',
    data: [15, 18, 20, 45, 48, 50, 75, 78, 80, 95, 98, 100],
    meanVsMedian: 'Complex multi-cluster landscape',
    svgPath: 'M 20 120 Q 70 120 90 40 Q 110 40 130 95 Q 210 95 240 30 Q 260 30 280 95 Q 360 95 380 35 Q 400 35 460 120',
    color: '#ff7eb6',
    checkQuestion: 'What should a data scientist do upon discovering a multimodal distribution?',
    checkOptions: [
      'Delete all peaks except the highest one.',
      'Segment the dataset by categorical attributes to identify the distinct sub-groups forming each peak.',
      'Force the data into a single mean calculation and stop analysis.',
    ],
    correctAnswer: 1,
    checkExplanation:
      'Correct! Multimodality is a clear sign to slice and segment the data to isolate the distinct driving mechanisms.',
  },
];

export function DistributionShapeGallery() {
  const [selectedShapeId, setSelectedShapeId] = useState<string>('symmetric');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const active = SHAPES.find((s) => s.id === selectedShapeId) || SHAPES[0];
  const currentQuizAnswer = quizAnswers[active.id];

  const handleSelectAnswer = (optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [active.id]: optionIdx }));
  };

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
            Section 3.2.6
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Distribution Shape Gallery
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Symmetry &bull; Skewness &bull; Modality
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
        Distribution Shape Gallery: Recognizing Geometric Signatures
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        The shape of a distribution reveals how nature or human activity generated the data. Select a shape from the gallery below to inspect its visual profile, real-world context, and diagnostic check:
      </p>

      {/* Shape Tab Pills */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}
      >
        {SHAPES.map((s) => {
          const isSelected = s.id === selectedShapeId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedShapeId(s.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '4px',
                background: isSelected ? 'var(--ds-bg-surface-elevated)' : 'var(--cds-layer-02)',
                border: isSelected ? `2px solid ${s.color}` : '1px solid var(--ds-border-subtle)',
                color: isSelected ? s.color : 'var(--ds-text-primary)',
                fontWeight: isSelected ? 600 : 400,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {s.name.split('.')[1]?.trim() || s.name}
            </button>
          );
        })}
      </div>

      {/* Main Profile Showcase Display */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        {/* Left: SVG Silhouette Curve */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              padding: '1rem',
              background: 'var(--cds-layer-02)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
              marginBottom: '1rem',
            }}
          >
            <svg
              viewBox="0 0 480 140"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              role="img"
              aria-label={`${active.name} curve`}
            >
              {/* Baseline axis */}
              <line x1="10" y1="120" x2="470" y2="120" stroke="var(--ds-border-strong)" strokeWidth="1.5" />

              {/* Shaded area under curve */}
              <path
                d={`${active.svgPath} L 460 120 L 20 120 Z`}
                fill={active.color}
                opacity="0.2"
              />

              {/* Main contour path */}
              <path
                d={active.svgPath}
                fill="none"
                stroke={active.color}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8125rem',
              fontFamily: 'var(--ds-font-mono)',
              color: 'var(--ds-text-secondary)',
            }}
          >
            <span>Metric Signature:</span>
            <span style={{ color: active.color, fontWeight: 600 }}>{active.meanVsMedian}</span>
          </div>
        </div>

        {/* Right: Explanatory Dossier */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Tag type="cool-gray" size="sm">
                {active.category}
              </Tag>
              <span style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                {active.name}
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              {active.explanation}
            </p>

            <div
              style={{
                padding: '10px 12px',
                background: 'var(--ds-bg-surface-elevated)',
                borderRadius: '4px',
                borderLeft: `3px solid ${active.color}`,
                fontSize: '0.8125rem',
                color: 'var(--ds-text-secondary)',
                lineHeight: 1.5,
                marginBottom: '1rem',
              }}
            >
              <strong style={{ color: 'var(--ds-text-primary)' }}>Real-World Scenario:</strong>{' '}
              {active.realWorldScenario}
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Recognition Mini-Check Question */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: `4px solid ${active.color}`,
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
          Diagnostic Pattern Check: {active.checkQuestion}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
          {active.checkOptions.map((opt, optIdx) => {
            const isSelected = currentQuizAnswer === optIdx;
            const hasAnswered = currentQuizAnswer !== undefined;
            const isCorrect = optIdx === active.correctAnswer;

            let border = '1px solid var(--ds-border-subtle)';
            let bg = 'var(--cds-layer-02)';
            let color = 'var(--ds-text-primary)';

            if (hasAnswered) {
              if (isCorrect) {
                border = '2px solid var(--ds-emerald)';
                bg = 'var(--ds-emerald-dim)';
                color = 'var(--ds-emerald)';
              } else if (isSelected) {
                border = '2px solid #da1e28';
                bg = 'rgba(218, 30, 40, 0.1)';
                color = '#fa4d56';
              }
            }

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectAnswer(optIdx)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '4px',
                  background: bg,
                  border,
                  color,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {currentQuizAnswer !== undefined && (
          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
            {active.checkExplanation}
          </div>
        )}
      </div>
    </div>
  );
}
