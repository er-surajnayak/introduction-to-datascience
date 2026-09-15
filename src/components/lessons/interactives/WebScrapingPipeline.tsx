'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import {
  Code,
  DataRefinery,
  Document,
  Filter,
  Layers,
  Table,
  CheckmarkFilled,
  ArrowRight,
  Catalog,
} from '@carbon/icons-react';

interface PipelineStage {
  id: string;
  stepNumber: number;
  name: string;
  shortLabel: string;
  icon: React.ReactNode;
  summary: string;
  inputFormat: string;
  outputFormat: string;
  role: string;
  tooling: string;
  pythonSnippet: string;
}

const pipelineStages: PipelineStage[] = [
  {
    id: 'webpage',
    stepNumber: 1,
    name: '1. Human Webpage',
    shortLabel: 'Webpage',
    icon: <Document size={20} />,
    summary: 'The target website designed for human visual consumption inside a web browser.',
    inputFormat: 'URL (e.g., https://example.com/movies)',
    outputFormat: 'Visual browser rendered canvas with images, text, and layout',
    role: 'Provides the visual interface where data is displayed. We identify what data we want by looking at the page.',
    tooling: 'Web Browser (Chrome, Firefox DevTools)',
    pythonSnippet: '# Identify target URL\ntarget_url = "https://example.com/movies"',
  },
  {
    id: 'html',
    stepNumber: 2,
    name: '2. Raw HTML Markup',
    shortLabel: 'HTML',
    icon: <Code size={20} />,
    summary: 'The underlying HyperText Markup Language string fetched across the network via HTTP GET.',
    inputFormat: 'HTTP Request across TCP/IP',
    outputFormat: 'Raw text string containing nested HTML tags (<h1>, <div>, <p>)',
    role: 'Transfers the document structure from the remote server to Python memory without needing a visual display.',
    tooling: 'Python `requests.get()` library',
    pythonSnippet: 'import requests\nresponse = requests.get(target_url, headers={"User-Agent": "DS-Bot/1.0"})\nhtml_text = response.text',
  },
  {
    id: 'parse',
    stepNumber: 3,
    name: '3. Parse Tree (DOM)',
    shortLabel: 'DOM Tree',
    icon: <Layers size={20} />,
    summary: 'Transforming the raw text string into a hierarchical, navigable tree of element objects.',
    inputFormat: 'Raw HTML string',
    outputFormat: 'Searchable BeautifulSoup DOM tree of tag nodes',
    role: 'Allows Python to understand parent-child relationships, tag names, classes, and attributes.',
    tooling: 'BeautifulSoup (`bs4`) with "html.parser"',
    pythonSnippet: 'from bs4 import BeautifulSoup\nsoup = BeautifulSoup(html_text, "html.parser")',
  },
  {
    id: 'find',
    stepNumber: 4,
    name: '4. Find Elements',
    shortLabel: 'Select',
    icon: <Filter size={20} />,
    summary: 'Querying the DOM tree using CSS selectors or tag/class filters to isolate target elements.',
    inputFormat: 'BeautifulSoup tree + CSS selectors (`.movie-card`, `h2.title`)',
    outputFormat: 'ResultSet collection of matching HTML element nodes',
    role: 'Filters out thousands of irrelevant layout tags to isolate only the repeating data containers.',
    tooling: '`soup.find()`, `soup.find_all()`, `soup.select()`',
    pythonSnippet: '# Find all movie container cards\ncards = soup.find_all("div", class_="movie-card")',
  },
  {
    id: 'extract',
    stepNumber: 5,
    name: '5. Extract Data',
    shortLabel: 'Extract',
    icon: <DataRefinery size={20} />,
    summary: 'Pulling pure text strings and attribute values out of individual element nodes.',
    inputFormat: 'HTML Tag objects (`<h2>Interstellar</h2>`, `<a href="/path">`)',
    outputFormat: 'Raw strings: text values ("Interstellar") and attribute values ("/path")',
    role: 'Discards HTML tags and captures the exact information fields needed for the study.',
    tooling: '`node.get_text()`, `node["href"]`, `node["src"]`',
    pythonSnippet: 'title = card.find("h2").get_text(strip=True)\nrating = card.find("span", class_="rating").get_text(strip=True)\nlink = card.find("a")["href"]',
  },
  {
    id: 'clean',
    stepNumber: 6,
    name: '6. Clean & Format',
    shortLabel: 'Clean',
    icon: <Catalog size={20} />,
    summary: 'Stripping whitespace, casting numeric types, and standardizing data representations.',
    inputFormat: 'Raw extracted string variables',
    outputFormat: 'Clean typed variables (float, int, clean str)',
    role: 'Converts text like "8.7" into a Python float 8.7, and removes extra spaces and newlines.',
    tooling: 'Python string methods (`.strip()`, `.replace()`), `float()`, `int()`',
    pythonSnippet: 'clean_rating = float(rating.replace("⭐", "").strip())\nclean_title = title.strip()',
  },
  {
    id: 'structure',
    stepNumber: 7,
    name: '7. Structured Records',
    shortLabel: 'Records',
    icon: <Table size={20} />,
    summary: 'Aggregating extracted fields into standardized row dictionaries inside a dataset list.',
    inputFormat: 'Individual clean feature variables',
    outputFormat: 'List of dictionaries (`[{"title": "Interstellar", "rating": 8.7}, ...]`)',
    role: 'Organizes discrete data observations into uniform records ready for tabular ingestion.',
    tooling: 'Python lists & dictionaries',
    pythonSnippet: 'records = []\nrecords.append({\n    "title": clean_title,\n    "rating": clean_rating,\n    "url": link\n})',
  },
  {
    id: 'pandas',
    stepNumber: 8,
    name: '8. Pandas DataFrame & Analysis',
    shortLabel: 'Pandas',
    icon: <CheckmarkFilled size={20} />,
    summary: 'Loading the structured records into a Pandas DataFrame for statistical modeling and analysis.',
    inputFormat: 'List of dictionaries or HTML `<table>` markup',
    outputFormat: 'Pandas 2D DataFrame matrix with vectorized operations',
    role: 'Enables high-performance aggregations, filtering, feature engineering, and ML modeling.',
    tooling: '`pandas` (`pd.DataFrame(records)`, `pd.read_html()`)',
    pythonSnippet: 'import pandas as pd\ndf = pd.DataFrame(records)\nprint(df.describe())',
  },
];

