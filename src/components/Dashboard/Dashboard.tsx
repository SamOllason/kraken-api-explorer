import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { mockAccount } from '@/data/mockAccount';
import { Card, CardHeader, CardTitle, InfoButton, Badge, ClickableValue, Label, Grid, FlexRow } from '@/components/common/StyledComponents';
import { UsageChart } from '@/components/UsageChart';
import type { ConceptId } from '@/data/concepts';

interface DashboardProps {
  onInfoClick: (conceptId: ConceptId) => void;
  onTariffClick: () => void;
  visitedConcepts: ConceptId[];
}

const DashboardContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(0.75rem, 3vw, ${theme.spacing.xl});
  padding-top: clamp(3.5rem, 10vw, ${theme.spacing.xl});
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const WelcomeHeader = styled.header`
  margin-bottom: ${theme.spacing.md};
`;

const WelcomeTitle = styled.h1`
  font-size: clamp(1.5rem, 5vw, ${theme.fontSizes['3xl']});
  font-weight: 700;
  margin-bottom: ${theme.spacing.xs};

  .highlight {
    color: ${theme.colors.primary};
  }
`;

const WelcomeSubtitle = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.md};
`;

const AccountCard = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.surface} 0%, ${theme.colors.primary}10 100%);
  border-color: ${theme.colors.primary}30;
`;

const AccountNumber = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${theme.colors.primary};
  letter-spacing: 0.05em;
`;

const MeterPointCard = styled(Card)<{ $type: 'electricity' | 'gas' }>`
  border-left: 4px solid ${({ $type }) => 
    $type === 'electricity' ? theme.colors.electricity : theme.colors.gas};
`;

const MeterPointHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const MeterPointIcon = styled.span<{ $type: 'electricity' | 'gas' }>`
  font-size: ${theme.fontSizes['2xl']};
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $type }) => 
    $type === 'electricity' ? theme.colors.electricity : theme.colors.gas}20;
  border-radius: ${theme.radii.lg};
`;

const MeterPointTitle = styled.div`
  flex: 1;

  h3 {
    font-size: ${theme.fontSizes.lg};
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }

  p {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.textSecondary};
  }
`;

const DataRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.surfaceBorder};

  &:last-child {
    border-bottom: none;
  }
`;

const BalanceValue = styled.div<{ $inCredit: boolean }>`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ $inCredit }) => $inCredit ? theme.colors.success : theme.colors.error};
`;

const PropertyAddress = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: 500;
`;

const Postcode = styled.span`
  font-family: ${theme.fonts.mono};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.sm};
  margin-left: ${theme.spacing.sm};
`;

const HelpText = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  font-style: italic;
  margin-top: ${theme.spacing.xs};
`;

