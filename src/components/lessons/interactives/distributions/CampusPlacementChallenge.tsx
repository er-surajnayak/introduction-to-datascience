'use client';

import React, { useState } from 'react';
import { Tag, Button, Slider, Select, SelectItem, TextArea, TextInput } from '@carbon/react';
import {
  Trophy,
  CheckmarkFilled,
  WarningAlt,
  Restart,
  Help,
  ArrowRight,
  Analytics,
} from '@carbon/icons-react';
import { useCourseProgress } from '@/context/CourseProgressContext';
import {
  calcMean,
  calcMedian,
  calcSampleStdDev,
  calcHistogramBins,
  calcSkewness,
} from '@/lib/distributionStats';

const BASE_SALARIES = [22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 36, 38, 45]; // First 14 graduates

export function CampusPlacementChallenge() {
  const { completeTopic } = useCourseProgress();

  // Interactive controls
  const [starSalary, setStarSalary] = useState<number>(150);
  const [binCount, setBinCount] = useState<number>(5);

  // Student inputs
  const [studentCount, setStudentCount] = useState<string>('');
  const [studentMean, setStudentMean] = useState<string>('');
  const [studentMedian, setStudentMedian] = useState<string>('');
  const [studentSkew, setStudentSkew] = useState<string>('');
  const [studentDelete150, setStudentDelete150] = useState<string>('');
  const [studentRepresentative, setStudentRepresentative] = useState<string>('');
  const [studentRecommendation, setStudentRecommendation] = useState<string>('');

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Active dataset with adjustable star salary
  const activeSalaries = [...BASE_SALARIES, starSalary];

  const actualCount = activeSalaries.length; // 15
  const actualMean = calcMean(activeSalaries); // ~38.47 for 150
  const actualMedian = calcMedian(activeSalaries); // 30
  const actualStd = calcSampleStdDev(activeSalaries);
  const actualHist = calcHistogramBins(activeSalaries, binCount);
  const actualSkew = calcSkewness(activeSalaries);

  const checkNumeric = (input: string, target: number, tolerance = 0.5) => {
    const parsed = parseFloat(input.trim());
    return !isNaN(parsed) && Math.abs(parsed - target) <= tolerance;
  };

  const isCountOk = checkNumeric(studentCount, actualCount, 0.1);
  const isMeanOk = checkNumeric(studentMean, actualMean, 0.5);
  const isMedianOk = checkNumeric(studentMedian, actualMedian, 0.5);
  const isSkewOk = studentSkew === 'right';
  const isDeleteOk = studentDelete150 === 'no';
  const isRepOk = studentRepresentative === 'median';

  const handleSubmit = () => {
    setSubmitted(true);
    if (isCountOk && isMeanOk && isMedianOk && isSkewOk && isDeleteOk && isRepOk) {
      setIsCompleted(true);
      completeTopic('module-3', 'distributions');
      completeTopic('module-3', 'distributions-and-skewness');
      completeTopic('module-3', 'm3-t2');
    }
  };

  const fillSampleAnswers = () => {
    setStudentCount('15');
    setStudentMean(actualMean.toFixed(2));
    setStudentMedian(actualMedian.toFixed(1));
    setStudentSkew('right');
    setStudentDelete150('no');
    setStudentRepresentative('median');
    setStudentRecommendation(
      'The placement coordinator should report the Median (₹30k/month) and IQR alongside the Mean, clearly explaining that the ₹38.47k average is skewed by a single ₹150k top placement.'
    );
  };

  const handleReset = () => {
    setStarSalary(150);
    setBinCount(5);
    setStudentCount('');
    setStudentMean('');
    setStudentMedian('');
    setStudentSkew('');
    setStudentDelete150('');
    setStudentRepresentative('');
    setStudentRecommendation('');
    setSubmitted(false);
  };

  // SVG Histogram Dimensions
  const svgW = 580;
  const svgH = 150;
  const pad = { top: 15, right: 15, bottom: 30, left: 35 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;
  const barW = plotW / Math.max(1, actualHist.bins.length);
  const maxBinCount = Math.max(...actualHist.bins.map((b) => b.count), 1);

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
        background: 'var(--ds-bg-surface)',
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
          <Tag type="magenta" size="md">
            Section 3.2.19
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Topic Final Capstone Challenge
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isCompleted && (
            <Tag type="green" size="sm">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CheckmarkFilled size={12} /> Challenge Solved
              </span>
            </Tag>
          )}
          <span
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--ds-font-mono)',
              color: 'var(--ds-cyan)',
            }}
          >
            The Campus Placement Mystery
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '1rem' }}>
        <Trophy size={32} style={{ color: 'var(--ds-amber)', flexShrink: 0, marginTop: '4px' }} />
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)', margin: 0 }}>
            The Campus Placement Mystery
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
            A college placement coordinator announces to prospective applicants: <em>&ldquo;Our graduates have an excellent average starting salary of ₹38,470 per month, so most students must be earning around that amount!&rdquo;</em> As the junior data detective, your mission is to audit this claim using the 15 recorded graduate salaries.
          </p>
        </div>
      </div>

      {/* Dataset & Interactive Controls Card */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
          Synthetic Graduate Salaries (₹ thousands/month, n=15):
        </div>
        <div
          style={{
            padding: '10px 14px',
            background: 'var(--cds-layer-02)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.8125rem',
            color: 'var(--ds-cyan)',
            marginBottom: '1rem',
            overflowX: 'auto',
          }}
        >
          salaries = [{activeSalaries.join(', ')}]
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <div>
            <Slider
              id="challenge-star-slider"
              labelText={`Adjust Highest Salary (Graduate #15): ₹${starSalary}k`}
              min={45}
              max={250}
              step={5}
              value={starSalary}
              onChange={({ value }: { value: number }) => setStarSalary(value)}
            />
          </div>

          <div>
            <Slider
              id="challenge-bins-slider"
              labelText={`Histogram Bins: ${binCount}`}
              min={3}
              max={8}
              step={1}
              value={binCount}
              onChange={({ value }: { value: number }) => setBinCount(value)}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Histogram of the Challenge Dataset */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.75rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8125rem' }}>
          <span style={{ fontWeight: 600, color: 'var(--ds-text-secondary)' }}>
            Live Audit Histogram ({binCount} Bins)
          </span>
          <div style={{ display: 'flex', gap: '12px', fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem' }}>
            <span style={{ color: '#da1e28' }}>Mean: ₹{actualMean.toFixed(2)}k</span>
            <span style={{ color: 'var(--ds-emerald)' }}>Median: ₹{actualMedian.toFixed(1)}k</span>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img"
          aria-label="Challenge salary histogram"
        >
          <line x1={pad.left} y1={pad.top + plotH} x2={svgW - pad.right} y2={pad.top + plotH} stroke="var(--ds-border-strong)" strokeWidth="1.5" />
          {actualHist.bins.map((bin, idx) => {
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
                  fill={bin.x1 > 100 ? 'var(--ds-amber)' : 'var(--ds-blue)'}
                  opacity="0.85"
                  stroke={bin.x1 > 100 ? '#fff' : 'var(--ds-cyan)'}
                  strokeWidth="1"
                />
                {bin.count > 0 && (
                  <text x={x + barW / 2} y={y - 4} fill="var(--ds-text-primary)" fontSize="9" fontFamily="var(--ds-font-mono)" textAnchor="middle">
                    {bin.count}
                  </text>
                )}
                <text x={x + barW / 2} y={svgH - 6} fill="var(--ds-text-muted)" fontSize="8" fontFamily="var(--ds-font-mono)" textAnchor="middle">
                  {bin.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mission Questions Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Mission 1 */}
        <div style={{ padding: '12px', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '6px' }}>
            Mission 1: Number of Graduates
          </div>
          <TextInput
            id="m1-count-input"
            labelText=""
            hideLabel
            placeholder="Count n = ?"
            value={studentCount}
            onChange={(e) => setStudentCount(e.target.value)}
            size="sm"
          />
        </div>

        {/* Mission 2 */}
        <div style={{ padding: '12px', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '6px' }}>
            Mission 2: Calculate Mean Salary (₹k)
          </div>
          <TextInput
            id="m2-mean-input"
            labelText=""
            hideLabel
            placeholder={`Mean = ? (approx ${actualMean.toFixed(1)})`}
            value={studentMean}
            onChange={(e) => setStudentMean(e.target.value)}
            size="sm"
          />
        </div>

        {/* Mission 3 */}
        <div style={{ padding: '12px', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '6px' }}>
            Mission 3: Calculate Median Salary (₹k)
          </div>
          <TextInput
            id="m3-median-input"
            labelText=""
            hideLabel
            placeholder="Median = ?"
            value={studentMedian}
            onChange={(e) => setStudentMedian(e.target.value)}
            size="sm"
          />
        </div>

        {/* Mission 5 */}
        <div style={{ padding: '12px', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '6px' }}>
            Mission 5: Direction of Skewness
          </div>
          <Select
            id="m5-skew-select"
            labelText=""
            hideLabel
            value={studentSkew}
            onChange={(e) => setStudentSkew(e.target.value)}
            size="sm"
          >
            <SelectItem value="" text="Select Skewness..." />
            <SelectItem value="right" text="Right-skewed (Positive)" />
            <SelectItem value="left" text="Left-skewed (Negative)" />
            <SelectItem value="symmetric" text="Perfect Symmetric" />
          </Select>
        </div>

        {/* Mission 6 */}
        <div style={{ padding: '12px', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '6px' }}>
            Mission 6: Should ₹150k be deleted?
          </div>
          <Select
            id="m6-delete-select"
            labelText=""
            hideLabel
            value={studentDelete150}
            onChange={(e) => setStudentDelete150(e.target.value)}
            size="sm"
          >
            <SelectItem value="" text="Select Action..." />
            <SelectItem value="no" text="No, it may be a genuine placement" />
            <SelectItem value="yes" text="Yes, delete it immediately" />
          </Select>
        </div>

        {/* Mission 8 */}
        <div style={{ padding: '12px', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '6px' }}>
            Mission 8: Which metric best represents most graduates?
          </div>
          <Select
            id="m8-rep-select"
            labelText=""
            hideLabel
            value={studentRepresentative}
            onChange={(e) => setStudentRepresentative(e.target.value)}
            size="sm"
          >
            <SelectItem value="" text="Select Best Metric..." />
            <SelectItem value="median" text="Median (₹30k/month)" />
            <SelectItem value="mean" text="Mean (₹38.47k/month)" />
          </Select>
        </div>
      </div>

      {/* Mission 9: Written Recommendation */}
      <div style={{ marginBottom: '1.5rem' }}>
        <TextArea
          id="m9-rec-area"
          labelText="Mission 9: Write Your Analytical Recommendation for the Placement Coordinator"
          placeholder="Explain whether the coordinator's claim is justified and what statistics should be communicated to students..."
          value={studentRecommendation}
          onChange={(e) => setStudentRecommendation(e.target.value)}
          rows={3}
        />
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <Button size="md" renderIcon={CheckmarkFilled} onClick={handleSubmit}>
          Submit Challenge Audit
        </Button>
        <Button size="md" kind="secondary" renderIcon={Help} onClick={fillSampleAnswers}>
          Fill Worked Solution
        </Button>
        <Button size="md" kind="ghost" renderIcon={Restart} onClick={handleReset}>
          Reset
        </Button>
      </div>

      {/* Feedback Alert */}
      {submitted && (
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '4px',
            background: isCompleted ? 'var(--ds-emerald-dim)' : 'rgba(218, 30, 40, 0.1)',
            borderLeft: isCompleted ? '4px solid var(--ds-emerald)' : '4px solid #da1e28',
            fontSize: '0.875rem',
            color: 'var(--ds-text-primary)',
          }}
        >
          {isCompleted ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <CheckmarkFilled size={20} style={{ color: 'var(--ds-emerald)' }} />
                <strong style={{ color: 'var(--ds-emerald)', fontSize: '1rem' }}>
                  Audit Complete: Placement Coordinator Claim Debunked!
                </strong>
              </div>
              <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--ds-text-secondary)' }}>
                Your findings confirm:
                <br />
                &bull; <strong>Count:</strong> 15 graduates.
                <br />
                &bull; <strong>Mean:</strong> ₹38.47k per month.
                <br />
                &bull; <strong>Median:</strong> ₹30.0k per month.
                <br />
                &bull; <strong>Skewness:</strong> Strongly right-skewed due to the ₹150k package.
                <br />
                &bull; <strong>Verdict:</strong> The coordinator’s claim that <em>&ldquo;most students earn around the average&rdquo;</em> is false. 14 out of 15 graduates earn less than the mean. The Median of ₹30,000 is the true representation of the middle graduate.
              </p>
            </div>
          ) : (
            <div>
              <strong>Audit Incomplete:</strong> Please check your numerical values. Hint: Count = 15, Mean ≈ {actualMean.toFixed(2)}, Median = {actualMedian.toFixed(1)}, Skewness = Right-skewed, Do not delete 150, Best representation = Median.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
