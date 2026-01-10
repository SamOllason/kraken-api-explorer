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
          padding: '0.4rem 0.6rem',
          background: canGoPrevious ? '#333' : '#1a1a24',
          color: canGoPrevious ? '#fff' : '#555',
          border: 'none',
          borderRadius: 8,
          cursor: canGoPrevious ? 'pointer' : 'not-allowed',
          fontWeight: 600,
          fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '1rem' }}>←</span> <span className="nav-text">Previous</span>
      </button>

      {/* Chapter Dots */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 1, overflow: 'hidden' }}>
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
                width: isCurrent ? 24 : 10,
                height: 10,
                minWidth: isCurrent ? 24 : 10,
                borderRadius: isCurrent ? 5 : '50%',
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
                flexShrink: 0,
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
          padding: '0.4rem 0.6rem',
          background: canGoNext
            ? 'linear-gradient(90deg, #A855F7 60%, #F59E42 100%)'
            : '#1a1a24',
          color: canGoNext ? '#fff' : '#555',
          border: 'none',
          borderRadius: 8,
          cursor: canGoNext ? 'pointer' : 'not-allowed',
          fontWeight: 600,
          fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          whiteSpace: 'nowrap',
        }}
      >
        <span className="nav-text">Next</span> <span style={{ fontSize: '1rem' }}>→</span>
      </button>
    </div>
  );
};

export default ChapterNav;
