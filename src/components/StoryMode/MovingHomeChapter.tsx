// MovingHomeChapter.tsx
// Chapter 4: Moving Home - Coming Soon placeholder with roadmap

import React from 'react';
import { theme } from '@/styles/theme';

interface MovingHomeChapterProps {
  onNext?: () => void;
  onExploreConcept?: (conceptId: string) => void;
}

interface PlannedChapter {
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  apiConcepts: Array<{
    name: string;
    path: string;
    description: string;
  }>;
}

const plannedChapters: PlannedChapter[] = [
  {
    number: 4,
    title: 'Moving Home',
    subtitle: 'New property setup',
    icon: '🏠',
    description: "Sam and Obi are moving to a new flat! Learn how properties, meter points, and supply transfers work in the Kraken API.",
    apiConcepts: [
      {
        name: 'Properties',
        path: 'account.properties[]',
        description: 'Multiple properties can exist under one account. Each property has its own address and meter points.',
      },
      {
        name: 'MPAN Discovery',
        path: 'properties[].electricityMeterPoints[].mpan',
        description: 'How to look up the MPAN for a new address and initiate supply.',
      },
      {
        name: 'Supply Start Date',
        path: 'properties[].supplyStartDate',
        description: 'When energy supply begins at a property - critical for move-in coordination.',
      },
      {
        name: 'Meter Registration',
        path: 'properties[].electricityMeterPoints[].meters[]',
        description: 'Linking physical meters to meter points during a move.',
      },
    ],
  },
  {
    number: 5,
    title: 'Switching Tariff',
    subtitle: 'Finding better rates',
    icon: '🔄',
    description: "Energy prices have changed and Sam wants to switch to a better deal. Explore how tariff agreements and product catalogs work.",
    apiConcepts: [
      {
        name: 'Agreements',
        path: 'electricityMeterPoints[].agreements[]',
        description: 'Tariff contracts with validity periods. Old agreements end, new ones begin.',
      },
      {
        name: 'Valid From / Valid To',
        path: 'agreements[].validFrom / validTo',
        description: 'Time-bounded tariff periods. Null validTo means currently active.',
      },
      {
        name: 'Product Catalog',
        path: 'products { code, displayName, availableFrom }',
        description: 'Query available tariffs and their features before switching.',
      },
      {
        name: 'Quote Generation',
        path: 'createQuote mutation',
        description: 'Generate personalized quotes based on usage history.',
      },
    ],
  },
  {
    number: 6,
    title: 'Saving Session',
    subtitle: 'Demand flexibility',
    icon: '⚡',
    description: "National Grid needs help! Sam joins a Saving Session to reduce usage during peak demand and earn rewards.",
    apiConcepts: [
      {
        name: 'Saving Sessions',
        path: 'savingSessions { id, startAt, endAt }',
        description: 'Demand flexibility events where customers reduce usage for rewards.',
      },
      {
        name: 'Participation',
        path: 'joinSavingSession mutation',
        description: 'Opt-in to saving sessions and track participation status.',
      },
      {
        name: 'Baseline Consumption',
        path: 'savingSession.baseline',
        description: 'Your expected usage - savings are measured against this.',
      },
      {
        name: 'Rewards',
        path: 'savingSession.pointsEarned',
        description: 'Points or credits earned for successful participation.',
      },
    ],
  },
  {
    number: 7,
    title: 'Agent View',
    subtitle: 'Behind the scenes',
    icon: '🎧',
    description: "See the world through a support agent's eyes. How do they look up accounts, resolve issues, and help customers?",
    apiConcepts: [
      {
        name: 'Account Lookup',
        path: 'account(accountNumber: $num)',
        description: 'Fetching full account details by account number.',
      },
      {
        name: 'Account Search',
        path: 'searchAccounts(email: $email)',
        description: 'Finding accounts by email, postcode, or meter number.',
      },
      {
        name: 'Account Notes',
        path: 'account.notes[]',
        description: 'Internal notes and communication history.',
      },
      {
        name: 'Billing History',
        path: 'account.bills[]',
        description: 'Past statements, payments, and balance adjustments.',
      },
    ],
  },
];