export function WebScrapingPipeline() {
  const [activeStageId, setActiveStageId] = useState<string>('webpage');

  const activeStage =
    pipelineStages.find((s) => s.id === activeStageId) || pipelineStages[0];

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
            Core Mental Model
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            The 8-Stage Web Scraping & Ingestion Pipeline
          </h3>
        </div>
        <Tag type="cyan" size="md">
          Interactive Architecture
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
        Click each stage along the pipeline to trace how a human-facing webpage is systematically broken down, parsed, and converted into an analytical dataset:
      </p>

      {/* Horizontal Pipeline Steps Stepper */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: '6px',
          marginBottom: '1.75rem',
        }}
      >
        {pipelineStages.map((stage) => {
          const isActive = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              style={{
                background: isActive ? 'var(--ds-cyan-dim)' : 'var(--cds-layer-01)',
                border: isActive
                  ? '2px solid var(--ds-cyan)'
                  : '1px solid var(--ds-border-subtle)',
                borderRadius: '4px',
                padding: '0.75rem 0.5rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '6px',
                transition: 'all 0.15s ease',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: isActive ? 'var(--ds-cyan)' : 'var(--cds-layer-02)',
                  color: isActive ? '#000' : 'var(--ds-text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--ds-font-mono)',
                }}
              >
                {stage.stepNumber}
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--ds-cyan)' : 'var(--ds-text-secondary)',
                  lineHeight: 1.2,
                }}
              >
                {stage.shortLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          style={{
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            padding: '1.5rem',
          }}
        >
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '4px',
                  background: 'var(--ds-cyan-dim)',
                  color: 'var(--ds-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {activeStage.icon}
              </div>
              <div>
                <h4
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--ds-text-primary)',
                    margin: 0,
                  }}
                >
                  {activeStage.name}
                </h4>
                <span style={{ fontSize: '0.8125rem', color: 'var(--ds-text-muted)' }}>
                  Tool: {activeStage.tooling}
                </span>
              </div>
            </div>

            <Tag type="teal" size="sm">
              Stage {activeStage.stepNumber} of 8
            </Tag>
          </div>

          <p
            style={{
              fontSize: '0.9375rem',
              color: 'var(--ds-text-primary)',
              lineHeight: 1.5,
              marginBottom: '1.25rem',
            }}
          >
            {activeStage.summary}
          </p>

          {/* I/O Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
              marginBottom: '1.25rem',
            }}
          >
            <div
              style={{
                padding: '0.875rem 1rem',
                background: 'var(--cds-layer-02)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--ds-font-mono)',
                  color: 'var(--ds-text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Input Data Format
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--ds-text-primary)',
                  fontWeight: 500,
                }}
              >
                {activeStage.inputFormat}
              </div>
            </div>

            <div
              style={{
                padding: '0.875rem 1rem',
                background: 'var(--cds-layer-02)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--ds-font-mono)',
                  color: 'var(--ds-text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Output Transformed Data
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--ds-emerald)',
                  fontWeight: 500,
                }}
              >
                {activeStage.outputFormat}
              </div>
            </div>
          </div>

          {/* Role Explanation */}
          <div
            style={{
              padding: '0.875rem 1rem',
              background: 'var(--ds-cyan-dim)',
              borderLeft: '3px solid var(--ds-cyan)',
              borderRadius: '0 4px 4px 0',
              marginBottom: '1.25rem',
              fontSize: '0.875rem',
              color: 'var(--ds-text-primary)',
              lineHeight: 1.5,
            }}
          >
            <strong>Engineering Role: </strong> {activeStage.role}
          </div>

          {/* Python Implementation Snippet */}
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--ds-font-mono)',
                color: 'var(--ds-cyan)',
                marginBottom: '6px',
                textTransform: 'uppercase',
              }}
            >
              Python Implementation Snippet
            </div>
            <pre
              style={{
                margin: 0,
                padding: '1rem',
                background: 'var(--cds-field-01)',
                borderRadius: '4px',
                fontFamily: 'var(--ds-font-mono)',
                fontSize: '0.8125rem',
                lineHeight: 1.55,
                color: 'var(--ds-text-primary)',
                overflowX: 'auto',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <code>{activeStage.pythonSnippet}</code>
            </pre>
          </div>

          {/* Step Navigation Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--ds-border-subtle)',
            }}
          >
            <Button
              kind="ghost"
              size="sm"
              disabled={activeStage.stepNumber === 1}
              onClick={() =>
                setActiveStageId(pipelineStages[activeStage.stepNumber - 2].id)
              }
            >
              Previous Stage
            </Button>
            <Button
              kind="primary"
              size="sm"
              renderIcon={ArrowRight}
              disabled={activeStage.stepNumber === pipelineStages.length}
              onClick={() =>
                setActiveStageId(pipelineStages[activeStage.stepNumber].id)
              }
            >
              Next Stage
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
