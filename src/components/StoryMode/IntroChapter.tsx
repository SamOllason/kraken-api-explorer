// IntroChapter.tsx
// Chapter 1: Introduction to Sam and Obi's energy journey

import React from 'react';

interface IntroChapterProps {
  onNext: () => void;
}

const IntroChapter: React.FC<IntroChapterProps> = ({ onNext }) => {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: '1rem auto',
        padding: 'clamp(1rem, 4vw, 2.5rem) clamp(0.75rem, 3vw, 2rem)',
        background: 'rgba(24, 24, 32, 0.98)',
        borderRadius: 16,
        boxShadow: '0 2px 24px #0008',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      {/* Characters */}
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        <span role="img" aria-label="Sam">👤</span>
        <span role="img" aria-label="Obi" style={{ marginLeft: 8 }}>🐕</span>
      </div>

      <h1 style={{
        fontWeight: 800,
        fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
        marginBottom: '1rem',
        color: '#fff',
      }}>
        Welcome to Guided Learning!
      </h1>

      <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', marginBottom: 12, lineHeight: 1.6 }}>
        Meet <b style={{ color: '#A855F7' }}>Sam</b> (that's you!) and your loyal dog{' '}
        <b style={{ color: '#F59E42' }}>Obi</b>.<br />
        Together, you're about to embark on a year-long journey as an energy customer
        with Octopus Energy's Kraken platform.
      </p>

      <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', marginBottom: 12, lineHeight: 1.6 }}>
        You'll face real-life scenarios: receiving bills, switching tariffs,
        moving home, and even joining energy-saving events. Along the way, you'll
        learn how the Kraken API works behind the scenes.
      </p>

      <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', marginBottom: 12, lineHeight: 1.6 }}>
        <span role="img" aria-label="info">💡</span> Click the{' '}
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 20,
          height: 20,
          background: '#A855F7',
          borderRadius: '50%',
          fontSize: '0.7rem',
          fontWeight: 700,
          color: '#fff',
        }}>i</span>{' '}
        buttons to see how each piece of data maps to the API.
      </p>

      {/* What you'll learn */}
      <div style={{
        background: '#1a1a24',
        borderRadius: 12,
        padding: '1.25rem',
        marginTop: 20,
        marginBottom: 24,
        textAlign: 'left',
      }}>
        <div style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#888',
          marginBottom: 12,
        }}>
          What you'll explore
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            'Account data',
            'MPAN & MPRN',
            'Tariff codes',
            'Consumption',
            'Billing',
            'Smart meters',
          ].map((topic) => (
            <span
              key={topic}
              style={{
                background: '#2a2a36',
                padding: '0.4rem 0.8rem',
                borderRadius: 6,
                fontSize: '0.85rem',
                color: '#ccc',
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      <p style={{
        fontStyle: 'italic',
        color: '#B3B3C6',
        marginBottom: 24,
      }}>
        Ready to start your energy adventure?
      </p>

      <button
        onClick={onNext}
        style={{
          padding: '0.85rem 2.2rem',
          fontSize: '1.25rem',
          background: 'linear-gradient(90deg, #A855F7 60%, #F59E42 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 10,
          cursor: 'pointer',
          fontWeight: 700,
          letterSpacing: 0.5,
          boxShadow: '0 2px 8px #A855F755',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px #A855F777';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px #A855F755';
        }}
      >
        Begin Journey →
      </button>

      {/* About note */}
      <div style={{
        marginTop: 32,
        paddingTop: 20,
        borderTop: '1px solid #333',
        textAlign: 'center',
      }}>
        <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 8px 0' }}>
          🐙 An interactive tool to help you understand how to work with Kraken's APIs.
        </p>
        <a
          href="https://github.com/SamOllason/kraken-api-explorer#readme"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#A855F7',
            fontSize: '0.8rem',
            textDecoration: 'none',
          }}
        >
          📖 View README on GitHub →
        </a>
      </div>
    </div>
  );
};

export default IntroChapter;
