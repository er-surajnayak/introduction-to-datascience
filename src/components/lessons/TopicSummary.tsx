'use client';

import React from 'react';
import Link from 'next/link';
import { Tag, Button } from '@carbon/react';
import { CheckmarkFilled, ArrowRight, ArrowLeft, Catalog } from '@carbon/icons-react';
import { LessonContent } from '@/types/lesson';
import { useCourseProgress } from '@/context/CourseProgressContext';

export function TopicSummary({ lesson }: { lesson: LessonContent }) {
  const { isTopicCompleted, toggleTopicCompletion } = useCourseProgress();
  const isDone = isTopicCompleted(lesson.id);

  return (
    <section
      style={{
        padding: '2.5rem 0',
        borderTop: '1px solid var(--ds-border-subtle)',
        marginTop: '2rem',
      }}
    >
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
            <Tag type="green" size="md">
              Key Takeaways
            </Tag>
            <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
              Summary of Topic {lesson.topicNumber}
            </span>
          </div>

          <Button
            kind={isDone ? 'secondary' : 'primary'}
            size="md"
            renderIcon={CheckmarkFilled}
            onClick={() => toggleTopicCompletion(lesson.moduleId, lesson.id)}
            style={{
              backgroundColor: isDone ? undefined : '#198038',
            }}
          >
            {isDone ? 'Mark as Incomplete' : 'Mark Topic as Completed'}
          </Button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {lesson.summary.takeaways.map((point, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9375rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5 }}>
              <CheckmarkFilled size={16} style={{ color: 'var(--ds-emerald)', flexShrink: 0, marginTop: '3px' }} />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div style={{ fontSize: '0.875rem', color: 'var(--ds-cyan)', fontWeight: 500 }}>
          Next Up: {lesson.summary.nextUpText}
        </div>
      </div>

      {/* Bottom Prev / Next Navigation Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {lesson.prevTopic ? (
          <Link href={`/modules/${lesson.moduleId}/${lesson.prevTopic.slug}`} passHref legacyBehavior>
            <Button kind="secondary" renderIcon={ArrowLeft}>
              Prev: {lesson.prevTopic.title}
            </Button>
          </Link>
        ) : (
          <Link href={`/modules/${lesson.moduleId}`} passHref legacyBehavior>
            <Button kind="secondary" renderIcon={Catalog}>
              Module 1 Overview
            </Button>
          </Link>
        )}

        {lesson.nextTopic ? (
          <Link href={`/modules/${lesson.moduleId}/${lesson.nextTopic.slug}`} passHref legacyBehavior>
            <Button kind="primary" renderIcon={ArrowRight} style={{ backgroundColor: '#0f62fe' }}>
              Next: {lesson.nextTopic.title}
            </Button>
          </Link>
        ) : (
          <Link href={`/modules/${lesson.moduleId}`} passHref legacyBehavior>
            <Button kind="primary" renderIcon={CheckmarkFilled} style={{ backgroundColor: '#198038' }}>
              Complete Module 1
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
