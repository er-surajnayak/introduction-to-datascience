'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Analytics, Code, Education, Information, CheckmarkFilled } from '@carbon/icons-react';

type VennArea = 'math' | 'cs' | 'domain' | 'ml' | 'danger' | 'research' | 'datascience';

export function DataScienceVenn() {
  const [activeArea, setActiveArea] = useState<VennArea>('datascience');

  const areaDetails: Record<
    VennArea,
    { title: string; subtitle: string; tagType: 'cyan' | 'purple' | 'teal' | 'red' | 'green' | 'warm-gray'; desc: string; formula: string }
  > = {
    datascience: {
      title: 'Data Science (The Sweet Spot)',
      subtitle: 'Computer Science + Math/Stats + Domain Expertise',
      tagType: 'cyan',
      desc: 'The complete discipline: you write clean scalable code, apply rigorous statistical probability, and understand the real domain context to turn numbers into high-impact decisions.',
      formula: 'Code + Math + Domain = Data Science Mastery',
    },
    ml: {
      title: 'Machine Learning (Traditional)',
      subtitle: 'Computer Science + Math/Stats (Missing Domain Context)',
      tagType: 'purple',
      desc: 'You can train complex neural networks and optimize loss functions, but without domain knowledge, you may optimize the wrong metric or fail to spot data leakage and real-world edge cases.',
      formula: 'Code + Math = Technical Machine Learning',
    },
    danger: {
      title: 'The Danger Zone',
      subtitle: 'Computer Science + Domain Expertise (Missing Math/Stats)',
      tagType: 'red',
      desc: 'You can build scripts and you know the domain, but without statistical rigor, you mistake random noise for real signals and draw false causal conclusions.',
      formula: 'Code + Domain - Math = False Statistical Confidence',
    },
    research: {
      title: 'Traditional Research / Statistics',
      subtitle: 'Math/Stats + Domain Expertise (Missing Scalable Code)',
      tagType: 'teal',
      desc: 'Deep theoretical understanding and domain insight, but limited ability to ingest gigabytes of real-time streaming data or deploy models into production systems.',
      formula: 'Math + Domain = Classical Academic Research',
    },
    math: {
      title: 'Mathematics & Statistics Pillar',
      subtitle: 'Linear algebra, calculus, probability distributions, hypothesis testing.',
      tagType: 'purple',
      desc: 'Provides the formal language to quantify uncertainty, compute gradients for optimization, and validate that patterns are statistically significant.',
      formula: 'Foundation of algorithms & loss functions',
    },
    cs: {
      title: 'Computer Science & Software Pillar',
      subtitle: 'Python, NumPy, database querying, data structures, cloud infrastructure.',
      tagType: 'cyan',
      desc: 'Enables processing massive datasets in memory, vectorizing matrix math, writing clean modular functions, and serving predictions at scale.',
      formula: 'Foundation of computational execution',
    },
    domain: {
      title: 'Domain & Business Context Pillar',
      subtitle: 'Aviation, Healthcare, E-Commerce, Finance, Robotics.',
      tagType: 'green',
      desc: 'Determines what questions are worth asking, identifies data anomalies, and translates mathematical predictions into human actions.',
      formula: 'Foundation of practical real-world impact',
    },
  };

  const current = areaDetails[activeArea];

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2rem 0',
        border: '1px solid var(--ds-border-strong)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Interactive Lab 1.1
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
            Drew Conway’s Data Science Venn Diagram Explorer
          </h3>
        </div>
        <Tag type="cyan" size="md">Click Any Area to Inspect</Tag>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Explore how the convergence of Computer Science, Mathematics, and Domain Knowledge defines true Data Science versus specialized sub-fields.
      </p>

      {/* Interactive Venn Selector Buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveArea('datascience')}
          style={{
            padding: '10px 12px',
            background: activeArea === 'datascience' ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-02)',
            border: activeArea === 'datascience' ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: activeArea === 'datascience' ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          ★ Data Science
        </button>

        <button
          type="button"
          onClick={() => setActiveArea('ml')}
          style={{
            padding: '10px 12px',
            background: activeArea === 'ml' ? 'rgba(138, 63, 252, 0.12)' : 'var(--cds-layer-02)',
            border: activeArea === 'ml' ? '1.5px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: activeArea === 'ml' ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
            fontWeight: 500,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          Machine Learning
        </button>

        <button
          type="button"
          onClick={() => setActiveArea('danger')}
          style={{
            padding: '10px 12px',
            background: activeArea === 'danger' ? 'rgba(218, 30, 40, 0.12)' : 'var(--cds-layer-02)',
            border: activeArea === 'danger' ? '1.5px solid #da1e28' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: activeArea === 'danger' ? '#fa4d56' : 'var(--ds-text-primary)',
            fontWeight: 500,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          Danger Zone
        </button>

        <button
          type="button"
          onClick={() => setActiveArea('research')}
          style={{
            padding: '10px 12px',
            background: activeArea === 'research' ? 'rgba(0, 157, 154, 0.12)' : 'var(--cds-layer-02)',
            border: activeArea === 'research' ? '1.5px solid var(--ds-teal)' : '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            color: activeArea === 'research' ? 'var(--ds-teal)' : 'var(--ds-text-primary)',
            fontWeight: 500,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          Trad. Research
        </button>
      </div>

      {/* Detail Showcase Card */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--cds-layer-02)',
          border: '1px solid var(--ds-border-strong)',
          borderRadius: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '8px' }}>
          <Tag type={current.tagType} size="md">
            {current.title}
          </Tag>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
            {current.formula}
          </span>
        </div>

        <div style={{ fontSize: '0.9375rem', color: 'var(--ds-cyan)', fontWeight: 500, marginBottom: '0.75rem' }}>
          {current.subtitle}
        </div>

        <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--ds-text-secondary)', margin: 0 }}>
          {current.desc}
        </p>
      </div>
    </div>
  );
}
