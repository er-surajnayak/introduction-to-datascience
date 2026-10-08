'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import { SortAscending, Restart, DataCategorical, CheckmarkFilled } from '@carbon/icons-react';
import { calcMean, calcMedian, calcMode } from '@/lib/statistics';

export function MedianAndModeLab() {
  const [activeTab, setActiveTab] = useState<'odd' | 'even' | 'mode' | 'matrix'>('odd');

  // Odd dataset
  const [oddSorted, setOddSorted] = useState(false);
  const oddUnsorted = [80, 50, 90, 60, 70];
  const oddList = oddSorted ? [50, 60, 70, 80, 90] : oddUnsorted;

  // Even dataset
  const [evenSorted, setEvenSorted] = useState(false);
  const evenUnsorted = [80, 50, 70, 60];
  const evenList = evenSorted ? [50, 60, 70, 80] : evenUnsorted;

  // Categorical mode dataset
  const cityDeliveries = ['Mumbai', 'Pune', 'Mumbai', 'Nashik', 'Mumbai', 'Nagpur', 'Pune'];

  // Matrix dataset: 10, 20, 20, 30, 100
  const matrixData = [10, 20, 20, 30, 100];
  const matrixMean = calcMean(matrixData); // 36
  const matrixMedian = calcMedian(matrixData); // 20
  const matrixMode = calcMode(matrixData); // [20]

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="purple" size="md">
            Section 08, 09 & 10
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Median, Mode & 3-Way Center Comparison
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          Odd vs Even &bull; Categorical Mode &bull; The 100 Spike
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Median & Mode: Position-Based and Frequency-Based Centers
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Unlike the Mean, the <strong>Median</strong> requires sorting the data first, making it a rank-order positional metric. The <strong>Mode</strong> measures the most frequent value and works equally well on numbers and categories.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <Button
          size="sm"
          kind={activeTab === 'odd' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('odd')}
        >
          Median (Odd Count n=5)
        </Button>
        <Button
          size="sm"
          kind={activeTab === 'even' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('even')}
        >
          Median (Even Count n=4)
        </Button>
        <Button
          size="sm"
          kind={activeTab === 'mode' ? 'primary' : 'secondary'}
          renderIcon={DataCategorical}
          onClick={() => setActiveTab('mode')}
        >
          Mode (Numerical & Categorical)
        </Button>
        <Button
          size="sm"
          kind={activeTab === 'matrix' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('matrix')}
        >
          Mean vs Median vs Mode [10..100]
        </Button>
      </div>

      {activeTab === 'odd' && (
        <div style={{ padding: '1.25rem', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
              Odd Sample Size (n = 5): Single Exact Middle Element
            </span>
            <Button
              size="sm"
              kind={oddSorted ? 'ghost' : 'tertiary'}
              renderIcon={oddSorted ? Restart : SortAscending}
              onClick={() => setOddSorted(!oddSorted)}
            >
              {oddSorted ? 'Reset Unsorted' : 'Step 1: Sort The Data'}
            </Button>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {oddList.map((val, idx) => {
              const isMiddle = oddSorted && idx === 2; // Index 2 is the middle of 5 elements
              return (
                <motion.div
                  key={`${val}-${idx}`}
                  layout
                  transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                  style={{
                    width: '72px',
                    padding: '16px 8px',
                    textAlign: 'center',
                    background: isMiddle ? 'var(--ds-purple-dim)' : 'var(--ds-bg-core)',
                    border: isMiddle ? '2px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                    Rank {idx + 1}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: isMiddle ? 'var(--ds-purple)' : 'var(--ds-text-primary)' }}>
                    {val}
                  </div>
                  {isMiddle && (
                    <Tag type="purple" size="sm" style={{ marginTop: '6px' }}>
                      Median
                    </Tag>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
            {oddSorted ? (
              <span style={{ color: 'var(--ds-purple)' }}>
                <strong>Sorted result:</strong> Since n = 5 (odd), the median is uniquely the middle observation at position (n + 1)/2 = 3rd element: <strong>70</strong>.
              </span>
            ) : (
              <span style={{ color: 'var(--ds-amber)' }}>
                <strong>Crucial Rule:</strong> Always sort first! In the unsorted array [80, 50, 90, 60, 70], the middle item is 90, which is completely incorrect. Click &ldquo;Sort The Data&rdquo; above.
              </span>
            )}
          </div>
        </div>
      )}

      {activeTab === 'even' && (
        <div style={{ padding: '1.25rem', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
              Even Sample Size (n = 4): Average the Middle Two
            </span>
            <Button
              size="sm"
              kind={evenSorted ? 'ghost' : 'tertiary'}
              renderIcon={evenSorted ? Restart : SortAscending}
              onClick={() => setEvenSorted(!evenSorted)}
            >
              {evenSorted ? 'Reset Unsorted' : 'Step 1: Sort The Data'}
            </Button>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {evenList.map((val, idx) => {
              const isMiddleTwo = evenSorted && (idx === 1 || idx === 2);
              return (
                <motion.div
                  key={`${val}-${idx}`}
                  layout
                  transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                  style={{
                    width: '72px',
                    padding: '16px 8px',
                    textAlign: 'center',
                    background: isMiddleTwo ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-core)',
                    border: isMiddleTwo ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginBottom: '4px' }}>
                    Rank {idx + 1}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: isMiddleTwo ? 'var(--ds-cyan)' : 'var(--ds-text-primary)' }}>
                    {val}
                  </div>
                  {isMiddleTwo && (
                    <Tag type="cyan" size="sm" style={{ marginTop: '6px' }}>
                      Center
                    </Tag>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
            {evenSorted ? (
              <div>
                <strong>Sorted result [50, 60, 70, 80]:</strong> With an even count $n = 4$, no single integer sits in the exact middle. We take the mean of the two central elements:
                <div style={{ margin: '8px 0', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', fontSize: '0.9375rem' }}>
                  Median = (60 + 70) / 2 = <strong>65.0</strong>
                </div>
              </div>
            ) : (
              <span style={{ color: 'var(--ds-amber)' }}>
                Data must be ordered before identifying the central pair. Click &ldquo;Sort The Data&rdquo; above.
              </span>
            )}
          </div>
        </div>
      )}

      {activeTab === 'mode' && (
        <div style={{ padding: '1.25rem', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Mode: Most Frequently Occurring Observation
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {/* Numerical Mode */}
            <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '6px' }}>
                Numerical Example: Marks
              </div>
              <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.875rem', marginBottom: '8px' }}>
                [10, <strong style={{ color: 'var(--ds-emerald)' }}>20</strong>, <strong style={{ color: 'var(--ds-emerald)' }}>20</strong>, 30, 40, <strong style={{ color: 'var(--ds-emerald)' }}>20</strong>]
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)' }}>
                Value <strong>20</strong> appears 3 times. Mode = <strong style={{ color: 'var(--ds-emerald)' }}>20</strong>.
              </div>
            </div>

            {/* Categorical Mode */}
            <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--ds-purple)', fontWeight: 600, marginBottom: '6px' }}>
                Categorical Example: City Deliveries
              </div>
              <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', marginBottom: '8px', lineHeight: 1.5 }}>
                [<strong style={{ color: 'var(--ds-purple)' }}>Mumbai</strong>, Pune, <strong style={{ color: 'var(--ds-purple)' }}>Mumbai</strong>, Nashik, <strong style={{ color: 'var(--ds-purple)' }}>Mumbai</strong>, Nagpur, Pune]
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)' }}>
                <strong>Mumbai</strong> appears 3 times. Mode = <strong style={{ color: 'var(--ds-purple)' }}>Mumbai</strong>.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'matrix' && (
        <div style={{ padding: '1.25rem', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '10px' }}>
            Comparison on Asymmetric Dataset: [10, 20, 20, 30, 100]
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '10px',
              marginBottom: '1.25rem',
            }}
          >
            <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', borderTop: '3px solid var(--ds-blue)' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Mean (Σ/5)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-blue)' }}>
                {matrixMean.toFixed(1)}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>Pulled right by 100</div>
            </div>

            <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', borderTop: '3px solid var(--ds-purple)' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Median (Middle)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>
                {matrixMedian.toFixed(1)}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>Resistant to 100</div>
            </div>

            <div style={{ padding: '12px', background: 'var(--ds-bg-core)', borderRadius: '4px', borderTop: '3px solid var(--ds-emerald)' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)' }}>Mode (Peak Freq)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)' }}>
                {matrixMode[0]}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>Occurs twice</div>
            </div>
          </div>

          <div
            style={{
              padding: '10px 14px',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              borderLeft: '4px solid var(--ds-amber)',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-secondary)',
              lineHeight: 1.5,
            }}
          >
            <strong>The Detective Question:</strong> &ldquo;Which one feels more representative of a typical observation?&rdquo; Four out of the five observations are ≤ 30. The Mean of <strong>36</strong> is larger than 80% of the entire cohort! The Median and Mode (<strong>20</strong>) better represent typical data here.
          </div>
        </div>
      )}
    </div>
  );
}
