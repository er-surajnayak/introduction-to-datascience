'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import { View, Code, CheckmarkFilled, Information } from '@carbon/icons-react';

interface HtmlElementMapping {
  id: string;
  name: string;
  tag: string;
  selector: string;
  explanation: string;
  htmlSnippet: string;
  extractedValue: string;
}

const elementMappings: HtmlElementMapping[] = [
  {
    id: 'container',
    name: 'Movie Card Container',
    tag: '<div class="movie-card">',
    selector: '.movie-card',
    explanation: 'The outer grouping container that wraps all information for this specific movie observation.',
    htmlSnippet: `<div class="movie-card" id="featured-movie">\n  ...\n</div>`,
    extractedValue: 'Full card node containing all child elements',
  },
  {
    id: 'title',
    name: 'Movie Title',
    tag: '<h2 class="movie-title">',
    selector: 'h2.movie-title',
    explanation: 'The primary heading containing the human-visible title string.',
    htmlSnippet: `<h2 class="movie-title">Interstellar</h2>`,
    extractedValue: '"Interstellar"',
  },
  {
    id: 'rating',
    name: 'Audience Rating',
    tag: '<span class="rating-badge">',
    selector: '.rating-badge',
    explanation: 'An inline container styled as a badge holding the numerical score.',
    htmlSnippet: `<span class="rating-badge">⭐ 8.7</span>`,
    extractedValue: '8.7 (after stripping emoji)',
  },
  {
    id: 'genre',
    name: 'Genre Tag',
    tag: '<span class="genre-pill">',
    selector: '.genre-pill',
    explanation: 'A categorical tag categorizing the film genre.',
    htmlSnippet: `<span class="genre-pill">Sci-Fi</span>`,
    extractedValue: '"Sci-Fi"',
  },
  {
    id: 'year',
    name: 'Release Year',
    tag: '<p class="release-year">',
    selector: '.release-year',
    explanation: 'A paragraph displaying temporal metadata about when the movie debuted.',
    htmlSnippet: `<p class="release-year">Released: <strong>2014</strong></p>`,
    extractedValue: '2014',
  },
  {
    id: 'synopsis',
    name: 'Plot Synopsis',
    tag: '<p class="synopsis">',
    selector: 'p.synopsis',
    explanation: 'A paragraph of descriptive text detailing the plot overview.',
    htmlSnippet: `<p class="synopsis">A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.</p>`,
    extractedValue: '"A team of explorers travel through a wormhole in space..."',
  },
  {
    id: 'link',
    name: 'Details Destination Link',
    tag: '<a href="/movies/interstellar">',
    selector: 'a.details-link',
    explanation: 'An anchor element containing the navigation link attribute href.',
    htmlSnippet: `<a class="details-link" href="/movies/interstellar">View Full Cast & Crew →</a>`,
    extractedValue: 'Attribute href="/movies/interstellar"',
  },
];

