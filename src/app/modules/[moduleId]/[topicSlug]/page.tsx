'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@carbon/react';
import { ArrowLeft, Locked, CheckmarkFilled } from '@carbon/icons-react';
import { getModule1Lesson } from '@/data/lessons/module1';
import { getModule2Lesson } from '@/data/lessons/module2';
import { LessonLayout } from '@/components/lessons/LessonLayout';
import { useCourseProgress } from '@/context/CourseProgressContext';

export default function TopicPage() {
  const params = useParams();
  const { moduleId, topicSlug } = params as { moduleId: string; topicSlug: string };
  const { isUnlocked, completeModule } = useCourseProgress();

  let lesson = undefined;
  if (moduleId === 'module-1') {
    lesson = getModule1Lesson(topicSlug);
  } else if (moduleId === 'module-2') {
    lesson = getModule2Lesson(topicSlug);
  } else {
    lesson = getModule1Lesson(topicSlug) || getModule2Lesson(topicSlug);
  }

  const isModUnlocked = isUnlocked(moduleId);

  if (!isModUnlocked) {
    return (
      <div className="ds-container" style={{ padding: '6rem 0', textAlign: 'center' }}>
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
        <h1 style={{ color: 'var(--ds-text-primary)', marginBottom: '1rem' }}>Module Locked</h1>
        <p style={{ color: 'var(--ds-text-secondary)', marginBottom: '2rem', maxWidth: '520px', margin: '0 auto 2rem auto' }}>
          This topic belongs to a locked module. Complete prerequisite modules first to unlock, or unlock directly to test this topic.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {moduleId === 'module-2' && (
            <Button
              kind="secondary"
              renderIcon={CheckmarkFilled}
              onClick={() => completeModule('module-1')}
            >
              Unlock Module 2 (Complete Prerequisite)
            </Button>
          )}
          <Link href="/" passHref legacyBehavior>
            <Button renderIcon={ArrowLeft}>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="ds-container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--ds-text-primary)', marginBottom: '1rem' }}>Topic Not Found</h1>
        <p style={{ color: 'var(--ds-text-secondary)', marginBottom: '2rem' }}>
          The requested topic identifier &ldquo;{topicSlug}&rdquo; does not exist.
        </p>
        <Link href={`/modules/${moduleId}`} passHref legacyBehavior>
          <Button renderIcon={ArrowLeft}>Back to Module</Button>
        </Link>
      </div>
    );
  }

  return <LessonLayout lesson={lesson} />;
}
