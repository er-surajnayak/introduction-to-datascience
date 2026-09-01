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
        minHeight: '84vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
        borderBottom: '1px solid var(--ds-border-subtle)',
      }}
      className="ds-grid-pattern"
    >
      {/* Background Data Stream Canvas */}
      <DataStreamCanvas />

      {/* Radial Gradient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(0, 210, 255, 0.12) 0%, rgba(15, 98, 254, 0.06) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="ds-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ maxWidth: '940px', margin: '0 auto' }}
        >
          {/* Top Carbon Tags */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '1.5rem',
            }}
          >
            <Tag type="cyan" size="md">
              <span style={{ fontWeight: 600 }}>DS-201</span> • 2nd Year Engineering
            </Tag>
            <Tag type="purple" size="md">
              Interactive Digital Notes
            </Tag>
            <Tag type="teal" size="md">
              IBM Carbon Standard
            </Tag>
          </div>

          {/* Primary Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: '0 0 1.25rem 0',
              color: '#ffffff',
            }}
          >
            Introduction to <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #00d2ff 0%, #0f62fe 50%, #8a3ffc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Data Science
            </span>
          </h1>

          {/* Method Paradigm */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '6px 18px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '999px',
              marginBottom: '1.5rem',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.875rem',
              color: 'var(--ds-cyan)',
              flexWrap: 'wrap',
            }}
          >
            <span>Explore</span>
            <span style={{ color: '#525252' }}>→</span>
            <span>Experiment</span>
            <span style={{ color: '#525252' }}>→</span>
            <span>Analyze</span>
            <span style={{ color: '#525252' }}>→</span>
            <span style={{ color: '#8a3ffc' }}>Build</span>
          </div>

          {/* Core Philosophy Message */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
              color: '#c6c6c6',
              maxWidth: '780px',
              margin: '0 auto 2.5rem auto',
              fontWeight: 300,
            }}
          >
            A hands-on computational laboratory. Transform raw telemetry and unstructured numbers into clean datasets, statistical distributions, time trends, and predictive linear models.
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
                  minWidth: '220px',
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
                  color: '#f4f4f4',
                  minWidth: '180px',
                }}
              >
                Explore Syllabus
              </Button>
            </a>
          </div>

          {/* Value Highlight Badges */}
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
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '4px',
              }}
            >
              <DataStructured size={24} style={{ color: 'var(--ds-cyan)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.8125rem', color: '#8d8d8d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Curriculum
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#f4f4f4' }}>
                  5 Core Modules
                </div>
              </div>
            </div>

            <div
              className="ds-glass-panel"
              style={{
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '4px',
              }}
            >
              <Code size={24} style={{ color: 'var(--ds-teal)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.8125rem', color: '#8d8d8d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Hands-On
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#f4f4f4' }}>
                  Python & NumPy
                </div>
              </div>
            </div>

            <div
              className="ds-glass-panel"
              style={{
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '4px',
              }}
            >
              <Analytics size={24} style={{ color: 'var(--ds-purple)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.8125rem', color: '#8d8d8d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Progression
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#f4f4f4' }}>
                  Data-Driven Unlocking
                </div>
              </div>
            </div>

            <div
              className="ds-glass-panel"
              style={{
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '4px',
              }}
            >
              <Chemistry size={24} style={{ color: 'var(--ds-amber)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.8125rem', color: '#8d8d8d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Experience
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#f4f4f4' }}>
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
