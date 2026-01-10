// UnderstandingTariffChapter.tsx
// Chapter 3: Understanding Your Tariff - Decode the code

import React, { useState } from 'react';
import { mockAccount } from '@/data/mockAccount';
import { InfoButton } from '@/components/common/StyledComponents';
import { theme } from '@/styles/theme';

interface UnderstandingTariffChapterProps {
  onNext?: () => void;
  onExploreConcept?: (conceptId: string) => void;
}

const property = mockAccount.properties[0];
const elecAgreement = property.electricityMeterPoints[0].agreements[0];
const tariffCode = elecAgreement.tariffCode;

// Parse the tariff code
const tariffParts = tariffCode.split('-');
const fuelType = tariffParts[0]; // E or G
const rateType = tariffParts[1]; // 1R or 2R
const productCode = tariffParts.slice(2, -4).join('-'); // AGILE-FLEX
const launchDate = tariffParts.slice(-4, -1).join('-'); // 22-11-25
const regionCode = tariffParts[tariffParts.length - 1]; // C

// GSP Region mapping
const REGION_NAMES: Record<string, string> = {
  A: 'Eastern England',
  B: 'East Midlands',
  C: 'London',
  D: 'Merseyside & North Wales',
  E: 'West Midlands',
  F: 'North Eastern England',
  G: 'North Western England',
  H: 'Southern England',
  J: 'South Eastern England',
  K: 'South Wales',
  L: 'South Western England',
  M: 'Yorkshire',
  N: 'Southern Scotland',
  P: 'Northern Scotland',
};

// Segment styling
const segmentColors = {
  fuel: theme.colors.electricity,
  rate: theme.colors.accentPurple,
  product: theme.colors.primary,
  date: theme.colors.accentBlue,
  region: theme.colors.accentOrange,
};

interface TariffSegmentProps {
  value: string;
  label: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
  hasInfo?: boolean;
  onInfoClick?: () => void;
}

const TariffSegment: React.FC<TariffSegmentProps> = ({
  value,
  label,
  color,
  isActive,
  onClick,
  hasInfo,
  onInfoClick,
}) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      padding: 'clamp(0.4rem, 2vw, 0.75rem) clamp(0.5rem, 2vw, 1rem)',
      borderRadius: 8,
      background: isActive ? `${color}20` : 'transparent',
      border: `2px solid ${isActive ? color : '#333'}`,
      transition: 'all 0.2s ease',
      minWidth: 0,
    }}
  >
    <div style={{
      fontFamily: 'monospace',
      fontSize: 'clamp(1rem, 4vw, 1.5rem)',
      fontWeight: 700,
      color: isActive ? color : '#888',
      marginBottom: 4,
      wordBreak: 'break-all',
    }}>
      {value}
    </div>
    <div style={{
      fontSize: '0.7rem',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      color: isActive ? color : '#666',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
    }}>
      {label}
      {hasInfo && (
        <InfoButton
          onClick={(e) => {
            e.stopPropagation();
            onInfoClick?.();
          }}
          $visited={false}
          title="Learn more about this concept"
        >
          i
        </InfoButton>
      )}
    </div>
  </div>
);

type SegmentType = 'fuel' | 'rate' | 'product' | 'date' | 'region' | null;

const segmentExplanations: Record<string, { title: string; content: string; apiPath: string }> = {
  fuel: {
    title: 'Fuel Type',
    content: `The first character indicates the energy type:
    
• E = Electricity ⚡
• G = Gas 🔥

This determines which API endpoints and meter point types are relevant. Electricity uses MPAN (Meter Point Administration Number), while gas uses MPRN (Meter Point Reference Number).`,
    apiPath: 'account.properties[].electricityMeterPoints[] or gasMeterPoints[]',
  },
  rate: {
    title: 'Rate Type',
    content: `The rate type indicates pricing structure:

• 1R = Single Rate - One flat rate at all times
• 2R = Two Rate (Economy 7) - Cheaper off-peak rates

With Economy 7, you typically get 7 hours of cheaper electricity at night. Smart meters make this even more flexible with half-hourly pricing.`,
    apiPath: 'agreements[].tariffCode (rate component)',
  },
  product: {
    title: 'Product Code',
    content: `The product code identifies the specific tariff offering:

• AGILE - Prices change every 30 minutes based on wholesale prices
• FLEX - Flexible variable rate tariff  
• TRACKER - Tracks daily wholesale prices
• FIX - Fixed price for a set period
• GO - Designed for EV owners with cheap overnight rates

Your product "${productCode}" combines features for dynamic pricing.`,
    apiPath: 'agreements[].product.code',
  },
  date: {
    title: 'Launch Date',
    content: `The date segment shows when this tariff version launched:

${launchDate} means this tariff was introduced on the 25th of November 2022.

Tariff versions change when Ofgem price caps update or when Octopus launches new pricing. The date helps distinguish between different versions of the same product.`,
    apiPath: 'agreements[].validFrom / agreements[].validTo',
  },
  region: {
    title: 'GSP Region',
    content: `The final character is your Grid Supply Point (GSP) region:

Your region: ${regionCode} = ${REGION_NAMES[regionCode] || 'Unknown'}

The UK is divided into 14 GSP regions. Energy prices vary by region due to:
• Transmission losses over distance
• Local generation capacity
• Network infrastructure costs

This is why two customers on the same tariff may pay different unit rates!`,
    apiPath: 'properties[].electricityMeterPoints[].gspGroupId',
  },
};

