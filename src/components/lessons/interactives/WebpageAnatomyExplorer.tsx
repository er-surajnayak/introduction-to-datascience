'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import { Code, View, Catalog, CheckmarkFilled } from '@carbon/icons-react';

interface AnatomyElement {
  id: string;
  name: string;
  tag: string;
  cssClass: string;
  domId: string;
  innerText: string;
  attributes: Record<string, string>;
  bs4Code: string;
  pedagogicalRole: string;
}

const anatomyElements: AnatomyElement[] = [
  {
    id: 'header-title',
    name: 'Top Page Heading',
    tag: 'h1',
    cssClass: 'catalog-heading',
    domId: 'main-title',
    innerText: 'Global Film Registry & Box Office Analytics',
    attributes: { id: 'main-title', class: 'catalog-heading' },
    bs4Code: 'soup.find("h1", id="main-title").get_text(strip=True)',
    pedagogicalRole: 'High-level document identifier. Usually queried once per page via .find() to capture dataset metadata.',
  },
  {
    id: 'movie-title',
    name: 'Movie Title Element',
    tag: 'h2',
    cssClass: 'movie-title',
    domId: 'None',
    innerText: 'Interstellar',
    attributes: { class: 'movie-title', 'data-year': '2014' },
    bs4Code: 'card.find("h2", class_="movie-title").get_text(strip=True)',
    pedagogicalRole: 'Primary target feature. Extracted across all cards using find_all() inside a loop.',
  },
  {
    id: 'rating-badge',
    name: 'Rating Score Badge',
    tag: 'span',
    cssClass: 'rating-score',
    domId: 'None',
    innerText: '8.7',
    attributes: { class: 'rating-score', 'data-scale': '10' },
    bs4Code: 'float(card.find("span", class_="rating-score").get_text())',
    pedagogicalRole: 'Numerical feature requiring type casting (str → float) after text extraction.',
  },
  {
    id: 'genre-badge',
    name: 'Genre Categorical Tag',
    tag: 'span',
    cssClass: 'genre-pill',
    domId: 'None',
    innerText: 'Sci-Fi / Adventure',
    attributes: { class: 'genre-pill' },
    bs4Code: 'card.find("span", class_="genre-pill").get_text(strip=True)',
    pedagogicalRole: 'Categorical feature that can be split into dummy variables or one-hot encoded in pandas.',
  },
  {
    id: 'details-link',
    name: 'Details Navigation Link',
    tag: 'a',
    cssClass: 'action-link',
    domId: 'None',
    innerText: 'Inspect Deep Cast & Budget →',
    attributes: { class: 'action-link', href: '/movies/interstellar/details' },
    bs4Code: 'card.find("a", class_="action-link")["href"]',
    pedagogicalRole: 'Relational attribute. In multi-page scrapers, this URL is appended to the base domain to crawl nested subpages.',
  },
];

