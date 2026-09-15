'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button, TextInput } from '@carbon/react';
import { Filter, CheckmarkFilled, Code, Search, Renew } from '@carbon/icons-react';

interface MockMovie {
  id: number;
  title: string;
  rating: string;
  genre: string;
  year: number;
  link: string;
}

const mockMovies: MockMovie[] = [
  { id: 1, title: 'Interstellar', rating: '8.7', genre: 'Sci-Fi', year: 2014, link: '/movies/interstellar' },
  { id: 2, title: 'Inception', rating: '8.8', genre: 'Sci-Fi', year: 2010, link: '/movies/inception' },
  { id: 3, title: 'Dune', rating: '8.0', genre: 'Adventure', year: 2021, link: '/movies/dune' },
];

const presetSelectors = [
  { label: 'Movie Titles (.title)', selector: '.title', targetField: 'titles', count: 3 },
  { label: 'Ratings (.rating)', selector: '.rating', targetField: 'ratings', count: 3 },
  { label: 'Movie Cards (.movie-card)', selector: '.movie-card', targetField: 'containers', count: 3 },
  { label: 'Genre Badges (.genre)', selector: '.genre', targetField: 'genres', count: 3 },
  { label: 'Detail Links (a.link)', selector: 'a.link', targetField: 'links', count: 3 },
  { label: 'All Headings (h2)', selector: 'h2', targetField: 'headings', count: 3 },
];

