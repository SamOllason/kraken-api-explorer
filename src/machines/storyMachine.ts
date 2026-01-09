// storyMachine.ts
// XState machine for Story Mode chapter navigation

import { setup, assign } from 'xstate';

export type ChapterId = 'intro' | 'firstBill' | 'understandingTariff' | 'movingHome' | 'switchingTariff' | 'savingSession' | 'agentView';

export interface ChapterMeta {
  id: ChapterId;
  title: string;
  subtitle: string;
  number: number;
}

export const chapters: ChapterMeta[] = [
  { id: 'intro', title: 'Welcome', subtitle: 'Meet Sam & Obi', number: 1 },
  { id: 'firstBill', title: 'Your First Bill', subtitle: 'Understanding charges', number: 2 },
  { id: 'understandingTariff', title: 'Understanding Your Tariff', subtitle: 'Decode the code', number: 3 },
  { id: 'movingHome', title: 'Moving Home', subtitle: 'New property setup', number: 4 },
  { id: 'switchingTariff', title: 'Switching Tariff', subtitle: 'Finding better rates', number: 5 },
  { id: 'savingSession', title: 'Saving Session', subtitle: 'Demand flexibility', number: 6 },
  { id: 'agentView', title: 'Agent View', subtitle: 'Behind the scenes', number: 7 },
];

interface StoryContext {
  currentChapter: ChapterId;
  completedChapters: ChapterId[];
  exploredConcepts: string[]; // Track API concepts explored in story mode
  choices: Record<string, string>; // Store user choices for narrative branching
}

type StoryEvent =
  | { type: 'NEXT_CHAPTER' }
  | { type: 'PREVIOUS_CHAPTER' }
  | { type: 'GO_TO_CHAPTER'; chapterId: ChapterId }
  | { type: 'EXPLORE_CONCEPT'; conceptId: string }
  | { type: 'MAKE_CHOICE'; choiceId: string; value: string }
  | { type: 'RESET_STORY' };

const getNextChapter = (current: ChapterId): ChapterId => {
  const currentIndex = chapters.findIndex(c => c.id === current);
  const nextIndex = Math.min(currentIndex + 1, chapters.length - 1);
  return chapters[nextIndex].id;
};

const getPreviousChapter = (current: ChapterId): ChapterId => {
  const currentIndex = chapters.findIndex(c => c.id === current);
  const prevIndex = Math.max(currentIndex - 1, 0);
  return chapters[prevIndex].id;
};

export const storyMachine = setup({
  types: {
    context: {} as StoryContext,
    events: {} as StoryEvent,
  },
  actions: {
    goToNextChapter: assign({
      currentChapter: ({ context }) => getNextChapter(context.currentChapter),
      completedChapters: ({ context }) => {
        if (!context.completedChapters.includes(context.currentChapter)) {
          return [...context.completedChapters, context.currentChapter];
        }
        return context.completedChapters;
      },
    }),
    goToPreviousChapter: assign({
      currentChapter: ({ context }) => getPreviousChapter(context.currentChapter),
    }),
    goToChapter: assign({
      currentChapter: ({ event }) => {
        if (event.type === 'GO_TO_CHAPTER') {
          return event.chapterId;
        }
        return 'intro';
      },
    }),
    exploreConcept: assign({
      exploredConcepts: ({ context, event }) => {
        if (event.type === 'EXPLORE_CONCEPT') {
          if (!context.exploredConcepts.includes(event.conceptId)) {
            return [...context.exploredConcepts, event.conceptId];
          }
        }
        return context.exploredConcepts;
      },
    }),
    makeChoice: assign({
      choices: ({ context, event }) => {
        if (event.type === 'MAKE_CHOICE') {
          return { ...context.choices, [event.choiceId]: event.value };
        }
        return context.choices;
      },
    }),
    resetStory: assign({
      currentChapter: () => 'intro' as ChapterId,
      completedChapters: () => [],
      exploredConcepts: () => [],
      choices: () => ({}),
    }),
  },
  guards: {
    canGoNext: ({ context }) => {
      const currentIndex = chapters.findIndex(c => c.id === context.currentChapter);
      return currentIndex < chapters.length - 1;
    },
    canGoPrevious: ({ context }) => {
      const currentIndex = chapters.findIndex(c => c.id === context.currentChapter);
      return currentIndex > 0;
    },
    isChapterUnlocked: ({ context, event }) => {
      if (event.type !== 'GO_TO_CHAPTER') return false;
      const targetIndex = chapters.findIndex(c => c.id === event.chapterId);
      const currentIndex = chapters.findIndex(c => c.id === context.currentChapter);
      // Can go to any completed chapter or the next one
      return targetIndex <= currentIndex + 1;
    },
  },
}).createMachine({
  id: 'story',
  initial: 'playing',
  context: {
    currentChapter: 'intro',
    completedChapters: [],
    exploredConcepts: [],
    choices: {},
  },
  states: {
    playing: {
      on: {
        NEXT_CHAPTER: {
          guard: 'canGoNext',
          actions: ['goToNextChapter'],
        },
        PREVIOUS_CHAPTER: {
          guard: 'canGoPrevious',
          actions: ['goToPreviousChapter'],
        },
        GO_TO_CHAPTER: {
          guard: 'isChapterUnlocked',
          actions: ['goToChapter'],
        },
        EXPLORE_CONCEPT: {
          actions: ['exploreConcept'],
        },
        MAKE_CHOICE: {
          actions: ['makeChoice'],
        },
        RESET_STORY: {
          actions: ['resetStory'],
        },
      },
    },
  },
});

// Helper to get current chapter metadata
export const getCurrentChapter = (chapterId: ChapterId): ChapterMeta => {
  return chapters.find(c => c.id === chapterId) || chapters[0];
};

// Helper to calculate story progress
export const getStoryProgress = (completedChapters: ChapterId[]): number => {
  return Math.round((completedChapters.length / chapters.length) * 100);
};
