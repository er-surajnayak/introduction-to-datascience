'use client';

import React from 'react';
import Link from 'next/link';
import { Tag } from '@carbon/react';
import { courseConfig } from '@/data/courseData';

export function Footer() {
  return (
    <footer
      style={{
        background: '#0a0c10',
        borderTop: '1px solid var(--ds-border-subtle)',
        padding: '4rem 0 2rem 0',
        color: '#8d8d8d',
        fontSize: '0.875rem',
      }}
    >
      <div className="ds-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand & Purpose */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 700, fontSize: '1.125rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
                DI NOTES
              </span>
              <span style={{ color: 'var(--ds-cyan)', fontWeight: 600, fontSize: '1rem' }}>
                DATA SCIENCE
              </span>
            </div>
            <p style={{ lineHeight: 1.6, color: '#a8a8a8', fontSize: '0.875rem', margin: '0 0 1.25rem 0' }}>
              A high-craft interactive learning laboratory built for 2nd-year engineering students. Bridging mathematical models and real-world Python code.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {courseConfig.tools.map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontFamily: 'var(--ds-font-mono)',
                    fontSize: '0.6875rem',
                    padding: '2px 6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--ds-border-subtle)',
                    borderRadius: '2px',
                    color: '#c6c6c6',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* 5 Course Modules */}
          <div>
            <div
              style={{
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.75rem',
                color: 'var(--ds-cyan)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1rem',
              }}
            >
              Curriculum (5 Modules)
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {courseConfig.modules.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/modules/${m.id}`}
                    style={{
                      color: m.status === 'locked' ? '#6f6f6f' : '#c6c6c6',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem' }}>0{m.moduleNumber}</span>
                    <span>{m.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem Tools */}
          <div>
            <div
              style={{
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.75rem',
                color: 'var(--ds-cyan)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1rem',
              }}
            >
              Ecosystem
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <li>
                <a href="#quick-access" style={{ color: '#c6c6c6' }}>
                  Question Bank <Tag size="sm" type="cool-gray">Soon</Tag>
                </a>
              </li>
              <li>
                <a href="#quick-access" style={{ color: '#c6c6c6' }}>
                  Quiz Arena <Tag size="sm" type="cool-gray">Soon</Tag>
                </a>
              </li>
              <li>
                <a href="#quick-access" style={{ color: '#c6c6c6' }}>
                  Ask DI Assistant <Tag size="sm" type="cyan">Preview</Tag>
                </a>
              </li>
              <li>
                <a href="#quick-access" style={{ color: '#c6c6c6' }}>
                  Real-World Tasks <Tag size="sm" type="cool-gray">Soon</Tag>
                </a>
              </li>
            </ul>
          </div>

          {/* Design System & Engineering */}
          <div>
            <div
              style={{
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.75rem',
                color: 'var(--ds-cyan)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1rem',
              }}
            >
              Standard & Quality
            </div>
            <p style={{ color: '#a8a8a8', lineHeight: 1.5, margin: '0 0 1rem 0', fontSize: '0.8125rem' }}>
              Built strictly in accordance with IBM Carbon Design System v11, Framer Motion, and Next.js App Router.
            </p>
            <div style={{ color: '#6f6f6f', fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)' }}>
              Engineered with Google Antigravity & Gemini 3.7
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--ds-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.75rem',
            color: '#6f6f6f',
          }}
        >
          <div>
            © {new Date().getFullYear()} DI Notes — Introduction to Data Science (DS-201). All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Explore → Experiment → Analyze → Build</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
