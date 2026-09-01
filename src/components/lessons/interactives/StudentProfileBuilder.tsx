'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  User,
  CheckmarkOutline,
  Restart,
  TableSplit,
  ArrowRight,
  Code,
} from '@carbon/icons-react';

export function StudentProfileBuilder() {
  const [name, setName] = useState('Aisha');
  const [age, setAge] = useState(20);
  const [cgpa, setCgpa] = useState(8.7);
  const [rawAttendance, setRawAttendance] = useState('"92"');
  const [isPlaced, setIsPlaced] = useState(false);
  const [isCasted, setIsCasted] = useState(false);
  const [isReassigned, setIsReassigned] = useState(false);
  const [showDataFrame, setShowDataFrame] = useState(false);

  const attendanceValue = isCasted ? 92 : '"92"';
  const attendanceType = isCasted ? 'int' : 'str';
  const currentAge = isReassigned ? 21 : 20;

  const handleCastAttendance = () => {
    setIsCasted(true);
  };

  const handleReassignAge = () => {
    setIsReassigned(true);
  };

  const handleReset = () => {
    setIsCasted(false);
    setIsReassigned(false);
    setShowDataFrame(false);
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
            Topic 1.3 Mini Challenge
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Build a Student Profile & Dataset Bridge
          </h3>
        </div>
        <Tag type="purple" size="md">
          Hands-on Challenge
        </Tag>
      </div>

      <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Assemble a complete student profile in Python memory, test dynamic reassignment, clean text strings into numeric types, and bridge your variables into a real Data Science DataFrame:
      </p>

      {/* 5 Variable Attribute Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px',
          marginBottom: '1.5rem',
        }}
      >
        {/* Name */}
        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>VARIABLE</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-cyan)', fontSize: '0.9375rem' }}>name</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '4px 0' }}>"{name}"</div>
          <Tag type="purple" size="sm">str</Tag>
        </div>

        {/* Age */}
        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', border: isReassigned ? '1.5px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>VARIABLE</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-cyan)', fontSize: '0.9375rem' }}>age</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '4px 0' }}>{currentAge}</div>
          <Tag type="blue" size="sm">int</Tag>
        </div>

        {/* CGPA */}
        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>VARIABLE</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-cyan)', fontSize: '0.9375rem' }}>cgpa</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '4px 0' }}>{cgpa}</div>
          <Tag type="teal" size="sm">float</Tag>
        </div>

        {/* Attendance */}
        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', border: isCasted ? '1.5px solid var(--ds-emerald)' : '1.5px solid #da1e28', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>VARIABLE</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-cyan)', fontSize: '0.9375rem' }}>attendance_pct</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600, color: isCasted ? 'var(--ds-emerald)' : '#da1e28', margin: '4px 0' }}>{attendanceValue}</div>
          <Tag type={isCasted ? 'green' : 'red'} size="sm">{attendanceType}</Tag>
        </div>

        {/* Placed */}
        <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', border: '1px solid var(--ds-border-subtle)', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>VARIABLE</div>
          <div style={{ fontFamily: 'var(--ds-font-mono)', fontWeight: 700, color: 'var(--ds-cyan)', fontSize: '0.9375rem' }}>is_placed</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '4px 0' }}>{String(isPlaced)}</div>
          <Tag type="green" size="sm">bool</Tag>
        </div>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {!isCasted ? (
          <Button
            size="md"
            kind="primary"
            renderIcon={Code}
            onClick={handleCastAttendance}
          >
            Cast Attendance to int()
          </Button>
        ) : (
          <Button
            size="md"
            kind="secondary"
            disabled={isReassigned}
            onClick={handleReassignAge}
          >
            Reassign Age: age = age + 1
          </Button>
        )}

        {isCasted && (
          <Button
            size="md"
            kind="tertiary"
            renderIcon={TableSplit}
            onClick={() => setShowDataFrame(true)}
            style={{ borderColor: 'var(--ds-border-strong)', color: 'var(--ds-text-primary)' }}
          >
            Convert Profile into Pandas DataFrame
          </Button>
        )}

        {(isCasted || isReassigned || showDataFrame) && (
          <Button
            size="md"
            kind="ghost"
            renderIcon={Restart}
            onClick={handleReset}
          >
            Reset Profile
          </Button>
        )}
      </div>

      {/* Live Pandas DataFrame Preview */}
      <AnimatePresence>
        {showDataFrame && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              padding: '1.5rem',
              background: 'var(--ds-bg-surface-elevated)',
              border: '1.5px solid var(--ds-cyan)',
              borderRadius: '4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TableSplit size={20} style={{ color: 'var(--ds-cyan)' }} />
                <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
                  Live Pandas DataFrame: <code>student_df</code>
                </h4>
              </div>
              <Tag type="green" size="md">
                1 Row × 5 Typed Columns
              </Tag>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1rem', lineHeight: 1.45 }}>
              Notice how each individual variable becomes a typed column with its own Series datatype (<code>object/str</code>, <code>int64</code>, <code>float64</code>, <code>bool</code>):
            </p>

            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
                <thead>
                  <tr style={{ background: 'var(--ds-bg-surface)', borderBottom: '1px solid var(--ds-border-strong)' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-muted)' }}>Index</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-cyan)' }}>name (str)</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-blue)' }}>age (int)</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-teal)' }}>cgpa (float)</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-emerald)' }}>attendance (int)</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-purple)' }}>is_placed (bool)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: 'var(--ds-bg-surface-elevated)', borderBottom: '1px solid var(--ds-border-subtle)' }}>
                    <td style={{ padding: '8px 12px', color: 'var(--ds-text-muted)' }}>0</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ds-text-primary)' }}>Aisha</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ds-text-primary)' }}>{currentAge}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ds-text-primary)' }}>{cgpa}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ds-text-primary)' }}>{attendanceValue}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ds-text-primary)' }}>{String(isPlaced)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              style={{
                padding: '8px 12px',
                background: 'var(--ds-bg-surface)',
                borderLeft: '3px solid var(--ds-emerald)',
                borderRadius: '0 3px 3px 0',
                fontSize: '0.8125rem',
                color: 'var(--ds-text-secondary)',
              }}
            >
              <strong>Data Science Takeaway:</strong> When we load a 1,000,000-row CSV in Module 2, each column is simply a high-speed vectorized container for scalar variables of these exact types!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
