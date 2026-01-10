// StoryContainer.tsx
// Main container for Story Mode - handles chapter navigation via XState

import React from 'react';
import { useMachine } from '@xstate/react';
import { storyMachine, getCurrentChapter, type ChapterId } from '@/machines/storyMachine';
import ChapterNav from './ChapterNav';
import IntroChapter from './IntroChapter';
import FirstBillChapter from './FirstBillChapter';
import UnderstandingTariffChapter from './UnderstandingTariffChapter';
import MovingHomeChapter from './MovingHomeChapter';

// Progress indicator showing API exploration
const ApiProgressBar: React.FC<{ explored: number; total: number }> = ({ explored, total }) => {
  const percentage = Math.round((explored / total) * 100);

  return (
    <div style={{
      position: 'fixed',
      bottom: 12,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(24, 24, 32, 0.95)',
      padding: '0.4rem 0.75rem',
      borderRadius: 10,
      boxShadow: '0 2px 16px #0006',
      zIndex: 1000,
      maxWidth: 'calc(100vw - 24px)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 'clamp(0.6rem, 2vw, 0.75rem)',
    }}>
      <span style={{ color: '#888', whiteSpace: 'nowrap' }}>API Concepts</span>
      <div style={{
        width: 'clamp(60px, 15vw, 100px)',
        height: 5,
        background: '#2a2a36',
        borderRadius: 3,
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #A855F7, #F59E42)',
          borderRadius: 3,
          transition: 'width 0.3s ease',
        }} />
      </div>
      <span style={{ fontWeight: 600, color: '#A855F7', whiteSpace: 'nowrap' }}>
        {percentage}%
      </span>
    </div>
  );
};

// Total number of API concepts to explore
const TOTAL_API_CONCEPTS = 25; // Estimate based on Kraken's core API surface

const StoryContainer: React.FC = () => {
  const [state, send] = useMachine(storyMachine);
  const { currentChapter, completedChapters, exploredConcepts } = state.context;
  const chapterMeta = getCurrentChapter(currentChapter);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    send({ type: 'NEXT_CHAPTER' });
    scrollToTop();
  };
  const handlePrevious = () => {
    send({ type: 'PREVIOUS_CHAPTER' });
    scrollToTop();
  };
  const handleGoToChapter = (chapterId: ChapterId) => {
    send({ type: 'GO_TO_CHAPTER', chapterId });
    scrollToTop();
  };
  const handleExploreConcept = (conceptId: string) => send({ type: 'EXPLORE_CONCEPT', conceptId });

  const renderChapter = () => {
    switch (currentChapter) {
      case 'intro':
        return <IntroChapter onNext={handleNext} />;
      case 'firstBill':
        return (
          <FirstBillChapter
            onNext={handleNext}
            onExploreConcept={handleExploreConcept}
          />
        );
      case 'understandingTariff':
        return (
          <UnderstandingTariffChapter
            onNext={handleNext}
            onExploreConcept={handleExploreConcept}
          />
        );
      // Future chapters - all show the roadmap
      case 'movingHome':
      case 'switchingTariff':
      case 'savingSession':
      case 'agentView':
        return (
          <MovingHomeChapter
            onNext={handleNext}
            onExploreConcept={handleExploreConcept}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 80 }}>
      {/* Chapter Title Banner */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.15) 0%, transparent 100%)',
        padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
        paddingTop: 'clamp(3rem, 8vw, 4rem)',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: 2,
          color: '#A855F7',
          marginBottom: 4,
        }}>
          Chapter {chapterMeta.number}
        </div>
        <h1 style={{
          margin: 0,
          fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
          fontWeight: 700,
          color: '#fff',
        }}>
          {chapterMeta.title}
        </h1>
      </div>

      {/* Navigation */}
      <div style={{ maxWidth: 650, margin: '0 auto', padding: '0 0.75rem' }}>
        <ChapterNav
          currentChapter={currentChapter}
          completedChapters={completedChapters}
          onGoToChapter={handleGoToChapter}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>

      {/* Chapter Content */}
      {renderChapter()}

      {/* API Progress */}
      <ApiProgressBar explored={exploredConcepts.length} total={TOTAL_API_CONCEPTS} />
    </div>
  );
};

export default StoryContainer;