export function Dashboard({ onInfoClick, onTariffClick, visitedConcepts }: DashboardProps) {
  const account = mockAccount;
  const property = account.properties[0];
  const elecMeterPoint = property.electricityMeterPoints[0];
  const gasMeterPoint = property.gasMeterPoints[0];
  
  const balanceInPounds = account.balance / 100;
  const isInCredit = account.balance < 0;
  const displayBalance = isInCredit 
    ? `£${Math.abs(balanceInPounds).toFixed(2)} CR` 
    : `£${balanceInPounds.toFixed(2)}`;

  return (
    <DashboardContainer>
      {/* Intro Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(245, 158, 66, 0.1))',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        borderRadius: 12,
        padding: 'clamp(0.75rem, 3vw, 1.25rem) clamp(1rem, 3vw, 1.5rem)',
        paddingRight: 'clamp(1rem, 15vw, 1.5rem)',
        marginBottom: theme.spacing.xl,
      }}>
        <p style={{
          margin: '0 0 8px 0',
          fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
          color: '#fff',
          lineHeight: 1.5,
        }}>
          🐙 <b>Kraken Explorer</b> is an interactive tool to help you understand how to work with{' '}
          <span style={{ color: theme.colors.primary }}>Kraken's APIs</span>.
        </p>
        <p style={{
          margin: '0 0 8px 0',
          fontSize: '0.85rem',
          color: theme.colors.textSecondary,
        }}>
          Built with React, TypeScript, and XState — the same tech stack used by Kraken.
        </p>
        <a
          href="https://github.com/SamOllason/kraken-api-explorer#readme"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: theme.colors.accentPurple,
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

      <WelcomeHeader>
        <WelcomeTitle>
          🐙 <span className="highlight">Kraken</span> Explorer
        </WelcomeTitle>
        <WelcomeSubtitle>
          Click any <InfoButton $visited={false} style={{ display: 'inline-flex', transform: 'scale(0.9)' }}>i</InfoButton> icon to learn how the API works
        </WelcomeSubtitle>
      </WelcomeHeader>

      <Grid $columns={2} $gap={theme.spacing.lg}>
        {/* Account Card */}
        <AccountCard>
          <CardHeader>
            <CardTitle>
              <span>🏦</span>
              Account
              <InfoButton
                onClick={() => onInfoClick('accountNumber')}
                $visited={visitedConcepts.includes('accountNumber')}
                title="Learn about account numbers"
              >
                i
              </InfoButton>
            </CardTitle>
            <Badge $variant="success">Active</Badge>
          </CardHeader>
          <AccountNumber>{account.number}</AccountNumber>
          <HelpText>Click the ⓘ to see how this maps to the API</HelpText>
        </AccountCard>

        {/* Balance Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <span>💰</span>
              Balance
              <InfoButton
                onClick={() => onInfoClick('balance')}
                $visited={visitedConcepts.includes('balance')}
                title="Learn about account balance"
              >
                i
              </InfoButton>
            </CardTitle>
          </CardHeader>
          <BalanceValue $inCredit={isInCredit}>{displayBalance}</BalanceValue>
          <HelpText>
            {isInCredit ? "You're in credit! 🎉" : "Amount owed"}
          </HelpText>
        </Card>

        {/* Property Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <span>🏠</span>
              Property
              <InfoButton
                onClick={() => onInfoClick('property')}
                $visited={visitedConcepts.includes('property')}
                title="Learn about properties"
              >
                i
              </InfoButton>
            </CardTitle>
          </CardHeader>
          <PropertyAddress>
            {property.address}
            <Postcode>{property.postcode}</Postcode>
          </PropertyAddress>
        </Card>
      </Grid>

      <Grid $columns={2} $gap={theme.spacing.lg}>
        {/* Electricity Meter Point */}
        <MeterPointCard $type="electricity">
          <MeterPointHeader>
            <MeterPointIcon $type="electricity">⚡</MeterPointIcon>
            <MeterPointTitle>
              <h3>Electricity</h3>
              <p>Supply point details</p>
            </MeterPointTitle>
          </MeterPointHeader>

          <DataRow>
            <FlexRow $justify="space-between">
              <Label>MPAN</Label>
              <InfoButton
                onClick={() => onInfoClick('mpan')}
                $visited={visitedConcepts.includes('mpan')}
                title="Learn about MPAN"
              >
                i
              </InfoButton>
            </FlexRow>
            <ClickableValue onClick={() => onInfoClick('mpan')}>
              {elecMeterPoint.mpan}
            </ClickableValue>
          </DataRow>

          <DataRow>
            <FlexRow $justify="space-between">
              <Label>Meter Serial</Label>
              <InfoButton
                onClick={() => onInfoClick('meter')}
                $visited={visitedConcepts.includes('meter')}
                title="Learn about meters"
              >
                i
              </InfoButton>
            </FlexRow>
            <ClickableValue onClick={() => onInfoClick('meter')}>
              {elecMeterPoint.meters[0].serialNumber}
            </ClickableValue>
          </DataRow>

          <DataRow>
            <FlexRow $justify="space-between">
              <Label>Tariff</Label>
              <InfoButton
                onClick={() => onInfoClick('tariffCode')}
                $visited={visitedConcepts.includes('tariffCode')}
                title="Learn about tariff codes"
              >
                i
              </InfoButton>
            </FlexRow>
            <ClickableValue onClick={onTariffClick}>
              {elecMeterPoint.agreements[0].tariffCode}
              <span style={{ marginLeft: '8px', opacity: 0.6 }}>🔍 Click to decode</span>
            </ClickableValue>
          </DataRow>

          <DataRow>
            <FlexRow $justify="space-between">
              <Label>GSP Region</Label>
              <InfoButton
                onClick={() => onInfoClick('gspRegion')}
                $visited={visitedConcepts.includes('gspRegion')}
                title="Learn about GSP regions"
              >
                i
              </InfoButton>
            </FlexRow>
            <ClickableValue onClick={() => onInfoClick('gspRegion')}>
              {elecMeterPoint.gspGroupId} (South Eastern)
            </ClickableValue>
          </DataRow>
        </MeterPointCard>

        {/* Gas Meter Point */}
        <MeterPointCard $type="gas">
          <MeterPointHeader>
            <MeterPointIcon $type="gas">🔥</MeterPointIcon>
            <MeterPointTitle>
              <h3>Gas</h3>
              <p>Supply point details</p>
            </MeterPointTitle>
          </MeterPointHeader>

          <DataRow>
            <FlexRow $justify="space-between">
              <Label>MPRN</Label>
              <InfoButton
                onClick={() => onInfoClick('mprn')}
                $visited={visitedConcepts.includes('mprn')}
                title="Learn about MPRN"
              >
                i
              </InfoButton>
            </FlexRow>
            <ClickableValue onClick={() => onInfoClick('mprn')}>
              {gasMeterPoint.mprn}
            </ClickableValue>
          </DataRow>

          <DataRow>
            <FlexRow $justify="space-between">
              <Label>Meter Serial</Label>
              <InfoButton
                onClick={() => onInfoClick('meter')}
                $visited={visitedConcepts.includes('meter')}
                title="Learn about meters"
              >
                i
              </InfoButton>
            </FlexRow>
            <ClickableValue onClick={() => onInfoClick('meter')}>
              {gasMeterPoint.meters[0].serialNumber}
            </ClickableValue>
          </DataRow>

          <DataRow>
            <FlexRow $justify="space-between">
              <Label>Tariff</Label>
              <InfoButton
                onClick={() => onInfoClick('tariffCode')}
                $visited={visitedConcepts.includes('tariffCode')}
                title="Learn about tariff codes"
              >
                i
              </InfoButton>
            </FlexRow>
            <ClickableValue onClick={onTariffClick}>
              {gasMeterPoint.agreements[0].tariffCode}
              <span style={{ marginLeft: '8px', opacity: 0.6 }}>🔍 Click to decode</span>
            </ClickableValue>
          </DataRow>
        </MeterPointCard>
      </Grid>

      {/* Usage Chart */}
      <UsageChart onInfoClick={onInfoClick} visitedConcepts={visitedConcepts} />
      
      {/* Progress indicator */}
      <Card style={{ textAlign: 'center' }}>
        <p style={{ color: theme.colors.textSecondary, marginBottom: theme.spacing.sm }}>
          🎯 Concepts explored: <strong style={{ color: theme.colors.primary }}>{visitedConcepts.length}</strong> / 11
        </p>
        <div style={{ 
          height: '8px', 
          background: theme.colors.background, 
          borderRadius: theme.radii.full,
          overflow: 'hidden'
        }}>
          <div style={{ 
            height: '100%', 
            width: `${(visitedConcepts.length / 11) * 100}%`,
            background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accentBlue})`,
            borderRadius: theme.radii.full,
            transition: 'width 0.5s ease'
          }} />
        </div>
      </Card>
    </DashboardContainer>
  );
}
