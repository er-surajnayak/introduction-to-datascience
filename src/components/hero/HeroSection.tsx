'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, Tag } from '@carbon/react';
import {
  ArrowRight,
  Catalog,
  Analytics,
  DataStructured,
  Chemistry,
  Code,
} from '@carbon/icons-react';
import { DataStreamCanvas } from './DataStreamCanvas';

export function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '4.5rem',
        paddingBottom: '3.5rem',
        overflow: 'hidden',
        borderBottom: '1px solid var(--ds-border-subtle)',
      }}
      className="ds-grid-pattern"
    >
      {/* Background Data Stream Canvas */}
      <DataStreamCanvas />

      {/* Radial Gradient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(90vw, 650px)',
          height: '380px',
          background: 'var(--ds-hero-radial)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="ds-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          {/* Top Academic Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: 'var(--ds-bg-surface)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '999px',
              marginBottom: '1.5rem',
              fontSize: '0.75rem',
              color: 'var(--ds-text-secondary)',
              boxShadow: 'var(--ds-card-shadow)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--ds-font-mono)',
                fontWeight: 600,
                color: 'var(--ds-cyan)',
                background: 'var(--ds-cyan-dim)',
                padding: '2px 6px',
                borderRadius: '999px',
                fontSize: '0.6875rem',
              }}
            >
              DS-201
            </span>
            <span style={{ fontWeight: 500, color: 'var(--ds-text-primary)' }}>
              2nd Year Engineering
            </span>
            <span style={{ color: 'var(--ds-text-muted)' }}>•</span>
            <span style={{ color: 'var(--ds-text-secondary)' }}>
              Interactive Digital Notes
            </span>
            <span style={{ color: 'var(--ds-text-muted)' }}>•</span>
            <span
              style={{
                color: 'var(--ds-cyan)',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              by NayakLabs
            </span>
          </div>

          {/* Primary Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.125rem, 5.5vw, 4.25rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              margin: '0 0 1.25rem 0',
              color: 'var(--ds-text-primary)',
            }}
          >
            Introduction to <br />
            <span
              style={{
                background: 'var(--ds-hero-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Data Science
            </span>
          </h1>

          {/* Methodology Progression Strip */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: 'var(--ds-bg-surface)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
              marginBottom: '1.5rem',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.75rem',
              color: 'var(--ds-text-secondary)',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ color: 'var(--ds-cyan)', fontWeight: 600 }}>Explore</span>
            <span style={{ color: 'var(--ds-text-muted)' }}>→</span>
            <span style={{ color: 'var(--ds-teal)', fontWeight: 600 }}>Experiment</span>
            <span style={{ color: 'var(--ds-text-muted)' }}>→</span>
            <span style={{ color: 'var(--ds-purple)', fontWeight: 600 }}>Analyze</span>
            <span style={{ color: 'var(--ds-text-muted)' }}>→</span>
            <span style={{ color: 'var(--ds-blue)', fontWeight: 600 }}>Model</span>
            <span style={{ color: 'var(--ds-text-muted)' }}>→</span>
            <span style={{ color: 'var(--ds-emerald)', fontWeight: 600 }}>Decide</span>
          </div>

          {/* Philosophy Subtitle */}
          <p
            style={{
              fontSize: 'clamp(0.9375rem, 1.8vw, 1.1875rem)',
              lineHeight: 1.6,
              color: 'var(--ds-text-secondary)',
              maxWidth: '720px',
              margin: '0 auto 2rem auto',
            }}
          >
            A hands-on computational laboratory. Transform raw telemetry into clean datasets, statistical distributions, time trends, and predictive models.
          </p>

          {/* CTA Buttons */}
          <div className="ds-cta-group" style={{ marginBottom: '3rem' }}>
            <Link href="/modules/module-1" passHref legacyBehavior>
              <Button
                renderIcon={ArrowRight}
                size="lg"
                kind="primary"
                style={{
                  backgroundColor: '#0f62fe',
                  minWidth: '200px',
                }}
              >
                Start Module 1
              </Button>
            </Link>

            <a href="#modules">
              <Button
                renderIcon={Catalog}
                size="lg"
                kind="tertiary"
                style={{
                  borderColor: 'var(--ds-border-strong)',
                  color: 'var(--ds-text-primary)',
                  minWidth: '180px',
                }}
              >
                Explore Syllabus
              </Button>
            </a>
          </div>

          {/* 4 Feature Highlights Grid */}
          <div className="ds-responsive-feature-grid" style={{ textAlign: 'left' }}>
            <div
              className="ds-glass-panel"
              style={{
                padding: '1rem 1.125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '4px',
              }}
            >
              <div
                style={{
                  padding: '8px',
                  background: 'var(--ds-cyan-dim)',
                  color: 'var(--ds-cyan)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <DataStructured size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)', fontSize: '0.875rem' }}>
                  Interactive Notes
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', lineHeight: 1.3 }}>
                  Live visual computational tools
                </div>
              </div>
            </div>

            <div
              className="ds-glass-panel"
              style={{
                padding: '1rem 1.125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '4px',
              }}
            >
              <div
                style={{
                  padding: '8px',
                  background: 'var(--ds-teal-dim)',
                  color: 'var(--ds-teal)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Code size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)', fontSize: '0.875rem' }}>
                  Executable Python
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', lineHeight: 1.3 }}>
                  Production NumPy & Pandas snippets
                </div>
              </div>
            </div>

            <div
              className="ds-glass-panel"
              style={{
                padding: '1rem 1.125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '4px',
              }}
            >
              <div
                style={{
                  padding: '8px',
                  background: 'var(--ds-purple-dim)',
                  color: 'var(--ds-purple)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Analytics size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)', fontSize: '0.875rem' }}>
                  5 Core Modules
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', lineHeight: 1.3 }}>
                  Complete university syllabus
                </div>
              </div>
            </div>

            <div
              className="ds-glass-panel"
              style={{
                padding: '1rem 1.125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '4px',
              }}
            >
              <div
                style={{
                  padding: '8px',
                  background: 'var(--ds-emerald-dim)',
                  color: 'var(--ds-emerald)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Chemistry size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--ds-text-primary)', fontSize: '0.875rem' }}>
                  Lab & Intuition
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)', lineHeight: 1.3 }}>
                  Mathematical rigor made intuitive
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
