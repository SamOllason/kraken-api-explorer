// StoryMode.tsx
// Entry point for the new "Story Mode" feature

import React from 'react';



import FirstBillChapter from './FirstBillChapter';

const StoryIntro: React.FC = () => {
  const [chapter, setChapter] = React.useState<'intro' | 'firstBill'>('intro');

  if (chapter === 'firstBill') {
    return <FirstBillChapter onNext={() => {}} />;
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '2rem auto',
        padding: '2.5rem 2rem',
        background: 'rgba(24, 24, 32, 0.98)',
        borderRadius: 16,
        boxShadow: '0 2px 24px #0008',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontWeight: 800, fontSize: '2.2rem', marginBottom: '1.2rem', color: '#fff' }}>Welcome to Guided Learning!</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: 12 }}>
        Meet <b style={{ color: '#A855F7' }}>Sam</b> (that’s you!) and your loyal dog <b style={{ color: '#F59E42' }}>Obi</b>.<br/>
        Together, you’re about to embark on a year-long journey as an energy customer with Octopus Energy’s Kraken platform.
      </p>
      <p style={{ fontSize: '1.1rem', marginBottom: 12 }}>
        You’ll face real-life scenarios: moving home, switching tariffs, decoding bills, and even joining energy-saving events. Sometimes you’ll play as Sam, sometimes as a helpful support agent.
      </p>
      <p style={{ fontSize: '1.1rem', marginBottom: 12 }}>
        Your choices will shape your experience, your bills, and even Obi’s comfort!
      </p>
      <p style={{ fontStyle: 'italic', color: '#B3B3C6', marginBottom: 24 }}>
        Ready to start your energy adventure?
      </p>
      <button
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
          transition: 'background 0.2s',
        }}
        onClick={() => setChapter('firstBill')}
      >
        Start Story
      </button>
    </div>
  );
};

export default StoryIntro;
