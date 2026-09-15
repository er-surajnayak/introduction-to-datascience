'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Button } from '@carbon/react';
import { Layers, ChevronRight, Information, Code, Document } from '@carbon/icons-react';

interface DomNode {
  id: string;
  tag: string;
  className?: string;
  domId?: string;
  label: string;
  text?: string;
  attributes?: Record<string, string>;
  children?: DomNode[];
  path: string;
}

const domTreeData: DomNode = {
  id: 'html',
  tag: 'html',
  label: 'html (Document Root)',
  path: 'html',
  children: [
    {
      id: 'head',
      tag: 'head',
      label: 'head (Document Metadata)',
      path: 'html > head',
      children: [
        {
          id: 'title-tag',
          tag: 'title',
          label: 'title',
          text: 'Movie Database 2026',
          path: 'html > head > title',
        },
      ],
    },
    {
      id: 'body',
      tag: 'body',
      label: 'body (Visible Document)',
      path: 'html > body',
      children: [
        {
          id: 'header',
          tag: 'header',
          className: 'site-header',
          label: 'header.site-header',
          path: 'html > body > header',
          children: [
            {
              id: 'h1',
              tag: 'h1',
              domId: 'main-title',
              label: 'h1#main-title',
              text: 'Cinema Analytics Catalog',
              path: 'html > body > header > h1#main-title',
            },
          ],
        },
        {
          id: 'main',
          tag: 'main',
          className: 'catalog-container',
          label: 'main.catalog-container',
          path: 'html > body > main.catalog-container',
          children: [
            {
              id: 'card1',
              tag: 'div',
              className: 'movie-card',
              label: 'div.movie-card (Interstellar)',
              path: 'html > body > main > div.movie-card:nth-child(1)',
              children: [
                {
                  id: 'h2-1',
                  tag: 'h2',
                  className: 'title',
                  label: 'h2.title',
                  text: 'Interstellar',
                  path: 'html > body > main > div.movie-card > h2.title',
                },
                {
                  id: 'rating-1',
                  tag: 'span',
                  className: 'rating',
                  label: 'span.rating',
                  text: '8.7',
                  path: 'html > body > main > div.movie-card > span.rating',
                },
                {
                  id: 'genre-1',
                  tag: 'p',
                  className: 'genre',
                  label: 'p.genre',
                  text: 'Sci-Fi / Adventure',
                  path: 'html > body > main > div.movie-card > p.genre',
                },
                {
                  id: 'link-1',
                  tag: 'a',
                  className: 'link',
                  label: 'a.link',
                  text: 'Details',
                  attributes: { href: '/movies/interstellar' },
                  path: 'html > body > main > div.movie-card > a.link',
                },
              ],
            },
            {
              id: 'card2',
              tag: 'div',
              className: 'movie-card',
              label: 'div.movie-card (Inception)',
              path: 'html > body > main > div.movie-card:nth-child(2)',
              children: [
                {
                  id: 'h2-2',
                  tag: 'h2',
                  className: 'title',
                  label: 'h2.title',
                  text: 'Inception',
                  path: 'html > body > main > div.movie-card > h2.title',
                },
                {
                  id: 'rating-2',
                  tag: 'span',
                  className: 'rating',
                  label: 'span.rating',
                  text: '8.8',
                  path: 'html > body > main > div.movie-card > span.rating',
                },
              ],
            },
          ],
        },
        {
          id: 'footer',
          tag: 'footer',
          className: 'site-footer',
          label: 'footer.site-footer',
          path: 'html > body > footer',
          children: [
            {
              id: 'p-footer',
              tag: 'p',
              label: 'p',
              text: '© 2026 Data Science Educational Database',
              path: 'html > body > footer > p',
            },
          ],
        },
      ],
    },
  ],
};

