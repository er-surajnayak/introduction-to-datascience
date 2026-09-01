'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@carbon/react';
import { ArrowLeft, Locked } from '@carbon/icons-react';
import { getModule1Lesson } from '@/data/lessons/module1';
import { LessonLayout } from '@/components/lessons/LessonLayout';
import { useCourseProgress } from '@/context/CourseProgressContext';

export default function TopicPage() {
  const params = useParams();
  const { moduleId, topicSlug } = params as { moduleId: string; topicSlug: string };
  const { isUnlocked } = useCourseProgress();

  const lesson = getModule1Lesson(topicSlug);
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
        <p style={{ color: 'var(--ds-text-secondary)', marginBottom: '2rem' }}>
          This topic belongs to a locked module. Complete prerequisite modules first to unlock.
        </p>
        <Link href="/" passHref legacyBehavior>
          <Button renderIcon={ArrowLeft}>Return to Dashboard</Button>
        </Link>
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
