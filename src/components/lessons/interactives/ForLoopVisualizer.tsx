'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  PlayFilledAlt,
  PauseFilled,
  ArrowRight,
  Restart,
  Code,
} from '@carbon/icons-react';

const loopData = [78, 85, 91, 64];

export function ForLoopVisualizer() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [outputLogs, setOutputLogs] = useState<string[]>(['Processed: 78']);

  const totalSteps = loopData.length;
  const isFinished = currentIndex >= totalSteps - 1;

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentIndex < totalSteps - 1) {
      timer = setTimeout(() => {
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        setOutputLogs((prev) => [...prev, `Processed: ${loopData[nextIdx]}`]);
      }, 1200);
    } else if (isPlaying && currentIndex >= totalSteps - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, totalSteps]);

  const handleStepForward = () => {
    if (currentIndex < totalSteps - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setOutputLogs((prev) => [...prev, `Processed: ${loopData[nextIdx]}`]);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setOutputLogs([`Processed: ${loopData[0]}`]);
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2.5rem 0',
        border: '1px solid var(--ds-border-strong)',
      }}
    >
      {/* Top Header */}
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
        <div>
          <span
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.75rem',
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
            }}
          >
            Interactive Experience 4
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            For Loop Visualizer: "Loop Through the Data"
          </h3>
        </div>
        <Tag type="blue" size="md">
          Iterator Engine
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        A <code>for</code> loop pulls one item at a time from an iterable collection and executes the loop body for that element. Step through or play the loop below:
      </p>

      {/* Dataset Array Visualizer */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
          DATASET: <code>marks = [78, 85, 91, 64]</code>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {loopData.map((val, idx) => {
            const isCurrent = idx === currentIndex;
            const isDone = idx < currentIndex;
            return (
              <motion.div
                key={idx}
                animate={{
                  scale: isCurrent ? 1.08 : 1,
                  y: isCurrent ? -4 : 0,
                }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: '12px 20px',
                  background: isCurrent ? 'var(--ds-cyan-dim)' : isDone ? 'var(--ds-bg-surface)' : 'var(--ds-bg-surface-elevated)',
                  border: isCurrent ? '2px solid var(--ds-cyan)' : isDone ? '1px solid var(--ds-border-strong)' : '1px solid var(--ds-border-subtle)',
                  borderRadius: '4px',
                  textAlign: 'center',
                  minWidth: '70px',
                }}
              >
                <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: isCurrent ? 'var(--ds-cyan)' : 'var(--ds-text-muted)' }}>
                  [{idx}]
                </div>
                <div
                  style={{
                    fontFamily: 'var(--ds-font-mono)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: isCurrent ? 'var(--ds-cyan)' : isDone ? 'var(--ds-text-muted)' : 'var(--ds-text-primary)',
                  }}
                >
                  {val}
                </div>
                <div style={{ fontSize: '0.625rem', fontFamily: 'var(--ds-font-mono)', color: isCurrent ? 'var(--ds-cyan)' : 'transparent', marginTop: '2px' }}>
                  ACTIVE
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2-Column Code Line Highlight vs Console Output */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Code Block with line highlight */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface-elevated)',
            border: '1px solid var(--ds-border-subtle)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
          }}
        >
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
            EXECUTING PYTHON CODE
          </div>
          <div
            style={{
              padding: '6px 10px',
              background: 'var(--ds-cyan-dim)',
              borderLeft: '3px solid var(--ds-cyan)',
              marginBottom: '4px',
              color: 'var(--ds-cyan)',
              fontWeight: 600,
            }}
          >
            for mark in marks: <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}># mark = {loopData[currentIndex]}</span>
          </div>
          <div
            style={{
              padding: '6px 10px',
              background: 'var(--ds-bg-surface)',
              borderLeft: '3px solid var(--ds-teal)',
              color: 'var(--ds-text-primary)',
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;print(f"Processed: &#123;mark&#125;")
          </div>
        </div>

        {/* Console Terminal Output */}
        <div
          style={{
            padding: '1.25rem',
            background: 'var(--ds-bg-surface)',
            border: '1px solid var(--ds-border-strong)',
            borderRadius: '4px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.8125rem',
            minHeight: '120px',
          }}
        >
          <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
            TERMINAL STDOUT OUTPUT
          </div>
          {outputLogs.map((log, i) => (
            <div key={i} style={{ color: 'var(--ds-emerald)', marginBottom: '4px' }}>
              &gt; {log}
            </div>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          size="md"
          kind={isPlaying ? 'secondary' : 'primary'}
          renderIcon={isPlaying ? PauseFilled : PlayFilledAlt}
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={isFinished && !isPlaying}
        >
          {isPlaying ? 'Pause' : isFinished ? 'Finished' : 'Auto Play'}
        </Button>

        <Button
          size="md"
          kind="tertiary"
          renderIcon={ArrowRight}
          onClick={handleStepForward}
          disabled={isFinished || isPlaying}
          style={{ borderColor: 'var(--ds-border-strong)', color: 'var(--ds-text-primary)' }}
        >
          Step Next Item ({currentIndex + 1}/{totalSteps})
        </Button>

        <Button
          size="md"
          kind="ghost"
          renderIcon={Restart}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
