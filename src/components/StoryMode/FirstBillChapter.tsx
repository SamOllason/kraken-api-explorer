// FirstBillChapter.tsx
import React from 'react';
import { mockAccount } from '@/data/mockAccount';


import { InfoButton } from '@/components/common/StyledComponents';
import { UsageChart } from '@/components/UsageChart';

const property = mockAccount.properties[0];
const elecAgreement = property.electricityMeterPoints[0].agreements[0];
const tariffCode = elecAgreement.tariffCode;
const usage = property.electricityMeterPoints[0].meters[0].consumption || [];
const totalUsage = usage.reduce((sum, day) => sum + day.quantity, 0);
const standingCharge = 0.45; // £/day, example
const days = usage.length;
const unitRate = 0.32; // £/kWh, example
const billTotal = (days * standingCharge) + (totalUsage * unitRate);
const highestDay = usage.reduce((max, day) => day.quantity > max.quantity ? day : max, usage[0]);

const BillLine = ({ label, value, onClick, info, onInfo }: { label: React.ReactNode, value: React.ReactNode, onClick?: () => void, info?: string, onInfo?: () => void }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '8px 0', cursor: onClick ? 'pointer' : 'default', color: onClick ? '#A855F7' : '#fff' }}>
    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {label}
      {info && (
        <InfoButton onClick={onInfo} $visited={false} title="API mapping">i</InfoButton>
      )}
    </span>
    <span onClick={onClick}>{value}</span>
  </div>
);

interface FirstBillChapterProps {
  onNext?: () => void;
  onExploreConcept?: (conceptId: string) => void;
}

