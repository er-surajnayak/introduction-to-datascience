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

// Topic 1.3 Interactives Suite
import { VariableLab } from './interactives/VariableLab';
import { TypeDetective } from './interactives/TypeDetective';
import { TypeShiftTimeline } from './interactives/TypeShiftTimeline';
import { ConversionLab } from './interactives/ConversionLab';
import { NamingChecker } from './interactives/NamingChecker';
import { FromValueToDataset } from './interactives/FromValueToDataset';
import { StudentProfileBuilder } from './interactives/StudentProfileBuilder';

// Topic 1.4 Interactives Suite
import { ConditionChecker } from './interactives/ConditionChecker';
import { GradeDecisionTree } from './interactives/GradeDecisionTree';
import { BooleanPlayground } from './interactives/BooleanPlayground';
import { ForLoopVisualizer } from './interactives/ForLoopVisualizer';
import { RangeBuilder } from './interactives/RangeBuilder';
import { WhileLoopVisualizer } from './interactives/WhileLoopVisualizer';
import { BreakVsContinue } from './interactives/BreakVsContinue';
import { DryRunSimulator } from './interactives/DryRunSimulator';
import { AnalyzeTheClassChallenge } from './interactives/AnalyzeTheClassChallenge';

// Topic 1.5 Interactives Suite
import { FunctionAnatomy } from './interactives/FunctionAnatomy';
import { ParameterSlotMachine } from './interactives/ParameterSlotMachine';
import { PrintVsReturnLab } from './interactives/PrintVsReturnLab';
import { InteractiveFunctionBuilder } from './interactives/InteractiveFunctionBuilder';
import { DefaultParamPlayground } from './interactives/DefaultParamPlayground';
import { ArgumentOrderLab } from './interactives/ArgumentOrderLab';
import { ScopeVisualizer } from './interactives/ScopeVisualizer';
import { FunctionPipelineVisualizer } from './interactives/FunctionPipelineVisualizer';
import { DataScienceToolkitChallenge } from './interactives/DataScienceToolkitChallenge';

// Topic 1.6 Interactives Suite
import { CellTypeSorter } from './interactives/CellTypeSorter';
import { NotebookAnatomyExplorer } from './interactives/NotebookAnatomyExplorer';
import { ExecutionOrderLab } from './interactives/ExecutionOrderLab';
import { KernelStateVisualizer } from './interactives/KernelStateVisualizer';
import { JupyterSimulator } from './interactives/JupyterSimulator';
import { ReproducibilityLab } from './interactives/ReproducibilityLab';
import { NotebookDesignChallenge } from './interactives/NotebookDesignChallenge';

// Other Topic Interactives
import { NumpyVectorizationBenchmark } from './interactives/NumpyVectorizationBenchmark';

