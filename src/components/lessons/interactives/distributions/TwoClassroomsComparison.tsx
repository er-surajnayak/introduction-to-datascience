'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import {
  Scale,
  Compare,
  Analytics,
  CheckmarkFilled,
  View,
  Help,
  Restart,
} from '@carbon/icons-react';
import {
  calcMean,
  calcRange,
  calcPopulationStdDev,
} from '@/lib/distributionStats';

const CLASS_A = [45, 47, 49, 50, 50, 51, 53, 55];
const CLASS_B = [10, 20, 30, 40, 60, 70, 80, 90];

export function TwoClassroomsComparison() {
  const [showValues, setShowValues] = useState<boolean>(true);
  const [showMean, setShowMean] = useState<boolean>(true);
  const [showSpread, setShowSpread] = useState<boolean>(true);
  const [compareMode, setCompareMode] = useState<'stacked' | 'overlay'>('stacked');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const meanA = calcMean(CLASS_A);
  const rangeA = calcRange(CLASS_A);
  const sdA = calcPopulationStdDev(CLASS_A);

  const meanB = calcMean(CLASS_B);
  const rangeB = calcRange(CLASS_B);
  const sdB = calcPopulationStdDev(CLASS_B);

  // Axis mapping for shared horizontal scale 0 to 100
  const scalePercent = (val: number) => `${val}%`;

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
            Section 3.2.1
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            The Mystery of Two Classrooms
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          Same Mean ≠ Same Distribution
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
        Two classrooms have exactly the same average marks. Does that mean their performance is identical?
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        Class A and Class B both took the identical 100-mark examination. The department head announced:
        <em> &ldquo;Both sections achieved an average score of 50.0!&rdquo;</em> But compare how their numbers are arranged on the shared scale below:
      </p>

      {/* Control Switcher Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '12px 16px',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            size="sm"
            kind={showValues ? 'primary' : 'secondary'}
            renderIcon={View}
            onClick={() => setShowValues(!showValues)}
          >
            {showValues ? 'Hide Values' : 'Show Values'}
          </Button>
          <Button
            size="sm"
            kind={showMean ? 'primary' : 'secondary'}
            renderIcon={Scale}
            onClick={() => setShowMean(!showMean)}
          >
            {showMean ? 'Hide Mean' : 'Show Mean (μ=50)'}
          </Button>
          <Button
            size="sm"
            kind={showSpread ? 'primary' : 'secondary'}
            renderIcon={Analytics}
            onClick={() => setShowSpread(!showSpread)}
          >
            {showSpread ? 'Hide Spread' : 'Show Spread Range'}
          </Button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            size="sm"
            kind={compareMode === 'stacked' ? 'primary' : 'ghost'}
            renderIcon={Compare}
            onClick={() => setCompareMode('stacked')}
          >
            Stacked View
          </Button>
          <Button
            size="sm"
            kind={compareMode === 'overlay' ? 'primary' : 'ghost'}
            renderIcon={Compare}
            onClick={() => setCompareMode('overlay')}
          >
            Overlay View
          </Button>
        </div>
      </div>

      {/* Shared Scale Visualization */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        {/* Class A Plot */}
        <div style={{ marginBottom: compareMode === 'stacked' ? '2rem' : '1.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span style={{ fontWeight: 600, color: 'var(--ds-cyan)', fontSize: '0.9375rem' }}>
              Class A (Consistent Cohort)
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--ds-font-mono)',
                color: 'var(--ds-text-muted)',
              }}
            >
              Mean = 50.0 | Range = 10 | Pop SD = 2.92
            </span>
          </div>

          <div
            style={{
              position: 'relative',
              height: '56px',
              background: 'var(--cds-layer-02)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
              overflow: 'hidden',
            }}
          >
            {/* Range highlight band */}
            {showSpread && (
              <div
                style={{
                  position: 'absolute',
                  left: '45%',
                  width: '10%',
                  top: 0,
                  bottom: 0,
                  background: 'rgba(51, 177, 255, 0.15)',
                  borderLeft: '1px dashed var(--ds-cyan)',
                  borderRight: '1px dashed var(--ds-cyan)',
                }}
              />
            )}

            {/* Mean marker */}
            {showMean && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  background: 'var(--ds-cyan)',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: '4px',
                    fontSize: '0.625rem',
                    fontFamily: 'var(--ds-font-mono)',
                    color: 'var(--ds-cyan)',
                    fontWeight: 700,
                  }}
                >
                  μ=50
                </span>
              </div>
            )}

            {/* Class A data dots */}
            {CLASS_A.map((val, idx) => (
              <div
                key={`a-${idx}`}
                style={{
                  position: 'absolute',
                  left: scalePercent(val),
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'var(--ds-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  boxShadow: '0 0 8px rgba(51, 177, 255, 0.5)',
                  zIndex: 3,
                }}
                title={`Student ${idx + 1}: ${val} marks`}
              >
                {showValues && val}
              </div>
            ))}
          </div>
        </div>

        {/* Class B Plot */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span style={{ fontWeight: 600, color: 'var(--ds-purple)', fontSize: '0.9375rem' }}>
              Class B (Polarized Cohort)
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--ds-font-mono)',
                color: 'var(--ds-text-muted)',
              }}
            >
              Mean = 50.0 | Range = 80 | Pop SD = 25.50
            </span>
          </div>

          <div
            style={{
              position: 'relative',
              height: '56px',
              background: 'var(--cds-layer-02)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
              overflow: 'hidden',
            }}
          >
            {/* Range highlight band */}
            {showSpread && (
              <div
                style={{
                  position: 'absolute',
                  left: '10%',
                  width: '80%',
                  top: 0,
                  bottom: 0,
                  background: 'rgba(165, 110, 255, 0.15)',
                  borderLeft: '1px dashed var(--ds-purple)',
                  borderRight: '1px dashed var(--ds-purple)',
                }}
              />
            )}

            {/* Mean marker */}
            {showMean && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  background: 'var(--ds-purple)',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: '4px',
                    fontSize: '0.625rem',
                    fontFamily: 'var(--ds-font-mono)',
                    color: 'var(--ds-purple)',
                    fontWeight: 700,
                  }}
                >
                  μ=50
                </span>
              </div>
            )}

            {/* Class B data dots */}
            {CLASS_B.map((val, idx) => (
              <div
                key={`b-${idx}`}
                style={{
                  position: 'absolute',
                  left: scalePercent(val),
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'var(--ds-purple)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  boxShadow: '0 0 8px rgba(165, 110, 255, 0.5)',
                  zIndex: 3,
                }}
                title={`Student ${idx + 1}: ${val} marks`}
              >
                {showValues && val}
              </div>
            ))}
          </div>
        </div>

        {/* Shared Scale Axis Ticks */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-text-muted)',
            paddingTop: '6px',
            borderTop: '1px solid var(--ds-border-strong)',
          }}
        >
          <span>0 (Min)</span>
          <span>20</span>
          <span>40</span>
          <span style={{ color: 'var(--ds-text-primary)', fontWeight: 600 }}>50 (Shared Mean)</span>
          <span>60</span>
          <span>80</span>
          <span>100 (Max)</span>
        </div>
      </div>

      {/* Statistical Summary Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.75rem',
        }}
      >
        <div
          style={{
            padding: '1rem',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            borderLeft: '4px solid var(--ds-cyan)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '6px' }}>
            CLASS A STATISTICAL PROFILE
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
            <div><strong>Mean (μ):</strong> 50.0 marks</div>
            <div><strong>Range:</strong> 55 - 45 = 10 marks</div>
            <div><strong>Population SD (σ):</strong> 2.92 marks</div>
            <div style={{ color: 'var(--ds-emerald)', marginTop: '4px', fontWeight: 500 }}>
              &rarr; High concentration around the center.
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '1rem',
            background: 'var(--ds-bg-surface-elevated)',
            borderRadius: '4px',
            borderLeft: '4px solid var(--ds-purple)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-purple)', fontWeight: 600, marginBottom: '6px' }}>
            CLASS B STATISTICAL PROFILE
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
            <div><strong>Mean (μ):</strong> 50.0 marks</div>
            <div><strong>Range:</strong> 90 - 10 = 80 marks</div>
            <div><strong>Population SD (σ):</strong> 25.50 marks</div>
            <div style={{ color: 'var(--ds-amber)', marginTop: '4px', fontWeight: 500 }}>
              &rarr; Extreme dispersion across the entire domain.
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic Comprehension Question */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--cds-layer-02)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
          Diagnostic Question: Which classroom is more consistent in performance?
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Button
            size="sm"
            kind={selectedAnswer === 'A' ? 'primary' : 'secondary'}
            onClick={() => setSelectedAnswer('A')}
          >
            Class A (Concentrated)
          </Button>
          <Button
            size="sm"
            kind={selectedAnswer === 'B' ? 'primary' : 'secondary'}
            onClick={() => setSelectedAnswer('B')}
          >
            Class B (Dispersed)
          </Button>
          <Button
            size="sm"
            kind={selectedAnswer === 'Both' ? 'primary' : 'secondary'}
            onClick={() => setSelectedAnswer('Both')}
          >
            Both are identical because Mean = 50
          </Button>
        </div>

        {selectedAnswer && (
          <div
            style={{
              padding: '0.875rem 1rem',
              borderRadius: '4px',
              background: selectedAnswer === 'A' ? 'var(--ds-emerald-dim)' : 'rgba(218, 30, 40, 0.1)',
              borderLeft: selectedAnswer === 'A' ? '4px solid var(--ds-emerald)' : '4px solid #da1e28',
              fontSize: '0.875rem',
              color: 'var(--ds-text-primary)',
            }}
          >
            {selectedAnswer === 'A' ? (
              <div>
                <strong>Correct!</strong> Class A is far more consistent. Every score sits within 5 marks of the average (SD = 2.92). In Class B, scores are scattered from 10 to 90 (SD = 25.50).
                <div style={{ marginTop: '6px', color: 'var(--ds-text-secondary)' }}>
                  <strong>Key Takeaway:</strong> Identical central tendencies do not imply identical distributions!
                </div>
              </div>
            ) : (
              <div>
                <strong>Incorrect.</strong> Even though both classes have a mean of 50.0, Class B has a massive spread of 80 marks and SD = 25.50. Class A is much more consistent because its observations are tightly clustered around 50.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
