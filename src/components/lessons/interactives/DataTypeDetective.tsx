'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  CheckmarkFilled,
  ErrorFilled,
  Help,
  Trophy,
  Restart,
  ArrowRight,
  Catalog,
} from '@carbon/icons-react';

interface DetectiveItem {
  id: number;
  label: string;
  rawValue: string;
  context: string;
  correctPrimary: 'Numerical' | 'Categorical' | 'Boolean' | 'Text' | 'Datetime' | 'Identifier';
  correctSubtype?: 'Discrete' | 'Continuous' | 'Nominal' | 'Ordinal' | 'N/A';
  primaryReason: string;
  subtypeReason?: string;
  trapWarning?: string;
}

const detectiveItems: DetectiveItem[] = [
  {
    id: 1,
    label: 'Student Age',
    rawValue: '21',
    context: 'Recorded as completed years of life in university registration.',
    correctPrimary: 'Numerical',
    correctSubtype: 'Discrete',
    primaryReason: 'Quantifies age magnitude where arithmetic and averages are valid.',
    subtypeReason: 'Recorded in whole integer increments (20, 21, 22).',
  },
  {
    id: 2,
    label: 'Monthly Salary',
    rawValue: '₹45,000',
    context: 'Financial employee compensation package.',
    correctPrimary: 'Numerical',
    correctSubtype: 'Continuous',
    primaryReason: 'Represents monetary currency where arithmetic summation and means are meaningful.',
    subtypeReason: 'Money is measured along a continuous fractional financial continuum (₹45,000.50).',
    trapWarning: 'Note: The string representation contains "₹" and "," which must be cleaned before calculation.',
  },
  {
    id: 3,
    label: 'Delivery City',
    rawValue: '"Bengaluru"',
    context: 'Destination metro city for an e-commerce parcel.',
    correctPrimary: 'Categorical',
    correctSubtype: 'Nominal',
    primaryReason: 'Represents a group label describing geographical location.',
    subtypeReason: 'Nominal because there is no natural or mathematical ranking between cities.',
  },
  {
    id: 4,
    label: 'Attendance Status',
    rawValue: 'True',
    context: 'Indicates whether a student was present during morning lecture.',
    correctPrimary: 'Boolean',
    correctSubtype: 'N/A',
    primaryReason: 'Represents two mutually exclusive binary logical states (Present / Absent).',
    subtypeReason: 'Boolean flags do not have continuous or ordinal subdivisions.',
  },
  {
    id: 5,
    label: 'Product Star Rating',
    rawValue: '4.8',
    context: 'Average customer rating on a 1.0 to 5.0 scale.',
    correctPrimary: 'Numerical',
    correctSubtype: 'Continuous',
    primaryReason: 'Computed continuous numerical average of user evaluation scores.',
    subtypeReason: 'Can take continuous fractional values (4.81, 4.82) across the 1.0 to 5.0 range.',
  },
  {
    id: 6,
    label: 'Exam Schedule Date',
    rawValue: '"2026-09-16"',
    context: 'Calendar date for university semester examination.',
    correctPrimary: 'Datetime',
    correctSubtype: 'N/A',
    primaryReason: 'Represents a temporal timestamp coordinate on the global timeline.',
    subtypeReason: 'Enables time-delta calculations, event sequencing, and time-series analysis.',
  },
  {
    id: 7,
    label: 'Service Quality Feedback',
    rawValue: '"Excellent"',
    context: 'Customer review satisfaction dropdown option.',
    correctPrimary: 'Categorical',
    correctSubtype: 'Ordinal',
    primaryReason: 'Categorical label describing qualitative service tier.',
    subtypeReason: 'Ordinal because a meaningful sequence exists: Excellent > Good > Fair > Poor.',
  },
  {
    id: 8,
    label: 'Customer Order ID',
    rawValue: '104857',
    context: 'Database primary key assigned to an e-commerce order.',
    correctPrimary: 'Identifier',
    correctSubtype: 'N/A',
    primaryReason: 'Unique entity identifier used for indexing and relational lookups.',
    subtypeReason: 'Not a measurement! Calculating average(order_id) produces statistical nonsense.',
    trapWarning: 'Common Trap: Even though stored as an integer, this column must NEVER be averaged.',
  },
];

const primaryOptions: ('Numerical' | 'Categorical' | 'Boolean' | 'Text' | 'Datetime' | 'Identifier')[] = [
  'Numerical',
  'Categorical',
  'Boolean',
  'Text',
  'Datetime',
  'Identifier',
];

