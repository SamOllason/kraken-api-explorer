import { setup, assign } from 'xstate';
import type { ConceptId } from '@/data/concepts';

interface ExplorerContext {
  activeConcept: ConceptId | null;
  visitedConcepts: ConceptId[];
  currentView: 'dashboard' | 'schemaMap';
}

type ExplorerEvent =
  | { type: 'OPEN_CONCEPT'; conceptId: ConceptId }
  | { type: 'CLOSE_PANEL' }
  | { type: 'DECODE_TARIFF' }
  | { type: 'SWITCH_VIEW'; view: 'dashboard' | 'schemaMap' }
  | { type: 'NAVIGATE_TO_CONCEPT'; conceptId: ConceptId };

export const explorerMachine = setup({
  types: {
    context: {} as ExplorerContext,
    events: {} as ExplorerEvent,
  },
  actions: {
    setActiveConcept: assign({
      activeConcept: ({ event }) => {
        if (event.type === 'OPEN_CONCEPT' || event.type === 'NAVIGATE_TO_CONCEPT') {
          return event.conceptId;
        }
        return null;
      },
    }),
    addToVisited: assign({
      visitedConcepts: ({ context, event }) => {
        if (event.type === 'OPEN_CONCEPT' || event.type === 'NAVIGATE_TO_CONCEPT') {
          const conceptId = event.conceptId;
          if (!context.visitedConcepts.includes(conceptId)) {
            return [...context.visitedConcepts, conceptId];
          }
        }
        return context.visitedConcepts;
      },
    }),
    clearActiveConcept: assign({
      activeConcept: () => null,
    }),
    setView: assign({
      currentView: ({ event }) => {
        if (event.type === 'SWITCH_VIEW') {
          return event.view;
        }
        return 'dashboard';
      },
    }),
  },
}).createMachine({
  id: 'explorer',
  initial: 'dashboard',
  context: {
    activeConcept: null,
    visitedConcepts: [],
    currentView: 'dashboard',
  },
  states: {
    dashboard: {
      on: {
        OPEN_CONCEPT: {
          target: 'viewingConcept',
          actions: ['setActiveConcept', 'addToVisited'],
        },
        DECODE_TARIFF: {
          target: 'decodingTariff',
        },
        SWITCH_VIEW: {
          target: 'schemaMap',
          actions: ['setView'],
        },
      },
    },
    viewingConcept: {
      on: {
        CLOSE_PANEL: {
          target: 'dashboard',
          actions: ['clearActiveConcept'],
        },
        NAVIGATE_TO_CONCEPT: {
          target: 'viewingConcept',
          actions: ['setActiveConcept', 'addToVisited'],
        },
        DECODE_TARIFF: {
          target: 'decodingTariff',
        },
      },
    },
    decodingTariff: {
      on: {
        CLOSE_PANEL: {
          target: 'dashboard',
        },
        OPEN_CONCEPT: {
          target: 'viewingConcept',
          actions: ['setActiveConcept', 'addToVisited'],
        },
      },
    },
    schemaMap: {
      on: {
        SWITCH_VIEW: {
          target: 'dashboard',
          actions: ['setView'],
        },
        OPEN_CONCEPT: {
          target: 'viewingConcept',
          actions: ['setActiveConcept', 'addToVisited'],
        },
      },
    },
  },
});
