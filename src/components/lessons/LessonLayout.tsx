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

// Topic 1.2 Interactives Suite
import { DataTeamSimulator } from './interactives/DataTeamSimulator';
import { RolePipelineExplorer } from './interactives/RolePipelineExplorer';
import { ToolMatcher } from './interactives/ToolMatcher';
import { RoleToolMatrix } from './interactives/RoleToolMatrix';
import { BuildYourDataTeam } from './interactives/BuildYourDataTeam';

// Other Topic Interactives
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
  const isTopic1_2 = lesson.id === 'm1-t2' || lesson.slug === 'roles-and-tools-in-data-science';

  const renderInteractiveBlock = () => {
    switch (lesson.interactiveType) {
      case 'venn':
        return <DataScienceVenn />;
      case 'role-matrix':
        // For Topic 1.2 we render the comprehensive RoleToolMatrix in the flow
        return null;
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
        <div className="ds-lesson-layout-grid">
          {/* Main Lesson Content Stream */}
          <div style={{ minWidth: 0 }}>
            <LessonHero lesson={lesson} />
            <StorySection hook={lesson.hook} />

            {/* Topic 1.1 Interactive Experience 1: Data -> Info -> Insight -> Decision */}
            {isTopic1_1 && <DataToDecisionTransformer />}

            {/* Topic 1.2 Interactive Experience 1: Data Team Simulator */}
            {isTopic1_2 && <DataTeamSimulator />}

            <ConceptSection
              coreConcept={lesson.coreConcept}
              technicalExplanation={lesson.technicalExplanation}
            />

            {/* Interactive Block for Topic (e.g. Venn Diagram for 1.1, Memory for 1.3, etc.) */}
            {renderInteractiveBlock()}

            {/* Topic 1.1 Interactive Experience 2: 9-Stage Iterative Lifecycle */}
            {isTopic1_1 && <LifecycleExplorer />}

            {/* Topic 1.2 Interactive Experience 2: Role Pipeline Explorer */}
            {isTopic1_2 && <RolePipelineExplorer />}

            {/* Topic 1.1 Interactive Experience 3: 4 Types of Questions */}
            {isTopic1_1 && <QuestionTypesExplorer />}

            {/* Topic 1.2 Interactive Experience 3: Tool Matcher */}
            {isTopic1_2 && <ToolMatcher />}

            {/* Topic 1.1 Interactive Experience 4: Real World Ecosystem */}
            {isTopic1_1 && <RealWorldShowcase />}

            {/* Topic 1.2 Interactive Experience 4: Role + Tool Connection Matrix */}
            {isTopic1_2 && <RoleToolMatrix />}

            {/* Code Examples Playground */}
            <CodePlayground examples={lesson.codeExamples} />

            {/* Topic 1.1 Interactive Experience 5: Thinking Checklist */}
            {isTopic1_1 && <ThinkingChecklist />}

            {/* Topic 1.2 Interactive Experience 5: Build Your Data Team Challenge */}
            {isTopic1_2 && <BuildYourDataTeam />}

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
                label="Module 1"
              />
            </div>

            {/* Topics Syllabus Accordion */}
            <div
              className="ds-glass-panel"
              style={{
                borderRadius: '4px',
                border: '1px solid var(--ds-border-strong)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '0.875rem 1rem',
                  borderBottom: '1px solid var(--ds-border-subtle)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--ds-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Catalog size={16} style={{ color: 'var(--ds-cyan)' }} />
                <span>Module 1 Topics (7)</span>
              </div>

              <div style={{ padding: '0.5rem 0' }}>
                {module1LessonList.map((top, idx) => {
                  const isCurrent = top.slug === lesson.slug;
                  const isDone = isTopicCompleted(top.id);

                  return (
                    <Link
                      key={top.id}
                      href={`/modules/module-1/${top.slug}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.625rem 1rem',
                        background: isCurrent ? 'var(--ds-cyan-dim)' : 'transparent',
                        borderLeft: isCurrent ? '3px solid var(--ds-cyan)' : '3px solid transparent',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                        <span
                          style={{
                            fontFamily: 'var(--ds-font-mono)',
                            fontSize: '0.75rem',
                            color: isCurrent ? 'var(--ds-cyan)' : 'var(--ds-text-muted)',
                            flexShrink: 0,
                          }}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          style={{
                            fontSize: '0.8125rem',
                            fontWeight: isCurrent ? 600 : 400,
                            color: isCurrent ? 'var(--ds-text-primary)' : 'var(--ds-text-secondary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {top.title}
                        </span>
                      </div>

                      <div style={{ flexShrink: 0, marginLeft: '6px' }}>
                        {isDone ? (
                          <CheckmarkFilled size={14} style={{ color: 'var(--ds-emerald)' }} />
                        ) : isCurrent ? (
                          <PlayFilledAlt size={12} style={{ color: 'var(--ds-cyan)' }} />
                        ) : null}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
