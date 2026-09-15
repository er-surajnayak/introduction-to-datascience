'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import { Network_3, Code, Document, CheckmarkFilled, WarningAlt, Flash } from '@carbon/icons-react';

export function StaticVsDynamicVisualizer() {
  const [siteType, setSiteType] = useState<'static' | 'dynamic'>('static');

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
            Real-World Web Architecture
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Static vs. Dynamic JavaScript Websites
          </h3>
        </div>
        <Tag type={siteType === 'static' ? 'cyan' : 'purple'} size="md">
          {siteType === 'static' ? 'Static HTML Architecture' : 'Dynamic SPA Architecture'}
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
        One of the biggest real-world hurdles in web scraping is encountering websites that load data asynchronously via JavaScript. Toggle between the two architectures below to understand why standard HTML parsers behave differently:
      </p>

      {/* Mode Toggle Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        <Button
          kind={siteType === 'static' ? 'primary' : 'tertiary'}
          size="md"
          onClick={() => setSiteType('static')}
        >
          1. Static Webpage (Data in Initial HTML)
        </Button>
        <Button
          kind={siteType === 'dynamic' ? 'primary' : 'tertiary'}
          size="md"
          onClick={() => setSiteType('dynamic')}
        >
          2. Dynamic Webpage (JavaScript Client Rendering)
        </Button>
      </div>

      {/* Flow Diagram Canvas */}
      <div
        style={{
          background: 'var(--cds-layer-01)',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          padding: '1.5rem',
          marginBottom: '1.25rem',
        }}
      >
        {siteType === 'static' ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: 'var(--ds-emerald)' }}>
              <CheckmarkFilled size={18} />
              <strong style={{ fontSize: '0.9375rem' }}>Static Flow: Direct & Immediate HTML Delivery</strong>
            </div>

            {/* Stepper Flow */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '8px',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ padding: '0.75rem', background: 'var(--cds-layer-02)', borderRadius: '4px', textAlign: 'center', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>STEP 1</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>requests.get(url)</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--cds-layer-02)', borderRadius: '4px', textAlign: 'center', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>STEP 2</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>Server Sends Full HTML</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--ds-cyan-dim)', borderRadius: '4px', textAlign: 'center', border: '1px solid var(--ds-cyan)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>STEP 3</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-cyan)' }}>Data Ready in response.text</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--cds-layer-02)', borderRadius: '4px', textAlign: 'center', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>STEP 4</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ds-emerald)' }}>soup.find_all() Extracts 100%</div>
              </div>
            </div>

            <div
              style={{
                padding: '1rem',
                background: 'var(--cds-layer-02)',
                borderRadius: '4px',
                fontSize: '0.875rem',
                color: 'var(--ds-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              <strong>Why it works:</strong> In traditional server-rendered websites (WordPress, Wikipedia, classic news portals), all database records are baked directly into the HTML string before it leaves the server. A simple <code>requests.get()</code> and <code>BeautifulSoup</code> script works flawlessly.
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#ff8389' }}>
              <WarningAlt size={18} />
              <strong style={{ fontSize: '0.9375rem' }}>Dynamic SPA Flow: Two-Stage Asynchronous Hydration</strong>
            </div>

            {/* Stepper Flow */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '8px',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ padding: '0.75rem', background: 'var(--cds-layer-02)', borderRadius: '4px', textAlign: 'center', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>STEP 1</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>requests.get()</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(255, 95, 86, 0.1)', borderRadius: '4px', textAlign: 'center', border: '1px solid rgba(255, 95, 86, 0.4)' }}>
                <div style={{ fontSize: '0.6875rem', color: '#ff8389', fontFamily: 'var(--ds-font-mono)' }}>STEP 2</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ff8389' }}>Empty Shell &lt;div id=&quot;root&quot;&gt;</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--cds-layer-02)', borderRadius: '4px', textAlign: 'center', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-purple)', fontFamily: 'var(--ds-font-mono)' }}>STEP 3 (Browser)</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>JS Executes & Calls API</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--cds-layer-02)', borderRadius: '4px', textAlign: 'center', border: '1px solid var(--ds-border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--ds-cyan)', fontFamily: 'var(--ds-font-mono)' }}>STEP 4 (Browser)</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>DOM Populates Data</div>
              </div>
            </div>

            <div
              style={{
                padding: '1rem',
                background: 'var(--cds-layer-02)',
                borderRadius: '4px',
                fontSize: '0.875rem',
                color: 'var(--ds-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              <strong>The Gotcha & Solution:</strong> When you call <code>requests.get()</code>, Python is not a full web browser—it does NOT execute JavaScript. Therefore, <code>soup.find(&quot;.movie-card&quot;)</code> returns <code>None</code>!
              <br /><br />
              💡 <strong>Data Science Solution:</strong> Open your browser Developer Tools (`F12`), switch to the <strong>Network tab</strong>, filter by <strong>Fetch/XHR</strong>, and reload the page. You will almost always discover the secret, direct JSON API that the frontend JavaScript is calling! Calling that API directly is 10x faster and cleaner than scraping HTML.
            </div>
          </div>
        )}
      </div>

      {/* Code Comparison Card */}
      <div>
        <div
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-cyan)',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}
        >
          {siteType === 'static' ? 'Static Scraping Solution' : 'Dynamic Solution: Querying the Underlying API'}
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
            {siteType === 'static'
              ? `# Standard Static Workflow\nres = requests.get("https://example.com/static-movies")\nsoup = BeautifulSoup(res.text, "html.parser")\ntitles = [h2.get_text() for h2 in soup.find_all("h2", class_="title")]`
              : `# Pro-Tip for Dynamic Sites: Intercept the underlying REST API in DevTools Network tab!\nres = requests.get("https://example.com/api/v1/internal/movies")\ndata = res.json()  # Direct structured JSON payload!` }
          </code>
        </pre>
      </div>
    </div>
  );
}
