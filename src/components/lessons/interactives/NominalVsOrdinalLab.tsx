'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@carbon/react';
import {
  ArrowsVertical,
  CheckmarkFilled,
  WarningAlt,
  Help,
  ArrowRight,
} from '@carbon/icons-react';

interface CategoryGroup {
  id: string;
  name: string;
  type: 'Nominal' | 'Ordinal';
  items: string[];
  description: string;
  orderRationale: string;
  distanceWarning: string;
}

const categoryExamples: CategoryGroup[] = [
  {
    id: 'satisfaction',
    name: 'Customer Satisfaction Ratings',
    type: 'Ordinal',
    items: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
    description: 'User evaluation scale for service quality.',
    orderRationale: 'Natural sequence exists: Excellent > Very Good > Good > Fair > Poor.',
    distanceWarning:
      'Non-Uniform Distance: The psychological jump from "Fair" to "Good" is not quantitatively equal to the jump from "Good" to "Very Good". Never assume mathematical intervals are uniform.',
  },
  {
    id: 'city',
    name: 'Metro City of Residence',
    type: 'Nominal',
    items: ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Pune'],
    description: 'Geographical delivery locations.',
    orderRationale: 'No inherent sequence: "Mumbai > Delhi" has no mathematical or logical ranking.',
    distanceWarning:
      'Arbitrary Sorting: Any rearrangement of cities is equally valid. Assigning numeric codes like Mumbai=1, Delhi=2 does NOT create a numerical order.',
  },
  {
    id: 'education',
    name: 'Highest Education Level',
    type: 'Ordinal',
    items: ['High School', 'Diploma', "Bachelor's", "Master's", 'Doctorate (PhD)'],
    description: 'Academic qualification credentials.',
    orderRationale: 'Clear educational hierarchy: PhD > Master\'s > Bachelor\'s > Diploma > High School.',
    distanceWarning:
      'Variable Duration: Completing a PhD takes 4-6 years, whereas a Master\'s takes 2 years. The interval between qualification tiers is not equal in time or effort.',
  },
  {
    id: 'blood_group',
    name: 'Blood Group',
    type: 'Nominal',
    items: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    description: 'Biological antigen classification.',
    orderRationale: 'No hierarchy: Blood groups describe medical compatibility, not rank or quality.',
    distanceWarning:
      'Strictly Nominal: Treating blood groups as ordinal numbers in ML models causes artificial, erroneous predictions.',
  },
  {
    id: 'priority',
    name: 'Support Ticket Priority',
    type: 'Ordinal',
    items: ['P3 - Low', 'P2 - Medium', 'P1 - High', 'P0 - Critical Blocker'],
    description: 'Engineering bug triage hierarchy.',
    orderRationale: 'Clear escalation sequence: Critical Blocker > High > Medium > Low.',
    distanceWarning:
      'Exponential Urgency: A P0 outage demands immediate resolution within 15 minutes, whereas P3 may have a 5-day SLA.',
  },
  {
    id: 'department',
    name: 'Engineering Department',
    type: 'Nominal',
    items: ['CSE', 'ECE', 'Mechanical', 'Civil', 'Biotech'],
    description: 'Academic departments in a university.',
    orderRationale: 'No academic branch is inherently "greater" than another in dataset logic.',
    distanceWarning:
      'One-Hot Encoding Target: Nominal features are typically converted into dummy binary columns for regression.',
  },
];

export function NominalVsOrdinalLab() {
  const [selectedId, setSelectedId] = useState<string>('satisfaction');
  const currentGroup = categoryExamples.find((c) => c.id === selectedId) || categoryExamples[0];

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
          <Tag type="teal" size="md">
            Interactive 03
          </Tag>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
            Nominal vs Ordinal Lab
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)' }}>
          Categorical Data Structure
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '0.5rem' }}>
        Unordered Labels vs Ranked Tiers: Nominal vs Ordinal
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        <strong>Nominal</strong> categories represent unordered group labels. <strong>Ordinal</strong> categories possess a meaningful sequence or rank, but the distance between consecutive levels is not uniform or mathematically equal. Select a category below to explore its ranking properties.
      </p>

      {/* Category Selection Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '8px',
          marginBottom: '1.5rem',
        }}
      >
        {categoryExamples.map((cat) => {
          const isSelected = cat.id === selectedId;
          const isOrdinal = cat.type === 'Ordinal';
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedId(cat.id)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                border: isSelected
                  ? `2px solid ${isOrdinal ? 'var(--ds-teal)' : 'var(--ds-cyan)'}`
                  : '1px solid var(--ds-border-subtle)',
                background: isSelected ? 'var(--ds-bg-surface-elevated)' : 'transparent',
                color: isSelected ? 'var(--ds-text-primary)' : 'var(--ds-text-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontSize: '0.8125rem', fontWeight: isSelected ? 600 : 400 }}>
                {cat.name}
              </span>
              <Tag type={isOrdinal ? 'teal' : 'cool-gray'} size="sm" style={{ margin: 0 }}>
                {cat.type}
              </Tag>
            </button>
          );
        })}
      </div>

      {/* Category Deep-Dive Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGroup.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <div
            style={{
              padding: '1.25rem',
              background: 'var(--ds-bg-surface-elevated)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-strong)',
              marginBottom: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                  Classification: {currentGroup.type} Categorical
                </div>
                <div style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                  {currentGroup.name}
                </div>
              </div>
              <Tag type={currentGroup.type === 'Ordinal' ? 'teal' : 'cool-gray'} size="md">
                {currentGroup.type === 'Ordinal' ? 'Order Matters (Ranked)' : 'Order Arbitrary (Unranked)'}
              </Tag>
            </div>

            {/* Sequence Flow Visualizer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                padding: '1rem',
                background: 'var(--ds-bg-surface)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
                marginBottom: '1rem',
              }}
            >
              {currentGroup.items.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div
                    style={{
                      padding: '6px 12px',
                      background: 'var(--ds-bg-surface-elevated)',
                      border: currentGroup.type === 'Ordinal' ? '1px solid var(--ds-teal)' : '1px solid var(--ds-border-strong)',
                      borderRadius: '4px',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      color: 'var(--ds-text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {currentGroup.type === 'Ordinal' && (
                      <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-teal)' }}>
                        Tier {idx + 1}:
                      </span>
                    )}
                    <span>{item}</span>
                  </div>

                  {idx < currentGroup.items.length - 1 && (
                    <div style={{ color: currentGroup.type === 'Ordinal' ? 'var(--ds-teal)' : 'var(--ds-text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                      {currentGroup.type === 'Ordinal' ? '<' : '•'}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              <div
                style={{
                  padding: '10px 12px',
                  background: 'var(--ds-bg-surface)',
                  borderRadius: '4px',
                  borderLeft: '3px solid var(--ds-cyan)',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-cyan)', marginBottom: '2px' }}>
                  Ordering Logic
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
                  {currentGroup.orderRationale}
                </div>
              </div>

              <div
                style={{
                  padding: '10px 12px',
                  background: 'var(--ds-bg-surface)',
                  borderRadius: '4px',
                  borderLeft: '3px solid var(--ds-amber)',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-amber)', marginBottom: '2px' }}>
                  Mathematical & ML Precaution
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
                  {currentGroup.distanceWarning}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
