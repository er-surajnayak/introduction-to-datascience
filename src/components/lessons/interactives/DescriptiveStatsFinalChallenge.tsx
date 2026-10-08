'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import {
  Trophy,
  CheckmarkFilled,
  WarningAlt,
  Restart,
  ArrowRight,
  Help,
} from '@carbon/icons-react';
import { useCourseProgress } from '@/context/CourseProgressContext';
import { computeAllStatistics } from '@/lib/statistics';

const CHALLENGE_SCORES = [45, 50, 52, 55, 58, 60, 61, 65, 70, 95];

export function DescriptiveStatsFinalChallenge() {
  const { completeTopic } = useCourseProgress();
  const stats = computeAllStatistics(CHALLENGE_SCORES);

  // Student inputs for Parts A, B, C
  const [inputs, setInputs] = useState({
    mean: '',
    median: '',
    mode: '',
    min: '',
    max: '',
    range: '',
    std: '',
    q1: '',
    q3: '',
    iqr: '',
    is95Error: '',
    centerChoice: '',
    nextViz: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleInputChange = (field: string, val: string) => {
    setInputs((prev) => ({ ...prev, [field]: val }));
  };

  const checkAnswer = (field: string, expected: number, tolerance = 0.5) => {
    const parsed = parseFloat(inputs[field as keyof typeof inputs]);
    return !isNaN(parsed) && Math.abs(parsed - expected) <= tolerance;
  };

  const isMeanCorrect = checkAnswer('mean', 61.1, 0.2);
  const isMedianCorrect = checkAnswer('median', 59.0, 0.5);
  const isMinCorrect = checkAnswer('min', 45, 0.1);
  const isMaxCorrect = checkAnswer('max', 95, 0.1);
  const isRangeCorrect = checkAnswer('range', 50, 0.1);
  const isStdCorrect = checkAnswer('std', 13.97, 0.5) || checkAnswer('std', 13.25, 0.5) || checkAnswer('std', 13.8, 0.5);
  const isQ1Correct = checkAnswer('q1', 52.75, 1.0) || checkAnswer('q1', 52, 1.0);
  const isQ3Correct = checkAnswer('q3', 64.0, 1.0) || checkAnswer('q3', 65, 1.0);
  const isIqrCorrect = checkAnswer('iqr', 11.25, 1.5) || checkAnswer('iqr', 12, 1.5);
  const isReasoningAnswered =
    inputs.is95Error.trim().length > 0 &&
    inputs.centerChoice.trim().length > 0 &&
    inputs.nextViz.trim().length > 0;

  const handleSubmit = () => {
    setSubmitted(true);
    const centerOk = isMeanCorrect && isMedianCorrect;
    const spreadOk = isMinCorrect && isMaxCorrect && isRangeCorrect;
    const posOk = isQ1Correct && isQ3Correct && isIqrCorrect;

    if (centerOk && spreadOk && posOk && isReasoningAnswered) {
      setIsCompleted(true);
      completeTopic('module-3', 'descriptive-statistics');
      completeTopic('module-3', 'm3-t1');
    }
  };

  const fillSampleAnswers = () => {
    setInputs({
      mean: '61.1',
      median: '59.0',
      mode: 'None',
      min: '45',
      max: '95',
      range: '50',
      std: '13.8',
      q1: '52.75',
      q3: '64.0',
      iqr: '11.25',
      is95Error: 'No, 95 is outside the 1.5xIQR fence (80.875), so it is an outlier, but not necessarily an error.',
      centerChoice: 'Median (59.0) because 95 skews the mean.',
      nextViz: 'Box plot or Histogram/Density plot to examine the distribution shape.',
    });
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '3rem',
        background: 'var(--ds-bg-surface)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="green" size="md">
            Section 32 & 37 &bull; Capstone Challenge
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Module 3.1 Final Verification
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          scores = np.array([45, 50, 52, 55, 58, 60, 61, 65, 70, 95])
        </span>
      </div>

      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Final Challenge: The Full Statistical Audit
      </h3>
      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
        Calculate the center, spread, and position metrics for this 10-score engineering test cohort, then analyze whether score <code>95</code> represents an error or breakthrough.
      </p>

      {/* Dataset Array Display */}
      <div
        style={{
          padding: '1rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginRight: '8px' }}>
            Array Data (n = 10):
          </span>
          <code style={{ fontSize: '0.9375rem', color: 'var(--ds-text-primary)' }}>
            [45, 50, 52, 55, 58, 60, 61, 65, 70, 95]
          </code>
        </div>
        <Button size="sm" kind="ghost" onClick={fillSampleAnswers}>
          Auto-fill Test Solution
        </Button>
      </div>

      {/* Part A: Center */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-blue)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          PART A — Measures of Central Tendency
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
              1. Mean (1 decimal, target: 61.1)
            </label>
            <input
              type="text"
              placeholder="e.g. 61.1"
              value={inputs.mean}
              onChange={(e) => handleInputChange('mean', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--ds-bg-core)',
                border: submitted ? (isMeanCorrect ? '2px solid var(--ds-emerald)' : '2px solid #da1e28') : '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                fontFamily: 'var(--ds-font-mono)',
                borderRadius: '3px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
              2. Median (target: 59.0)
            </label>
            <input
              type="text"
              placeholder="e.g. 59.0"
              value={inputs.median}
              onChange={(e) => handleInputChange('median', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--ds-bg-core)',
                border: submitted ? (isMedianCorrect ? '2px solid var(--ds-emerald)' : '2px solid #da1e28') : '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                fontFamily: 'var(--ds-font-mono)',
                borderRadius: '3px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
              3. Mode (if applicable)
            </label>
            <input
              type="text"
              placeholder="e.g. None"
              value={inputs.mode}
              onChange={(e) => handleInputChange('mode', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--ds-bg-core)',
                border: '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                fontFamily: 'var(--ds-font-mono)',
                borderRadius: '3px',
              }}
            />
          </div>
        </div>
      </div>

      {/* Part B: Spread */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-amber)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          PART B — Measures of Spread & Dispersion
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
              4. Minimum (target: 45)
            </label>
            <input
              type="text"
              placeholder="45"
              value={inputs.min}
              onChange={(e) => handleInputChange('min', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--ds-bg-core)',
                border: submitted ? (isMinCorrect ? '2px solid var(--ds-emerald)' : '2px solid #da1e28') : '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                fontFamily: 'var(--ds-font-mono)',
                borderRadius: '3px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
              5. Maximum (target: 95)
            </label>
            <input
              type="text"
              placeholder="95"
              value={inputs.max}
              onChange={(e) => handleInputChange('max', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--ds-bg-core)',
                border: submitted ? (isMaxCorrect ? '2px solid var(--ds-emerald)' : '2px solid #da1e28') : '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                fontFamily: 'var(--ds-font-mono)',
                borderRadius: '3px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
              6. Range (target: 50)
            </label>
            <input
              type="text"
              placeholder="50"
              value={inputs.range}
              onChange={(e) => handleInputChange('range', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--ds-bg-core)',
                border: submitted ? (isRangeCorrect ? '2px solid var(--ds-emerald)' : '2px solid #da1e28') : '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                fontFamily: 'var(--ds-font-mono)',
                borderRadius: '3px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
              7. Sample SD s (target: ~13.8)
            </label>
            <input
              type="text"
              placeholder="13.8"
              value={inputs.std}
              onChange={(e) => handleInputChange('std', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--ds-bg-core)',
                border: submitted ? (isStdCorrect ? '2px solid var(--ds-emerald)' : '2px solid #da1e28') : '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                fontFamily: 'var(--ds-font-mono)',
                borderRadius: '3px',
              }}
            />
          </div>
        </div>
      </div>

      {/* Part C: Position */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-purple)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          PART C — Position & Quartiles
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
              8. Q1 (25th %, target: ~52.8)
            </label>
            <input
              type="text"
              placeholder="52.75"
              value={inputs.q1}
              onChange={(e) => handleInputChange('q1', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--ds-bg-core)',
                border: submitted ? (isQ1Correct ? '2px solid var(--ds-emerald)' : '2px solid #da1e28') : '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                fontFamily: 'var(--ds-font-mono)',
                borderRadius: '3px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
              9. Q3 (75th %, target: ~64.0)
            </label>
            <input
              type="text"
              placeholder="64.0"
              value={inputs.q3}
              onChange={(e) => handleInputChange('q3', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--ds-bg-core)',
                border: submitted ? (isQ3Correct ? '2px solid var(--ds-emerald)' : '2px solid #da1e28') : '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                fontFamily: 'var(--ds-font-mono)',
                borderRadius: '3px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
              10. IQR (Q3 - Q1, target: ~11.25)
            </label>
            <input
              type="text"
              placeholder="11.25"
              value={inputs.iqr}
              onChange={(e) => handleInputChange('iqr', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--ds-bg-core)',
                border: submitted ? (isIqrCorrect ? '2px solid var(--ds-emerald)' : '2px solid #da1e28') : '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                fontFamily: 'var(--ds-font-mono)',
                borderRadius: '3px',
              }}
            />
          </div>
        </div>
      </div>

      {/* Part D: Reasoning */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-teal)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          PART D — Detective Reasoning & Bridge to 3.2
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
              11. Is score 95 necessarily an error? Explain using Tukey Fences ($Q3 + 1.5 \times IQR = 80.9$).
            </label>
            <textarea
              rows={2}
              placeholder="Explain why 95 is a statistical outlier, but not necessarily a typo..."
              value={inputs.is95Error}
              onChange={(e) => handleInputChange('is95Error', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--ds-bg-core)',
                border: '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                fontSize: '0.8125rem',
                borderRadius: '3px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
              12. Which measure of central tendency would you report to summarize typical student performance?
            </label>
            <textarea
              rows={2}
              placeholder="Why report the Median over the Mean here?..."
              value={inputs.centerChoice}
              onChange={(e) => handleInputChange('centerChoice', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--ds-bg-core)',
                border: '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                fontSize: '0.8125rem',
                borderRadius: '3px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
              13. What visualization would you use next in Module 3.2 & 3.3 to investigate the distribution shape?
            </label>
            <textarea
              rows={2}
              placeholder="Box plot, Histogram, KDE plot..."
              value={inputs.nextViz}
              onChange={(e) => handleInputChange('nextViz', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--ds-bg-core)',
                border: '1px solid var(--ds-border-strong)',
                color: 'var(--ds-text-primary)',
                fontSize: '0.8125rem',
                borderRadius: '3px',
              }}
            />
          </div>
        </div>
      </div>

      {/* Submit / Verification Banner */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button size="md" kind="primary" renderIcon={CheckmarkFilled} onClick={handleSubmit}>
          Submit Statistical Audit
        </Button>
      </div>

      {isCompleted && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1.5rem',
            background: 'var(--ds-emerald-dim)',
            border: '2px solid var(--ds-emerald)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Trophy size={36} style={{ color: 'var(--ds-emerald)', flexShrink: 0 }} />
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: 'var(--ds-emerald)', fontSize: '1.125rem' }}>
              Topic 3.1 Mastered: Descriptive Statistics Completed!
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-primary)', lineHeight: 1.5 }}>
              You have mastered the foundational triumvirate: <strong>Center</strong>, <strong>Spread</strong>, and <strong>Position</strong>. Your course progress has updated. You are now prepared to explore <strong>Module 3.2: Distributions & Skewness</strong>!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