export function HtmlVsRenderedVisualizer() {
  const [selectedElementId, setSelectedElementId] = useState<string>('title');

  const activeElement =
    elementMappings.find((e) => e.id === selectedElementId) || elementMappings[1];

  return (
    <div
      className="ds-glass-panel"
      style={{
        padding: '2rem',
        borderRadius: '4px',
        margin: '2.5rem 0',
        border: '1px solid var(--ds-border-strong)',
        background: 'var(--ds-bg-surface)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.75rem',
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
            }}
          >
            Visual Connection
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            HTML vs. What You See on the Page
          </h3>
        </div>
        <Tag type="purple" size="md">
          Dual Inspector Lab
        </Tag>
      </div>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--ds-text-secondary)',
          lineHeight: 1.5,
          marginBottom: '1.5rem',
        }}
      >
        Click any visible element on the rendered webpage (left) to inspect its exact underlying HTML markup and CSS selector (right):
      </p>

      {/* Split Comparison Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Left: Rendered Webpage Simulation */}
        <div
          style={{
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '0.625rem 1rem',
              background: 'var(--cds-layer-02)',
              borderBottom: '1px solid var(--ds-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              fontFamily: 'var(--ds-font-mono)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ds-text-muted)' }}>
              <View size={14} style={{ color: 'var(--ds-cyan)' }} />
              RENDERED BROWSER VIEW (WHAT HUMANS SEE)
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
            </div>
          </div>

          {/* Interactive Movie Card */}
          <div style={{ padding: '1.5rem' }}>
            <div
              onClick={() => setSelectedElementId('container')}
              style={{
                border:
                  selectedElementId === 'container'
                    ? '2px solid var(--ds-cyan)'
                    : '1px solid var(--ds-border-subtle)',
                background:
                  selectedElementId === 'container'
                    ? 'var(--ds-cyan-dim)'
                    : 'var(--cds-layer-02)',
                borderRadius: '6px',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {/* Header with Title & Badges */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedElementId('title');
                  }}
                  style={{
                    padding: '2px 6px',
                    borderRadius: '3px',
                    background:
                      selectedElementId === 'title'
                        ? 'var(--ds-cyan)'
                        : 'transparent',
                    color:
                      selectedElementId === 'title'
                        ? '#000'
                        : 'var(--ds-text-primary)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Interstellar
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedElementId('rating');
                    }}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '12px',
                      background:
                        selectedElementId === 'rating'
                          ? 'var(--ds-cyan)'
                          : 'rgba(241, 196, 15, 0.15)',
                      color:
                        selectedElementId === 'rating' ? '#000' : '#f39c12',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: '1px solid rgba(241, 196, 15, 0.3)',
                    }}
                  >
                    ⭐ 8.7
                  </span>

                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedElementId('genre');
                    }}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '12px',
                      background:
                        selectedElementId === 'genre'
                          ? 'var(--ds-cyan)'
                          : 'var(--ds-cyan-dim)',
                      color:
                        selectedElementId === 'genre'
                          ? '#000'
                          : 'var(--ds-cyan)',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid var(--ds-cyan)',
                    }}
                  >
                    Sci-Fi
                  </span>
                </div>
              </div>

              {/* Year */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedElementId('year');
                }}
                style={{
                  fontSize: '0.8125rem',
                  color:
                    selectedElementId === 'year'
                      ? 'var(--ds-cyan)'
                      : 'var(--ds-text-muted)',
                  marginBottom: '0.75rem',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  background:
                    selectedElementId === 'year'
                      ? 'var(--ds-cyan-dim)'
                      : 'transparent',
                  cursor: 'pointer',
                }}
              >
                Released: <strong>2014</strong> • Christopher Nolan
              </div>

              {/* Synopsis */}
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedElementId('synopsis');
                }}
                style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  color: 'var(--ds-text-secondary)',
                  margin: '0 0 1rem 0',
                  padding: '4px',
                  borderRadius: '3px',
                  background:
                    selectedElementId === 'synopsis'
                      ? 'var(--ds-cyan-dim)'
                      : 'transparent',
                  border:
                    selectedElementId === 'synopsis'
                      ? '1px dashed var(--ds-cyan)'
                      : '1px dashed transparent',
                  cursor: 'pointer',
                }}
              >
                A team of explorers travel through a wormhole in space in an attempt to ensure humanity&apos;s survival.
              </p>

              {/* Action Link */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedElementId('link');
                }}
                style={{
                  display: 'inline-block',
                  fontSize: '0.8125rem',
                  color:
                    selectedElementId === 'link' ? '#000' : 'var(--ds-cyan)',
                  background:
                    selectedElementId === 'link'
                      ? 'var(--ds-cyan)'
                      : 'transparent',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                View Full Cast & Crew →
              </div>
            </div>

            <div
              style={{
                marginTop: '1rem',
                fontSize: '0.75rem',
                color: 'var(--ds-text-muted)',
                textAlign: 'center',
              }}
            >
              👆 Click on the title, rating, genre, year, synopsis, or link to inspect!
            </div>
          </div>
        </div>

        {/* Right: Underlying HTML Code Inspector */}
        <div
          style={{
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '0.625rem 1rem',
              background: 'var(--cds-layer-02)',
              borderBottom: '1px solid var(--ds-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              fontFamily: 'var(--ds-font-mono)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ds-cyan)' }}>
              <Code size={14} />
              RAW HTML MARKUP (WHAT PYTHON SEES)
            </span>
            <Tag type="cyan" size="sm">
              Tag: {activeElement.tag.split(' ')[0]}&gt;
            </Tag>
          </div>

          <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Target Code Snippet */}
            <div style={{ marginBottom: '1rem' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--ds-font-mono)',
                  color: 'var(--ds-text-muted)',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                }}
              >
                Matching HTML Tag
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: '0.875rem',
                  background: 'var(--cds-field-01)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  color: 'var(--ds-emerald)',
                  overflowX: 'auto',
                  border: '1px solid var(--ds-border-subtle)',
                }}
              >
                <code>{activeElement.htmlSnippet}</code>
              </pre>
            </div>

            {/* Target Selector & Extracted Value Details */}
            <div
              style={{
                background: 'var(--cds-layer-02)',
                borderRadius: '4px',
                padding: '1rem',
                border: '1px solid var(--ds-border-subtle)',
                flex: 1,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
                  Target CSS Selector
                </span>
                <code style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-cyan)', fontWeight: 600 }}>
                  {activeElement.selector}
                </code>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
                  Extracted Data Value
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--ds-emerald)', fontWeight: 600 }}>
                  {activeElement.extractedValue}
                </span>
              </div>

              <div
                style={{
                  paddingTop: '8px',
                  marginTop: '8px',
                  borderTop: '1px solid var(--ds-border-subtle)',
                  fontSize: '0.8125rem',
                  color: 'var(--ds-text-secondary)',
                  lineHeight: 1.45,
                }}
              >
                <strong>Interpretation:</strong> {activeElement.explanation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
