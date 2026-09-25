'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Tag, InlineLoading } from '@carbon/react';
import {
  Send,
  TrashCan,
  Bot,
  User,
  Copy,
  Checkmark,
  Idea,
  Security,
  WarningAlt,
  Code,
  Information,
} from '@carbon/icons-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const STARTER_PROMPTS = [
  'Explain IQR vs Z-Score method for outlier detection with formulas.',
  'What is the difference between loc and iloc in Pandas?',
  'Why should df.info() be used instead of print(df.info())?',
  'Explain NumPy broadcasting rules with an example.',
  'How do we handle missing values using mean vs median imputation?',
  'Explain the API request-response cycle with HTTP status codes.',
  'What is the difference between primary and secondary data?',
  'Differentiate between inner, left, right, and outer joins in Pandas.',
];

export function AskDIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am **Ask DI**, your dedicated AI Teaching Assistant for **Introduction to Data Science (DS-201)**.\n\nI am specialized strictly in our course curriculum: **Python for Data Science, NumPy, Pandas, Data Preprocessing, Missing Data Imputation, Outlier Detection, EDA, and Statistics**.\n\nHow can I assist your learning today? Feel free to ask a conceptual question, request a code explanation, or click any starter prompt below!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    setErrorMsg(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) {
      setInputMessage('');
    }
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const response = await fetch('/api/ask-di', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          conversationHistory: history,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate response from Ask DI.');
      }

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to reach Ask DI assistant.');
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Chat history cleared. What Data Science topic would you like to explore?`,
        timestamp: 'Just now',
      },
    ]);
    setErrorMsg(null);
  };

  // Simple and robust parser for markdown text, code blocks, bold text, and lists
  const renderFormattedContent = (content: string, msgId: string) => {
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let snippetCount = 0;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      const precedingText = content.substring(lastIndex, match.index);
      if (precedingText) {
        parts.push(
          <div key={`text-${lastIndex}`} style={{ whiteSpace: 'pre-line', lineHeight: 1.65 }}>
            {formatInlineMarkdown(precedingText)}
          </div>
        );
      }

      const lang = match[1] || 'python';
      const code = match[2].trim();
      const codeId = `${msgId}-code-${snippetCount++}`;

      parts.push(
        <div
          key={codeId}
          style={{
            margin: '0.875rem 0',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid var(--ds-border-strong)',
            background: '#0d1117',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 12px',
              background: '#161b22',
              borderBottom: '1px solid #30363d',
              fontSize: '0.75rem',
              color: 'var(--ds-cyan)',
              fontFamily: 'var(--ds-font-mono)',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Code size={14} /> {lang.toUpperCase()}
            </span>
            <button
              onClick={() => copyToClipboard(code, codeId)}
              style={{
                background: 'transparent',
                border: 'none',
                color: copiedId === codeId ? 'var(--ds-emerald)' : 'var(--ds-text-secondary)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
              }}
            >
              {copiedId === codeId ? <Checkmark size={14} /> : <Copy size={14} />}
              {copiedId === codeId ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre
            style={{
              margin: 0,
              padding: '1rem',
              overflowX: 'auto',
              fontSize: '0.8125rem',
              fontFamily: 'var(--ds-font-mono)',
              color: '#e6edf3',
              lineHeight: 1.55,
            }}
          >
            <code>{code}</code>
          </pre>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    const remainingText = content.substring(lastIndex);
    if (remainingText) {
      parts.push(
        <div key={`text-${lastIndex}`} style={{ whiteSpace: 'pre-line', lineHeight: 1.65 }}>
          {formatInlineMarkdown(remainingText)}
        </div>
      );
    }

    return parts;
  };

  const formatInlineMarkdown = (text: string): React.ReactNode => {
    // Process bold text **word** and inline code `code`
    const tokens = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return tokens.map((token, i) => {
      if (token.startsWith('**') && token.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--ds-text-primary)' }}>{token.slice(2, -2)}</strong>;
      }
      if (token.startsWith('`') && token.endsWith('`')) {
        return (
          <code
            key={i}
            style={{
              background: 'rgba(15, 98, 254, 0.15)',
              color: 'var(--ds-cyan)',
              padding: '2px 6px',
              borderRadius: '3px',
              fontFamily: 'var(--ds-font-mono)',
              fontSize: '0.85em',
            }}
          >
            {token.slice(1, -1)}
          </code>
        );
      }
      return token;
    });
  };

  return (
    <div
      className="ds-glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '75vh',
        minHeight: '550px',
        borderRadius: '6px',
        border: '1px solid var(--ds-border-strong)',
        background: 'var(--ds-bg-surface)',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          background: 'var(--ds-bg-core)',
          borderBottom: '1px solid var(--ds-border-subtle)',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--ds-cyan), var(--ds-purple))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <Bot size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: 'var(--ds-text-primary)' }}>
                Ask DI — AI Teaching Assistant
              </h3>
              <Tag type="cyan" size="sm">
                DS-201 Active
              </Tag>
            </div>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--ds-text-secondary)' }}>
              Powered by Google Gemini • Strictly Guardrailed to Data Science Curriculum
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              color: 'var(--ds-text-muted)',
              padding: '4px 8px',
              background: 'rgba(15, 98, 254, 0.08)',
              borderRadius: '4px',
              border: '1px solid var(--ds-border-subtle)',
            }}
          >
            <Security size={14} style={{ color: 'var(--ds-cyan)' }} />
            <span>Subject-Exclusive AI</span>
          </div>

          <Button
            size="sm"
            kind="ghost"
            hasIconOnly
            renderIcon={TrashCan}
            iconDescription="Clear Conversation"
            onClick={clearChat}
            tooltipPosition="bottom"
          />
        </div>
      </div>

      {/* Subject Guardrail Notice Pill */}
      <div
        style={{
          padding: '6px 1.5rem',
          background: 'rgba(138, 63, 252, 0.08)',
          borderBottom: '1px solid var(--ds-border-subtle)',
          fontSize: '0.75rem',
          color: 'var(--ds-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Information size={14} style={{ color: 'var(--ds-purple)', flexShrink: 0 }} />
        <span>
          Ask DI will answer questions regarding Python, NumPy, Pandas, Data Preprocessing, EDA, and Statistics. Unrelated queries will be politely redirected.
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          background: 'var(--cds-background)',
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  maxWidth: isUser ? '85%' : '92%',
                  flexDirection: isUser ? 'row-reverse' : 'row',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: isUser ? 'var(--ds-cyan)' : 'var(--ds-purple)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isUser ? '#000000' : '#ffffff',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {isUser ? <User size={16} /> : <Bot size={16} />}
                </div>

                {/* Message Body */}
                <div
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: isUser ? '12px 2px 12px 12px' : '2px 12px 12px 12px',
                    background: isUser
                      ? 'linear-gradient(135deg, rgba(15, 98, 254, 0.25), rgba(0, 157, 255, 0.15))'
                      : 'var(--ds-bg-surface)',
                    border: isUser ? '1px solid var(--ds-cyan)' : '1px solid var(--ds-border-strong)',
                    color: 'var(--ds-text-primary)',
                    fontSize: '0.875rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  {renderFormattedContent(msg.content, msg.id)}
                </div>
              </div>

              {/* Timestamp */}
              <span
                style={{
                  fontSize: '0.6875rem',
                  color: 'var(--ds-text-muted)',
                  marginTop: '4px',
                  marginRight: isUser ? '42px' : 0,
                  marginLeft: isUser ? 0 : '42px',
                }}
              >
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginLeft: '4px' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'var(--ds-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                flexShrink: 0,
              }}
            >
              <Bot size={16} />
            </div>
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '2px 12px 12px 12px',
                background: 'var(--ds-bg-surface)',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <InlineLoading description="Ask DI is thinking and checking syllabus context..." />
            </div>
          </div>
        )}

        {/* Error Alert if any */}
        {errorMsg && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '4px',
              background: 'rgba(218, 30, 40, 0.15)',
              border: '1px solid var(--ds-red)',
              color: '#ff8389',
              fontSize: '0.8125rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <WarningAlt size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Chips */}
      <div
        style={{
          padding: '0.75rem 1.5rem',
          background: 'var(--ds-bg-core)',
          borderTop: '1px solid var(--ds-border-subtle)',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: '0.6875rem',
            color: 'var(--ds-text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            flexShrink: 0,
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <Idea size={12} style={{ color: 'var(--ds-amber)' }} /> Suggested:
        </span>
        {STARTER_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            disabled={isLoading}
            onClick={() => handleSend(prompt)}
            style={{
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              border: '1px solid var(--ds-border-subtle)',
              background: 'var(--ds-bg-surface)',
              color: 'var(--ds-text-secondary)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--ds-cyan)';
              e.currentTarget.style.color = 'var(--ds-cyan)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--ds-border-subtle)';
              e.currentTarget.style.color = 'var(--ds-text-secondary)';
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box Area */}
      <div
        style={{
          padding: '1rem 1.5rem',
          background: 'var(--ds-bg-surface)',
          borderTop: '1px solid var(--ds-border-subtle)',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-end',
        }}
      >
        <textarea
          ref={textareaRef}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask any question on Data Science, NumPy, Pandas, Preprocessing, EDA (Press Enter to Send)..."
          disabled={isLoading}
          rows={2}
          style={{
            flexGrow: 1,
            padding: '10px 14px',
            borderRadius: '4px',
            border: '1px solid var(--ds-border-strong)',
            background: 'var(--ds-bg-core)',
            color: 'var(--ds-text-primary)',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            resize: 'none',
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />

        <Button
          size="md"
          kind="primary"
          renderIcon={Send}
          disabled={!inputMessage.trim() || isLoading}
          onClick={() => handleSend()}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
