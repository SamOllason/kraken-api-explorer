import React from 'react';
import { useMachine } from '@xstate/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { explorerMachine } from '@/machines/explorerMachine';

import { Dashboard } from '@/components/Dashboard';
import { InfoPanel } from '@/components/InfoPanel';
import { TariffDecoder } from '@/components/TariffDecoder';
import { mockAccount } from '@/data/mockAccount';
import type { ConceptId } from '@/data/concepts';
import { StoryContainer } from '@/components/StoryMode';

function App() {
  const [state, send] = useMachine(explorerMachine);
  const [showStoryMode, setShowStoryMode] = React.useState(false);

  const handleInfoClick = (conceptId: ConceptId) => {
    send({ type: 'OPEN_CONCEPT', conceptId });
  };

  const handleTariffClick = () => {
    send({ type: 'DECODE_TARIFF' });
  };

  const handleClosePanel = () => {
    send({ type: 'CLOSE_PANEL' });
  };

  const handleNavigateToConcept = (conceptId: ConceptId) => {
    send({ type: 'NAVIGATE_TO_CONCEPT', conceptId });
  };

  // Get current tariff code for decoder
  const currentTariffCode = mockAccount.properties[0].electricityMeterPoints[0].agreements[0].tariffCode;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 100 }}>
        <button
          onClick={() => setShowStoryMode((v) => !v)}
          style={{
            padding: showStoryMode ? '0.6rem 1.5rem' : '0.75rem 1.75rem',
            fontSize: showStoryMode ? '1rem' : '1.1rem',
            background: showStoryMode ? '#A855F7' : 'linear-gradient(135deg, #A855F7 0%, #F59E42 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 700,
            boxShadow: showStoryMode ? '0 2px 8px #A855F733' : '0 4px 20px rgba(168, 85, 247, 0.4)',
            transition: 'all 0.2s',
            animation: showStoryMode ? 'none' : 'pulse 2s infinite',
          }}
        >
          {showStoryMode ? '← Back to Dashboard' : '🎓 Start Guided Learning'}
        </button>
        {!showStoryMode && (
          <style>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4); }
              50% { transform: scale(1.03); box-shadow: 0 6px 25px rgba(168, 85, 247, 0.6); }
            }
          `}</style>
        )}
      </div>
      {showStoryMode ? (
        <StoryContainer />
      ) : (
        <>
          <Dashboard
            onInfoClick={handleInfoClick}
            onTariffClick={handleTariffClick}
            visitedConcepts={state.context.visitedConcepts}
          />

          <InfoPanel
            conceptId={state.context.activeConcept}
            isOpen={state.matches('viewingConcept')}
            onClose={handleClosePanel}
            onNavigateToConcept={handleNavigateToConcept}
          />

          <TariffDecoder
            tariffCode={currentTariffCode}
            isOpen={state.matches('decodingTariff')}
            onClose={handleClosePanel}
            onInfoClick={handleInfoClick}
          />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
