'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button, Checkbox } from '@carbon/react';
import { PlayFilledAlt, Restart, Code, Table, CheckmarkFilled, Flash } from '@carbon/icons-react';

interface MockMovieRecord {
  title: string;
  rating: number;
  year: number;
  url: string;
}

const sourceCatalog: MockMovieRecord[] = [
  { title: 'Interstellar', rating: 8.7, year: 2014, url: '/movies/interstellar' },
  { title: 'Inception', rating: 8.8, year: 2010, url: '/movies/inception' },
  { title: 'Dune: Part One', rating: 8.0, year: 2021, url: '/movies/dune-1' },
  { title: 'Blade Runner 2049', rating: 8.0, year: 2017, url: '/movies/blade-runner-2049' },
  { title: 'The Matrix', rating: 8.7, year: 1999, url: '/movies/the-matrix' },
];

export function WebScrapingSimulator() {
  const [includeTitle, setIncludeTitle] = useState<boolean>(true);
  const [includeRating, setIncludeRating] = useState<boolean>(true);
  const [includeYear, setIncludeYear] = useState<boolean>(true);
  const [includeUrl, setIncludeUrl] = useState<boolean>(false);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [scrapedData, setScrapedData] = useState<any[] | null>(null);
  const [statusText, setStatusText] = useState<string>('Ready to run educational scraper simulation.');

  const handleRunScraper = () => {
    setIsRunning(true);
    setScrapedData(null);
    setStatusText('1/3: Sending HTTP GET request to mock server...');

    setTimeout(() => {
      setStatusText('2/3: Parsing HTML DOM tree and querying CSS selectors...');
      setTimeout(() => {
        setStatusText('3/3: Extracting target fields and assembling structured dataset...');
        
        const extracted = sourceCatalog.map((item) => {
          const row: any = {};
          if (includeTitle) row['Movie Title'] = item.title;
          if (includeRating) row['Rating (Float)'] = item.rating;
          if (includeYear) row['Release Year'] = item.year;
          if (includeUrl) row['Detail Path'] = item.url;
          return row;
        });

        setScrapedData(extracted);
        setIsRunning(false);
        setStatusText('Extraction complete! Structured dataset generated successfully.');
      }, 700);
    }, 600);
  };

  const handleReset = () => {
    setScrapedData(null);
    setStatusText('Ready to run educational scraper simulation.');
    setIsRunning(false);
  };

  // Generate python snippet dynamically based on selected fields
  const generatePythonScript = () => {
    let extractionLines = '';
    let dictLines = '';

    if (includeTitle) {
      extractionLines += `    title = card.find("h2", class_="title").get_text(strip=True)\n`;
      dictLines += `        "title": title,\n`;
    }
    if (includeRating) {
      extractionLines += `    rating = float(card.find("span", class_="rating").get_text(strip=True))\n`;
      dictLines += `        "rating": rating,\n`;
    }
    if (includeYear) {
      extractionLines += `    year = int(card.find("span", class_="year").get_text(strip=True))\n`;
      dictLines += `        "year": year,\n`;
    }
    if (includeUrl) {
      extractionLines += `    link = card.find("a", class_="details")["href"]\n`;
      dictLines += `        "url": link,\n`;
    }

    return `import requests\nfrom bs4 import BeautifulSoup\nimport pandas as pd\n\nurl = "https://example.com/movies"\nresponse = requests.get(url, headers={"User-Agent": "DataScienceStudy/1.0"})\nsoup = BeautifulSoup(response.text, "html.parser")\n\nmovie_records = []\nfor card in soup.find_all("div", class_="movie-card"):\n${extractionLines}    movie_records.append({\n${dictLines}    })\n\ndf = pd.DataFrame(movie_records)\nprint(df.head())`;
  };

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
            End-to-End Hands-On
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Web Scraping & Dataset Simulator
          </h3>
        </div>
        <Tag type="cyan" size="md">
          Controlled Sandbox
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
        Select the target features you wish to extract from the movie catalogue, run the scraper, and observe the live structured output matrix and generated Python code:
      </p>

      {/* Feature Configuration Checkboxes */}
      <div
        style={{
          background: 'var(--cds-layer-01)',
          padding: '1.25rem',
          borderRadius: '4px',
          border: '1px solid var(--ds-border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          SELECT TARGET FEATURES TO EXTRACT
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <Checkbox
            id="chk-title"
            labelText="Movie Titles (h2.title)"
            checked={includeTitle}
            onChange={(_, { checked }) => setIncludeTitle(checked)}
          />
          <Checkbox
            id="chk-rating"
            labelText="Audience Ratings (span.rating)"
            checked={includeRating}
            onChange={(_, { checked }) => setIncludeRating(checked)}
          />
          <Checkbox
            id="chk-year"
            labelText="Release Year (span.year)"
            checked={includeYear}
            onChange={(_, { checked }) => setIncludeYear(checked)}
          />
          <Checkbox
            id="chk-url"
            labelText="Detail Link Attribute (a[href])"
            checked={includeUrl}
            onChange={(_, { checked }) => setIncludeUrl(checked)}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button
            kind="primary"
            size="md"
            renderIcon={PlayFilledAlt}
            disabled={isRunning || (!includeTitle && !includeRating && !includeYear && !includeUrl)}
            onClick={handleRunScraper}
          >
            {isRunning ? 'Scraping...' : 'Execute Scraper Pipeline'}
          </Button>
          {scrapedData && (
            <Button kind="ghost" size="md" renderIcon={Restart} onClick={handleReset}>
              Reset Sandbox
            </Button>
          )}
          <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)', fontFamily: 'var(--ds-font-mono)' }}>
            {statusText}
          </span>
        </div>
      </div>

      {/* Output Results Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Left: Generated Dataset Table */}
        <div
          style={{
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            padding: '1.25rem',
            overflowX: 'auto',
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
            <span>EXTRACTED ANALYTICAL MATRIX</span>
            <Tag type="green" size="sm">
              {scrapedData ? `${scrapedData.length} Rows Ready` : 'Awaiting Run'}
            </Tag>
          </div>

          {scrapedData ? (
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
                  <th style={{ padding: '6px 10px', textAlign: 'left', color: 'var(--ds-text-muted)' }}>#</th>
                  {Object.keys(scrapedData[0] || {}).map((col) => (
                    <th key={col} style={{ padding: '6px 10px', textAlign: 'left', color: 'var(--ds-cyan)' }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scrapedData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}>
                    <td style={{ padding: '6px 10px', color: 'var(--ds-text-muted)' }}>{idx}</td>
                    {Object.values(row).map((val: any, cIdx) => (
                      <td key={cIdx} style={{ padding: '6px 10px', color: 'var(--ds-text-primary)' }}>
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ color: 'var(--ds-text-muted)', fontSize: '0.8125rem', textAlign: 'center', padding: '2rem 0' }}>
              Click &quot;Execute Scraper Pipeline&quot; above to simulate network retrieval and BeautifulSoup parsing.
            </div>
          )}
        </div>

        {/* Right: Dynamic Python Script Preview */}
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
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            GENERATED PYTHON BEAUTIFULSOUP SCRIPT
          </div>

          <pre
            style={{
              margin: 0,
              padding: '0.875rem',
              background: 'var(--cds-field-01)',
              borderRadius: '4px',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.75rem',
              color: 'var(--ds-text-primary)',
              border: '1px solid var(--ds-border-subtle)',
              lineHeight: 1.45,
              overflowX: 'auto',
              flex: 1,
            }}
          >
            <code>{generatePythonScript()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
