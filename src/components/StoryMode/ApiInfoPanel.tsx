// ApiInfoPanel.tsx
// Reusable slide-out panel for showing API mappings in story mode

import React from 'react';

export interface ApiInfo {
  title: string;
  path: string;
  description: string;
  graphqlSnippet?: string;
  responseExample?: string;
}

interface ApiInfoPanelProps {
  info: ApiInfo | null;
  onClose: () => void;
  onExplore?: () => void; // Called when user "explores" this concept
}

const ApiInfoPanel: React.FC<ApiInfoPanelProps> = ({ info, onClose, onExplore }) => {
  React.useEffect(() => {
    if (info && onExplore) {
      onExplore();
    }
  }, [info, onExplore]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: info ? 400 : 0,
        background: 'rgba(24, 24, 32, 0.98)',
        color: '#fff',
        boxShadow: info ? '-4px 0 24px #0008' : 'none',
        zIndex: 2000,
        overflow: 'hidden',
        transition: 'width 0.35s cubic-bezier(.77,0,.18,1)',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: info ? 'auto' : 'none',
      }}
    >
      {info && (
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1.5rem',
          }}>
            <div>
              <div style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: '#A855F7',
                marginBottom: 4,
              }}>
                API Mapping
              </div>
              <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>
                {info.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#888',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: 4,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {/* API Path */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: 1,
              color: '#888',
              marginBottom: 8,
            }}>
              Path
            </div>
            <code style={{
              display: 'block',
              background: '#1a1a24',
              padding: '0.75rem 1rem',
              borderRadius: 8,
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: '#58A6FF',
              wordBreak: 'break-all',
            }}>
              {info.path}
            </code>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: 1,
              color: '#888',
              marginBottom: 8,
            }}>
              What it means
            </div>
            <p style={{
              margin: 0,
              lineHeight: 1.6,
              color: '#ccc',
            }}>
              {info.description}
            </p>
          </div>

          {/* GraphQL Snippet */}
          {info.graphqlSnippet && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: '#888',
                marginBottom: 8,
              }}>
                GraphQL Query
              </div>
              <pre style={{
                background: '#1a1a24',
                padding: '1rem',
                borderRadius: 8,
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: '#00DC82',
                overflow: 'auto',
                margin: 0,
                whiteSpace: 'pre-wrap',
              }}>
                {info.graphqlSnippet}
              </pre>
            </div>
          )}

          {/* Response Example */}
          {info.responseExample && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: '#888',
                marginBottom: 8,
              }}>
                Example Response
              </div>
              <pre style={{
                background: '#1a1a24',
                padding: '1rem',
                borderRadius: 8,
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: '#F59E42',
                overflow: 'auto',
                margin: 0,
                whiteSpace: 'pre-wrap',
              }}>
                {info.responseExample}
              </pre>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#A855F7',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: 'auto',
            }}
          >
            Got it!
          </button>
        </div>
      )}
    </div>
  );
};

export default ApiInfoPanel;
