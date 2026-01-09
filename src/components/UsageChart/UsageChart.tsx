import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { mockAccount } from '@/data/mockAccount';
import { Card, CardHeader, CardTitle, InfoButton } from '@/components/common/StyledComponents';
import type { ConceptId } from '@/data/concepts';

interface UsageChartProps {
  onInfoClick?: (conceptId: ConceptId) => void;
  visitedConcepts?: ConceptId[];
  consumption?: Array<{ startDate: string; endDate: string; quantity: number; unit: string }>;
  highlightDate?: string;
}

const ChartContainer = styled.div`
  height: 200px;
  display: flex;
  align-items: flex-end;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} 0;
`;

const BarGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const BarsWrapper = styled.div`
  display: flex;
  gap: 2px;
  align-items: flex-end;
  height: 150px;
`;

const Bar = styled.div<{ $height: number; $color: string }>`
  width: 16px;
  height: ${({ $height }) => $height}%;
  background: linear-gradient(to top, ${({ $color }) => $color}80, ${({ $color }) => $color});
  border-radius: ${theme.radii.sm} ${theme.radii.sm} 0 0;
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scaleY(1.05);
    filter: brightness(1.2);
  }

  &:hover::after {
    content: attr(data-value);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: ${theme.colors.background};
    border: 1px solid ${theme.colors.surfaceBorder};
    padding: 2px 6px;
    border-radius: ${theme.radii.sm};
    font-size: ${theme.fontSizes.xs};
    white-space: nowrap;
    color: ${theme.colors.textPrimary};
  }
`;

const DayLabel = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
`;

const Legend = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  margin-top: ${theme.spacing.md};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const LegendDot = styled.span<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: ${theme.radii.sm};
  background: ${({ $color }) => $color};
`;

const LegendLabel = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.surfaceBorder};
  margin-top: ${theme.spacing.md};
`;

const TotalItem = styled.div`
  text-align: center;
`;

const TotalValue = styled.div<{ $color: string }>`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ $color }) => $color};
`;

const TotalLabel = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
`;

export function UsageChart({ onInfoClick, visitedConcepts, consumption, highlightDate }: UsageChartProps) {
  // If consumption is provided, use it (Story Mode), else use mockAccount (Dashboard)
  let elecConsumption: any[] = [];
  let gasConsumption: any[] = [];
  let showGas = false;
  if (consumption) {
    elecConsumption = consumption;
    showGas = false;
  } else {
    const property = mockAccount.properties[0];
    elecConsumption = property.electricityMeterPoints[0].meters[0].consumption || [];
    gasConsumption = property.gasMeterPoints[0].meters[0].consumption || [];
    showGas = gasConsumption.length > 0;
  }

  // Get max values for scaling
  const maxElec = Math.max(...elecConsumption.map(c => c.quantity), 1);
  const maxGas = showGas ? Math.max(...gasConsumption.map(c => c.quantity), 1) : 1;
  const maxValue = showGas ? Math.max(maxElec, maxGas) : maxElec;

  // Calculate totals
  const totalElec = elecConsumption.reduce((sum, c) => sum + c.quantity, 0);
  const totalGas = showGas ? gasConsumption.reduce((sum, c) => sum + c.quantity, 0) : 0;

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span>📊</span>
          This Week's Usage
          {onInfoClick && visitedConcepts && (
            <InfoButton
              onClick={() => onInfoClick('consumption')}
              $visited={visitedConcepts.includes('consumption')}
              title="Learn about consumption data"
            >
              i
            </InfoButton>
          )}
        </CardTitle>
      </CardHeader>

      <ChartContainer>
        {elecConsumption.map((elec, i) => {
          const date = new Date(elec.startDate);
          const dayName = dayNames[date.getDay()];
          const isHighlight = highlightDate && elec.startDate === highlightDate;
          return (
            <BarGroup key={i}>
              <BarsWrapper>
                <Bar
                  $height={(elec.quantity / maxValue) * 100}
                  $color={isHighlight ? theme.colors.accentBlue : theme.colors.electricity}
                  data-value={`⚡ ${elec.quantity.toFixed(1)} kWh`}
                  style={isHighlight ? { boxShadow: '0 0 0 2px #F59E42' } : {}}
                />
                {showGas && gasConsumption[i] && (
                  <Bar
                    $height={(gasConsumption[i].quantity / maxValue) * 100}
                    $color={theme.colors.gas}
                    data-value={`🔥 ${gasConsumption[i].quantity.toFixed(1)} kWh`}
                  />
                )}
              </BarsWrapper>
              <DayLabel>{dayName}</DayLabel>
            </BarGroup>
          );
        })}
      </ChartContainer>

      <Legend>
        <LegendItem>
          <LegendDot $color={theme.colors.electricity} />
          <LegendLabel>Electricity</LegendLabel>
        </LegendItem>
        {showGas && (
          <LegendItem>
            <LegendDot $color={theme.colors.gas} />
            <LegendLabel>Gas</LegendLabel>
          </LegendItem>
        )}
      </Legend>

      <TotalRow>
        <TotalItem>
          <TotalValue $color={theme.colors.electricity}>
            {totalElec.toFixed(1)} kWh
          </TotalValue>
          <TotalLabel>Electricity this week</TotalLabel>
        </TotalItem>
        {showGas && (
          <TotalItem>
            <TotalValue $color={theme.colors.gas}>
              {totalGas.toFixed(1)} kWh
            </TotalValue>
            <TotalLabel>Gas this week</TotalLabel>
          </TotalItem>
        )}
      </TotalRow>
    </Card>
  );
}