const ChapterRoadmapCard: React.FC<{ chapter: PlannedChapter; isFirst?: boolean }> = ({ chapter, isFirst }) => {
  const [expanded, setExpanded] = React.useState(isFirst);

  return (
    <div style={{
      background: isFirst ? '#232336' : '#1a1a24',
      borderRadius: 12,
      overflow: 'hidden',
      border: isFirst ? `2px solid ${theme.colors.accentPurple}40` : '1px solid #333',
    }}>
      {/* Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '1rem 1.25rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>{chapter.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontWeight: 700,
            color: isFirst ? theme.colors.accentPurple : '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            Chapter {chapter.number}: {chapter.title}
            {isFirst && (
              <span style={{
                fontSize: '0.65rem',
                background: theme.colors.accentPurple,
                color: '#fff',
                padding: '2px 8px',
                borderRadius: 4,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
                Next Up
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#888' }}>{chapter.subtitle}</div>
        </div>
        <span style={{ color: '#666', fontSize: '1.2rem' }}>
          {expanded ? '▲' : '▼'}
        </span>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div style={{ padding: '0 1.25rem 1.25rem' }}>
          <p style={{ color: '#ccc', marginBottom: 16, lineHeight: 1.6 }}>
            {chapter.description}
          </p>

          <div style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: '#888',
            marginBottom: 12,
          }}>
            API Concepts to Explore
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {chapter.apiConcepts.map((concept) => (
              <div
                key={concept.name}
                style={{
                  background: '#181820',
                  borderRadius: 8,
                  padding: '0.75rem 1rem',
                  borderLeft: `3px solid ${theme.colors.accentBlue}`,
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}>
                  <span style={{ fontWeight: 600, color: '#fff' }}>{concept.name}</span>
                  <code style={{
                    fontSize: '0.7rem',
                    color: theme.colors.accentBlue,
                    background: '#0d0d14',
                    padding: '2px 6px',
                    borderRadius: 4,
                  }}>
                    {concept.path}
                  </code>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.4 }}>
                  {concept.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MovingHomeChapter: React.FC<MovingHomeChapterProps> = ({ onExploreConcept: _onExploreConcept }) => {
  return (
    <div style={{
      maxWidth: 700,
      margin: '2rem auto',
      padding: '2.5rem 2rem',
      background: 'rgba(24, 24, 32, 0.98)',
      borderRadius: 16,
      color: '#fff',
      boxShadow: '0 2px 24px #0008',
    }}>
      {/* Coming Soon Banner */}
      <div style={{
        textAlign: 'center',
        marginBottom: 32,
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          background: 'linear-gradient(135deg, #A855F720, #F59E4220)',
          padding: '1rem 2rem',
          borderRadius: 12,
          marginBottom: 20,
        }}>
          <span style={{ fontSize: '2rem' }}>🚧</span>
          <div>
            <div style={{
              fontWeight: 800,
              fontSize: '1.3rem',
              background: 'linear-gradient(90deg, #A855F7, #F59E42)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              More Chapters Coming Soon!
            </div>
            <div style={{ fontSize: '0.85rem', color: '#888' }}>
              Sam and Obi's journey continues...
            </div>
          </div>
        </div>

        {/* Progress so far */}
        <div style={{
          background: '#181820',
          borderRadius: 8,
          padding: '1rem',
          marginBottom: 24,
        }}>
          <div style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: '#888',
            marginBottom: 8,
          }}>
            Story Progress
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div
                key={num}
                style={{
                  width: num <= 3 ? 36 : 28,
                  height: 28,
                  borderRadius: 6,
                  background: num <= 3
                    ? 'linear-gradient(135deg, #A855F7, #F59E42)'
                    : '#2a2a36',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: num <= 3 ? '#fff' : '#555',
                }}
              >
                {num <= 3 ? '✓' : num}
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#888', marginTop: 8 }}>
            3 of 7 chapters complete
          </div>
        </div>
      </div>

      {/* Story recap */}
      <div style={{
        background: '#1a1a24',
        borderRadius: 12,
        padding: '1.25rem',
        marginBottom: 24,
        borderLeft: '4px solid #A855F7',
      }}>
        <div style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#888',
          marginBottom: 10,
        }}>
          The Story So Far
        </div>
        <p style={{ margin: 0, lineHeight: 1.7, color: '#ccc' }}>
          <span style={{ color: '#A855F7', fontWeight: 600 }}>Sam</span> and{' '}
          <span style={{ color: '#F59E42', fontWeight: 600 }}>Obi</span> 🐕 have settled into their
          energy journey. They've received their first bill, understood the charges, and decoded their
          mysterious tariff code. Now they're ready for new adventures!
        </p>
      </div>

      {/* Planned Chapters */}
      <div style={{
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#888',
        marginBottom: 16,
      }}>
        📚 Upcoming Chapters
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {plannedChapters.map((chapter, index) => (
          <ChapterRoadmapCard
            key={chapter.number}
            chapter={chapter}
            isFirst={index === 0}
          />
        ))}
      </div>

      {/* What else could be explored */}
      <div style={{
        marginTop: 32,
        background: '#181820',
        borderRadius: 12,
        padding: '1.5rem',
      }}>
        <div style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#888',
          marginBottom: 16,
        }}>
          🔮 Beyond the Story: More API Areas
        </div>

        <p style={{ color: '#888', marginBottom: 16, lineHeight: 1.6 }}>
          These advanced topics could be explored in future bonus chapters:
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
        }}>
          {[
            { icon: '🔌', title: 'Smart Meter Ops', api: 'triggerSmartMeterRead' },
            { icon: '🚗', title: 'EV Charging', api: 'intelligentDispatch' },
            { icon: '☀️', title: 'Export Tariffs', api: 'outgoingOctopus' },
            { icon: '📊', title: 'Real-time Pricing', api: 'agileUnitRates' },
            { icon: '🔥', title: 'Heat Pumps', api: 'cosyOctopus' },
            { icon: '🪝', title: 'Webhooks', api: 'webhookSubscriptions' },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: '#232336',
                borderRadius: 8,
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.title}</div>
                <code style={{ fontSize: '0.7rem', color: '#666' }}>{item.api}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About note */}
      <div style={{
        marginTop: 24,
        textAlign: 'center',
        padding: '1rem',
        borderTop: '1px solid #333',
      }}>
        <p style={{ color: '#888', fontSize: '0.9rem', margin: '0 0 12px 0', lineHeight: 1.6 }}>
          🐙 <b style={{ color: '#fff' }}>Kraken Explorer</b> is an interactive tool to help you understand
          how to work with Kraken's APIs.
        </p>
        <p style={{ color: '#666', fontSize: '0.8rem', margin: '0 0 12px 0' }}>
          Built with React, TypeScript, and XState — the same tech stack used by Octopus Energy.
        </p>
        <a
          href="https://github.com/SamOllason/kraken-api-explorer#readme"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#A855F7',
            fontSize: '0.85rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          📖 View README on GitHub →
        </a>
      </div>
    </div>
  );
};

export default MovingHomeChapter;
