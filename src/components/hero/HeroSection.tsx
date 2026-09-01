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
        minHeight: '82vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '5rem',
        paddingBottom: '4rem',
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
          width: '650px',
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
              gap: '8px',
              padding: '4px 14px',
              background: 'var(--ds-bg-surface)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '999px',
              marginBottom: '1.75rem',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-secondary)',
              boxShadow: 'var(--ds-card-shadow)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--ds-font-mono)',
                fontWeight: 600,
                color: 'var(--ds-cyan)',
                background: 'var(--ds-cyan-dim)',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '0.75rem',
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
          </div>

          {/* Primary Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
              fontWeight: 700,
              lineHeight: 1.12,
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
              gap: '10px',
              padding: '6px 16px',
              background: 'var(--ds-bg-surface)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
              marginBottom: '1.5rem',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.8125rem',
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
              fontSize: 'clamp(1rem, 1.8vw, 1.1875rem)',
              lineHeight: 1.6,
              color: 'var(--ds-text-secondary)',
              maxWidth: '720px',
              margin: '0 auto 2.25rem auto',
            }}
          >
            A hands-on computational laboratory. Transform raw telemetry into clean datasets, statistical distributions, time trends, and predictive models.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '3.5rem',
            }}
          >
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              textAlign: 'left',
            }}
          >
            <div
              className="ds-glass-panel"
              style={{
                padding: '1.125rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '4px',
              }}
            >
              <DataStructured size={24} style={{ color: 'var(--ds-cyan)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>
                  Curriculum
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--ds-text-primary)' }}>
                  5 Core Modules
                </div>
              </div>
            </div>

            <div
              className="ds-glass-panel"
              style={{
                padding: '1.125rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '4px',
              }}
            >
              <Code size={24} style={{ color: 'var(--ds-teal)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>
                  Hands-On
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--ds-text-primary)' }}>
                  Python & NumPy
                </div>
              </div>
            </div>

            <div
              className="ds-glass-panel"
              style={{
                padding: '1.125rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '4px',
              }}
            >
              <Analytics size={24} style={{ color: 'var(--ds-purple)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>
                  Progression
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--ds-text-primary)' }}>
                  Data-Driven Unlocking
                </div>
              </div>
            </div>

            <div
              className="ds-glass-panel"
              style={{
                padding: '1.125rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '4px',
              }}
            >
              <Chemistry size={24} style={{ color: 'var(--ds-amber)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>
                  Experience
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--ds-text-primary)' }}>
                  Zero Fluff Laboratory
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
