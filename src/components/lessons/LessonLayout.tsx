'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, Tag, ProgressBar } from '@carbon/react';
import { CheckmarkFilled, Locked, PlayFilledAlt, Time, Catalog } from '@carbon/icons-react';
import { LessonContent } from '@/types/lesson';
import { module1LessonList } from '@/data/lessons/module1';
import { useCourseProgress } from '@/context/CourseProgressContext';

import { LessonHero } from './LessonHero';
import { StorySection } from './StorySection';
import { ConceptSection } from './ConceptSection';
import { CodePlayground } from './CodePlayground';
import { CommonMistakes } from './CommonMistakes';
import { ThinkingApproach } from './ThinkingApproach';
import { InteractiveQuiz } from './InteractiveQuiz';
import { TopicSummary } from './TopicSummary';

// Topic 1.1 Interactives Suite
import { DataToDecisionTransformer } from './interactives/DataToDecisionTransformer';
import { LifecycleExplorer } from './interactives/LifecycleExplorer';
import { QuestionTypesExplorer } from './interactives/QuestionTypesExplorer';
import { RealWorldShowcase } from './interactives/RealWorldShowcase';
import { ThinkingChecklist } from './interactives/ThinkingChecklist';
import { DataScienceVenn } from './interactives/DataScienceVenn';

// Other Topic Interactives
import { RoleMatrixExplorer } from './interactives/RoleMatrixExplorer';
import { VariableMemoryInspector } from './interactives/VariableMemoryInspector';
import { ExecutionFlowSimulator } from './interactives/ExecutionFlowSimulator';
import { FunctionTransformer } from './interactives/FunctionTransformer';
import { JupyterCellRunner } from './interactives/JupyterCellRunner';
import { NumpyVectorizationBenchmark } from './interactives/NumpyVectorizationBenchmark';

export function LessonLayout({ lesson }: { lesson: LessonContent }) {
  const pathname = usePathname();
  const { isTopicCompleted, modules } = useCourseProgress();
  const module1 = modules.find((m) => m.id === 'module-1');

  const isTopic1_1 = lesson.id === 'm1-t1' || lesson.slug === 'data-science-introduction';

  const renderInteractiveBlock = () => {
    switch (lesson.interactiveType) {
      case 'venn':
        return <DataScienceVenn />;
      case 'role-matrix':
        return <RoleMatrixExplorer />;
      case 'variable-memory':
        return <VariableMemoryInspector />;
      case 'execution-flow':
        return <ExecutionFlowSimulator />;
      case 'function-transformer':
        return <FunctionTransformer />;
      case 'jupyter-runner':
        return <JupyterCellRunner />;
      case 'numpy-benchmark':
        return <NumpyVectorizationBenchmark />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '2rem 0 6rem 0', background: 'var(--cds-background)', minHeight: '90vh' }}>
      <div className="ds-container">
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Breadcrumb noTrailingSlash aria-label="Breadcrumb navigation">
            <BreadcrumbItem>
              <Link href="/">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="/modules/module-1">Module 1: Introduction</Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              Topic {lesson.topicNumber}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        {/* 2-Column Layout: Sidebar + Lesson Body */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 300px',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Main Lesson Content Stream */}
          <div style={{ minWidth: 0 }}>
            <LessonHero lesson={lesson} />
            <StorySection hook={lesson.hook} />

            {/* Special Topic 1.1 Interactive Experience 1: Data -> Info -> Insight -> Decision */}
            {isTopic1_1 && <DataToDecisionTransformer />}

            <ConceptSection
              coreConcept={lesson.coreConcept}
              technicalExplanation={lesson.technicalExplanation}
            />

            {/* Interactive Block for Topic (e.g. Venn Diagram for 1.1, Memory for 1.3, etc.) */}
            {renderInteractiveBlock()}

            {/* Special Topic 1.1 Interactive Experience 2: 9-Stage Iterative Lifecycle */}
            {isTopic1_1 && <LifecycleExplorer />}

            {/* Special Topic 1.1 Interactive Experience 3: 4 Types of Questions */}
            {isTopic1_1 && <QuestionTypesExplorer />}

            {/* Special Topic 1.1 Interactive Experience 4: Real World Ecosystem */}
            {isTopic1_1 && <RealWorldShowcase />}

            {/* Code Examples Playground */}
            <CodePlayground examples={lesson.codeExamples} />

            {/* Special Topic 1.1 Interactive Experience 5: Thinking Like a Data Scientist 7-Step Checklist */}
            {isTopic1_1 && <ThinkingChecklist />}

            <CommonMistakes mistakes={lesson.commonMistakes} />
            <ThinkingApproach strategies={lesson.thinkingStrategies} />
            <InteractiveQuiz questions={lesson.quiz} />
            <TopicSummary lesson={lesson} />
          </div>

          {/* Sticky Topic Navigation Sidebar */}
          <aside
            style={{
              position: 'sticky',
              top: '5.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Module Progress Card */}
            <div
              className="ds-glass-panel"
              style={{
                padding: '1.25rem',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-strong)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                  Module 1 Progress
                </span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                  {module1?.progress || 0}%
                </span>
              </div>
              <ProgressBar
                value={module1?.progress || 0}
                max={100}
                size="small"
                hideLabel
                label="Module 1 Progress"
                status={module1?.progress === 100 ? 'finished' : 'active'}
              />
            </div>

            {/* Topics Syllabus List */}
            <div
              className="ds-glass-panel"
              style={{
                padding: '1.25rem',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Catalog size={16} style={{ color: 'var(--ds-cyan)' }} />
                <span>Module 1 Topics (7)</span>
              </div>

              <nav aria-label="Topic navigation">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {module1LessonList.map((top) => {
                    const isCurrent = top.slug === lesson.slug;
                    const isDone = isTopicCompleted(top.id);

                    return (
                      <li key={top.id}>
                        <Link
                          href={`/modules/module-1/${top.slug}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 10px',
                            background: isCurrent
                              ? 'var(--ds-cyan-dim)'
                              : 'var(--cds-layer-02)',
                            border: isCurrent
                              ? '1.5px solid var(--ds-cyan)'
                              : '1px solid var(--ds-border-subtle)',
                            borderRadius: '3px',
                            textDecoration: 'none',
                            fontSize: '0.8125rem',
                            color: isCurrent
                              ? 'var(--ds-cyan)'
                              : isDone
                              ? 'var(--ds-emerald)'
                              : 'var(--ds-text-secondary)',
                            fontWeight: isCurrent ? 600 : 400,
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem' }}>{top.topicNumber}</span>
                            <span>{top.title}</span>
                          </span>

                          {isDone ? (
                            <CheckmarkFilled size={14} style={{ color: 'var(--ds-emerald)', flexShrink: 0 }} />
                          ) : isCurrent ? (
                            <PlayFilledAlt size={12} style={{ color: 'var(--ds-cyan)', flexShrink: 0 }} />
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
