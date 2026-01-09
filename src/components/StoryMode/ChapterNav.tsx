// ChapterNav.tsx
// Navigation component for story mode chapters

import React from 'react';
import { chapters, type ChapterId, type ChapterMeta } from '@/machines/storyMachine';

interface ChapterNavProps {
  currentChapter: ChapterId;
  completedChapters: ChapterId[];
  onGoToChapter: (chapterId: ChapterId) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ChapterNav: React.FC<ChapterNavProps> = ({
  currentChapter,
  completedChapters,
  onGoToChapter,
  onPrevious,
  onNext,
}) => {
  const currentIndex = chapters.findIndex(c => c.id === currentChapter);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < chapters.length - 1;

  const isChapterAccessible = (chapter: ChapterMeta): boolean => {
    const chapterIndex = chapters.findIndex(c => c.id === chapter.id);
    return chapterIndex <= currentIndex || completedChapters.includes(chapter.id);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 0',
      borderBottom: '1px solid #333',
      marginBottom: '1.5rem',
    }}>
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        style={{
          padding: '0.5rem 1rem',
          background: canGoPrevious ? '#333' : '#1a1a24',
          color: canGoPrevious ? '#fff' : '#555',
          border: 'none',
          borderRadius: 8,
          cursor: canGoPrevious ? 'pointer' : 'not-allowed',
          fontWeight: 600,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>←</span> Previous
      </button>

      {/* Chapter Dots */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {chapters.map((chapter) => {
          const isCurrent = chapter.id === currentChapter;
          const isCompleted = completedChapters.includes(chapter.id);
          const isAccessible = isChapterAccessible(chapter);

          return (
            <button
              key={chapter.id}
              onClick={() => isAccessible && onGoToChapter(chapter.id)}
              disabled={!isAccessible}
              title={`${chapter.number}. ${chapter.title}`}
              style={{
                width: isCurrent ? 32 : 12,
                height: 12,
                borderRadius: isCurrent ? 6 : '50%',
                background: isCurrent
                  ? 'linear-gradient(90deg, #A855F7, #F59E42)'
                  : isCompleted
                    ? '#A855F7'
                    : isAccessible
                      ? '#555'
                      : '#2a2a36',
                border: 'none',
                cursor: isAccessible ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                padding: 0,
              }}
            />
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        style={{
          padding: '0.5rem 1rem',
          background: canGoNext
            ? 'linear-gradient(90deg, #A855F7 60%, #F59E42 100%)'
            : '#1a1a24',
          color: canGoNext ? '#fff' : '#555',
          border: 'none',
          borderRadius: 8,
          cursor: canGoNext ? 'pointer' : 'not-allowed',
          fontWeight: 600,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        Next <span style={{ fontSize: '1.1rem' }}>→</span>
      </button>
    </div>
  );
};

export default ChapterNav;