export function LessonLayout({ lesson }: { lesson: LessonContent }) {
  const pathname = usePathname();
  const { isTopicCompleted, modules } = useCourseProgress();
  const module1 = modules.find((m) => m.id === 'module-1');

  const isTopic1_1 = lesson.id === 'm1-t1' || lesson.slug === 'data-science-introduction';
  const isTopic1_2 = lesson.id === 'm1-t2' || lesson.slug === 'roles-and-tools-in-data-science';
  const isTopic1_3 = lesson.id === 'm1-t3' || lesson.slug === 'python-refresher-variables';
  const isTopic1_4 = lesson.id === 'm1-t4' || lesson.slug === 'control-structures';
  const isTopic1_5 = lesson.id === 'm1-t5' || lesson.slug === 'functions-and-modularity';
  const isTopic1_6 = lesson.id === 'm1-t6' || lesson.slug === 'introduction-to-jupyter-notebook';

  const renderInteractiveBlock = () => {
    switch (lesson.interactiveType) {
      case 'venn':
        return <DataScienceVenn />;
      case 'role-matrix':
      case 'variable-memory':
      case 'execution-flow':
      case 'function-transformer':
      case 'jupyter-runner':
        // For custom multi-step topics we render modular interactives in the stream
        return null;
      case 'numpy-benchmark':
        return <NumpyVectorizationBenchmark />;
      default:
        return null;
    }
  };

  return (
    <div style={{ background: 'var(--ds-bg-core)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="ds-container">
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Breadcrumb noTrailingSlash aria-label="Topic Navigation">
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

            {/* Topic 1.1 Interactive 1: Data -> Info -> Insight -> Decision */}
            {isTopic1_1 && <DataToDecisionTransformer />}

            {/* Topic 1.2 Interactive 1: Data Team Simulator */}
            {isTopic1_2 && <DataTeamSimulator />}

            {/* Topic 1.3 Interactive 1: Variable Lab */}
            {isTopic1_3 && <VariableLab />}

            {/* Topic 1.4 Interactive 1: Condition Checker */}
            {isTopic1_4 && <ConditionChecker />}

            {/* Topic 1.5 Interactive 1: Function Anatomy Explorer */}
            {isTopic1_5 && <FunctionAnatomy />}

            {/* Topic 1.6 Interactive 1: Cell Type Sorter (Code vs Markdown) */}
            {isTopic1_6 && <CellTypeSorter />}

            <ConceptSection
              coreConcept={lesson.coreConcept}
              technicalExplanation={lesson.technicalExplanation}
            />

            {/* Default Interactive Block */}
            {renderInteractiveBlock()}

            {/* Topic 1.1 Interactive 2: 9-Stage Iterative Lifecycle */}
            {isTopic1_1 && <LifecycleExplorer />}

            {/* Topic 1.2 Interactive 2: Role Pipeline Explorer */}
            {isTopic1_2 && <RolePipelineExplorer />}

            {/* Topic 1.3 Interactive 2: Type Detective */}
            {isTopic1_3 && <TypeDetective />}

            {/* Topic 1.4 Interactive 2: Grade Decision Playground (if/elif/else tree) */}
            {isTopic1_4 && <GradeDecisionTree />}

            {/* Topic 1.5 Interactive 2: Parameter Slot Machine */}
            {isTopic1_5 && <ParameterSlotMachine />}

            {/* Topic 1.6 Interactive 2: Notebook Anatomy Explorer */}
            {isTopic1_6 && <NotebookAnatomyExplorer />}

            {/* Topic 1.1 Interactive 3: 4 Types of Questions */}
            {isTopic1_1 && <QuestionTypesExplorer />}

            {/* Topic 1.2 Interactive 3: Tool Matcher */}
            {isTopic1_2 && <ToolMatcher />}

            {/* Topic 1.3 Interactive 3: Dynamic Typing Timeline */}
            {isTopic1_3 && <TypeShiftTimeline />}

            {/* Topic 1.4 Interactive 3: Boolean Logic & Short-Circuit Explorer */}
            {isTopic1_4 && <BooleanPlayground />}

            {/* Topic 1.5 Interactive 3: print() vs return Lab */}
            {isTopic1_5 && <PrintVsReturnLab />}

            {/* Topic 1.6 Interactive 3: Execution Order Lab */}
            {isTopic1_6 && <ExecutionOrderLab />}

            {/* Topic 1.1 Interactive 4: Real World Ecosystem */}
            {isTopic1_1 && <RealWorldShowcase />}

            {/* Topic 1.2 Interactive 4: Role + Tool Connection Matrix */}
            {isTopic1_2 && <RoleToolMatrix />}

            {/* Topic 1.3 Interactive 4: Type Conversion Workbench */}
            {isTopic1_3 && <ConversionLab />}

            {/* Topic 1.4 Interactive 4: For Loop Iterator Visualizer */}
            {isTopic1_4 && <ForLoopVisualizer />}

            {/* Topic 1.5 Interactive 4: Interactive Function Builder */}
            {isTopic1_5 && <InteractiveFunctionBuilder />}

            {/* Topic 1.6 Interactive 4: Kernel State Visualizer */}
            {isTopic1_6 && <KernelStateVisualizer />}

            {/* Topic 1.3 Interactive 5: Python Naming Checker */}
            {isTopic1_3 && <NamingChecker />}

            {/* Topic 1.4 Interactive 5: range() Sequence Generator */}
            {isTopic1_4 && <RangeBuilder />}

            {/* Topic 1.5 Interactive 5: Default Parameter Playground */}
            {isTopic1_5 && <DefaultParamPlayground />}

            {/* Topic 1.6 Interactive 5: Jupyter Primary Simulator */}
            {isTopic1_6 && <JupyterSimulator />}

            {/* Topic 1.4 Interactive 6: While Loop Simulator */}
            {isTopic1_4 && <WhileLoopVisualizer />}

            {/* Topic 1.5 Interactive 6: Positional vs Keyword Argument Mapper */}
            {isTopic1_5 && <ArgumentOrderLab />}

            {/* Topic 1.6 Interactive 6: Reproducibility Lab */}
            {isTopic1_6 && <ReproducibilityLab />}

            {/* Topic 1.4 Interactive 7: Break vs Continue Playground */}
            {isTopic1_4 && <BreakVsContinue />}

            {/* Topic 1.5 Interactive 7: Scope Visualizer */}
            {isTopic1_5 && <ScopeVisualizer />}

            {/* Code Examples Playground */}
            <CodePlayground examples={lesson.codeExamples} />

            {/* Topic 1.1 Interactive 5: Thinking Checklist */}
            {isTopic1_1 && <ThinkingChecklist />}

            {/* Topic 1.2 Interactive 5: Build Your Data Team Challenge */}
            {isTopic1_2 && <BuildYourDataTeam />}

            {/* Topic 1.3 Interactive 6: From Value To Dataset Bridge */}
            {isTopic1_3 && <FromValueToDataset />}

            {/* Topic 1.4 Interactive 8: Trace Table Simulator */}
            {isTopic1_4 && <DryRunSimulator />}

            {/* Topic 1.5 Interactive 8: Function Composition Pipeline */}
            {isTopic1_5 && <FunctionPipelineVisualizer />}

            {/* Topic 1.3 Mini Challenge: Build a Student Profile */}
            {isTopic1_3 && <StudentProfileBuilder />}

            {/* Topic 1.4 Mini Challenge: Analyze the Class */}
            {isTopic1_4 && <AnalyzeTheClassChallenge />}

            {/* Topic 1.5 Mini Challenge: Data Science Toolkit */}
            {isTopic1_5 && <DataScienceToolkitChallenge />}

            {/* Topic 1.6 Mini Challenge: Design Your First Data Science Notebook */}
            {isTopic1_6 && <NotebookDesignChallenge />}

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
