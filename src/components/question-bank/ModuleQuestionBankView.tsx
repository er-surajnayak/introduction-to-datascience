'use client';

import React, { useState, useMemo } from 'react';
import { Tag, Button, Search } from '@carbon/react';
import {
  Document,
  Copy,
  Checkmark,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkFilled,
  Code,
  ListBulleted,
  Help,
  Idea,
} from '@carbon/icons-react';
import { ModuleQuestionBank, QuestionBankItem } from '@/data/questionBanks';

interface Props {
  questionBank: ModuleQuestionBank;
}

export function ModuleQuestionBankView({ questionBank }: Props) {
  const [activePart, setActivePart] = useState<'ALL' | 'A' | 'B' | 'C'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const allQuestions = useMemo(() => {
    return [
      ...questionBank.partAQuestions,
      ...questionBank.partBQuestions,
      ...(questionBank.partCQuestions || []),
    ];
  }, [questionBank]);

  const partACount = questionBank.partAQuestions?.length || 0;
  const partBCount = questionBank.partBQuestions?.length || 0;
  const partCCount = questionBank.partCQuestions?.length || 0;

  const partAMarks = questionBank.partAQuestions?.[0]?.marks || 3;
  const partBMarks = questionBank.partBQuestions?.[0]?.marks || (partCCount > 0 ? 5 : 14);
  const partCMarks = questionBank.partCQuestions?.[0]?.marks || 14;

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      // Part filter
      if (activePart !== 'ALL' && q.part !== activePart) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQ = q.question.toLowerCase().includes(query);
        const matchesTag = q.topicTag.toLowerCase().includes(query);
        const matchesSummary = q.modelAnswer.shortSummary?.toLowerCase().includes(query) || false;
        const matchesPoints = q.modelAnswer.keyPoints?.some((p) => p.toLowerCase().includes(query)) || false;
        return matchesQ || matchesTag || matchesSummary || matchesPoints;
      }
      return true;
    });
  }, [allQuestions, activePart, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    filteredQuestions.forEach((q) => {
      allExpanded[q.id] = true;
    });
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyCodeToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => {
      setCopiedCodeId(null);
    }, 2000);
  };

  const bookmarkedCount = Object.values(bookmarkedIds).filter(Boolean).length;

  const getPartColor = (part: 'A' | 'B' | 'C') => {
    if (part === 'A') return { text: 'var(--ds-cyan)', bg: 'var(--ds-cyan-dim)', border: 'var(--ds-cyan)', tagType: 'cyan' as const };
    if (part === 'B') return { text: 'var(--ds-purple)', bg: 'rgba(138, 63, 252, 0.15)', border: 'var(--ds-purple)', tagType: 'purple' as const };
    return { text: '#ff7eb6', bg: 'rgba(255, 126, 182, 0.15)', border: '#ff7eb6', tagType: 'magenta' as const };
  };

  return (
    <div
      id="question-bank"
      className="ds-glass-panel"
      style={{
        padding: '2rem 1.5rem',
        borderRadius: '4px',
        border: '1px solid var(--ds-border-strong)',
        marginBottom: '3rem',
        background: 'var(--ds-bg-surface)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Document size={22} style={{ color: 'var(--ds-cyan)' }} />
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ds-text-primary)', margin: 0 }}>
              {questionBank.unitName} — Question Bank
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-text-secondary)' }}>
            Curated university semester exam questions with structured model answers, key scoring points, and verified Python/NumPy/Pandas code solutions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {partACount > 0 && (
            <Tag type="cyan" size="md">Part A: {partACount} Qs ({partAMarks} Marks)</Tag>
          )}
          {partBCount > 0 && (
            <Tag type="purple" size="md">Part B: {partBCount} Qs ({partBMarks} Marks)</Tag>
          )}
          {partCCount > 0 && (
            <Tag type="magenta" size="md">Part C: {partCCount} Qs ({partCMarks} Marks)</Tag>
          )}
          {bookmarkedCount > 0 && (
            <Tag type="green" size="md">{bookmarkedCount} Bookmarked</Tag>
          )}
        </div>
      </div>

      {/* Control Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '1rem',
          background: 'var(--ds-bg-core)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-subtle)',
          marginBottom: '1.5rem',
        }}
      >
        {/* Part Filter Buttons */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-secondary)', marginRight: '4px' }}>
            Section Filter:
          </span>
          <button
            onClick={() => setActivePart('ALL')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: activePart === 'ALL' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
              background: activePart === 'ALL' ? 'var(--ds-cyan-dim)' : 'transparent',
              color: activePart === 'ALL' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
              transition: 'all 0.15s ease',
            }}
          >
            All Questions ({allQuestions.length})
          </button>
          {partACount > 0 && (
            <button
              onClick={() => setActivePart('A')}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: activePart === 'A' ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-subtle)',
                background: activePart === 'A' ? 'var(--ds-cyan-dim)' : 'transparent',
                color: activePart === 'A' ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
                transition: 'all 0.15s ease',
              }}
            >
              Part A ({partAMarks} Marks) — {partACount} Qs
            </button>
          )}
          {partBCount > 0 && (
            <button
              onClick={() => setActivePart('B')}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: activePart === 'B' ? '1px solid var(--ds-purple)' : '1px solid var(--ds-border-subtle)',
                background: activePart === 'B' ? 'rgba(138, 63, 252, 0.15)' : 'transparent',
                color: activePart === 'B' ? 'var(--ds-purple)' : 'var(--ds-text-secondary)',
                transition: 'all 0.15s ease',
              }}
            >
              Part B ({partBMarks} Marks) — {partBCount} Qs
            </button>
          )}
          {partCCount > 0 && (
            <button
              onClick={() => setActivePart('C')}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: activePart === 'C' ? '1px solid #ff7eb6' : '1px solid var(--ds-border-subtle)',
                background: activePart === 'C' ? 'rgba(255, 126, 182, 0.15)' : 'transparent',
                color: activePart === 'C' ? '#ff7eb6' : 'var(--ds-text-secondary)',
                transition: 'all 0.15s ease',
              }}
            >
              Part C ({partCMarks} Marks) — {partCCount} Qs
            </button>
          )}
        </div>

        {/* Global Expand/Collapse */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm" kind="ghost" onClick={expandAll}>
            Expand All
          </Button>
          <Button size="sm" kind="ghost" onClick={collapseAll}>
            Collapse All
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Search
          id="qb-search"
          labelText=""
          placeholder="Search question keywords (e.g. APIs, Web Scraping, Missing Values, Outliers, IQR, NumPy, Pandas, GroupBy, Merging)..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          size="md"
        />
      </div>

      {/* Questions List */}
      {filteredQuestions.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredQuestions.map((q) => {
            const isExpanded = !!expandedIds[q.id];
            const isBookmarked = !!bookmarkedIds[q.id];
            const partColor = getPartColor(q.part);

            return (
              <div
                key={q.id}
                style={{
                  borderRadius: '4px',
                  border: isExpanded
                    ? '1px solid var(--ds-border-strong)'
                    : '1px solid var(--ds-border-subtle)',
                  background: 'var(--ds-bg-core)',
                  transition: 'all 0.15s ease',
                  overflow: 'hidden',
                }}
              >
                {/* Question Header Card */}
                <div
                  onClick={() => toggleExpand(q.id)}
                  style={{
                    padding: '1rem 1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                    background: isExpanded ? 'var(--cds-layer-02)' : 'transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flexGrow: 1 }}>
                    <span
                      style={{
                        fontFamily: 'var(--ds-font-mono)',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: partColor.text,
                        padding: '3px 8px',
                        background: partColor.bg,
                        borderRadius: '3px',
                        whiteSpace: 'nowrap',
                        marginTop: '2px',
                      }}
                    >
                      {`Part ${q.part} Q${q.questionNumber}`}
                    </span>

                    <div style={{ flexGrow: 1 }}>
                      <h3
                        style={{
                          fontSize: '0.9375rem',
                          fontWeight: 600,
                          color: 'var(--ds-text-primary)',
                          margin: '0 0 6px 0',
                          lineHeight: 1.45,
                        }}
                      >
                        {q.question}
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <Tag type={partColor.tagType} size="sm">
                          {q.marks} Marks
                        </Tag>
                        <Tag type="warm-gray" size="sm">
                          {q.topicTag}
                        </Tag>
                        {q.modelAnswer.codeSnippet && (
                          <Tag type="teal" size="sm">
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Code size={12} /> Code Solution
                            </span>
                          </Tag>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Expand Chevron */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(q.id);
                      }}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: isBookmarked ? 'var(--ds-amber)' : 'var(--ds-text-muted)',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {isBookmarked ? <BookmarkFilled size={18} /> : <Bookmark size={18} />}
                    </button>
                    <div style={{ color: 'var(--ds-text-muted)' }}>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Model Solution Body */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '1.25rem',
                      borderTop: '1px solid var(--ds-border-subtle)',
                      background: 'var(--ds-bg-surface)',
                    }}
                  >
                    {/* Short Summary if exists */}
                    {q.modelAnswer.shortSummary && (
                      <div
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '4px',
                          background: 'rgba(15, 98, 254, 0.08)',
                          borderLeft: '4px solid var(--ds-cyan)',
                          fontSize: '0.875rem',
                          color: 'var(--ds-text-primary)',
                          marginBottom: '1rem',
                          lineHeight: 1.6,
                        }}
                      >
                        <strong>Core Definition / Summary:</strong> {q.modelAnswer.shortSummary}
                      </div>
                    )}

                    {/* Diagram / Sequential Steps for Part B */}
                    {q.modelAnswer.diagramOrSteps && (
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-purple)', marginBottom: '6px', textTransform: 'uppercase' }}>
                          Architectural Steps / Lifecycle Framework:
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {q.modelAnswer.diagramOrSteps.map((step, sIdx) => (
                            <div
                              key={sIdx}
                              style={{
                                padding: '8px 12px',
                                background: 'var(--cds-layer-02)',
                                borderRadius: '4px',
                                borderLeft: '3px solid var(--ds-purple)',
                                fontSize: '0.8125rem',
                                color: 'var(--ds-text-primary)',
                                lineHeight: 1.5,
                              }}
                            >
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Marking Points List */}
                    {q.modelAnswer.keyPoints && q.modelAnswer.keyPoints.length > 0 && (
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-emerald)', marginBottom: '6px', textTransform: 'uppercase' }}>
                          Key Exam Points &amp; Marking Breakdown ({q.marks} Marks):
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.7 }}>
                          {q.modelAnswer.keyPoints.map((pt, pIdx) => (
                            <li key={pIdx} style={{ marginBottom: '4px' }}>
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Code Snippet if applicable */}
                    {q.modelAnswer.codeSnippet && (
                      <div style={{ marginTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-cyan)', textTransform: 'uppercase' }}>
                            Executable Python / NumPy Implementation:
                          </span>
                          <Button
                            size="sm"
                            kind="ghost"
                            renderIcon={copiedCodeId === q.id ? Checkmark : Copy}
                            onClick={() => copyCodeToClipboard(q.modelAnswer.codeSnippet!, q.id)}
                          >
                            {copiedCodeId === q.id ? 'Copied!' : 'Copy Code'}
                          </Button>
                        </div>
                        <pre
                          style={{
                            margin: 0,
                            padding: '12px',
                            background: 'var(--ds-bg-core)',
                            borderRadius: '4px',
                            border: '1px solid var(--ds-border-strong)',
                            fontFamily: 'var(--ds-font-mono)',
                            fontSize: '0.8125rem',
                            color: 'var(--ds-text-primary)',
                            overflowX: 'auto',
                            lineHeight: 1.6,
                          }}
                        >
                          {q.modelAnswer.codeSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--ds-bg-core)', borderRadius: '4px' }}>
          <Help size={32} style={{ color: 'var(--ds-text-muted)', margin: '0 auto 8px auto' }} />
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ds-text-primary)', marginBottom: '4px' }}>
            No questions matched your search criteria
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', margin: 0 }}>
            Try adjusting your search query or switching between Part A and Part B filters.
          </p>
        </div>
      )}
    </div>
  );
}