const FirstBillChapter: React.FC<FirstBillChapterProps> = ({ onNext, onExploreConcept }) => {
  const [showHelp, setShowHelp] = React.useState(false);
  const [explanation, setExplanation] = React.useState<string | null>(null);
  const [apiInfo, setApiInfo] = React.useState<string | null>(null);

  const handleApiInfoClick = (conceptId: string, info: string) => {
    setApiInfo(info);
    onExploreConcept?.(conceptId);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '2.5rem 2rem', background: 'rgba(24,24,32,0.98)', borderRadius: 16, color: '#fff', boxShadow: '0 2px 24px #0008' }}>
      <h2 style={{ fontWeight: 800, fontSize: '1.7rem', marginBottom: 16 }}>Chapter 2: Your First Bill</h2>
      <p style={{ marginBottom: 16 }}>Sam and Obi have just received their first energy bill. Let’s break it down and see what’s inside!</p>
      <div style={{ background: '#232336', borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <BillLine
          label="Standing Charge"
          value={`£${(days * standingCharge).toFixed(2)}`}
          onClick={() => setExplanation('A daily fixed fee that covers the cost of supplying your home with energy, regardless of how much you use.')}
          info="account.properties[].electricityMeterPoints[].agreements[].product (standing charge)"
          onInfo={() => handleApiInfoClick('standingCharge', 'API: account.properties[].electricityMeterPoints[].agreements[].product — The standing charge is part of the tariff product details returned by the API.')}
        />
        <BillLine
          label="Unit Rate"
          value={`£${(totalUsage * unitRate).toFixed(2)}`}
          onClick={() => setExplanation('The price you pay for each unit (kWh) of electricity you use.')}
          info="account.properties[].electricityMeterPoints[].agreements[].product (unit rate)"
          onInfo={() => handleApiInfoClick('unitRate', 'API: account.properties[].electricityMeterPoints[].agreements[].product — The unit rate is part of the tariff product details returned by the API.')}
        />
        <BillLine
          label="Total Usage"
          value={`${totalUsage.toFixed(1)} kWh`}
          onClick={() => setExplanation('Your total electricity usage for this billing period.')}
          info="account.properties[].electricityMeterPoints[].meters[].consumption"
          onInfo={() => handleApiInfoClick('consumption', 'API: account.properties[].electricityMeterPoints[].meters[].consumption — Usage data is returned as an array of consumption records for each meter.')}
        />
        <BillLine
          label="Tariff"
          value={tariffCode}
          onClick={() => setExplanation('Click to decode your tariff and see what it means!')}
          info="account.properties[].electricityMeterPoints[].agreements[].tariffCode"
          onInfo={() => handleApiInfoClick('tariffCode', 'API: account.properties[].electricityMeterPoints[].agreements[].tariffCode — The tariff code identifies the product and pricing structure for your supply.')}
        />
        <hr style={{ border: '1px solid #333', margin: '16px 0' }} />
        <BillLine label={<b>Total Bill</b>} value={<b>{`£${billTotal.toFixed(2)}`}</b>} />
      </div>
      <div style={{ marginBottom: 24 }}>
        <UsageChart consumption={usage} highlightDate={highestDay.startDate} />
        <div style={{ color: '#F59E42', marginTop: 8, fontWeight: 600 }}>
          Highest usage: {highestDay.quantity} kWh on {highestDay.startDate} <span role="img" aria-label="dog">🐶</span> Obi loved the extra warmth!
        </div>
      </div>
      <button onClick={() => setShowHelp(true)} style={{ marginRight: 16, padding: '0.6rem 1.5rem', background: '#A855F7', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Ask for Help</button>
      <button onClick={onNext} style={{ padding: '0.6rem 1.5rem', background: '#F59E42', color: '#232336', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Next Chapter</button>
      {explanation && (
        <div style={{ marginTop: 24, background: '#181820', padding: 16, borderRadius: 8, color: '#A855F7' }}>
          <b>Explanation:</b> {explanation}
          <button onClick={() => setExplanation(null)} style={{ marginLeft: 16, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Close</button>
        </div>
      )}
      {/* API Info Side Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: apiInfo ? 360 : 0,
        background: 'rgba(24,24,32,0.98)',
        color: '#A855F7',
        boxShadow: apiInfo ? '-4px 0 24px #0008' : 'none',
        zIndex: 2000,
        overflow: 'hidden',
        transition: 'width 0.35s cubic-bezier(.77,0,.18,1)',
        display: 'flex',
        flexDirection: 'column',
        padding: apiInfo ? '2.5rem 2rem' : '0',
        pointerEvents: apiInfo ? 'auto' : 'none',
      }}>
        {apiInfo && (
          <>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 16 }}>API Mapping</div>
            <div style={{ whiteSpace: 'pre-line', fontSize: '1rem', color: '#A855F7', marginBottom: 24 }}>{apiInfo}</div>
            <button
              onClick={() => setApiInfo(null)}
              style={{
                alignSelf: 'flex-end',
                color: '#fff',
                background: '#A855F7',
                border: 'none',
                borderRadius: 8,
                padding: '0.5rem 1.2rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '1rem',
                marginTop: 'auto',
              }}
            >
              Close
            </button>
          </>
        )}
      </div>
      {showHelp && (
        <div style={{ marginTop: 24, background: '#232336', padding: 20, borderRadius: 12, color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: '1.5rem' }}>🎧</span>
            <div>
              <b style={{ color: '#A855F7' }}>Agent:</b> Hi Sam! I see your bill looks a bit higher this month. Would you like tips on saving energy, or help decoding your tariff?
            </div>
          </div>
          
          {/* API Reference for Agent View */}
          <div style={{
            background: '#181820',
            borderRadius: 8,
            padding: '1rem',
            marginTop: 12,
            borderLeft: '3px solid #58A6FF',
          }}>
            <div style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: 1,
              color: '#888',
              marginBottom: 10,
            }}>
              📡 What the Agent Sees (API Data)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888' }}>Account Lookup:</span>
                <code style={{ color: '#58A6FF', fontSize: '0.75rem' }}>GET /v1/accounts/{'{account_number}'}</code>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888' }}>Usage History:</span>
                <code style={{ color: '#58A6FF', fontSize: '0.75rem' }}>GET /v1/electricity-meter-points/{'{mpan}'}/meters/{'{serial}'}/consumption/</code>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888' }}>Current Tariff:</span>
                <code style={{ color: '#58A6FF', fontSize: '0.75rem' }}>GET /v1/products/{'{product_code}'}/</code>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888' }}>Available Products:</span>
                <code style={{ color: '#58A6FF', fontSize: '0.75rem' }}>GET /v1/products/</code>
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>
              Agents use these endpoints to view your account, compare bills, and suggest better tariffs.
            </div>
          </div>
          
          <button 
            onClick={() => setShowHelp(false)} 
            style={{ 
              marginTop: 16, 
              color: '#fff', 
              background: '#A855F7', 
              border: 'none', 
              borderRadius: 6,
              padding: '0.5rem 1rem',
              cursor: 'pointer', 
              fontWeight: 700 
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default FirstBillChapter;
