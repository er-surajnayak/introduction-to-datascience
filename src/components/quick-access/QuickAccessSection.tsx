'use client';

import React, { useState } from 'react';
import { Tag, Button, Modal } from '@carbon/react';
import {
  DocumentTasks,
  Events,
  ChatBot,
  TaskTools,
  ArrowRight,
  Locked,
  Information,
} from '@carbon/icons-react';
import { quickAccessItems } from '@/data/courseData';
import { QuickAccessItem } from '@/types/course';

const iconMap = {
  document: <DocumentTasks size={28} />,
  quiz: <Events size={28} />,
  chat: <ChatBot size={28} />,
  task: <TaskTools size={28} />,
};

export function QuickAccessSection() {
  const [selectedItem, setSelectedItem] = useState<QuickAccessItem | null>(null);

  return (
    <section
      id="quick-access"
      style={{
        padding: '5rem 0',
        background: 'var(--ds-bg-core)',
        borderBottom: '1px solid var(--ds-border-subtle)',
      }}
    >
      <div className="ds-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <Tag type="warm-gray" size="md" style={{ marginBottom: '1rem' }}>
            Interactive Ecosystem
          </Tag>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '0 0 1rem 0',
              lineHeight: 1.2,
            }}
          >
            Practice & Mastery Suite
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'var(--ds-text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Companion tools designed to reinforce engineering intuition, interview readiness, and hands-on coding mastery.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="ds-responsive-quick-grid">
          {quickAccessItems.map((item) => (
            <div
              key={item.id}
              className="ds-glass-panel"
              style={{
                padding: '1.75rem',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: '1px solid var(--ds-border-strong)',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.25rem',
                }}
              >
                <div
                  style={{
                    color: item.id === 'ask-di' ? 'var(--ds-cyan)' : 'var(--ds-text-muted)',
                    background: 'var(--ds-bg-surface-elevated)',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid var(--ds-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {iconMap[item.iconType]}
                </div>
                <Tag
                  type={item.id === 'ask-di' ? 'cyan' : 'cool-gray'}
                  size="sm"
                >
                  {item.badge}
                </Tag>
              </div>

              {/* Title & Category */}
              <div
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--ds-font-mono)',
                  color: 'var(--ds-text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                {item.category}
              </div>

              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--ds-text-primary)',
                  margin: '0 0 0.75rem 0',
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--ds-text-secondary)',
                  lineHeight: 1.5,
                  margin: '0 0 1.5rem 0',
                  flexGrow: 1,
                }}
              >
                {item.description}
              </p>

              {/* Action Button */}
              <Button
                kind="tertiary"
                size="md"
                renderIcon={Information}
                onClick={() => setSelectedItem(item)}
                style={{
                  width: '100%',
                  borderColor: 'var(--ds-border-subtle)',
                  color: 'var(--ds-text-primary)',
                  fontSize: '0.875rem',
                }}
              >
                Feature Preview
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Preview Modal */}
      <Modal
        open={!!selectedItem}
        modalHeading={selectedItem?.title || ''}
        primaryButtonText="Close Preview"
        onRequestClose={() => setSelectedItem(null)}
        onRequestSubmit={() => setSelectedItem(null)}
        size="sm"
      >
        <div style={{ padding: '1rem 0', color: 'var(--ds-text-secondary)' }}>
          <div style={{ marginBottom: '1rem' }}>
            <Tag type={selectedItem?.id === 'ask-di' ? 'cyan' : 'purple'} size="md">
              {selectedItem?.category} • {selectedItem?.badge}
            </Tag>
          </div>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            {selectedItem?.description}
          </p>
          <div
            style={{
              padding: '0.875rem 1rem',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--ds-border-subtle)',
              borderRadius: '4px',
              fontSize: '0.8125rem',
              color: '#8d8d8d',
            }}
          >
            <strong>Phase 2 Roadmap:</strong> This component architecture is fully wired and will become interactive as the foundational course modules are deployed.
          </div>
        </div>
      </Modal>
    </section>
  );
}