const UnderstandingTariffChapter: React.FC<UnderstandingTariffChapterProps> = ({
  onNext,
  onExploreConcept,
}) => {
  const [activeSegment, setActiveSegment] = useState<SegmentType>('fuel');
  const [showApiPanel, setShowApiPanel] = useState(false);
  const [currentApiInfo, setCurrentApiInfo] = useState<string | null>(null);
  const [showObiTip, setShowObiTip] = useState(false);

  const handleInfoClick = (conceptId: string) => {
    setCurrentApiInfo(conceptId);
    setShowApiPanel(true);
    onExploreConcept?.(conceptId);
  };

  const currentExplanation = activeSegment ? segmentExplanations[activeSegment] : null;

  return (
    <div style={{
      maxWidth: 700,
      margin: '1rem auto',
      padding: 'clamp(1rem, 4vw, 2.5rem) clamp(0.75rem, 3vw, 2rem)',
      background: 'rgba(24, 24, 32, 0.98)',
      borderRadius: 16,
      color: '#fff',
      boxShadow: '0 2px 24px #0008',
    }}>
      {/* Chapter intro */}
      <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.2rem, 4vw, 1.7rem)', marginBottom: 8 }}>
        Chapter 3: Understanding Your Tariff
      </h2>
      <p style={{ color: '#888', marginBottom: 24 }}>
        Sam noticed some cryptic codes on their bill. Let's decode what they mean!
      </p>

      {/* Story narrative */}
      <div style={{
        background: '#1a1a24',
        borderRadius: 12,
        padding: '1.25rem',
        marginBottom: 24,
        borderLeft: '4px solid #A855F7',
      }}>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          <span style={{ color: '#A855F7', fontWeight: 600 }}>"What does this code even mean?"</span>{' '}
          Sam wondered, staring at the tariff code on their bill. Obi tilted his head curiously.
          <span role="img" aria-label="dog" style={{ marginLeft: 8 }}>🐕</span>
        </p>
        <p style={{ margin: '12px 0 0 0', lineHeight: 1.6, color: '#ccc' }}>
          The good news? Every part of a tariff code tells you something important about your energy plan.
          Let's break it down piece by piece!
        </p>
      </div>

      {/* Interactive tariff decoder */}
      <div style={{
        background: '#232336',
        borderRadius: 12,
        padding: '1.5rem',
        marginBottom: 24,
      }}>
        <div style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#888',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          Your Tariff Code
          <InfoButton
            onClick={() => handleInfoClick('tariffCode')}
            $visited={false}
            title="API: tariff code structure"
          >
            i
          </InfoButton>
        </div>

        {/* Full tariff code display */}
        <div style={{
          fontFamily: 'monospace',
          fontSize: '1.1rem',
          textAlign: 'center',
          padding: '1rem',
          background: '#181820',
          borderRadius: 8,
          marginBottom: 20,
          letterSpacing: 1,
          color: '#A855F7',
        }}>
          {tariffCode}
        </div>

        {/* Interactive segments */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'center',
          marginBottom: 20,
        }}>
          <TariffSegment
            value={fuelType}
            label="Fuel"
            color={segmentColors.fuel}
            isActive={activeSegment === 'fuel'}
            onClick={() => setActiveSegment('fuel')}
            hasInfo
            onInfoClick={() => handleInfoClick('fuelType')}
          />
          <span style={{ color: '#444', alignSelf: 'center', fontSize: '1.5rem' }}>-</span>
          <TariffSegment
            value={rateType}
            label="Rate"
            color={segmentColors.rate}
            isActive={activeSegment === 'rate'}
            onClick={() => setActiveSegment('rate')}
            hasInfo
            onInfoClick={() => handleInfoClick('rateType')}
          />
          <span style={{ color: '#444', alignSelf: 'center', fontSize: '1.5rem' }}>-</span>
          <TariffSegment
            value={productCode}
            label="Product"
            color={segmentColors.product}
            isActive={activeSegment === 'product'}
            onClick={() => setActiveSegment('product')}
            hasInfo
            onInfoClick={() => handleInfoClick('productCode')}
          />
          <span style={{ color: '#444', alignSelf: 'center', fontSize: '1.5rem' }}>-</span>
          <TariffSegment
            value={launchDate}
            label="Date"
            color={segmentColors.date}
            isActive={activeSegment === 'date'}
            onClick={() => setActiveSegment('date')}
            hasInfo
            onInfoClick={() => handleInfoClick('launchDate')}
          />
          <span style={{ color: '#444', alignSelf: 'center', fontSize: '1.5rem' }}>-</span>
          <TariffSegment
            value={regionCode}
            label="Region"
            color={segmentColors.region}
            isActive={activeSegment === 'region'}
            onClick={() => setActiveSegment('region')}
            hasInfo
            onInfoClick={() => handleInfoClick('gspRegion')}
          />
        </div>

        {/* Explanation panel */}
        {currentExplanation && (
          <div style={{
            background: '#181820',
            borderRadius: 8,
            padding: '1.25rem',
            borderLeft: `4px solid ${segmentColors[activeSegment!]}`,
          }}>
            <div style={{
              fontWeight: 700,
              fontSize: '1.1rem',
              color: segmentColors[activeSegment!],
              marginBottom: 12,
            }}>
              {currentExplanation.title}
            </div>
            <div style={{
              whiteSpace: 'pre-line',
              lineHeight: 1.6,
              color: '#ccc',
              fontSize: '0.95rem',
            }}>
              {currentExplanation.content}
            </div>
            <div style={{
              marginTop: 16,
              padding: '0.75rem',
              background: '#0d0d14',
              borderRadius: 6,
              fontFamily: 'monospace',
              fontSize: 'clamp(0.65rem, 2vw, 0.8rem)',
              color: '#58A6FF',
              wordBreak: 'break-all',
              overflowWrap: 'break-word',
            }}>
              📡 API Path: {currentExplanation.apiPath}
            </div>
          </div>
        )}
      </div>

      {/* GSP Region Map visual */}
      <div style={{
        background: '#232336',
        borderRadius: 12,
        padding: '1.5rem',
        marginBottom: 24,
      }}>
        <div style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#888',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          GSP Regions Explained
          <InfoButton
            onClick={() => handleInfoClick('gspRegion')}
            $visited={false}
            title="API: GSP regions"
          >
            i
          </InfoButton>
        </div>

        <p style={{ color: '#ccc', marginBottom: 16, lineHeight: 1.6 }}>
          The UK electricity grid is divided into <b style={{ color: '#F59E42' }}>14 regions</b>.
          Your region affects your prices because of transmission costs and local generation capacity.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: 6,
          fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
        }}>
          {Object.entries(REGION_NAMES).map(([code, name]) => (
            <div
              key={code}
              style={{
                padding: '0.5rem 0.75rem',
                background: code === regionCode ? '#A855F720' : '#181820',
                borderRadius: 6,
                border: code === regionCode ? '2px solid #A855F7' : '1px solid #333',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{
                fontFamily: 'monospace',
                fontWeight: 700,
                color: code === regionCode ? '#A855F7' : '#666',
              }}>
                {code}
              </span>
              <span style={{
                fontSize: '0.8rem',
                color: code === regionCode ? '#fff' : '#888',
              }}>
                {name}
              </span>
              {code === regionCode && (
                <span style={{ marginLeft: 'auto', color: '#A855F7' }}>✓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Obi's tip */}
      <div
        onClick={() => setShowObiTip(!showObiTip)}
        style={{
          background: '#F59E4220',
          borderRadius: 12,
          padding: '1rem 1.25rem',
          marginBottom: 24,
          cursor: 'pointer',
          border: '1px solid #F59E4240',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span role="img" aria-label="Obi" style={{ fontSize: '1.5rem' }}>🐕</span>
          <span style={{ fontWeight: 600, color: '#F59E42' }}>Obi's Energy Tip</span>
          <span style={{ marginLeft: 'auto', color: '#F59E42' }}>
            {showObiTip ? '▲' : '▼'}
          </span>
        </div>
        {showObiTip && (
          <p style={{
            margin: '12px 0 0 0',
            color: '#ccc',
            lineHeight: 1.6,
            paddingLeft: 38,
          }}>
            Woof! Did you know that "AGILE" tariffs can have <b style={{ color: '#A855F7' }}>negative prices</b> when
            there's lots of wind and solar? That means you get <b>paid</b> to use electricity!
            Perfect for charging my favorite heated blanket. 🐾
          </p>
        )}
      </div>

      {/* Key learnings */}
      <div style={{
        background: '#181820',
        borderRadius: 12,
        padding: '1.25rem',
        marginBottom: 24,
      }}>
        <div style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#888',
          marginBottom: 12,
        }}>
          ✅ What you've learned
        </div>
        <ul style={{
          margin: 0,
          paddingLeft: 20,
          color: '#ccc',
          lineHeight: 1.8,
        }}>
          <li>Tariff codes encode <b style={{ color: '#58A6FF' }}>fuel type</b>, <b style={{ color: '#A855F7' }}>rate structure</b>, <b style={{ color: '#00FF88' }}>product name</b>, <b style={{ color: '#3B82F6' }}>launch date</b>, and <b style={{ color: '#F59E42' }}>region</b></li>
          <li>GSP regions affect your energy prices based on location</li>
          <li>Different rate types (1R/2R) offer different pricing structures</li>
          <li>Product codes like AGILE, TRACKER, or FIX describe pricing models</li>
        </ul>
      </div>

      {/* Navigation buttons */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
        <button
          onClick={onNext}
          style={{
            padding: '0.75rem 2rem',
            background: '#F59E42',
            color: '#232336',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          Next: Moving Home
          <span>→</span>
        </button>
      </div>

      {/* API Info Side Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: showApiPanel ? 380 : 0,
        background: 'rgba(24, 24, 32, 0.98)',
        color: '#fff',
        boxShadow: showApiPanel ? '-4px 0 24px #0008' : 'none',
        zIndex: 2000,
        overflow: 'hidden',
        transition: 'width 0.35s cubic-bezier(.77,0,.18,1)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {showApiPanel && currentApiInfo && (
          <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}>
              <div style={{
                fontWeight: 800,
                fontSize: '1.2rem',
                color: '#A855F7',
              }}>
                📡 API Reference
              </div>
              <button
                onClick={() => setShowApiPanel(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>

            <div style={{
              background: '#181820',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: 16,
            }}>
              <div style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: '#888',
                marginBottom: 8,
              }}>
                Concept
              </div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                {currentApiInfo === 'tariffCode' && 'Tariff Code'}
                {currentApiInfo === 'fuelType' && 'Fuel Type'}
                {currentApiInfo === 'rateType' && 'Rate Type'}
                {currentApiInfo === 'productCode' && 'Product Code'}
                {currentApiInfo === 'launchDate' && 'Launch Date'}
                {currentApiInfo === 'gspRegion' && 'GSP Region'}
              </div>
            </div>

            <div style={{
              background: '#181820',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: 16,
            }}>
              <div style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: '#888',
                marginBottom: 8,
              }}>
                GraphQL Query
              </div>
              <pre style={{
                margin: 0,
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: '#58A6FF',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.5,
              }}>
{`query GetTariffDetails($accountNumber: String!) {
  account(accountNumber: $accountNumber) {
    properties {
      electricityMeterPoints {
        gspGroupId
        agreements {
          tariffCode
          validFrom
          validTo
          product {
            code
            displayName
            fullName
          }
        }
      }
    }
  }
}`}
              </pre>
            </div>

            <div style={{
              background: '#181820',
              borderRadius: 8,
              padding: '1rem',
            }}>
              <div style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: '#888',
                marginBottom: 8,
              }}>
                Example Response
              </div>
              <pre style={{
                margin: 0,
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#00FF88',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.4,
              }}>
{`{
  "gspGroupId": "_${regionCode}",
  "agreements": [{
    "tariffCode": "${tariffCode}",
    "validFrom": "2022-11-25",
    "validTo": null,
    "product": {
      "code": "${productCode}",
      "displayName": "Agile Octopus"
    }
  }]
}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnderstandingTariffChapter;
