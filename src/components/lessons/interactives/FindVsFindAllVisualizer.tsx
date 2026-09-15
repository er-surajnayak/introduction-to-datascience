'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import { Code, CheckmarkFilled, Information, Filter } from '@carbon/icons-react';

export function FindVsFindAllVisualizer() {
  const [selectedMethod, setSelectedMethod] = useState<'find' | 'find_all'>('find');

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
            Core BeautifulSoup Syntax
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            find() vs. find_all() Visual Breakdown
          </h3>
        </div>
        <Tag type="teal" size="md">
          Querying Comparison
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
        One of the most frequent beginner pitfalls in Python web scraping is confusing single-element selection with collection querying. Toggle between the two methods below to see how the parser scans and returns results:
      </p>

      {/* Method Toggle Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        <Button
          kind={selectedMethod === 'find' ? 'primary' : 'tertiary'}
          size="md"
          onClick={() => setSelectedMethod('find')}
        >
          soup.find(&quot;h2&quot;) → Single First Element
        </Button>
        <Button
          kind={selectedMethod === 'find_all' ? 'primary' : 'tertiary'}
          size="md"
          onClick={() => setSelectedMethod('find_all')}
        >
          soup.find_all(&quot;h2&quot;) → All Matching Elements
        </Button>
      </div>

      {/* Interactive Visual Canvas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Left: Markup Scanned Canvas */}
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
            }}
          >
            HTML DOCUMENT TREE
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Element 1: Interstellar */}
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                background: 'var(--ds-cyan-dim)',
                border: '2px solid var(--ds-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.875rem' }}>
                <span style={{ color: '#ff7b72' }}>&lt;h2&gt;</span>
                <span style={{ color: 'var(--ds-text-primary)', fontWeight: 600 }}>Interstellar</span>
                <span style={{ color: '#ff7b72' }}>&lt;/h2&gt;</span>
              </div>
              <Tag type="cyan" size="sm">
                {selectedMethod === 'find' ? 'Matched (First Found)' : 'Matched [0]'}
              </Tag>
            </div>

            {/* Element 2: Inception */}
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                background:
                  selectedMethod === 'find_all'
                    ? 'var(--ds-cyan-dim)'
                    : 'var(--cds-layer-02)',
                border:
                  selectedMethod === 'find_all'
                    ? '2px solid var(--ds-cyan)'
                    : '1px solid var(--ds-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: selectedMethod === 'find' ? 0.45 : 1,
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.875rem' }}>
                <span style={{ color: '#ff7b72' }}>&lt;h2&gt;</span>
                <span style={{ color: 'var(--ds-text-primary)', fontWeight: 600 }}>Inception</span>
                <span style={{ color: '#ff7b72' }}>&lt;/h2&gt;</span>
              </div>
              <Tag type={selectedMethod === 'find_all' ? 'cyan' : 'cool-gray'} size="sm">
                {selectedMethod === 'find_all' ? 'Matched [1]' : 'Ignored (Stopped early)'}
              </Tag>
            </div>

            {/* Element 3: Dune */}
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                background:
                  selectedMethod === 'find_all'
                    ? 'var(--ds-cyan-dim)'
                    : 'var(--cds-layer-02)',
                border:
                  selectedMethod === 'find_all'
                    ? '2px solid var(--ds-cyan)'
                    : '1px solid var(--ds-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: selectedMethod === 'find' ? 0.45 : 1,
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.875rem' }}>
                <span style={{ color: '#ff7b72' }}>&lt;h2&gt;</span>
                <span style={{ color: 'var(--ds-text-primary)', fontWeight: 600 }}>Dune</span>
                <span style={{ color: '#ff7b72' }}>&lt;/h2&gt;</span>
              </div>
              <Tag type={selectedMethod === 'find_all' ? 'cyan' : 'cool-gray'} size="sm">
                {selectedMethod === 'find_all' ? 'Matched [2]' : 'Ignored (Stopped early)'}
              </Tag>
            </div>
          </div>
        </div>

        {/* Right: Code & Return Type Diagnostics */}
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
            }}
          >
            EXECUTION BEHAVIOR & PYTHON TYPE
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
                Return Data Type
              </span>
              <code style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '0.8125rem', color: 'var(--ds-cyan)', fontWeight: 600 }}>
                {selectedMethod === 'find' ? 'bs4.element.Tag (or None)' : 'bs4.element.ResultSet (List-like)'}
              </code>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
                Item Count Returned
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--ds-emerald)', fontWeight: 600 }}>
                {selectedMethod === 'find' ? '1 element' : '3 elements'}
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
              {selectedMethod === 'find' ? (
                <>
                  <strong>soup.find()</strong> stops searching the moment it encounters the first matching node. It is ideal for unique headers, main articles, or root container tags.
                </>
              ) : (
                <>
                  <strong>soup.find_all()</strong> scans the entire document to the end, returning a collection of all matching nodes. It is ideal for iterating through repeating cards, search rows, or tables.
                </>
              )}
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
              Python Implementation
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
              <code>
                {selectedMethod === 'find'
                  ? `# 1. Returns a single element\nelement = soup.find("h2")\nprint(element.get_text())\n# Output: "Interstellar"`
                  : `# 2. Returns a collection (ResultSet)\nelements = soup.find_all("h2")\nfor el in elements:\n    print(el.get_text())\n# Output:\n# "Interstellar"\n# "Inception"\n# "Dune"`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
