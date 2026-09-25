'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, Tag, Button } from '@carbon/react';
import { ArrowLeft, Document, CheckmarkFilled, Catalog } from '@carbon/icons-react';
import { allQuestionBanks, getQuestionBankByModuleId } from '@/data/questionBanks';
import { ModuleQuestionBankView } from '@/components/question-bank/ModuleQuestionBankView';

export default function QuestionBankPage() {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('module-1');

  const activeQuestionBank = getQuestionBankByModuleId(selectedModuleId) || allQuestionBanks['module-1'];

  return (
    <div style={{ padding: '3rem 0 6rem 0', background: 'var(--cds-background)', minHeight: '85vh' }}>
      <div className="ds-container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem' }}>
          <Breadcrumb noTrailingSlash aria-label="Breadcrumb navigation">
            <BreadcrumbItem>
              <Link href="/">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Question Bank</BreadcrumbItem>
          </Breadcrumb>
        </div>

        {/* Hero Header */}
        <div
          className="ds-glass-panel"
          style={{
            padding: '2.5rem 2rem',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            marginBottom: '2.5rem',
            background: 'var(--ds-bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Tag type="purple" size="md">Exam Prep Portal</Tag>
            <Tag type="cyan" size="md">Semester &amp; Placement Bank</Tag>
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ds-text-primary)', margin: '0 0 0.5rem 0' }}>
            University Question Bank &amp; Solutions
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--ds-text-secondary)', maxWidth: '780px', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
            Comprehensive question repository categorized by Part A (3-Mark conceptual &amp; code questions) and Part B (14-Mark long-form architectural essays &amp; lifecycle case studies) with step-by-step marking keys.
          </p>

          {/* Module Selector Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedModuleId('module-1')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedModuleId === 'module-1' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: selectedModuleId === 'module-1' ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-core)',
                color: selectedModuleId === 'module-1' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
                transition: 'all 0.15s ease',
              }}
            >
              Unit 1: Introduction to Data Science (47 Questions)
            </button>
            <button
              onClick={() => setSelectedModuleId('module-2')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedModuleId === 'module-2' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: selectedModuleId === 'module-2' ? 'var(--ds-cyan-dim)' : 'var(--ds-bg-core)',
                color: selectedModuleId === 'module-2' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
                transition: 'all 0.15s ease',
              }}
            >
              Unit 2: Data Collection and Preprocessing (107 Questions)
            </button>
            <button
              disabled
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'not-allowed',
                border: '1px dashed var(--ds-border-subtle)',
                background: 'transparent',
                color: 'var(--ds-text-muted)',
                opacity: 0.6,
              }}
            >
              Unit 3: Exploratory Data Analysis (Coming Soon)
            </button>
          </div>
        </div>

        {/* Render Question Bank Component */}
        {activeQuestionBank && (
          <ModuleQuestionBankView questionBank={activeQuestionBank} />
        )}

        {/* Return Button */}
        <div style={{ marginTop: '2rem' }}>
          <Link href="/" passHref legacyBehavior>
            <Button kind="secondary" renderIcon={ArrowLeft}>
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
