'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tag,
  Button,
  InlineNotification,
  TextInput,
  Accordion,
  AccordionItem,
} from '@carbon/react';
import {
  Trophy,
  CheckmarkFilled,
  Idea,
  Analytics,
  ArrowRight,
  Help,
  Restart,
  Code,
  CheckmarkOutline,
  CloseOutline,
  View,
} from '@carbon/icons-react';
import { useCourseProgress } from '@/context/CourseProgressContext';

const datasetMarks = [78, 85, 92, 67, 74, 88, 95, 61, 83, 79];

export function Module1FinalChallenge() {
  const { completeTopic } = useCourseProgress();

  // Active mission state (1 to 7, or 'report')
  const [currentMission, setCurrentMission] = useState<number>(1);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  // Mission Answers & Interaction State
  // Mission 1: Object type & library
  const [m1Type, setM1Type] = useState<string | null>(null);
  const [m1Lib, setM1Lib] = useState<string | null>(null);
  const [m1Feedback, setM1Feedback] = useState<string | null>(null);

  // Mission 2: Size & shape
  const [m2Size, setM2Size] = useState<string>('');
  const [m2Shape, setM2Shape] = useState<string | null>(null);
  const [m2Feedback, setM2Feedback] = useState<string | null>(null);

  // Mission 3: Average
  const [m3Avg, setM3Avg] = useState<string>('');
  const [m3Meaning, setM3Meaning] = useState<string | null>(null);
  const [m3Feedback, setM3Feedback] = useState<string | null>(null);

  // Mission 4: Highest & Lowest
  const [m4High, setM4High] = useState<string>('');
  const [m4Low, setM4Low] = useState<string>('');
  const [m4Feedback, setM4Feedback] = useState<string | null>(null);

  // Mission 5: Standard Deviation
  const [m5Std, setM5Std] = useState<string>('');
  const [m5Feedback, setM5Feedback] = useState<string | null>(null);

  // Mission 6: Above Average
  const [m6Above, setM6Above] = useState<string>('');
  const [m6Feedback, setM6Feedback] = useState<string | null>(null);

  // Mission 7: Open-ended thinking question
  const [m7QuestionText, setM7QuestionText] = useState<string>('');
  const [m7SelectedInspiration, setM7SelectedInspiration] = useState<string | null>(null);
  const [m7Submitted, setM7Submitted] = useState<boolean>(false);

  // Hint expansion state per mission
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});

  // Challenge Completion & Solution Mode
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showFullCodeWalkthrough, setShowFullCodeWalkthrough] = useState<boolean>(false);

  const toggleHint = (missionNum: number) => {
    setShowHint((prev) => ({ ...prev, [missionNum]: !prev[missionNum] }));
  };

  const markMissionDone = (missionNum: number) => {
    if (!completedMissions.includes(missionNum)) {
      setCompletedMissions((prev) => [...prev, missionNum]);
    }
  };

  // Handlers for Mission Validations
  const handleVerifyMission1 = () => {
    if (m1Type === 'numpy' && m1Lib === 'numpy') {
      setM1Feedback('success');
      markMissionDone(1);
    } else {
      setM1Feedback('error');
    }
  };

  const handleVerifyMission2 = () => {
    if (m2Size.trim() === '10' && m2Shape === '(10,)') {
      setM2Feedback('success');
      markMissionDone(2);
    } else {
      setM2Feedback('error');
    }
  };

  const handleVerifyMission3 = () => {
    const val = parseFloat(m3Avg.trim());
    if (Math.abs(val - 80.2) < 0.05 && m3Meaning === 'summary') {
      setM3Feedback('success');
      markMissionDone(3);
    } else {
      setM3Feedback('error');
    }
  };

  const handleVerifyMission4 = () => {
    if (m4High.trim() === '95' && m4Low.trim() === '61') {
      setM4Feedback('success');
      markMissionDone(4);
    } else {
      setM4Feedback('error');
    }
  };

  const handleVerifyMission5 = () => {
    const val = parseFloat(m5Std.trim());
    if (!isNaN(val) && (Math.abs(val - 10.08) < 0.2 || Math.abs(val - 10.19) < 0.2)) {
      setM5Feedback('success');
      markMissionDone(5);
    } else {
      setM5Feedback('error');
    }
  };

  const handleVerifyMission6 = () => {
    if (m6Above.trim() === '5') {
      setM6Feedback('success');
      markMissionDone(6);
    } else {
      setM6Feedback('error');
    }
  };

  const handleVerifyMission7 = () => {
    if (m7QuestionText.trim().length > 0 || m7SelectedInspiration) {
      setM7Submitted(true);
      markMissionDone(7);
      completeTopic('module-1', 'm1-t7');
      setIsCompleted(true);
    }
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2.5rem',
        borderRadius: '4px',
        margin: '3rem 0',
        border: '2px solid var(--ds-cyan)',
        background: 'linear-gradient(180deg, var(--ds-bg-surface-elevated) 0%, var(--ds-bg-surface) 100%)',
      }}
    >
      {/* Capstone Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            🎯 MODULE 1 CAPSTONE PROJECT
          </span>
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--ds-text-primary)',
              margin: '4px 0 0 0',
            }}
          >
            &ldquo;Analyze a Class&rdquo; — Your First Data Science Mini-Project
          </h2>
        </div>
        <Tag type="cyan" size="lg">
          Module 1 Finale
        </Tag>
      </div>

      {/* Narrative Scenario Box */}
      <div
        style={{
          padding: '1.25rem 1.5rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--ds-cyan)',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}
      >
        <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-primary)', margin: 0 }}>
          <strong>Scenario:</strong> You&apos;ve joined a Data Science team helping a college understand how a class performed in a recent assessment. You&apos;ve been given the marks of 10 students. Your mission is to inspect the dataset, summarize its distribution, apply logical filters, and formulate insightful analytical questions.
        </p>
        <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)', marginTop: '8px' }}>
          No fancy Machine Learning. No giant dataset. Just you, Python, NumPy, and scientific curiosity.
        </div>
      </div>

      {/* The Central Dataset Array Display */}
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--ds-bg-surface)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
            DATASET (10 OBSERVED STUDENT MARKS):
          </span>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
            marks = np.array([...])
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {datasetMarks.map((val, idx) => {
            const isHighest = val === 95 && (currentMission >= 4 || completedMissions.includes(4));
            const isLowest = val === 61 && (currentMission >= 4 || completedMissions.includes(4));
            const isAboveAvg = val > 80.2 && (currentMission >= 6 || completedMissions.includes(6));

            let borderColor = 'var(--ds-border-subtle)';
            let bgColor = 'var(--ds-bg-surface-elevated)';
            let textColor = 'var(--ds-text-primary)';

            if (isHighest) {
              borderColor = 'var(--ds-emerald)';
              bgColor = 'var(--ds-emerald-dim)';
              textColor = 'var(--ds-emerald)';
            } else if (isLowest) {
              borderColor = 'var(--ds-crimson)';
              bgColor = 'var(--ds-crimson-dim)';
              textColor = 'var(--ds-crimson)';
            } else if (isAboveAvg && currentMission === 6) {
              borderColor = 'var(--ds-cyan)';
              bgColor = 'var(--ds-cyan-dim)';
              textColor = 'var(--ds-cyan)';
            }

            return (
              <div
                key={idx}
                style={{
                  padding: '10px 16px',
                  background: bgColor,
                  border: `1.5px solid ${borderColor}`,
                  borderRadius: '4px',
                  textAlign: 'center',
                  minWidth: '58px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ fontSize: '0.625rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
                  [{idx}]
                </div>
                <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1.25rem', fontWeight: 700, color: textColor }}>
                  {val}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission Navigation Stepper Strip */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          { num: 1, label: '01. Meet Data' },
          { num: 2, label: '02. Class Size' },
          { num: 3, label: '03. Class Average' },
          { num: 4, label: '04. High & Low' },
          { num: 5, label: '05. Spread (Std)' },
          { num: 6, label: '06. Above Avg' },
          { num: 7, label: '07. Think Like DS' },
        ].map((m) => {
          const isDone = completedMissions.includes(m.num);
          const isCurrent = currentMission === m.num;

          return (
            <button
              key={m.num}
              type="button"
              onClick={() => setCurrentMission(m.num)}
              style={{
                padding: '8px 12px',
                background: isCurrent
                  ? 'var(--ds-cyan-dim)'
                  : isDone
                  ? 'var(--ds-emerald-dim)'
                  : 'var(--ds-bg-surface-elevated)',
                border: isCurrent
                  ? '2px solid var(--ds-cyan)'
                  : isDone
                  ? '1px solid var(--ds-emerald)'
                  : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.75rem',
                fontWeight: isCurrent ? 700 : 500,
                color: isCurrent
                  ? 'var(--ds-cyan)'
                  : isDone
                  ? 'var(--ds-emerald)'
                  : 'var(--ds-text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {isDone && <CheckmarkFilled size={12} style={{ color: 'var(--ds-emerald)' }} />}
              {m.label}
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* MISSION CONTENT PANELS */}
      {/* ======================================================== */}

      {/* MISSION 1 */}
      {currentMission === 1 && (
        <div style={{ background: 'var(--ds-bg-core)', padding: '1.5rem', borderRadius: '4px', border: '1px solid var(--ds-border-strong)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
              Mission 01 — Meet the Data Structure
            </h3>
            <Button size="sm" kind="ghost" renderIcon={Help} onClick={() => toggleHint(1)}>
              Hint
            </Button>
          </div>

          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem' }}>
            Before calculating statistics, verify the container type holding your observations:
          </p>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', display: 'block', marginBottom: '8px' }}>
              1. What kind of object is <code>marks</code>?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
              {[
                { id: 'string', label: 'A. Python string' },
                { id: 'numpy', label: 'B. NumPy ndarray' },
                { id: 'function', label: 'C. Python function' },
                { id: 'boolean', label: 'D. Boolean' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setM1Type(opt.id)}
                  style={{
                    padding: '10px 14px',
                    textAlign: 'left',
                    background: m1Type === opt.id ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                    border: m1Type === opt.id ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                    borderRadius: '4px',
                    fontFamily: 'var(--ds-font-mono)',
                    fontSize: '0.875rem',
                    color: m1Type === opt.id ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', display: 'block', marginBottom: '8px' }}>
              2. Which scientific library provides <code>np.array()</code>?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
              {[
                { id: 'numpy', label: 'NumPy' },
                { id: 'math', label: 'math module' },
                { id: 'random', label: 'random module' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setM1Lib(opt.id)}
                  style={{
                    padding: '10px 14px',
                    textAlign: 'left',
                    background: m1Lib === opt.id ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                    border: m1Lib === opt.id ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                    borderRadius: '4px',
                    fontFamily: 'var(--ds-font-mono)',
                    fontSize: '0.875rem',
                    color: m1Lib === opt.id ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {showHint[1] && (
            <div style={{ padding: '10px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', fontSize: '0.8125rem', color: 'var(--ds-cyan)', marginBottom: '1rem' }}>
              💡 <strong>Hint:</strong> <code>np</code> is the universal alias for the <strong>NumPy</strong> library, which creates <code>ndarray</code> (N-Dimensional Array) objects.
            </div>
          )}

          {m1Feedback === 'success' && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="success"
                title="Mission 01 Complete!"
                subtitle="Correct! marks is a NumPy ndarray created via the numpy package."
                hideCloseButton
              />
            </div>
          )}

          {m1Feedback === 'error' && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="error"
                title="Review Data Structure"
                subtitle="np.array() is provided by NumPy and instantiates an ndarray container."
                hideCloseButton
              />
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button size="md" onClick={handleVerifyMission1}>
              Verify Answers
            </Button>
            {completedMissions.includes(1) && (
              <Button size="md" kind="tertiary" renderIcon={ArrowRight} onClick={() => setCurrentMission(2)}>
                Proceed to Mission 02
              </Button>
            )}
          </div>
        </div>
      )}

      {/* MISSION 2 */}
      {currentMission === 2 && (
        <div style={{ background: 'var(--ds-bg-core)', padding: '1.5rem', borderRadius: '4px', border: '1px solid var(--ds-border-strong)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
              Mission 02 — How Big Is the Class?
            </h3>
            <Button size="sm" kind="ghost" renderIcon={Help} onClick={() => toggleHint(2)}>
              Hint
            </Button>
          </div>

          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem' }}>
            Determine the number of student observations in the array:
          </p>

          <div style={{ marginBottom: '1.25rem', maxWidth: '300px' }}>
            <TextInput
              id="m2-size-input"
              labelText="1. How many students are in the dataset? (marks.size)"
              placeholder="e.g. 10"
              value={m2Size}
              onChange={(e) => setM2Size(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', display: 'block', marginBottom: '8px' }}>
              2. What is the shape of this array? (marks.shape)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
              {[
                { id: '(10,)', label: '(10,) - 1D Vector' },
                { id: '(1, 10)', label: '(1, 10) - 2D Matrix' },
                { id: '10', label: '10' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setM2Shape(opt.id)}
                  style={{
                    padding: '10px 14px',
                    textAlign: 'left',
                    background: m2Shape === opt.id ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                    border: m2Shape === opt.id ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                    borderRadius: '4px',
                    fontFamily: 'var(--ds-font-mono)',
                    fontSize: '0.875rem',
                    color: m2Shape === opt.id ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {showHint[2] && (
            <div style={{ padding: '10px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', fontSize: '0.8125rem', color: 'var(--ds-cyan)', marginBottom: '1rem' }}>
              💡 <strong>Hint:</strong> In NumPy, a 1D array of 10 elements has <code>marks.size = 10</code> and <code>marks.shape = (10,)</code>.
            </div>
          )}

          {m2Feedback === 'success' && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="success"
                title="Mission 02 Complete!"
                subtitle="Exact! 10 student observations represented as a 1D vector of shape (10,)."
                hideCloseButton
              />
            </div>
          )}

          {m2Feedback === 'error' && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="error"
                title="Check Dimensions"
                subtitle="Count the elements (10). 1D arrays have trailing comma tuple shape (10,)."
                hideCloseButton
              />
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button size="md" onClick={handleVerifyMission2}>
              Verify Answers
            </Button>
            {completedMissions.includes(2) && (
              <Button size="md" kind="tertiary" renderIcon={ArrowRight} onClick={() => setCurrentMission(3)}>
                Proceed to Mission 03
              </Button>
            )}
          </div>
        </div>
      )}

      {/* MISSION 3 */}
      {currentMission === 3 && (
        <div style={{ background: 'var(--ds-bg-core)', padding: '1.5rem', borderRadius: '4px', border: '1px solid var(--ds-border-strong)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
              Mission 03 — What&apos;s the Class Average?
            </h3>
            <Button size="sm" kind="ghost" renderIcon={Help} onClick={() => toggleHint(3)}>
              Hint
            </Button>
          </div>

          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem' }}>
            Calculate the arithmetic mean using <code>np.mean(marks)</code>:
          </p>

          <div style={{ marginBottom: '1.25rem', maxWidth: '300px' }}>
            <TextInput
              id="m3-avg-input"
              labelText="1. Class Mean Score (np.mean(marks))"
              placeholder="e.g. 80.2"
              value={m3Avg}
              onChange={(e) => setM3Avg(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-text-primary)', display: 'block', marginBottom: '8px' }}>
              2. What does 80.2 conceptually tell us?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
              {[
                { id: 'summary', label: 'It compresses 10 observations into a single representative central performance score.' },
                { id: 'half', label: 'It means exactly half the students got 80.2.' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setM3Meaning(opt.id)}
                  style={{
                    padding: '10px 14px',
                    textAlign: 'left',
                    background: m3Meaning === opt.id ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface-elevated)',
                    border: m3Meaning === opt.id ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    color: m3Meaning === opt.id ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {showHint[3] && (
            <div style={{ padding: '10px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', fontSize: '0.8125rem', color: 'var(--ds-cyan)', marginBottom: '1rem' }}>
              💡 <strong>Hint:</strong> Sum of all marks is 802. Divided by 10 students = <strong>80.2</strong>.
            </div>
          )}

          {m3Feedback === 'success' && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="success"
                title="Mission 03 Complete!"
                subtitle="Spot on! np.mean(marks) produces 80.2, representing the central tendency of the class."
                hideCloseButton
              />
            </div>
          )}

          {m3Feedback === 'error' && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="error"
                title="Check Calculation"
                subtitle="Calculate (78+85+92+67+74+88+95+61+83+79) / 10."
                hideCloseButton
              />
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button size="md" onClick={handleVerifyMission3}>
              Verify Answers
            </Button>
            {completedMissions.includes(3) && (
              <Button size="md" kind="tertiary" renderIcon={ArrowRight} onClick={() => setCurrentMission(4)}>
                Proceed to Mission 04
              </Button>
            )}
          </div>
        </div>
      )}

      {/* MISSION 4 */}
      {currentMission === 4 && (
        <div style={{ background: 'var(--ds-bg-core)', padding: '1.5rem', borderRadius: '4px', border: '1px solid var(--ds-border-strong)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
              Mission 04 — Who Scored the Highest & Lowest?
            </h3>
            <Button size="sm" kind="ghost" renderIcon={Help} onClick={() => toggleHint(4)}>
              Hint
            </Button>
          </div>

          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem' }}>
            Inspect the observational boundaries using <code>np.max(marks)</code> and <code>np.min(marks)</code>:
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <div style={{ width: '220px' }}>
              <TextInput
                id="m4-high-input"
                labelText="Highest Score (np.max)"
                placeholder="e.g. 95"
                value={m4High}
                onChange={(e) => setM4High(e.target.value)}
              />
            </div>
            <div style={{ width: '220px' }}>
              <TextInput
                id="m4-low-input"
                labelText="Lowest Score (np.min)"
                placeholder="e.g. 61"
                value={m4Low}
                onChange={(e) => setM4Low(e.target.value)}
              />
            </div>
          </div>

          {showHint[4] && (
            <div style={{ padding: '10px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', fontSize: '0.8125rem', color: 'var(--ds-cyan)', marginBottom: '1rem' }}>
              💡 <strong>Hint:</strong> Look at the dataset array above. The maximum value is <strong>95</strong> and the minimum is <strong>61</strong>.
            </div>
          )}

          {m4Feedback === 'success' && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="success"
                title="Mission 04 Complete!"
                subtitle="Excellent! Maximum is 95 (highlighted in Green) and Minimum is 61 (highlighted in Red). Range = 95 - 61 = 34 points."
                hideCloseButton
              />
            </div>
          )}

          {m4Feedback === 'error' && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="error"
                title="Check Extremes"
                subtitle="Inspect the highest and lowest numbers in the dataset: [78, 85, 92, 67, 74, 88, 95, 61, 83, 79]."
                hideCloseButton
              />
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button size="md" onClick={handleVerifyMission4}>
              Verify Answers
            </Button>
            {completedMissions.includes(4) && (
              <Button size="md" kind="tertiary" renderIcon={ArrowRight} onClick={() => setCurrentMission(5)}>
                Proceed to Mission 05
              </Button>
            )}
          </div>
        </div>
      )}

      {/* MISSION 5 */}
      {currentMission === 5 && (
        <div style={{ background: 'var(--ds-bg-core)', padding: '1.5rem', borderRadius: '4px', border: '1px solid var(--ds-border-strong)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
              Mission 05 — How Spread Out Are the Marks? (Standard Deviation)
            </h3>
            <Button size="sm" kind="ghost" renderIcon={Help} onClick={() => toggleHint(5)}>
              Hint
            </Button>
          </div>

          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            The class mean is <strong>80.2</strong>. But are students tightly clustered near 80, or widely scattered from 61 to 95? <strong>Standard Deviation</strong> (<code>np.std(marks)</code>) quantifies how spread out values are around the mean:
          </p>

          {/* Intuitive Visual Spread Line */}
          <div
            style={{
              padding: '1.25rem',
              background: 'var(--ds-bg-surface)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-strong)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', marginBottom: '8px' }}>
              VISUAL SPREAD AROUND THE MEAN (80.2):
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', height: '40px' }}>
              <div style={{ position: 'absolute', width: '100%', height: '2px', background: 'var(--ds-border-strong)' }} />
              {/* Mean marker */}
              <div style={{ position: 'absolute', left: '55%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--ds-cyan)', borderRadius: '50%', margin: '0 auto' }} />
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', fontWeight: 700 }}>Mean: 80.2</span>
              </div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-crimson)' }}>Min: 61</span>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)' }}>Max: 95</span>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem', maxWidth: '320px' }}>
            <TextInput
              id="m5-std-input"
              labelText="Standard Deviation (np.std(marks))"
              placeholder="e.g. 10.08"
              value={m5Std}
              onChange={(e) => setM5Std(e.target.value)}
            />
          </div>

          {showHint[5] && (
            <div style={{ padding: '10px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', fontSize: '0.8125rem', color: 'var(--ds-cyan)', marginBottom: '1rem' }}>
              💡 <strong>Hint:</strong> <code>np.std(marks)</code> computes the population standard deviation, which evaluates to approximately <strong>10.08</strong> (or 10.19 depending on degree of freedom).
            </div>
          )}

          {m5Feedback === 'success' && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="success"
                title="Mission 05 Complete!"
                subtitle="Exact! A standard deviation of ~10.08 means most student marks fall within 10 points of the 80.2 average (roughly 70 to 90)."
                hideCloseButton
              />
            </div>
          )}

          {m5Feedback === 'error' && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="error"
                title="Check Standard Deviation"
                subtitle="Expected value is approximately 10.08 (np.std(marks))."
                hideCloseButton
              />
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button size="md" onClick={handleVerifyMission5}>
              Verify Answer
            </Button>
            {completedMissions.includes(5) && (
              <Button size="md" kind="tertiary" renderIcon={ArrowRight} onClick={() => setCurrentMission(6)}>
                Proceed to Mission 06
              </Button>
            )}
          </div>
        </div>
      )}

      {/* MISSION 6 */}
      {currentMission === 6 && (
        <div style={{ background: 'var(--ds-bg-core)', padding: '1.5rem', borderRadius: '4px', border: '1px solid var(--ds-border-strong)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
              Mission 06 — Who Is Above Average? (Logical Comparison + Masking)
            </h3>
            <Button size="sm" kind="ghost" renderIcon={Help} onClick={() => toggleHint(6)}>
              Hint
            </Button>
          </div>

          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem' }}>
            Combine numerical computation with logical comparison: which marks are strictly greater than 80.2?
          </p>

          {/* Boolean Checklist Visual Table */}
          <div
            style={{
              padding: '1rem',
              background: 'var(--ds-bg-surface)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-strong)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(85px, 1fr))', gap: '6px' }}>
              {datasetMarks.map((mVal, i) => {
                const isAbove = mVal > 80.2;
                return (
                  <div
                    key={i}
                    style={{
                      padding: '8px',
                      background: isAbove ? 'var(--ds-emerald-dim)' : 'var(--ds-bg-surface-elevated)',
                      border: isAbove ? '1.5px solid var(--ds-emerald)' : '1px solid var(--ds-border-subtle)',
                      borderRadius: '4px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '1rem', fontWeight: 700, color: isAbove ? 'var(--ds-emerald)' : 'var(--ds-text-muted)' }}>
                      {mVal}
                    </div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: isAbove ? 'var(--ds-emerald)' : 'var(--ds-crimson)', marginTop: '2px' }}>
                      {isAbove ? '✓ TRUE' : '✕ FALSE'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem', maxWidth: '320px' }}>
            <TextInput
              id="m6-above-input"
              labelText="Number of Students Above Average (np.sum(marks > 80.2))"
              placeholder="e.g. 5"
              value={m6Above}
              onChange={(e) => setM6Above(e.target.value)}
            />
          </div>

          {showHint[6] && (
            <div style={{ padding: '10px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', fontSize: '0.8125rem', color: 'var(--ds-cyan)', marginBottom: '1rem' }}>
              💡 <strong>Hint:</strong> Counting values strictly &gt; 80.2 yields: 85, 92, 88, 95, 83 = <strong>5 students</strong>.
            </div>
          )}

          {m6Feedback === 'success' && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="success"
                title="Mission 06 Complete!"
                subtitle="Spot on! 5 out of 10 students scored above the 80.2 average."
                hideCloseButton
              />
            </div>
          )}

          {m6Feedback === 'error' && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="error"
                title="Check Count"
                subtitle="Count how many marks in the table are strictly greater than 80.2."
                hideCloseButton
              />
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button size="md" onClick={handleVerifyMission6}>
              Verify Answer
            </Button>
            {completedMissions.includes(6) && (
              <Button size="md" kind="tertiary" renderIcon={ArrowRight} onClick={() => setCurrentMission(7)}>
                Proceed to Final Mission 07
              </Button>
            )}
          </div>
        </div>
      )}

      {/* MISSION 7 */}
      {currentMission === 7 && (
        <div style={{ background: 'var(--ds-bg-core)', padding: '1.5rem', borderRadius: '4px', border: '1.5px solid var(--ds-purple)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Idea size={22} style={{ color: 'var(--ds-purple)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', margin: 0 }}>
              Mission 07 — Think Like a Data Scientist
            </h3>
          </div>

          <p style={{ fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            You&apos;ve calculated the summary metrics. Anyone can run <code>np.mean()</code>. A true Data Scientist asks questions that uncover the <em>why</em> behind the data. If you were the Data Scientist analyzing this class, what other question would you ask?
          </p>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)', display: 'block', marginBottom: '6px' }}>
              CHOOSE AN INSPIRATION OR TYPE YOUR OWN:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
              {[
                'Is the distribution bimodal (two separate clusters of struggling vs excelling students)?',
                'Did student attendance or homework completion correlate with scores below 70?',
                'Were specific questions on the assessment unfairly difficult, causing the low score of 61?',
                'How does this class average (80.2) compare against the previous year\'s cohort?',
              ].map((text, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setM7SelectedInspiration(text);
                    setM7QuestionText(text);
                  }}
                  style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    background: m7SelectedInspiration === text ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface-elevated)',
                    border: m7SelectedInspiration === text ? '1.5px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                    borderRadius: '4px',
                    fontSize: '0.8125rem',
                    color: m7SelectedInspiration === text ? 'var(--ds-purple)' : 'var(--ds-text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  💡 &ldquo;{text}&rdquo;
                </button>
              ))}
            </div>

            <TextInput
              id="m7-custom-input"
              labelText="Your Data Science Reflection Question:"
              placeholder="e.g. How many students scored in the 80-90 grade band?"
              value={m7QuestionText}
              onChange={(e) => setM7QuestionText(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <Button
              size="lg"
              renderIcon={Trophy}
              onClick={handleVerifyMission7}
              style={{
                background: isCompleted ? 'var(--ds-emerald)' : 'var(--ds-cyan)',
                color: '#000',
                fontWeight: 700,
              }}
            >
              {isCompleted ? 'Module 1 Complete! View Final Report' : 'Submit Reflection & Generate Report'}
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FINAL CLASS PERFORMANCE REPORT & MODULE 1 MAP */}
      {/* ======================================================== */}
      {completedMissions.length >= 6 && (
        <div style={{ marginTop: '2.5rem' }}>
          <div
            style={{
              padding: '2rem',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              border: '2px solid var(--ds-emerald)',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)', textTransform: 'uppercase' }}>
                  EXECUTIVE SUMMARY
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
                  Class Performance Report
                </h3>
              </div>
              <Tag type="green" size="lg">
                Analysis Certified
              </Tag>
            </div>

            {/* 6 Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '1.5rem' }}>
              <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>STUDENTS</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>10</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>Total observations</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>CLASS AVERAGE</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>80.2</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>Mean score</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-emerald)' }}>MAXIMUM</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>95</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>Top mark</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-crimson)' }}>MINIMUM</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-crimson)' }}>61</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>Lowest mark</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-purple)' }}>STD DEVIATION</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-purple)' }}>10.08</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>Spread around mean</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--ds-bg-surface-elevated)', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-teal)' }}>ABOVE AVERAGE</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ds-teal)' }}>5 / 10</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-text-secondary)' }}>50% of cohort</div>
              </div>
            </div>

            {/* What Did We Learn Key Takeaways */}
            <div style={{ padding: '1rem', background: 'var(--ds-bg-surface)', borderRadius: '4px', fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--ds-text-primary)' }}>What Did We Learn From This Analysis?</strong>
              <ul style={{ margin: '8px 0 0 1.25rem', padding: 0 }}>
                <li>The class performance is centered at <strong>80.2</strong> with a 34-point spread between highest (95) and lowest (61).</li>
                <li>The standard deviation of ~<strong>10.08</strong> indicates a consistent cohort with most scores between 70 and 90.</li>
                <li>Exactly <strong>5 students (50%)</strong> scored above the class mean.</li>
              </ul>
            </div>
          </div>

          {/* Module 1 Connection Map */}
          <div
            style={{
              padding: '1.75rem',
              background: 'var(--ds-bg-surface-elevated)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-strong)',
              marginBottom: '2rem',
            }}
          >
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)', marginBottom: '1rem' }}>
              How You Connected Module 1 Across This Challenge:
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--ds-cyan)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>TOPIC 1.3: VARIABLES</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}><code>marks</code> stored and named the numerical dataset in memory.</div>
              </div>

              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--ds-purple)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ds-purple)' }}>TOPIC 1.4: CONTROL FLOW</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}><code>marks &gt; 80.2</code> applied logical comparison rules across observations.</div>
              </div>

              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--ds-teal)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ds-teal)' }}>TOPIC 1.5: FUNCTIONS</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}>Invoked modular mathematical functions (<code>mean</code>, <code>std</code>, <code>sum</code>).</div>
              </div>

              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--ds-emerald)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ds-emerald)' }}>TOPIC 1.6: JUPYTER</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}>Combined code cells, output inspection, and narrative reporting.</div>
              </div>

              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--ds-cyan)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ds-cyan)' }}>TOPIC 1.7: NUMPY</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}>High-speed array vectorization and SIMD reductions.</div>
              </div>

              <div style={{ padding: '10px', background: 'var(--ds-bg-surface)', borderRadius: '4px', borderLeft: '3px solid var(--ds-purple)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ds-purple)' }}>DATA SCIENCE</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', marginTop: '2px' }}>Transformed raw numbers into actionable pedagogical insight!</div>
              </div>
            </div>
          </div>

          {/* Solution Code Accordion */}
          <div style={{ marginBottom: '2rem' }}>
            <Accordion>
              <AccordionItem title="View Complete Python Solution Script (NumPy Pipeline)">
                <div style={{ padding: '1rem', background: 'var(--ds-bg-core)', borderRadius: '4px' }}>
                  <pre style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-text-primary)', margin: 0 }}>
{`import numpy as np

# 1. Dataset
marks = np.array([78, 85, 92, 67, 74, 88, 95, 61, 83, 79])

# 2. Key Metrics
num_students = marks.size          # 10
average_mark = np.mean(marks)      # 80.2
highest_mark = np.max(marks)       # 95
lowest_mark  = np.min(marks)       # 61
std_dev      = np.std(marks)       # 10.08
above_avg    = np.sum(marks > average_mark) # 5

print(f"Students: {num_students}")
print(f"Average: {average_mark:.1f}")
print(f"Range: {lowest_mark} to {highest_mark}")
print(f"Std Dev: {std_dev:.2f}")
print(f"Above Average: {above_avg} / {num_students}")`}
                  </pre>
                </div>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Module 2 Next Up Transition Banner */}
          <div
            style={{
              padding: '1.5rem',
              background: 'var(--ds-bg-surface-elevated)',
              borderRadius: '4px',
              border: '2px solid var(--ds-cyan)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                🎉 MODULE 1 COMPLETE
              </span>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', margin: '2px 0 0 0' }}>
                Next: Module 2 — Data Collection & Preprocessing
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', margin: '4px 0 0 0' }}>
                Real datasets rarely arrive as clean arrays. Next, you&apos;ll learn how data is ingested from APIs, files, and databases, and cleaned for analysis.
              </p>
            </div>
            <Button size="lg" kind="primary" renderIcon={ArrowRight} href="/">
              Return to Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
