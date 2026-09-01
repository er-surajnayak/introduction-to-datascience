'use client';

import React from 'react';
import { Locked } from '@carbon/icons-react';
import { Tag } from '@carbon/react';

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
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px dashed var(--ds-border-strong)',
        borderRadius: '3px',
        color: '#8d8d8d',
        fontSize: '0.8125rem',
      }}
    >
      <Locked size={16} style={{ color: '#8d8d8d', flexShrink: 0 }} />
      <span>
        {unlockConditionText ||
          (prerequisites && prerequisites.length > 0
            ? `Prerequisite: Complete ${prerequisites.join(', ')}`
            : 'Unlocks sequentially after previous module completion.')}
      </span>
    </div>
  );
}
