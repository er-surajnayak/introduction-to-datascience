'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Education,
  CheckmarkFilled,
  WarningAlt,
  Help,
  Information,
  ArrowRight,
  Restart,
} from '@carbon/icons-react';

interface CaseRow {
  student: string;
  marks: number | null;
  attendance: number | null;
  studyHours: number | null;
}

const initialCaseData: CaseRow[] = [
  { student: 'Rahul', marks: 85, attendance: 92, studyHours: 4 },
  { student: 'Priya', marks: null, attendance: 88, studyHours: 5 },
  { student: 'Aman', marks: 76, attendance: null, studyHours: 3 },
  { student: 'Sneha', marks: 91, attendance: 95, studyHours: null },
  { student: 'Ravi', marks: null, attendance: 79, studyHours: 6 },
];

export function StudentPerformanceCaseStudy() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [marksStrategy, setMarksStrategy] = useState<'mean' | 'zero' | 'drop' | null>(null);
  const [attendanceStrategy, setAttendanceStrategy] = useState<'median' | 'zero' | null>(null);
  const [studyHoursStrategy, setStudyHoursStrategy] = useState<'mean' | 'max' | null>(null);

  const isCompleted = currentStep === 5;

  const handleReset = () => {
    setCurrentStep(1);
    setMarksStrategy(null);
    setAttendanceStrategy(null);
    setStudyHoursStrategy(null);
  };

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
          <Tag type="cyan" size="md">
            Interactive 09
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Guided Case Study
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
            Stage {currentStep} of 5
          </span>
          <Button kind="ghost" size="sm" renderIcon={Restart} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Case Study: Diagnosing & Cleaning the Student Performance Matrix
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Walk step-by-step through an authentic data cleaning workflow. Inspect the raw 5-student cohort table and select the most defensible treatment strategies for each feature.
      </p>

      {/* Dataset Grid */}
      <div
        style={{
          padding: '1rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)' }}>
          <thead>
            <tr style={{ background: 'var(--ds-bg-core)', borderBottom: '2px solid var(--ds-border-strong)' }}>
              <th style={{ padding: '8px 12px', color: 'var(--ds-text-primary)' }}>Student</th>
              <th style={{ padding: '8px 12px', color: 'var(--ds-cyan)' }}>Marks (0-100)</th>
              <th style={{ padding: '8px 12px', color: 'var(--ds-teal)' }}>Attendance (%)</th>
              <th style={{ padding: '8px 12px', color: 'var(--ds-purple)' }}>StudyHours (hrs/day)</th>
            </tr>
          </thead>
          <tbody>
            {initialCaseData.map((row, idx) => {
              const displayMarks =
                marksStrategy === 'mean' && row.marks === null
                  ? '84.0 (Mean)'
                  : marksStrategy === 'zero' && row.marks === null
                  ? '0.0 (Bug!)'
                  : row.marks === null
                  ? 'NaN'
                  : `${row.marks}`;

              const displayAttendance =
                attendanceStrategy === 'median' && row.attendance === null
                  ? '84.5% (Med)'
                  : attendanceStrategy === 'zero' && row.attendance === null
                  ? '0% (Bug!)'
                  : row.attendance === null
                  ? 'NaN'
                  : `${row.attendance}%`;

              const displayHours =
                studyHoursStrategy === 'mean' && row.studyHours === null
                  ? '4.5 hrs (Mean)'
                  : row.studyHours === null
                  ? 'NaN'
                  : `${row.studyHours} hrs`;

              return (
                <tr key={idx} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                  <td style={{ padding: '8px 12px', color: 'var(--ds-text-primary)', fontWeight: 600 }}>{row.student}</td>
                  <td style={{ padding: '8px 12px', color: row.marks === null ? (marksStrategy ? 'var(--ds-emerald)' : '#da1e28') : 'var(--ds-text-primary)' }}>
                    {displayMarks}
                  </td>
                  <td style={{ padding: '8px 12px', color: row.attendance === null ? (attendanceStrategy ? 'var(--ds-emerald)' : '#da1e28') : 'var(--ds-text-primary)' }}>
                    {displayAttendance}
                  </td>
                  <td style={{ padding: '8px 12px', color: row.studyHours === null ? (studyHoursStrategy ? 'var(--ds-emerald)' : '#da1e28') : 'var(--ds-text-primary)' }}>
                    {displayHours}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Step by step interactive panels */}
      {currentStep === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            Step 1: Diagnose Missingness Rates & Evaluate `dropna()`
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
            • Marks: 2 missing (40%) • Attendance: 1 missing (20%) • StudyHours: 1 missing (20%)<br />
            <strong>Question:</strong> What happens if you execute <code>df.dropna()</code> right now?
          </p>
          <div
            style={{
              padding: '10px 14px',
              background: 'rgba(218, 30, 40, 0.1)',
              border: '1px solid #da1e28',
              borderRadius: '4px',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-primary)',
              marginBottom: '1rem',
            }}
          >
            ⚠️ <strong>Catastrophic Loss:</strong> Only <strong>Rahul</strong> has complete observations across all columns. Running <code>df.dropna()</code> will discard 4 out of 5 students (80% data loss!). Dropping rows is entirely unacceptable here.
          </div>
          <Button size="md" kind="primary" renderIcon={ArrowRight} onClick={() => setCurrentStep(2)}>
            Proceed to Impute Marks
          </Button>
        </motion.div>
      )}

      {currentStep === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            Step 2: Choose Strategy for `Marks` Column
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '12px' }}>
            Observed Marks: Rahul (85), Aman (76), Sneha (91). Mean = 84.0, Median = 85.0.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <Button
              size="md"
              kind={marksStrategy === 'mean' ? 'primary' : 'secondary'}
              onClick={() => setMarksStrategy('mean')}
            >
              Fill with Mean (84.0)
            </Button>
            <Button
              size="md"
              kind={marksStrategy === 'zero' ? 'danger' : 'secondary'}
              onClick={() => setMarksStrategy('zero')}
            >
              Fill with 0 (Zero)
            </Button>
          </div>
          {marksStrategy === 'mean' && (
            <Button size="md" kind="primary" renderIcon={ArrowRight} onClick={() => setCurrentStep(3)}>
              Confirm & Move to Attendance
            </Button>
          )}
        </motion.div>
      )}

      {currentStep === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            Step 3: Choose Strategy for `Attendance` Column
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '12px' }}>
            Observed Attendance: Rahul (92%), Priya (88%), Sneha (95%), Ravi (79%). Median = 84.5%.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <Button
              size="md"
              kind={attendanceStrategy === 'median' ? 'primary' : 'secondary'}
              onClick={() => setAttendanceStrategy('median')}
            >
              Fill with Median (84.5%)
            </Button>
            <Button
              size="md"
              kind={attendanceStrategy === 'zero' ? 'danger' : 'secondary'}
              onClick={() => setAttendanceStrategy('zero')}
            >
              Fill with 0%
            </Button>
          </div>
          {attendanceStrategy === 'median' && (
            <Button size="md" kind="primary" renderIcon={ArrowRight} onClick={() => setCurrentStep(4)}>
              Confirm & Move to StudyHours
            </Button>
          )}
        </motion.div>
      )}

      {currentStep === 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            Step 4: Choose Strategy for `StudyHours` Column
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginBottom: '12px' }}>
            Observed Hours: Rahul (4), Priya (5), Aman (3), Ravi (6). Mean = 4.5 hrs.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <Button
              size="md"
              kind={studyHoursStrategy === 'mean' ? 'primary' : 'secondary'}
              onClick={() => setStudyHoursStrategy('mean')}
            >
              Fill with Cohort Mean (4.5 hrs)
            </Button>
          </div>
          {studyHoursStrategy === 'mean' && (
            <Button size="md" kind="primary" renderIcon={ArrowRight} onClick={() => setCurrentStep(5)}>
              Validate Complete Clean Dataset
            </Button>
          )}
        </motion.div>
      )}

      {currentStep === 5 && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
          <div
            style={{
              padding: '1.25rem',
              background: 'var(--ds-emerald-dim)',
              border: '1px solid var(--ds-emerald)',
              borderRadius: '4px',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <CheckmarkFilled size={20} style={{ color: 'var(--ds-emerald)' }} />
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                Case Study Validation Complete: 100% Data Integrity Preserved!
              </span>
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-primary)', lineHeight: 1.5 }}>
              • Remaining NaNs: 0<br />
              • Retained Rows: 5/5 (100% of student cohort preserved vs 20% under dropna)<br />
              • Realistic boundaries maintained across all academic dimensions.
            </div>
          </div>
          <Button kind="secondary" renderIcon={Restart} onClick={handleReset}>
            Replay Case Study
          </Button>
        </motion.div>
      )}
    </div>
  );
}
