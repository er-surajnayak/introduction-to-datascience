'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tag,
  Button,
  ProgressBar,
} from '@carbon/react';
import {
  ArrowRight,
  Locked,
  CheckmarkFilled,
  ChevronDown,
  ChevronUp,
  Time,
  Catalog,
  Information,
} from '@carbon/icons-react';
import { ModuleItem } from '@/types/course';
import { LockedState } from './LockedState';

interface ModuleCardProps {
  module: ModuleItem;
  index: number;
}

export function ModuleCard({ module, index }: ModuleCardProps) {
  const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);
  const isLocked = module.status === 'locked';
  const isCompleted = module.status === 'completed';
  const isAvailable = module.status === 'available' || module.status === 'in-progress';

  const statusTag = () => {
    switch (module.status) {
      case 'completed':
        return <Tag type="green" size="md">Completed</Tag>;
      case 'in-progress':
        return <Tag type="blue" size="md">In Progress ({module.progress}%)</Tag>;
      case 'available':
        return <Tag type="cyan" size="md">Available</Tag>;
      case 'locked':
      default:
        return (
          <Tag type="cool-gray" size="md">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Locked size={12} /> Locked
            </span>
          </Tag>
        );
    }
  };

  const difficultyTagType = {
    Beginner: 'teal',
    Intermediate: 'purple',
    Advanced: 'magenta',
  }[module.difficulty] as 'teal' | 'purple' | 'magenta';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={!isLocked ? { y: -4, transition: { duration: 0.2 } } : {}}
      style={{
        background: 'var(--ds-bg-surface)',
        border: isLocked
          ? '1px solid var(--ds-border-subtle)'
          : isCompleted
          ? '1px solid var(--ds-emerald)'
          : '1px solid var(--ds-border-strong)',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isLocked ? 'none' : 'var(--ds-card-shadow)',
        opacity: isLocked ? 0.8 : 1,
        transition: 'all 0.25s ease',
      }}
    >
      {/* Top Accent Strip */}
      <div
        style={{
          height: '4px',
          width: '100%',
          background: isLocked
            ? 'var(--ds-border-subtle)'
            : isCompleted
            ? 'var(--ds-emerald)'
            : 'var(--ds-hero-gradient)',
        }}
      />

      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Module Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '1rem',
                fontWeight: 700,
                color: isLocked ? 'var(--ds-text-muted)' : 'var(--ds-cyan)',
                background: 'var(--ds-bg-surface-elevated)',
                padding: '4px 8px',
                borderRadius: '2px',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              0{module.moduleNumber}
            </span>
            <Tag type={difficultyTagType} size="sm">
              {module.difficulty}
            </Tag>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {statusTag()}
          </div>
        </div>

        {/* Title and Subtitle */}
        <h3
          style={{
            fontSize: '1.375rem',
            fontWeight: 600,
            color: isLocked ? 'var(--ds-text-muted)' : 'var(--ds-text-primary)',
            margin: '0 0 0.35rem 0',
            lineHeight: 1.25,
          }}
        >
          {module.title}
        </h3>

        <div
          style={{
            fontSize: '0.875rem',
            color: isLocked ? 'var(--ds-text-muted)' : 'var(--ds-cyan)',
            fontWeight: 500,
            marginBottom: '0.875rem',
          }}
        >
          {module.subtitle}
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: '0.9375rem',
            lineHeight: 1.55,
            color: isLocked ? 'var(--ds-text-muted)' : 'var(--ds-text-secondary)',
            margin: '0 0 1.25rem 0',
            flexGrow: 1,
          }}
        >
          {module.description}
        </p>

        {/* Outcome Callout */}
        <div
          style={{
            padding: '0.75rem 1rem',
            background: isLocked ? 'var(--ds-bg-surface-elevated)' : 'var(--ds-cyan-dim)',
            borderLeft: `3px solid ${isLocked ? 'var(--ds-border-strong)' : 'var(--ds-cyan)'}`,
            marginBottom: '1.25rem',
            fontSize: '0.8125rem',
            color: 'var(--ds-text-secondary)',
            lineHeight: 1.45,
            borderRadius: '0 3px 3px 0',
          }}
        >
          <strong style={{ color: isLocked ? 'var(--ds-text-muted)' : 'var(--ds-text-primary)' }}>Outcome:</strong> {module.keyOutcome}
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--ds-border-subtle)',
            marginBottom: '1rem',
            fontSize: '0.8125rem',
            color: 'var(--ds-text-muted)',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Catalog size={14} />
            {module.topics.length} Interactive Topics
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Time size={14} />
            {module.estimatedHours}
          </span>
        </div>

        {/* Progress Bar (if available/in progress) */}
        {!isLocked && (
          <div style={{ marginBottom: '1.25rem' }}>
            <ProgressBar
              value={module.progress}
              max={100}
              size="small"
              label={`Module Progress (${module.progress}%)`}
              status={module.progress === 100 ? 'finished' : 'active'}
              hideLabel={false}
            />
          </div>
        )}

        {/* Locked Prerequisite Banner */}
        {isLocked && (
          <div style={{ marginBottom: '1.25rem' }}>
            <LockedState prerequisites={module.prerequisites} />
          </div>
        )}

        {/* Expandable Topic Outline Accordion */}
        <div style={{ marginBottom: '1.25rem' }}>
          <button
            type="button"
            onClick={() => setIsTopicsExpanded(!isTopicsExpanded)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              background: 'var(--ds-bg-surface-elevated)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '3px',
              color: 'var(--ds-text-secondary)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            aria-expanded={isTopicsExpanded}
          >
            <span>View Topic Syllabus ({module.topics.length})</span>
            {isTopicsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <AnimatePresence>
            {isTopicsExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: 'hidden' }}
              >
                <ul
                  style={{
                    listStyle: 'none',
                    padding: '8px 0 0 0',
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  {module.topics.map((topic, tIdx) => {
                    const content = (
                      <div
                        style={{
                          padding: '8px 10px',
                          background: 'var(--cds-layer-02)',
                          border: '1px solid var(--ds-border-subtle)',
                          borderRadius: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.8125rem',
                          color: isLocked ? 'var(--ds-text-muted)' : 'var(--ds-text-primary)',
                          transition: 'background 0.15s ease',
                        }}
                      >
                        <span>
                          <span style={{ color: 'var(--ds-cyan)', marginRight: '6px', fontFamily: 'var(--ds-font-mono)' }}>
                            {module.moduleNumber}.{tIdx + 1}
                          </span>
                          {topic.title}
                        </span>
                        {topic.estimatedMinutes && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)', fontFamily: 'var(--ds-font-mono)' }}>
                            ~{topic.estimatedMinutes}m
                          </span>
                        )}
                      </div>
                    );

                    return (
                      <li key={topic.id}>
                        {isAvailable && topic.slug ? (
                          <Link
                            href={`/modules/${module.id}/${topic.slug}`}
                            style={{ textDecoration: 'none', display: 'block' }}
                          >
                            {content}
                          </Link>
                        ) : (
                          content
                        )}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div>
          {isAvailable ? (
            <Link href={`/modules/${module.id}`} passHref legacyBehavior>
              <Button
                kind={module.progress > 0 ? 'secondary' : 'primary'}
                size="md"
                renderIcon={ArrowRight}
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  backgroundColor: module.progress > 0 ? undefined : '#0f62fe',
                }}
              >
                {module.progress > 0 ? 'Continue Module' : 'Start Module'}
              </Button>
            </Link>
          ) : (
            <Button
              kind="tertiary"
              size="md"
              disabled
              renderIcon={Locked}
              style={{
                width: '100%',
                justifyContent: 'space-between',
                color: '#6f6f6f',
                borderColor: '#393939',
              }}
            >
              Locked (Complete Module {module.moduleNumber - 1})
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
