'use client';

import React, { useState } from 'react';
import { Tag, Button, InlineNotification } from '@carbon/react';
import {
  Security,
  WarningAlt,
  CheckmarkFilled,
  Time,
  Help,
  Document,
  Information,
} from '@carbon/icons-react';

export function ResponsibleScrapingGuide() {
  const [activeTab, setActiveTab] = useState<'robots' | 'throttling' | 'decision'>('robots');
  const [testPath, setTestPath] = useState<string>('/movies/catalog');

  const checkRobotsPermission = (path: string) => {
    if (path.startsWith('/admin') || path.startsWith('/user/private') || path.startsWith('/internal')) {
      return { allowed: false, reason: 'Disallowed in robots.txt under Disallow: /admin or /user/private' };
    }
    return { allowed: true, reason: 'Allowed under standard User-agent: * directives' };
  };

  const pathStatus = checkRobotsPermission(testPath);

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
            Ethics & Engineering Protocol
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Responsible Web Scraping: Before You Scrape
          </h3>
        </div>
        <Tag type="teal" size="md">
          Ethical Protocols
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
        Public accessibility does not automatically mean unrestricted scraping is permitted. Responsible data scientists balance curiosity with server safety, privacy laws, and website policies. Explore the practical rules below:
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Button
          kind={activeTab === 'robots' ? 'primary' : 'tertiary'}
          size="sm"
          onClick={() => setActiveTab('robots')}
        >
          1. robots.txt Protocol
        </Button>
        <Button
          kind={activeTab === 'throttling' ? 'primary' : 'tertiary'}
          size="sm"
          onClick={() => setActiveTab('throttling')}
        >
          2. Rate Limiting & Throttling
        </Button>
        <Button
          kind={activeTab === 'decision' ? 'primary' : 'tertiary'}
          size="sm"
          onClick={() => setActiveTab('decision')}
        >
          3. API vs. Scraping Decision Tree
        </Button>
      </div>

      {/* Tab 1: robots.txt */}
      {activeTab === 'robots' && (
        <div
          style={{
            background: 'var(--cds-layer-01)',
            padding: '1.5rem',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1.125rem', color: 'var(--ds-text-primary)' }}>
            The robots.txt Exclusion Standard
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            Before querying a website, visit <code>https://example.com/robots.txt</code>. This plain text file declares which folders automated bots are allowed or forbidden from crawling.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              marginBottom: '1.25rem',
            }}
          >
            {/* Mock robots.txt file */}
            <div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Sample robots.txt Policy
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: '1rem',
                  background: 'var(--cds-field-01)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.8125rem',
                  lineHeight: 1.5,
                  color: 'var(--ds-text-primary)',
                  border: '1px solid var(--ds-border-subtle)',
                }}
              >
                <code>{`User-agent: *
Disallow: /admin/
Disallow: /user/private/
Disallow: /internal/
Crawl-delay: 2`}</code>
              </pre>
            </div>

            {/* Interactive Path Tester */}
            <div style={{ background: 'var(--cds-layer-02)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--ds-border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Test A URL Path
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <Button size="sm" kind="ghost" onClick={() => setTestPath('/movies/catalog')}>
                  /movies/catalog
                </Button>
                <Button size="sm" kind="ghost" onClick={() => setTestPath('/admin/settings')}>
                  /admin/settings
                </Button>
                <Button size="sm" kind="ghost" onClick={() => setTestPath('/user/private/profile')}>
                  /user/private/profile
                </Button>
              </div>

              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: '4px',
                  background: pathStatus.allowed ? 'var(--ds-cyan-dim)' : 'rgba(255, 95, 86, 0.1)',
                  border: pathStatus.allowed ? '1px solid var(--ds-cyan)' : '1px solid rgba(255, 95, 86, 0.4)',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: pathStatus.allowed ? 'var(--ds-emerald)' : '#ff8389', marginBottom: '4px' }}>
                  {pathStatus.allowed ? '✓ Scraping Allowed' : '✗ Scraping Forbidden (Disallowed)'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ds-text-secondary)' }}>
                  Path: {testPath} • {pathStatus.reason}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Throttling */}
      {activeTab === 'throttling' && (
        <div
          style={{
            background: 'var(--cds-layer-01)',
            padding: '1.5rem',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1.125rem', color: 'var(--ds-text-primary)' }}>
            Never Overload the Web Server (Rate Limiting)
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            A poorly written script in a tight loop can fire 500 requests per second. This acts like a Denial of Service (DoS) attack, crashing the website for real humans and getting your IP permanently blocked.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            <div style={{ padding: '1rem', background: 'rgba(255, 95, 86, 0.08)', borderRadius: '4px', border: '1px solid rgba(255, 95, 86, 0.3)' }}>
              <div style={{ color: '#ff8389', fontWeight: 700, fontSize: '0.875rem', marginBottom: '4px' }}>
                ❌ Aggressive Bot (Dangerous)
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', margin: '0 0 8px 0' }}>
                Zero delays in a for-loop. Spams the server with 200 requests/sec.
              </p>
              <pre style={{ margin: 0, padding: '8px', background: 'var(--cds-field-01)', borderRadius: '3px', fontSize: '0.75rem', color: '#ff8389' }}>
                <code>{`# BAD: Can crash server or trigger IP ban
for url in urls:
    res = requests.get(url)  # 0 delay!`}</code>
              </pre>
            </div>

            <div style={{ padding: '1rem', background: 'var(--ds-cyan-dim)', borderRadius: '4px', border: '1px solid var(--ds-cyan)' }}>
              <div style={{ color: 'var(--ds-emerald)', fontWeight: 700, fontSize: '0.875rem', marginBottom: '4px' }}>
                ✓ Polite Data Science Scraper (Polite)
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ds-text-secondary)', margin: '0 0 8px 0' }}>
                Includes polite 1–2 second delays between pages and identifies itself with a descriptive User-Agent.
              </p>
              <pre style={{ margin: 0, padding: '8px', background: 'var(--cds-field-01)', borderRadius: '3px', fontSize: '0.75rem', color: 'var(--ds-text-primary)' }}>
                <code>{`import time
for url in urls:
    res = requests.get(url, headers=headers)
    time.sleep(1.5)  # Polite 1.5s delay`}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: API vs Scraping Decision Matrix */}
      {activeTab === 'decision' && (
        <div
          style={{
            background: 'var(--cds-layer-01)',
            padding: '1.5rem',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1.125rem', color: 'var(--ds-text-primary)' }}>
            Official API vs. Web Scraping: The Golden Rule
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--ds-text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            <strong>Rule of Thumb:</strong> If an official REST API exists that provides the data you need, <em>always prefer the API</em>.
          </p>

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.8125rem',
            }}
          >
            <thead>
              <tr style={{ background: 'var(--cds-layer-02)', borderBottom: '2px solid var(--ds-border-strong)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-text-muted)' }}>Dimension</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-emerald)' }}>Official REST API</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--ds-cyan)' }}>Web Scraping</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>Data Format</td>
                <td style={{ padding: '8px 12px', color: 'var(--ds-emerald)' }}>Clean, structured JSON</td>
                <td style={{ padding: '8px 12px', color: 'var(--ds-text-secondary)' }}>Noisy, nested HTML markup</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>Stability</td>
                <td style={{ padding: '8px 12px', color: 'var(--ds-emerald)' }}>High (versioned contract)</td>
                <td style={{ padding: '8px 12px', color: 'var(--ds-text-secondary)' }}>Fragile (breaks on CSS redesigns)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>Speed & Bandwidth</td>
                <td style={{ padding: '8px 12px', color: 'var(--ds-emerald)' }}>Ultra-low payload (pure data)</td>
                <td style={{ padding: '8px 12px', color: 'var(--ds-text-secondary)' }}>Heavier payload (layout code)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>Availability</td>
                <td style={{ padding: '8px 12px', color: 'var(--ds-text-secondary)' }}>Only when provided by owner</td>
                <td style={{ padding: '8px 12px', color: 'var(--ds-cyan)' }}>Works on any public HTML site</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
