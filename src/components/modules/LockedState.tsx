'use client';

import React from 'react';
import { Locked } from '@carbon/icons-react';

interface LockedStateProps {
  prerequisites?: string[];
  unlockConditionText?: string;
}

export function LockedState({ prerequisites, unlockConditionText }: LockedStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0.625rem 0.875rem',
        background: 'var(--ds-bg-surface-elevated)',
        border: '1px dashed var(--ds-border-strong)',
        borderRadius: '3px',
        color: 'var(--ds-text-secondary)',
        fontSize: '0.8125rem',
      }}
    >
      <Locked size={16} style={{ color: 'var(--ds-text-muted)', flexShrink: 0 }} />
      <span>
        {unlockConditionText ||
          (prerequisites && prerequisites.length > 0
            ? `Prerequisite: Complete ${prerequisites.join(', ')}`
            : 'Unlocks sequentially after previous module completion.')}
      </span>
    </div>
  );
}
