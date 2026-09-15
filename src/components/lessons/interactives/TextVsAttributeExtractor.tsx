'use client';

import React, { useState } from 'react';
import { Tag, Button } from '@carbon/react';
import { Code, CheckmarkFilled, Information, Link as LinkIcon, Image as ImageIcon } from '@carbon/icons-react';

interface ExtractableElement {
  id: string;
  name: string;
  tagSnippet: string;
  textExtracted: string;
  attributeExtracted: { name: string; value: string; code: string };
  explanation: string;
}

const sampleElements: ExtractableElement[] = [
  {
    id: 'link',
    name: 'Anchor Hyperlink (<a>)',
    tagSnippet: '<a class="movie-link" href="/movies/interstellar">Interstellar Details</a>',
    textExtracted: '"Interstellar Details"',
    attributeExtracted: {
      name: 'href',
      value: '"/movies/interstellar"',
      code: 'link_element["href"]',
    },
    explanation: 'The visible text invites humans to click, but the crucial destination URL path lives in the href attribute.',
  },
  {
    id: 'image',
    name: 'Poster Image (<img>)',
    tagSnippet: '<img class="poster" src="https://cdn.example.com/posters/interstellar.jpg" alt="Interstellar Film Poster" />',
    textExtracted: '"" (Empty string! Images have no inner text)',
    attributeExtracted: {
      name: 'src & alt',
      value: 'src="https://cdn.example.com/posters/interstellar.jpg"',
      code: 'img_element["src"]',
    },
    explanation: 'Images are self-closing tags with NO inner text content. All image URLs and accessibility labels reside exclusively in attributes (src, alt).',
  },
  {
    id: 'data-tag',
    name: 'Metadata Container (<div data-id>)',
    tagSnippet: '<div class="card" data-movie-id="98214" data-category="sci-fi">Interstellar</div>',
    textExtracted: '"Interstellar"',
    attributeExtracted: {
      name: 'data-movie-id',
      value: '"98214"',
      code: 'card_element["data-movie-id"]',
    },
    explanation: 'Modern websites frequently store internal database IDs and category flags inside custom data-* attributes.',
  },
];

export function TextVsAttributeExtractor() {
  const [selectedElementId, setSelectedElementId] = useState<string>('link');
  const [extractionMode, setExtractionMode] = useState<'text' | 'attribute'>('attribute');

  const activeElement =
    sampleElements.find((e) => e.id === selectedElementId) || sampleElements[0];

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
            Data Extraction Paradigms
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Extracting Visible Text vs. HTML Attributes
          </h3>
        </div>
        <Tag type="purple" size="md">
          Dual Modality Lab
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
        In web scraping, not all data lives as visible text between opening and closing tags. Vital metadata—such as URLs, image links, and database IDs—resides in HTML attributes. Pick an element and toggle between Text and Attribute extraction:
      </p>

      {/* Target Element Picker */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {sampleElements.map((el) => (
          <Button
            key={el.id}
            kind={selectedElementId === el.id ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedElementId(el.id)}
          >
            {el.name}
          </Button>
        ))}
      </div>

      {/* Extraction Mode Switcher */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        <Button
          kind={extractionMode === 'text' ? 'primary' : 'tertiary'}
          size="sm"
          onClick={() => setExtractionMode('text')}
        >
          Extract Visible Text (.get_text())
        </Button>
        <Button
          kind={extractionMode === 'attribute' ? 'primary' : 'tertiary'}
          size="sm"
          onClick={() => setExtractionMode('attribute')}
        >
          Extract Attribute Value (element[&quot;attr&quot;])
        </Button>
      </div>

      {/* Split Comparison Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Left: Raw Element Markup */}
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
              marginBottom: '0.75rem',
            }}
          >
            TARGET HTML ELEMENT MARKUP
          </div>

          <pre
            style={{
              margin: 0,
              padding: '1rem',
              background: 'var(--cds-field-01)',
              borderRadius: '4px',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.875rem',
              lineHeight: 1.5,
              color: 'var(--ds-emerald)',
              overflowX: 'auto',
              border: '1px solid var(--ds-border-subtle)',
              marginBottom: '1rem',
            }}
          >
            <code>{activeElement.tagSnippet}</code>
          </pre>

          <div
            style={{
              fontSize: '0.8125rem',
              color: 'var(--ds-text-secondary)',
              lineHeight: 1.5,
              background: 'var(--cds-layer-02)',
              padding: '0.875rem',
              borderRadius: '4px',
            }}
          >
            {activeElement.explanation}
          </div>
        </div>

        {/* Right: Extracted Output and Code */}
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
              color: extractionMode === 'text' ? 'var(--ds-cyan)' : 'var(--ds-purple)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            {extractionMode === 'text' ? 'TEXT EXTRACTION RESULT' : 'ATTRIBUTE EXTRACTION RESULT'}
          </div>

          <div
            style={{
              background: 'var(--cds-layer-02)',
              borderRadius: '4px',
              padding: '1rem',
              border: '1px solid var(--ds-border-subtle)',
              marginBottom: '1rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Extracted Python Value
            </div>
            <div
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--ds-emerald)',
                fontFamily: 'var(--ds-font-mono)',
                marginBottom: '8px',
              }}
            >
              {extractionMode === 'text'
                ? activeElement.textExtracted
                : activeElement.attributeExtracted.value}
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-muted)' }}>
              {extractionMode === 'text'
                ? 'Method: element.get_text(strip=True)'
                : `Dictionary Access: ${activeElement.attributeExtracted.code}`}
            </div>
          </div>

          {/* Python Code Snippet */}
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
              Python Syntax
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
                lineHeight: 1.5,
                overflowX: 'auto',
              }}
            >
              <code>
                {extractionMode === 'text'
                  ? `# Extract visible inner text string\nvalue = element.get_text(strip=True)`
                  : `# Extract attribute value using dictionary key\nvalue = ${activeElement.attributeExtracted.code}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
