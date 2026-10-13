'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import {
  Scale,
  Analytics,
  DataCategorical,
  WarningAlt,
  Information,
} from '@carbon/icons-react';

type Characteristic = 'center' | 'spread' | 'shape' | 'unusual';

const SAMPLE_DATA = [20, 22, 24, 25, 26, 28, 30, 35, 40, 95];

export function DistributionAnatomyExplorer() {
  const [activeChar, setActiveChar] = useState<Characteristic>('center');

  const charDetails = {
    center: {
      title: '1. CENTER (Central Tendency)',
      icon: Scale,
      color: 'var(--ds-cyan)',
      summary: 'Where observations tend to cluster or balance.',
      detail:
        'In this dataset, the observations cluster around the middle. The median is 27.0, and the mean is 34.5 (pulled higher by 95). Central tendency answers: "What is the typical observation?"',
      metric: 'Median = 27.0 | Mean = 34.5',
    },
    spread: {
      title: '2. SPREAD (Dispersion & Variability)',
      icon: Analytics,
      color: 'var(--ds-purple)',
      summary: 'How widely observations vary around the center.',
      detail:
        'The values stretch from a minimum of 20 to a maximum of 95 (Range = 75). The bulk of values (middle 50%, IQR) sit tightly between 24 and 35. Spread answers: "How scattered are the data points?"',
      metric: 'Range = 75 | IQR = 11 | SD = 22.0',
    },
    shape: {
      title: '3. SHAPE (Distribution Geometry)',
      icon: DataCategorical,
      color: 'var(--ds-emerald)',
      summary: 'The overall visual pattern traced by the frequencies.',
      detail:
        'Most observations are clustered between 20 and 40, but a long single tail extends toward the right to 95. This creates an asymmetric Right-Skewed distribution. Shape answers: "Is it balanced, skewed, or multi-peaked?"',
      metric: 'Shape: Positively Skewed (Right Tail)',
    },
    unusual: {
      title: '4. UNUSUAL VALUES (Outliers & Gaps)',
      icon: WarningAlt,
      color: 'var(--ds-amber)',
      summary: 'Observations noticeably separated from the main cohort.',
      detail:
        'The value 95 is separated by a huge 55-point void from the nearest observation (40). Under Tukey’s rule, the upper fence is 35 + 1.5×11 = 51.5. Thus 95 is an extreme outlier requiring scrutiny.',
      metric: 'Outlier detected at 95 (Upper Fence = 51.5)',
    },
  };

  const current = charDetails[activeChar];

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
            Section 3.2.2
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            What Is a Distribution?
          </span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
          }}
        >
          4 Pillars: Center, Spread, Shape, Unusual
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
        The Distribution Anatomy Explorer
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        A distribution describes how values of a variable are arranged and how frequently they occur. Click each of the four anatomical pillars below to see how it highlights on the plotted dataset:
      </p>

      {/* Characteristic Buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '10px',
          marginBottom: '1.5rem',
        }}
      >
        {(['center', 'spread', 'shape', 'unusual'] as Characteristic[]).map((key) => {
          const item = charDetails[key];
          const IconComponent = item.icon;
          const isActive = activeChar === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveChar(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 14px',
                borderRadius: '4px',
                background: isActive ? 'var(--ds-bg-surface-elevated)' : 'var(--cds-layer-02)',
                border: isActive ? `2px solid ${item.color}` : '1px solid var(--ds-border-subtle)',
                color: isActive ? item.color : 'var(--ds-text-primary)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <IconComponent size={18} />
              <span>{key.toUpperCase()}</span>
            </button>
          );
        })}
      </div>

      {/* Plotted Dataset Diagram */}
      <div
        style={{
          padding: '1.75rem 1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '70px',
            background: 'var(--cds-layer-02)',
            borderRadius: '4px',
            marginBottom: '1rem',
          }}
        >
          {/* Highlight Overlays depending on active characteristic */}
          {activeChar === 'center' && (
            <div
              style={{
                position: 'absolute',
                left: '27%',
                top: 0,
                bottom: 0,
                width: '3px',
                background: 'var(--ds-cyan)',
                zIndex: 4,
                boxShadow: '0 0 12px var(--ds-cyan)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  left: '6px',
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--ds-font-mono)',
                  color: 'var(--ds-cyan)',
                  fontWeight: 700,
                }}
              >
                Center (Median = 27)
              </span>
            </div>
          )}

          {activeChar === 'spread' && (
            <div
              style={{
                position: 'absolute',
                left: '20%',
                width: '75%',
                top: 0,
                bottom: 0,
                background: 'rgba(165, 110, 255, 0.15)',
                borderLeft: '2px dashed var(--ds-purple)',
                borderRight: '2px dashed var(--ds-purple)',
                zIndex: 2,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--ds-font-mono)',
                  color: 'var(--ds-purple)',
                  fontWeight: 600,
                }}
              >
                Full Range Spread (20 to 95)
              </span>
            </div>
          )}

          {activeChar === 'shape' && (
            <div
              style={{
                position: 'absolute',
                left: '18%',
                width: '25%',
                top: 0,
                bottom: 0,
                background: 'rgba(36, 161, 72, 0.15)',
                border: '2px solid var(--ds-emerald)',
                borderRadius: '4px',
                zIndex: 2,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  left: '6px',
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--ds-font-mono)',
                  color: 'var(--ds-emerald)',
                  fontWeight: 600,
                }}
              >
                Bulk of Data &rarr; Long Tail to Right
              </span>
            </div>
          )}

          {activeChar === 'unusual' && (
            <div
              style={{
                position: 'absolute',
                left: '92%',
                width: '7%',
                top: 0,
                bottom: 0,
                background: 'rgba(241, 194, 27, 0.2)',
                border: '2px solid var(--ds-amber)',
                borderRadius: '4px',
                zIndex: 4,
                boxShadow: '0 0 10px rgba(241, 194, 27, 0.5)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '-18px',
                  right: '0',
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--ds-font-mono)',
                  color: 'var(--ds-amber)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                Outlier (95)
              </span>
            </div>
          )}

          {/* Dots */}
          {SAMPLE_DATA.map((val, idx) => {
            const isOutlier = val === 95;
            const isCenter = val === 26 || val === 28;
            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: `${val}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: isOutlier
                    ? 'var(--ds-amber)'
                    : isCenter && activeChar === 'center'
                    ? 'var(--ds-cyan)'
                    : 'var(--cds-layer-hover-01)',
                  border: isOutlier ? '2px solid #fff' : '1px solid var(--ds-border-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.625rem',
                  fontFamily: 'var(--ds-font-mono)',
                  color: isOutlier ? '#000' : 'var(--ds-text-primary)',
                  fontWeight: 700,
                  zIndex: 3,
                }}
              >
                {val}
              </div>
            );
          })}
        </div>

        {/* Axis scale */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-text-muted)',
            borderTop: '1px solid var(--ds-border-subtle)',
            paddingTop: '6px',
          }}
        >
          <span>0</span>
          <span>20</span>
          <span>40</span>
          <span>60</span>
          <span>80</span>
          <span>100</span>
        </div>
      </div>

      {/* Detail Explanation Card */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          borderLeft: `4px solid ${current.color}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontWeight: 600, color: current.color, fontSize: '1rem' }}>
            {current.title}
          </div>
          <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-primary)', fontWeight: 600 }}>
            {current.metric}
          </span>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, margin: 0 }}>
          {current.detail}
        </p>
      </div>
    </div>
  );
}