export function ElementSelectorLab() {
  const [activeSelector, setActiveSelector] = useState<string>('.title');
  const [customInput, setCustomInput] = useState<string>('');

  const currentSelector = customInput.trim() || activeSelector;

  const isMatched = (targetType: string) => {
    const s = currentSelector.toLowerCase();
    if (s === '.title' || s === 'h2.title' || s === 'h2') return targetType === 'title';
    if (s === '.rating' || s === 'span.rating' || s === 'span') return targetType === 'rating';
    if (s === '.genre' || s === 'span.genre') return targetType === 'genre';
    if (s === 'a' || s === 'a.link' || s === '.link') return targetType === 'link';
    if (s === '.movie-card' || s === 'div.movie-card' || s === 'div') return targetType === 'card';
    return false;
  };

  const getExtractedValues = () => {
    const s = currentSelector.toLowerCase();
    if (s === '.title' || s === 'h2.title' || s === 'h2') {
      return mockMovies.map((m) => m.title);
    }
    if (s === '.rating' || s === 'span.rating' || s === 'span') {
      return mockMovies.map((m) => m.rating);
    }
    if (s === '.genre' || s === 'span.genre') {
      return mockMovies.map((m) => m.genre);
    }
    if (s === 'a' || s === 'a.link' || s === '.link') {
      return mockMovies.map((m) => `href="${m.link}"`);
    }
    if (s === '.movie-card' || s === 'div.movie-card' || s === 'div') {
      return mockMovies.map((m) => `<div class="movie-card"> (${m.title})`);
    }
    return [];
  };

  const extractedValues = getExtractedValues();

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
            Interactive Laboratory
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            CSS Element Selector Lab
          </h3>
        </div>
        <Tag type="cyan" size="md">
          Precision Extraction Workbench
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
        A webpage contains hundreds of elements. CSS selectors tell your scraper exactly which elements to target. Choose a selector below or type one to watch elements highlight across all movie cards simultaneously:
      </p>

      {/* Preset Selector Buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {presetSelectors.map((item) => {
          const isSelected = activeSelector === item.selector && !customInput;
          return (
            <Button
              key={item.selector}
              kind={isSelected ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => {
                setActiveSelector(item.selector);
                setCustomInput('');
              }}
            >
              {item.label}
            </Button>
          );
        })}
      </div>

      {/* Split View: Mock Webpage with Live Highlights on Left, Extracted Data on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Left: Mock Webpage Catalog */}
        <div
          style={{
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            padding: '1.25rem',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--ds-font-mono)',
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>LIVE WEBPAGE SIMULATOR</span>
            <span>TARGET: {currentSelector}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mockMovies.map((movie) => {
              const isCardHighlighted = isMatched('card');
              const isTitleHighlighted = isMatched('title');
              const isRatingHighlighted = isMatched('rating');
              const isGenreHighlighted = isMatched('genre');
              const isLinkHighlighted = isMatched('link');

              return (
                <div
                  key={movie.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '4px',
                    background: isCardHighlighted
                      ? 'var(--ds-cyan-dim)'
                      : 'var(--cds-layer-02)',
                    border: isCardHighlighted
                      ? '2px solid var(--ds-cyan)'
                      : '1px solid var(--ds-border-subtle)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '6px',
                    }}
                  >
                    <h4
                      style={{
                        margin: 0,
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '3px',
                        background: isTitleHighlighted
                          ? 'var(--ds-cyan)'
                          : 'transparent',
                        color: isTitleHighlighted
                          ? '#000'
                          : 'var(--ds-text-primary)',
                        display: 'inline-block',
                      }}
                    >
                      {movie.title}
                    </h4>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span
                        style={{
                          padding: '2px 6px',
                          borderRadius: '10px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          background: isRatingHighlighted
                            ? 'var(--ds-cyan)'
                            : 'rgba(241, 196, 15, 0.15)',
                          color: isRatingHighlighted ? '#000' : '#f39c12',
                          border: '1px solid rgba(241, 196, 15, 0.3)',
                        }}
                      >
                        ⭐ {movie.rating}
                      </span>
                      <span
                        style={{
                          padding: '2px 6px',
                          borderRadius: '10px',
                          fontSize: '0.75rem',
                          background: isGenreHighlighted
                            ? 'var(--ds-cyan)'
                            : 'var(--ds-cyan-dim)',
                          color: isGenreHighlighted
                            ? '#000'
                            : 'var(--ds-cyan)',
                        }}
                      >
                        {movie.genre}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.75rem',
                      color: 'var(--ds-text-muted)',
                      marginTop: '8px',
                    }}
                  >
                    <span>Year: {movie.year}</span>
                    <span
                      style={{
                        padding: '2px 4px',
                        borderRadius: '2px',
                        background: isLinkHighlighted
                          ? 'var(--ds-cyan)'
                          : 'transparent',
                        color: isLinkHighlighted
                          ? '#000'
                          : 'var(--ds-cyan)',
                        textDecoration: 'underline',
                      }}
                    >
                      View Details →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Extracted Data Payload & Python BeautifulSoup Code */}
        <div
          style={{
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--ds-font-mono)',
              color: 'var(--ds-emerald)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>EXTRACTED PAYLOAD RESULTS</span>
            <Tag type="green" size="sm">
              {extractedValues.length} Matched Nodes
            </Tag>
          </div>

          {/* Results List */}
          <div
            style={{
              background: 'var(--cds-layer-02)',
              borderRadius: '4px',
              padding: '1rem',
              marginBottom: '1rem',
              border: '1px solid var(--ds-border-subtle)',
              minHeight: '120px',
            }}
          >
            {extractedValues.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {extractedValues.map((val, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontFamily: 'var(--ds-font-mono)',
                      fontSize: '0.8125rem',
                      color: 'var(--ds-text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <CheckmarkFilled size={14} style={{ color: 'var(--ds-emerald)' }} />
                    <span>[{idx}]: {val}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: 'var(--ds-text-muted)', fontSize: '0.8125rem', textAlign: 'center', padding: '1.5rem 0' }}>
                No elements matched selector &quot;{currentSelector}&quot;. Try selecting .title, .rating, or a.link.
              </div>
            )}
          </div>

          {/* Python Code Equivalent */}
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
              Python BeautifulSoup Query
            </div>
            <pre
              style={{
                margin: 0,
                padding: '0.875rem',
                background: 'var(--cds-field-01)',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                color: 'var(--ds-text-primary)',
                border: '1px solid var(--ds-border-subtle)',
                lineHeight: 1.5,
                overflowX: 'auto',
              }}
            >
              <code>{`# Querying multiple elements using CSS selector
elements = soup.select("${currentSelector}")
results = [el.get_text(strip=True) for el in elements]`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
