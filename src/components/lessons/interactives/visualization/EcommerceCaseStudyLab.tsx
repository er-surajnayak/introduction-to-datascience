'use client';

import React, { useState } from 'react';
import { Tag, Button, InlineNotification } from '@carbon/react';
import { ChartLine, ChartBar, ChartScatter, Dashboard } from '@carbon/icons-react';

const ECOM_DATA = [
  { month: 'Jan', revenue: 120, orders: 80, adSpend: 20 },
  { month: 'Feb', revenue: 145, orders: 95, adSpend: 24 },
  { month: 'Mar', revenue: 138, orders: 90, adSpend: 22 },
  { month: 'Apr', revenue: 170, orders: 110, adSpend: 28 },
  { month: 'May', revenue: 195, orders: 125, adSpend: 31 },
  { month: 'Jun', revenue: 220, orders: 145, adSpend: 35 },
];

export function VisualizationEcommerceCaseStudy() {
  const [activeTask, setActiveTask] = useState<number>(1);
  const [completedTasks, setCompletedTasks] = useState<number[]>([1]);

  const handleCompleteTask = (taskNum: number) => {
    if (!completedTasks.includes(taskNum)) {
      setCompletedTasks([...completedTasks, taskNum]);
    }
    if (taskNum < 4) {
      setActiveTask(taskNum + 1);
    }
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '2.5rem',
        background: 'var(--ds-bg-surface)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag type="cyan" size="md">Section 3.3.24</Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>Real-World Case Study</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
          E-Commerce 6-Month Growth Diagnostics
        </span>
      </div>

      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '0.75rem' }}>
        Case Study: Diagnosing Growth and Ad Spend ROI
      </h3>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Examine 6 months of retail orders, top-line revenue, and marketing spend. Work through the 4 investigative tasks below to build a multi-chart diagnostic dashboard.
      </p>

      {/* Task Navigator */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {[
          { num: 1, label: '1. Revenue Line', icon: ChartLine },
          { num: 2, label: '2. Orders Bar', icon: ChartBar },
          { num: 3, label: '3. AdSpend vs Revenue Scatter', icon: ChartScatter },
          { num: 4, label: '4. Executive Dashboard', icon: Dashboard },
        ].map((t) => (
          <Button
            key={t.num}
            kind={activeTask === t.num ? 'primary' : completedTasks.includes(t.num) ? 'secondary' : 'ghost'}
            size="sm"
            renderIcon={t.icon}
            onClick={() => setActiveTask(t.num)}
          >
            {t.label}
          </Button>
        ))}
      </div>

      {/* Render Area */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        {activeTask === 1 && (
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
              Task 1: Top-Line Revenue Trend (Line Chart)
            </div>
            <svg viewBox="0 0 450 180" style={{ width: '100%', height: 'auto', maxHeight: '180px' }}>
              <line x1="60" y1="20" x2="60" y2="140" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
              <line x1="60" y1="140" x2="400" y2="140" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
              <path
                d="M 80 84 L 140 70 L 200 74 L 260 56 L 320 42 L 380 28"
                fill="none"
                stroke="var(--ds-blue)"
                strokeWidth="2.5"
              />
              {ECOM_DATA.map((d, idx) => (
                <g key={idx}>
                  <circle cx={80 + idx * 60} cy={140 - (d.revenue / 240) * 120} r="4" fill="var(--ds-cyan)" />
                  <text x={80 + idx * 60} y="156" textAnchor="middle" fontSize="10" fill="var(--ds-text-muted)">{d.month}</text>
                  <text x={80 + idx * 60} y={130 - (d.revenue / 240) * 120} textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ds-text-primary)">
                    ₹{d.revenue}k
                  </text>
                </g>
              ))}
            </svg>
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button kind="primary" size="sm" onClick={() => handleCompleteTask(1)}>
                Confirm Task 1 & Proceed &rarr;
              </Button>
            </div>
          </div>
        )}

        {activeTask === 2 && (
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
              Task 2: Monthly Orders Volume (Bar Chart)
            </div>
            <svg viewBox="0 0 450 180" style={{ width: '100%', height: 'auto', maxHeight: '180px' }}>
              <line x1="60" y1="20" x2="60" y2="140" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
              <line x1="60" y1="140" x2="400" y2="140" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
              {ECOM_DATA.map((d, idx) => {
                const barH = (d.orders / 160) * 115;
                const x = 75 + idx * 55;
                const y = 140 - barH;
                return (
                  <g key={idx}>
                    <rect x={x} y={y} width="35" height={barH} fill="var(--ds-purple)" rx="2" />
                    <text x={x + 17} y={y - 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ds-text-primary)">
                      {d.orders}
                    </text>
                    <text x={x + 17} y="156" textAnchor="middle" fontSize="10" fill="var(--ds-text-muted)">
                      {d.month}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button kind="primary" size="sm" onClick={() => handleCompleteTask(2)}>
                Confirm Task 2 & Proceed &rarr;
              </Button>
            </div>
          </div>
        )}

        {activeTask === 3 && (
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
              Task 3: Marketing Spend vs Revenue Association (Scatter Plot)
            </div>
            <svg viewBox="0 0 450 180" style={{ width: '100%', height: 'auto', maxHeight: '180px' }}>
              <line x1="60" y1="20" x2="60" y2="140" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
              <line x1="60" y1="140" x2="400" y2="140" stroke="var(--ds-border-strong)" strokeWidth="1.5" />
              <text x="230" y="166" textAnchor="middle" fontSize="10" fill="var(--ds-text-secondary)">Ad Spend (₹k) &rarr;</text>
              <text x="18" y="80" textAnchor="middle" fontSize="10" transform="rotate(-90 18 80)" fill="var(--ds-text-secondary)">Revenue (₹k) &rarr;</text>
              {ECOM_DATA.map((d, idx) => {
                const cx = 80 + ((d.adSpend - 18) / 18) * 300;
                const cy = 140 - ((d.revenue - 100) / 130) * 110;
                return (
                  <g key={idx}>
                    <circle cx={cx} cy={cy} r="6" fill="var(--ds-emerald)" stroke="#ffffff" strokeWidth="1.5" />
                    <text x={cx} y={cy - 8} textAnchor="middle" fontSize="9" fill="var(--ds-text-primary)">{d.month}</text>
                  </g>
                );
              })}
            </svg>
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button kind="primary" size="sm" onClick={() => handleCompleteTask(3)}>
                Confirm Task 3 & Proceed &rarr;
              </Button>
            </div>
          </div>
        )}

        {activeTask === 4 && (
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '12px' }}>
              Task 4: Coordinated Executive Dashboard (Subplots 1 &times; 2)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {/* Left Plot */}
              <div style={{ padding: '8px', background: 'var(--ds-bg-surface)', borderRadius: '3px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-cyan)' }}>Revenue (₹k)</div>
                <svg viewBox="0 0 200 90" style={{ width: '100%', height: 'auto' }}>
                  <path d="M 20 60 L 55 45 L 90 48 L 125 36 L 160 25 L 195 12" fill="none" stroke="var(--ds-blue)" strokeWidth="2" />
                </svg>
              </div>
              {/* Right Plot */}
              <div style={{ padding: '8px', background: 'var(--ds-bg-surface)', borderRadius: '3px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-purple)' }}>Order Volume</div>
                <svg viewBox="0 0 200 90" style={{ width: '100%', height: 'auto' }}>
                  {ECOM_DATA.map((d, i) => (
                    <rect key={i} x={18 + i * 30} y={90 - (d.orders / 150) * 80} width="18" height={(d.orders / 150) * 80} fill="var(--ds-purple)" />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Case Study Takeaway */}
      <InlineNotification
        kind="success"
        title="Analytical Conclusion"
        subtitle="Revenue grew by 83.3% while order volume nearly doubled. While ad spend correlates strongly with revenue, remember that product seasonal demand or expanded catalog size could be confounding drivers."
        hideCloseButton
      />
    </div>
  );
}