export function WebpageAnatomyExplorer() {
  const [activeElementId, setActiveElementId] = useState<string>('movie-title');

  const activeElement =
    anatomyElements.find((e) => e.id === activeElementId) || anatomyElements[1];

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
            Deep Inspection
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Webpage Anatomy & Markup Explorer
          </h3>
        </div>
        <Tag type="teal" size="md">
          Element Forensic Tool
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
        Click on different parts of the mock webpage below to inspect their full HTML tag anatomy, attributes, and Python BeautifulSoup extraction queries:
      </p>

      {/* Split Interactive View */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Left: Controlled Mock Webpage with Clickable Anatomy Spots */}
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
              fontSize: '0.75rem',
              fontFamily: 'var(--ds-font-mono)',
              color: 'var(--ds-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>LIVE MOCK WEBPAGE (CLICK ANY ELEMENT)</span>
            <Tag type="cyan" size="sm">
              Target: &lt;{activeElement.tag}&gt;
            </Tag>
          </div>

          <div style={{ padding: '1.5rem' }}>
            {/* Page Heading */}
            <div
              onClick={() => setActiveElementId('header-title')}
              style={{
                padding: '6px 8px',
                borderRadius: '4px',
                background:
                  activeElementId === 'header-title'
                    ? 'var(--ds-cyan-dim)'
                    : 'transparent',
                border:
                  activeElementId === 'header-title'
                    ? '2px solid var(--ds-cyan)'
                    : '1px dashed var(--ds-border-subtle)',
                marginBottom: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.125rem', color: 'var(--ds-text-primary)', fontWeight: 700 }}>
                Global Film Registry & Box Office Analytics
              </h3>
            </div>

            {/* Movie Card */}
            <div
              style={{
                background: 'var(--cds-layer-02)',
                borderRadius: '6px',
                border: '1px solid var(--ds-border-subtle)',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                {/* Title */}
                <div
                  onClick={() => setActiveElementId('movie-title')}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background:
                      activeElementId === 'movie-title'
                        ? 'var(--ds-cyan)'
                        : 'transparent',
                    color:
                      activeElementId === 'movie-title'
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
                  {/* Rating */}
                  <span
                    onClick={() => setActiveElementId('rating-badge')}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '12px',
                      background:
                        activeElementId === 'rating-badge'
                          ? 'var(--ds-cyan)'
                          : 'rgba(241, 196, 15, 0.15)',
                      color:
                        activeElementId === 'rating-badge'
                          ? '#000'
                          : '#f39c12',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: '1px solid rgba(241, 196, 15, 0.3)',
                    }}
                  >
                    ⭐ 8.7
                  </span>

                  {/* Genre */}
                  <span
                    onClick={() => setActiveElementId('genre-badge')}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '12px',
                      background:
                        activeElementId === 'genre-badge'
                          ? 'var(--ds-cyan)'
                          : 'var(--ds-cyan-dim)',
                      color:
                        activeElementId === 'genre-badge'
                          ? '#000'
                          : 'var(--ds-cyan)',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid var(--ds-cyan)',
                    }}
                  >
                    Sci-Fi / Adventure
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                A team of explorers travel through a wormhole in space in an attempt to ensure humanity&apos;s survival.
              </p>

              {/* Action Link */}
              <div
                onClick={() => setActiveElementId('details-link')}
                style={{
                  display: 'inline-block',
                  fontSize: '0.8125rem',
                  padding: '3px 6px',
                  borderRadius: '3px',
                  background:
                    activeElementId === 'details-link'
                      ? 'var(--ds-cyan)'
                      : 'transparent',
                  color:
                    activeElementId === 'details-link'
                      ? '#000'
                      : 'var(--ds-cyan)',
                  textDecoration: 'underline',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Inspect Deep Cast & Budget →
              </div>
            </div>
          </div>
        </div>

        {/* Right: Full Anatomy Dossier */}
        <div
          style={{
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--ds-font-mono)',
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            ELEMENT ANATOMY DOSSIER
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
              {activeElement.name}
            </h4>
            <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
              HTML Tag: &lt;{activeElement.tag}&gt; | Class: .{activeElement.cssClass}
            </span>
          </div>

          {/* Key Attributes Table */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            <div style={{ padding: '0.75rem', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
                Class Attribute
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--ds-cyan)', fontWeight: 600, fontFamily: 'var(--ds-font-mono)' }}>
                .{activeElement.cssClass}
              </div>
            </div>

            <div style={{ padding: '0.75rem', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
                ID Attribute
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--ds-purple)', fontWeight: 600, fontFamily: 'var(--ds-font-mono)' }}>
                {activeElement.domId === 'None' ? 'None' : `#${activeElement.domId}`}
              </div>
            </div>
          </div>

          {/* Pedagogical Role */}
          <div
            style={{
              padding: '0.75rem 1rem',
              background: 'var(--cds-layer-02)',
              borderRadius: '4px',
              borderLeft: '3px solid var(--ds-cyan)',
              fontSize: '0.8125rem',
              color: 'var(--ds-text-secondary)',
              lineHeight: 1.45,
              marginBottom: '1rem',
            }}
          >
            <strong>Role in Dataset Building:</strong> {activeElement.pedagogicalRole}
          </div>

          {/* Python BeautifulSoup Snippet */}
          <div style={{ marginTop: 'auto' }}>
            <div
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--ds-font-mono)',
                color: 'var(--ds-cyan)',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              Extraction Code Snippet
            </div>
            <pre
              style={{
                margin: 0,
                padding: '0.75rem',
                background: 'var(--cds-field-01)',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                color: 'var(--ds-text-primary)',
                border: '1px solid var(--ds-border-subtle)',
                overflowX: 'auto',
              }}
            >
              <code>{activeElement.bs4Code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
