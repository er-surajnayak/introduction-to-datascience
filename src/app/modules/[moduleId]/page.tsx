'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Button,
  ProgressBar,
} from '@carbon/react';
import {
  ArrowLeft,
  ArrowRight,
  Locked,
  CheckmarkFilled,
  Time,
  Catalog,
  PlayFilledAlt,
  Restart,
} from '@carbon/icons-react';
import { useCourseProgress } from '@/context/CourseProgressContext';
import { courseConfig } from '@/data/courseData';

export default function ModuleDetailPage() {
  const params = useParams();
  const { moduleId } = params as { moduleId: string };
  const {
    getModuleById,
    isUnlocked,
    completedModules,
    completeModule,
    setModuleProgressValue,
    isTopicCompleted,
  } = useCourseProgress();

  const moduleItem = getModuleById(moduleId);

  if (!moduleItem) {
    return (
      <div className="ds-container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--ds-text-primary)', marginBottom: '1rem' }}>Module Not Found</h1>
        <p style={{ color: 'var(--ds-text-secondary)', marginBottom: '2rem' }}>
          The requested module identifier does not exist in the course configuration.
        </p>
        <Link href="/" passHref legacyBehavior>
          <Button renderIcon={ArrowLeft}>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const unlocked = isUnlocked(moduleItem.id);
  const isCompleted = completedModules.includes(moduleItem.id);
  const currentProgress = moduleItem.progress;

  return (
    <div style={{ padding: '3rem 0 6rem 0', background: 'var(--cds-background)', minHeight: '85vh' }}>
      <div className="ds-container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem' }}>
          <Breadcrumb noTrailingSlash aria-label="Breadcrumb navigation">
            <BreadcrumbItem>
              <Link href="/">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem href="#modules">
              <Link href="/#modules">Modules</Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              Module {moduleItem.moduleNumber}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        {/* Locked Module View */}
        {!unlocked ? (
          <div
            className="ds-glass-panel"
            style={{
              padding: '3rem 2rem',
              borderRadius: '4px',
              textAlign: 'center',
              maxWidth: '680px',
              margin: '3rem auto',
              border: '1px dashed var(--ds-border-strong)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--cds-layer-02)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                color: 'var(--ds-text-muted)',
              }}
            >
              <Locked size={32} />
            </div>

            <Tag type="cool-gray" size="md" style={{ marginBottom: '1rem' }}>
              Module Locked
            </Tag>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: '0 0 1rem 0' }}>
              Module {moduleItem.moduleNumber}: {moduleItem.title}
            </h1>

            <p style={{ color: 'var(--ds-text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
              This module requires foundational concepts from earlier in the curriculum. Complete{' '}
              <strong style={{ color: 'var(--ds-text-primary)' }}>
                {moduleItem.prerequisites?.join(' & ') || 'the previous module'}
              </strong>{' '}
              to unlock this interactive laboratory.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/" passHref legacyBehavior>
                <Button kind="secondary" renderIcon={ArrowLeft}>
                  Return to Dashboard
                </Button>
              </Link>
              <Link href="/modules/module-1" passHref legacyBehavior>
                <Button kind="primary" renderIcon={ArrowRight}>
                  Go to Module 1
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Unlocked Module View */
          <div>
            {/* Header Area */}
            <div
              className="ds-glass-panel"
              style={{
                padding: '2.5rem',
                borderRadius: '4px',
                marginBottom: '2.5rem',
                border: '1px solid var(--ds-border-strong)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--ds-cyan)',
                      background: 'var(--ds-cyan-dim)',
                      padding: '4px 8px',
                      borderRadius: '2px',
                    }}
                  >
                    MODULE 0{moduleItem.moduleNumber}
                  </span>
                  <Tag type="teal" size="md">
                    {moduleItem.difficulty}
                  </Tag>
                  {isCompleted ? (
                    <Tag type="green" size="md">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckmarkFilled size={12} /> Completed
                      </span>
                    </Tag>
                  ) : (
                    <Tag type="cyan" size="md">
                      Available ({currentProgress}% Done)
                    </Tag>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem', color: 'var(--ds-text-muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Time size={16} style={{ color: 'var(--ds-teal)' }} />
                    {moduleItem.estimatedHours}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Catalog size={16} style={{ color: 'var(--ds-purple)' }} />
                    {moduleItem.topics.length} Interactive Topics
                  </span>
                </div>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 700,
                  color: 'var(--ds-text-primary)',
                  margin: '0 0 0.5rem 0',
                  lineHeight: 1.15,
                }}
              >
                {moduleItem.title}
              </h1>

              <div
                style={{
                  fontSize: '1.125rem',
                  color: 'var(--ds-cyan)',
                  fontWeight: 500,
                  marginBottom: '1.25rem',
                }}
              >
                {moduleItem.subtitle}
              </div>

              <p style={{ fontSize: '1rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, maxWidth: '820px', margin: '0 0 1.75rem 0' }}>
                {moduleItem.description}
              </p>

              {/* Outcome Banner */}
              <div
                style={{
                  padding: '1rem 1.25rem',
                  background: 'var(--ds-cyan-dim)',
                  borderLeft: '4px solid var(--ds-cyan)',
                  marginBottom: '2rem',
                  borderRadius: '0 4px 4px 0',
                }}
              >
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ds-cyan)', fontWeight: 600, marginBottom: '4px' }}>
                  Key Engineering Outcome
                </div>
                <div style={{ color: 'var(--ds-text-primary)', fontSize: '0.9375rem' }}>
                  {moduleItem.keyOutcome}
                </div>
              </div>

              {/* Progress & Quick Jump Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--ds-border-subtle)',
                }}
              >
                <div style={{ width: '320px', maxWidth: '100%' }}>
                  <ProgressBar
                    value={currentProgress}
                    max={100}
                    label={`Module Progress: ${currentProgress}%`}
                    size="small"
                    status={currentProgress === 100 ? 'finished' : 'active'}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {moduleItem.topics[0]?.slug && (
                    <Link
                      href={`/modules/${moduleItem.id}/${moduleItem.topics[0].slug}`}
                      passHref
                      legacyBehavior
                    >
                      <Button
                        kind="primary"
                        size="md"
                        renderIcon={PlayFilledAlt}
                        style={{ backgroundColor: '#0f62fe' }}
                      >
                        {currentProgress > 0 ? 'Resume Lessons' : 'Start Topic 1.1'}
                      </Button>
                    </Link>
                  )}
                  {isCompleted && (
                    <Button
                      kind="ghost"
                      size="md"
                      renderIcon={Restart}
                      onClick={() => setModuleProgressValue(moduleItem.id, 0)}
                    >
                      Reset Progress
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Topics Syllabus Section */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--ds-text-primary)', margin: 0 }}>
                    Curriculum Topics ({moduleItem.topics.length})
                  </h2>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: 'var(--ds-text-muted)' }}>
                    Interactive lesson modules featuring live code runners, memory simulators, and concept checks.
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1rem',
                }}
              >
                {moduleItem.topics.map((topic, tIdx) => {
                  const done = isTopicCompleted(topic.id);
                  const topicSlug = topic.slug || `topic-${tIdx + 1}`;

                  return (
                    <Link
                      key={topic.id}
                      href={`/modules/${moduleItem.id}/${topicSlug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="ds-glass-panel"
                        style={{
                          padding: '1.5rem',
                          borderRadius: '4px',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          border: done
                            ? '1px solid var(--ds-emerald)'
                            : '1px solid var(--ds-border-subtle)',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.75rem',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--ds-font-mono)',
                              fontSize: '0.75rem',
                              color: 'var(--ds-cyan)',
                              padding: '2px 6px',
                              background: 'var(--ds-cyan-dim)',
                              borderRadius: '2px',
                            }}
                          >
                            TOPIC {moduleItem.moduleNumber}.{tIdx + 1}
                          </span>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {done ? (
                              <Tag type="green" size="sm">
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  <CheckmarkFilled size={12} /> Done
                                </span>
                              </Tag>
                            ) : (
                              <Tag type="cool-gray" size="sm">
                                ~{topic.estimatedMinutes}m
                              </Tag>
                            )}
                          </div>
                        </div>

                        <h3
                          style={{
                            fontSize: '1.0625rem',
                            fontWeight: 600,
                            color: 'var(--ds-text-primary)',
                            margin: '0 0 1rem 0',
                            lineHeight: 1.35,
                            flexGrow: 1,
                          }}
                        >
                          {topic.title}
                        </h3>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '0.75rem',
                            borderTop: '1px solid var(--ds-border-subtle)',
                            fontSize: '0.8125rem',
                            color: 'var(--ds-cyan)',
                            fontWeight: 500,
                          }}
                        >
                          <span>{done ? 'Review Topic' : 'Launch Interactive Lab'}</span>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Next / Prev Navigation */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--ds-border-subtle)',
              }}
            >
              <Link href="/" passHref legacyBehavior>
                <Button kind="secondary" renderIcon={ArrowLeft}>
                  Back to Dashboard
                </Button>
              </Link>

              {moduleItem.moduleNumber < courseConfig.modules.length && (
                <Link
                  href={`/modules/${courseConfig.modules[moduleItem.moduleNumber].id}`}
                  passHref
                  legacyBehavior
                >
                  <Button
                    kind="primary"
                    renderIcon={ArrowRight}
                    disabled={!isCompleted}
                  >
                    Next Module: Module {moduleItem.moduleNumber + 1}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
