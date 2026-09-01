'use client';

import React, { useState } from 'react';
import { Tag, ContentSwitcher, Switch } from '@carbon/react';
import { useCourseProgress } from '@/context/CourseProgressContext';
import { ModuleCard } from './ModuleCard';

export function ModuleGrid() {
  const { modules } = useCourseProgress();
  const [filter, setFilter] = useState<'all' | 'available' | 'locked'>('all');

  const filteredModules = modules.filter((m) => {
    if (filter === 'available') {
      return m.status === 'available' || m.status === 'in-progress' || m.status === 'completed';
    }
    if (filter === 'locked') {
      return m.status === 'locked';
    }
    return true;
  });

  return (
    <section
      id="modules"
      style={{
        padding: '5rem 0',
        background: 'var(--ds-bg-core)',
        borderBottom: '1px solid var(--ds-border-subtle)',
      }}
    >
      <div className="ds-container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          <div>
            <Tag type="purple" size="md" style={{ marginBottom: '0.75rem' }}>
              Core Curriculum
            </Tag>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 600,
                color: 'var(--ds-text-primary)',
                margin: '0 0 0.5rem 0',
                lineHeight: 1.2,
              }}
            >
              5 Guided Course Modules
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--ds-text-secondary)',
                maxWidth: '650px',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Progress step-by-step through interactive concepts. Complete hands-on checks in each module to unlock the next domain.
            </p>
          </div>

          {/* Filter Switcher */}
          <div>
            <ContentSwitcher
              onChange={({ name }) => setFilter(name as 'all' | 'available' | 'locked')}
              size="md"
            >
              <Switch name="all" text={`All (${modules.length})`} />
              <Switch
                name="available"
                text={`Available (${modules.filter((m) => m.status !== 'locked').length})`}
              />
              <Switch
                name="locked"
                text={`Locked (${modules.filter((m) => m.status === 'locked').length})`}
              />
            </ContentSwitcher>
          </div>
        </div>

        {/* 5-Module Card Grid */}
        <div className="ds-responsive-module-grid">
          {filteredModules.map((module, idx) => (
            <ModuleCard key={module.id} module={module} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
