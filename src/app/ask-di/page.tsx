'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, Tag, Button } from '@carbon/react';
import { ArrowLeft, Document, Bot, Help, Code, CheckmarkFilled, Security } from '@carbon/icons-react';
import { AskDIChat } from '@/components/ask-di/AskDIChat';

export default function AskDIPage() {
  return (
    <div style={{ padding: '3rem 0 6rem 0', background: 'var(--cds-background)', minHeight: '90vh' }}>
      <div className="ds-container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem' }}>
          <Breadcrumb noTrailingSlash aria-label="Breadcrumb navigation">
            <BreadcrumbItem>
              <Link href="/">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Ask DI Assistant</BreadcrumbItem>
          </Breadcrumb>
        </div>

        {/* Hero Header */}
        <div
          className="ds-glass-panel"
          style={{
            padding: '2.5rem 2rem',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            marginBottom: '2rem',
            background: 'var(--ds-bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <Tag type="cyan" size="md">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Bot size={14} /> AI Teaching Assistant
              </span>
            </Tag>
            <Tag type="purple" size="md">DS-201 Course Companion</Tag>
            <Tag type="green" size="md">Online &amp; Active</Tag>
          </div>

          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--ds-text-primary)', margin: '0 0 0.5rem 0' }}>
            Ask DI — Interactive Data Science AI Mentor
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--ds-text-secondary)', maxWidth: '820px', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
            Ask questions on Python syntax, NumPy vectorization, Pandas operations, missing value imputation, outlier detection formulas, and EDA.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              background: 'var(--ds-bg-core)',
              borderRadius: '4px',
              borderLeft: '4px solid var(--ds-cyan)',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-secondary)',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--ds-cyan)', fontWeight: 600 }}>
              <Security size={16} /> Strict Subject Guardrail:
            </span>
            <span>
              Ask DI is restricted exclusively to the <strong>DS-201 Data Science syllabus</strong>. Non-syllabus or general trivia requests will be politely declined.
            </span>
          </div>
        </div>

        {/* Chat UI */}
        <div style={{ marginBottom: '2.5rem' }}>
          <AskDIChat />
        </div>

        {/* Quick Navigation Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/" passHref legacyBehavior>
            <Button kind="secondary" renderIcon={ArrowLeft}>
              Back to Dashboard
            </Button>
          </Link>

          <Link href="/question-bank" passHref legacyBehavior>
            <Button kind="tertiary" renderIcon={Document}>
              Explore University Question Bank
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