export function DomTreeExplorer() {
  const [selectedNode, setSelectedNode] = useState<DomNode>(
    domTreeData.children![1].children![1].children![0].children![0] // h2.title Interstellar
  );

  const renderTreeNode = (node: DomNode, depth: number = 0) => {
    const isSelected = selectedNode.id === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} style={{ marginLeft: `${depth * 14}px` }}>
        <button
          onClick={() => setSelectedNode(node)}
          style={{
            background: isSelected ? 'var(--ds-cyan-dim)' : 'transparent',
            border: isSelected
              ? '1px solid var(--ds-cyan)'
              : '1px solid transparent',
            borderRadius: '4px',
            padding: '4px 8px',
            margin: '2px 0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.75rem',
            color: isSelected ? 'var(--ds-cyan)' : 'var(--ds-text-primary)',
            textAlign: 'left',
            width: '100%',
            transition: 'all 0.1s ease',
          }}
        >
          <span style={{ color: 'var(--ds-text-muted)', fontSize: '0.6875rem' }}>
            {hasChildren ? '▼' : '•'}
          </span>
          <span style={{ color: '#ff7b72' }}>&lt;{node.tag}&gt;</span>
          {node.className && (
            <span style={{ color: '#79c0ff' }}>.{node.className}</span>
          )}
          {node.domId && (
            <span style={{ color: '#d2a8ff' }}>#{node.domId}</span>
          )}
          {node.text && (
            <span style={{ color: 'var(--ds-text-muted)', marginLeft: 'auto', fontSize: '0.6875rem' }}>
              &quot;{node.text.length > 18 ? node.text.slice(0, 18) + '...' : node.text}&quot;
            </span>
          )}
        </button>

        {hasChildren && (
          <div
            style={{
              borderLeft: '1px dashed var(--ds-border-subtle)',
              marginLeft: '6px',
              paddingLeft: '2px',
            }}
          >
            {node.children!.map((child) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
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
            Structural Architecture
          </span>
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--ds-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Interactive DOM Tree Explorer
          </h3>
        </div>
        <Tag type="teal" size="md">
          Hierarchy Navigator
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
        When a browser or HTML parser loads markup, it constructs a parent-child tree called the <strong>Document Object Model (DOM)</strong>. Click any node in the tree below to inspect its attributes, path, and BeautifulSoup querying syntax:
      </p>

      {/* Two-Column Grid: Tree on Left, Node Details on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Left: DOM Tree Explorer */}
        <div
          style={{
            background: 'var(--cds-layer-01)',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            padding: '1.25rem',
            maxHeight: '440px',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--ds-font-mono)',
              color: 'var(--ds-cyan)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Layers size={14} />
            DOCUMENT OBJECT MODEL TREE (CLICK TO SELECT)
          </div>

          <div style={{ paddingRight: '4px' }}>{renderTreeNode(domTreeData)}</div>
        </div>

        {/* Right: Selected Node Inspection Card */}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  padding: '4px 8px',
                  borderRadius: '3px',
                  background: 'var(--ds-cyan-dim)',
                  color: 'var(--ds-cyan)',
                  fontFamily: 'var(--ds-font-mono)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                }}
              >
                &lt;{selectedNode.tag}&gt;
              </span>
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ds-text-primary)' }}>
                {selectedNode.label}
              </span>
            </div>
            <Tag type="cyan" size="sm">
              DOM Node
            </Tag>
          </div>

          {/* DOM Breadcrumb Path */}
          <div
            style={{
              padding: '0.625rem 0.875rem',
              background: 'var(--cds-layer-02)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.75rem',
              color: 'var(--ds-cyan)',
              marginBottom: '1.25rem',
              overflowX: 'auto',
            }}
          >
            <span style={{ color: 'var(--ds-text-muted)' }}>DOM Path: </span>
            {selectedNode.path}
          </div>

          {/* Node Metadata Table */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              marginBottom: '1.25rem',
            }}
          >
            <div style={{ padding: '0.75rem', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
                Tag Name
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', fontWeight: 600 }}>
                {selectedNode.tag}
              </div>
            </div>

            <div style={{ padding: '0.75rem', background: 'var(--cds-layer-02)', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase' }}>
                Class / ID
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--ds-text-primary)', fontWeight: 600 }}>
                {selectedNode.className ? `.${selectedNode.className}` : selectedNode.domId ? `#${selectedNode.domId}` : 'None'}
              </div>
            </div>
          </div>

          {/* Inner Text & Attributes */}
          {selectedNode.text && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Inner Text (.get_text())
              </div>
              <div style={{ padding: '0.625rem 0.875rem', background: 'var(--cds-field-01)', borderRadius: '4px', color: 'var(--ds-emerald)', fontSize: '0.875rem', border: '1px solid var(--ds-border-subtle)' }}>
                &quot;{selectedNode.text}&quot;
              </div>
            </div>
          )}

          {selectedNode.attributes && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                HTML Attributes (link[&quot;href&quot;])
              </div>
              <div style={{ padding: '0.625rem 0.875rem', background: 'var(--cds-field-01)', borderRadius: '4px', color: 'var(--ds-cyan)', fontSize: '0.875rem', border: '1px solid var(--ds-border-subtle)' }}>
                {JSON.stringify(selectedNode.attributes)}
              </div>
            </div>
          )}

          {/* BeautifulSoup Syntax */}
          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Equivalent BeautifulSoup Query
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
              }}
            >
              <code>
                {selectedNode.className
                  ? `soup.find("${selectedNode.tag}", class_="${selectedNode.className}")`
                  : selectedNode.domId
                  ? `soup.find("${selectedNode.tag}", id="${selectedNode.domId}")`
                  : `soup.find("${selectedNode.tag}")`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