export function DataTypeDetective() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPrimary, setSelectedPrimary] = useState<string | null>(null);
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [solvedItems, setSolvedItems] = useState<Record<number, boolean>>({});

  const currentItem = detectiveItems[currentIndex];
  const requiresSubtype = selectedPrimary === 'Numerical' || selectedPrimary === 'Categorical';

  const handlePrimarySelect = (prim: string) => {
    setSelectedPrimary(prim);
    setSelectedSubtype(null);
    setIsSubmitted(false);
  };

  const handleSubtypeSelect = (sub: string) => {
    setSelectedSubtype(sub);
    setIsSubmitted(false);
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    const isPrimaryCorrect = selectedPrimary === currentItem.correctPrimary;
    const isSubtypeCorrect =
      !currentItem.correctSubtype ||
      currentItem.correctSubtype === 'N/A' ||
      selectedSubtype === currentItem.correctSubtype;

    if (isPrimaryCorrect && isSubtypeCorrect) {
      setSolvedItems((prev) => ({ ...prev, [currentItem.id]: true }));
    }
  };

  const handleNext = () => {
    if (currentIndex < detectiveItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedPrimary(null);
      setSelectedSubtype(null);
      setIsSubmitted(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedPrimary(null);
      setSelectedSubtype(null);
      setIsSubmitted(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedPrimary(null);
    setSelectedSubtype(null);
    setIsSubmitted(false);
    setSolvedItems({});
  };

  const solvedCount = Object.keys(solvedItems).length;
  const isAllSolved = solvedCount === detectiveItems.length;
  const isCurrentCorrect =
    isSubmitted &&
    selectedPrimary === currentItem.correctPrimary &&
    (!currentItem.correctSubtype || currentItem.correctSubtype === 'N/A' || selectedSubtype === currentItem.correctSubtype);

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
          <Tag type="blue" size="md">
            Signature Interactive 04
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Data Type Detective
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)' }}>
            Solved: {solvedCount} / {detectiveItems.length}
          </span>
          <Button kind="ghost" size="sm" renderIcon={Restart} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Diagnose the True Analytical Type & Subtype
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Step into the shoes of a Data Detective. Inspect the raw value and its real-world context below, then classify its <strong>Primary Category</strong> and optional <strong>Subtype</strong>.
      </p>

      {/* Item Navigation Stepper */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        {detectiveItems.map((item, idx) => {
          const isDone = !!solvedItems[item.id];
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentIndex(idx);
                setSelectedPrimary(null);
                setSelectedSubtype(null);
                setIsSubmitted(false);
              }}
              style={{
                flex: 1,
                minWidth: '40px',
                padding: '8px 4px',
                borderRadius: '4px',
                border: isCurrent
                  ? '2px solid var(--ds-cyan)'
                  : isDone
                  ? '1px solid var(--ds-emerald)'
                  : '1px solid var(--ds-border-subtle)',
                background: isCurrent
                  ? 'var(--ds-cyan-dim)'
                  : isDone
                  ? 'var(--ds-emerald-dim)'
                  : 'var(--ds-bg-surface-elevated)',
                color: isCurrent
                  ? 'var(--ds-cyan)'
                  : isDone
                  ? 'var(--ds-emerald)'
                  : 'var(--ds-text-secondary)',
                fontSize: '0.75rem',
                fontFamily: 'var(--ds-font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              #{item.id} {isDone ? '✓' : ''}
            </button>
          );
        })}
      </div>

      {/* Target Clue Card */}
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--ds-bg-surface-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
            Evidence #{currentItem.id}: {currentItem.label}
          </span>
          <Tag type="cool-gray" size="sm">
            Case {currentIndex + 1} of {detectiveItems.length}
          </Tag>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '1rem 0' }}>
          <div
            style={{
              padding: '12px 20px',
              background: 'var(--ds-bg-core)',
              border: '1px solid var(--ds-border-strong)',
              borderRadius: '4px',
              fontSize: '1.5rem',
              fontFamily: 'var(--ds-font-mono)',
              color: 'var(--ds-cyan)',
              fontWeight: 600,
            }}
          >
            {currentItem.rawValue}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
            <strong>Context:</strong> {currentItem.context}
          </div>
        </div>

        {/* Primary Classification Controls */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
            Step 1: Choose Primary Analytical Category
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
            {primaryOptions.map((prim) => {
              const isSelected = selectedPrimary === prim;
              return (
                <button
                  key={prim}
                  onClick={() => handlePrimarySelect(prim)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: isSelected ? '2px solid var(--ds-cyan)' : '1px solid var(--ds-border-strong)',
                    background: isSelected ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-surface)',
                    color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
                    fontSize: '0.8125rem',
                    fontWeight: isSelected ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {prim}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subtype Classification Controls */}
        {requiresSubtype && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '8px' }}>
              Step 2: Choose Subtype for {selectedPrimary}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {selectedPrimary === 'Numerical' && (
                <>
                  <button
                    onClick={() => handleSubtypeSelect('Discrete')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: selectedSubtype === 'Discrete' ? '2px solid var(--ds-purple)' : '1px solid var(--ds-border-strong)',
                      background: selectedSubtype === 'Discrete' ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface)',
                      color: selectedSubtype === 'Discrete' ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
                      fontSize: '0.8125rem',
                      fontWeight: selectedSubtype === 'Discrete' ? 600 : 400,
                      cursor: 'pointer',
                    }}
                  >
                    Discrete (Countable)
                  </button>
                  <button
                    onClick={() => handleSubtypeSelect('Continuous')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: selectedSubtype === 'Continuous' ? '2px solid var(--ds-purple)' : '1px solid var(--ds-border-strong)',
                      background: selectedSubtype === 'Continuous' ? 'var(--ds-purple-dim)' : 'var(--ds-bg-surface)',
                      color: selectedSubtype === 'Continuous' ? 'var(--ds-purple)' : 'var(--ds-text-primary)',
                      fontSize: '0.8125rem',
                      fontWeight: selectedSubtype === 'Continuous' ? 600 : 400,
                      cursor: 'pointer',
                    }}
                  >
                    Continuous (Measurable)
                  </button>
                </>
              )}

              {selectedPrimary === 'Categorical' && (
                <>
                  <button
                    onClick={() => handleSubtypeSelect('Nominal')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: selectedSubtype === 'Nominal' ? '2px solid var(--ds-teal)' : '1px solid var(--ds-border-strong)',
                      background: selectedSubtype === 'Nominal' ? 'var(--ds-teal-dim)' : 'var(--ds-bg-surface)',
                      color: selectedSubtype === 'Nominal' ? 'var(--ds-teal)' : 'var(--ds-text-primary)',
                      fontSize: '0.8125rem',
                      fontWeight: selectedSubtype === 'Nominal' ? 600 : 400,
                      cursor: 'pointer',
                    }}
                  >
                    Nominal (No Order)
                  </button>
                  <button
                    onClick={() => handleSubtypeSelect('Ordinal')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: selectedSubtype === 'Ordinal' ? '2px solid var(--ds-teal)' : '1px solid var(--ds-border-strong)',
                      background: selectedSubtype === 'Ordinal' ? 'var(--ds-teal-dim)' : 'var(--ds-bg-surface)',
                      color: selectedSubtype === 'Ordinal' ? 'var(--ds-teal)' : 'var(--ds-text-primary)',
                      fontSize: '0.8125rem',
                      fontWeight: selectedSubtype === 'Ordinal' ? 600 : 400,
                      cursor: 'pointer',
                    }}
                  >
                    Ordinal (Ordered Rank)
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Submit Verification Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '1rem' }}>
          <Button
            size="md"
            kind="primary"
            onClick={handleCheck}
            disabled={!selectedPrimary || (requiresSubtype && !selectedSubtype)}
          >
            Verify Classification
          </Button>

          {currentIndex > 0 && (
            <Button size="md" kind="secondary" onClick={handlePrev}>
              Previous
            </Button>
          )}

          {currentIndex < detectiveItems.length - 1 && (
            <Button size="md" kind="tertiary" renderIcon={ArrowRight} onClick={handleNext}>
              Next Evidence
            </Button>
          )}
        </div>

        {/* Feedback Section */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                marginTop: '1.25rem',
                padding: '1rem 1.25rem',
                background: isCurrentCorrect ? 'var(--ds-emerald-dim)' : 'rgba(218, 30, 40, 0.1)',
                border: isCurrentCorrect ? '1px solid var(--ds-emerald)' : '1px solid #da1e28',
                borderRadius: '4px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                {isCurrentCorrect ? (
                  <>
                    <CheckmarkFilled size={18} style={{ color: 'var(--ds-emerald)' }} />
                    <span style={{ fontWeight: 600, color: 'var(--ds-emerald)', fontSize: '0.9375rem' }}>
                      Diagnostic Confirmed! Correct Classification
                    </span>
                  </>
                ) : (
                  <>
                    <ErrorFilled size={18} style={{ color: '#da1e28' }} />
                    <span style={{ fontWeight: 600, color: '#da1e28', fontSize: '0.9375rem' }}>
                      Classification Discrepancy — Review Detective Notes
                    </span>
                  </>
                )}
              </div>

              <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-primary)', lineHeight: 1.6 }}>
                <div>
                  <strong>Primary Type:</strong> {currentItem.correctPrimary} — {currentItem.primaryReason}
                </div>
                {currentItem.correctSubtype && currentItem.correctSubtype !== 'N/A' && (
                  <div style={{ marginTop: '4px' }}>
                    <strong>Subtype:</strong> {currentItem.correctSubtype} — {currentItem.subtypeReason}
                  </div>
                )}
                {currentItem.trapWarning && (
                  <div style={{ marginTop: '6px', color: 'var(--ds-amber)', fontWeight: 500 }}>
                    ⚠️ {currentItem.trapWarning}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Completion Trophy Card */}
      {isAllSolved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '1.25rem',
            background: 'var(--ds-emerald-dim)',
            border: '1px solid var(--ds-emerald)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Trophy size={28} style={{ color: 'var(--ds-emerald)' }} />
          <div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              Master Data Detective Badge Unlocked!
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)' }}>
              You successfully identified numbers, discrete counts, continuous measurements, nominal groups, ordinal tiers, booleans, timestamps, and non-arithmetic identifiers.
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
