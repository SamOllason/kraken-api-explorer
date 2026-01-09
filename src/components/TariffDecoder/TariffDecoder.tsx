import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { CloseButton, InfoButton } from '@/components/common/StyledComponents';
import type { ConceptId } from '@/data/concepts';
import type { DecodedTariff } from '@/types/kraken';

interface TariffDecoderProps {
  tariffCode: string;
  isOpen: boolean;
  onClose: () => void;
  onInfoClick: (conceptId: ConceptId) => void;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all ${theme.transitions.normal};
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.surfaceBorder};
  border-radius: ${theme.radii.xl};
  padding: ${theme.spacing.xl};
  max-width: 600px;
  width: 90%;
  transform: scale(${({ $isOpen }) => ($isOpen ? 1 : 0.9)});
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: all ${theme.transitions.normal};
`;

const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
`;

const ModalTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const TariffDisplay = styled.div`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.surfaceBorder};
  border-radius: ${theme.radii.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const TariffCode = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${theme.colors.textPrimary};
  letter-spacing: 0.05em;
  margin-bottom: ${theme.spacing.md};
`;

const SegmentRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
`;

const Segment = styled.span<{ $color: string; $isActive?: boolean }>`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${({ $color }) => $color}20;
  border: 2px solid ${({ $color, $isActive }) => $isActive ? $color : `${$color}40`};
  border-radius: ${theme.radii.sm};
  font-family: ${theme.fonts.mono};
  font-weight: 600;
  color: ${({ $color }) => $color};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${({ $color }) => $color};
    transform: scale(1.05);
  }
`;

const DecodedSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
`;

const DecodedItem = styled.div<{ $color: string }>`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.surfaceBorder};
  border-left: 4px solid ${({ $color }) => $color};
  border-radius: ${theme.radii.md};
  padding: ${theme.spacing.md};
`;

const DecodedLabel = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: ${theme.spacing.xs};
`;

const DecodedValue = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.textPrimary};
`;

const LearnMoreRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.surfaceBorder};
`;

// Region code mappings
const REGION_NAMES: Record<string, string> = {
  A: 'Eastern',
  B: 'East Midlands',
  C: 'South Eastern',
  D: 'South',
  E: 'South Western',
  F: 'Southern',
  G: 'North Western',
  H: 'North Eastern',
  J: 'Yorkshire',
  K: 'South Wales',
  L: 'North Wales & Merseyside',
  M: 'Scotland South',
  N: 'Scotland North',
  P: 'Northern Ireland',
};

function decodeTariff(tariffCode: string): DecodedTariff | null {
  const parts = tariffCode.split('-');
  if (parts.length < 5) return null;

  const [fuelType, rateType, ...rest] = parts;
  const regionCode = rest[rest.length - 1];
  const dateParts = rest.slice(-4, -1);
  const productParts = rest.slice(0, -4);

  return {
    fuelType: fuelType as 'E' | 'G',
    rateType: rateType as '1R' | '2R',
    productCode: productParts.join('-'),
    launchDate: dateParts.join('-'),
    regionCode,
    regionName: REGION_NAMES[regionCode] || 'Unknown',
  };
}

export function TariffDecoder({ tariffCode, isOpen, onClose, onInfoClick }: TariffDecoderProps) {
  const decoded = decodeTariff(tariffCode);

  if (!isOpen || !decoded) return null;

  const segmentColors = {
    fuel: theme.colors.electricity,
    rate: theme.colors.accentPurple,
    product: theme.colors.primary,
    date: theme.colors.accentBlue,
    region: theme.colors.accentOrange,
  };

  return (
    <Overlay $isOpen={isOpen} onClick={onClose} data-testid="tariff-overlay">
      <Modal $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            🔍 Tariff Code Decoder
          </ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close">×</CloseButton>
        </ModalHeader>

        <TariffDisplay>
          <TariffCode>{tariffCode}</TariffCode>
          <SegmentRow>
            <Segment $color={segmentColors.fuel}>
              {decoded.fuelType}
            </Segment>
            <Segment $color={segmentColors.rate}>
              {decoded.rateType}
            </Segment>
            <Segment $color={segmentColors.product}>
              {decoded.productCode}
            </Segment>
            <Segment $color={segmentColors.date}>
              {decoded.launchDate}
            </Segment>
            <Segment $color={segmentColors.region}>
              {decoded.regionCode}
            </Segment>
          </SegmentRow>
        </TariffDisplay>

        <DecodedSection>
          <DecodedItem $color={segmentColors.fuel}>
            <DecodedLabel>Fuel Type</DecodedLabel>
            <DecodedValue>
              {decoded.fuelType === 'E' ? '⚡ Electricity' : '🔥 Gas'}
            </DecodedValue>
          </DecodedItem>

          <DecodedItem $color={segmentColors.rate}>
            <DecodedLabel>Rate Type</DecodedLabel>
            <DecodedValue>
              {decoded.rateType === '1R' ? 'Single Rate' : 'Economy 7 (Two Rate)'}
            </DecodedValue>
          </DecodedItem>

          <DecodedItem $color={segmentColors.product}>
            <DecodedLabel>Product</DecodedLabel>
            <DecodedValue>{decoded.productCode}</DecodedValue>
          </DecodedItem>

          <DecodedItem $color={segmentColors.date}>
            <DecodedLabel>Launch Date</DecodedLabel>
            <DecodedValue>{decoded.launchDate}</DecodedValue>
          </DecodedItem>

          <DecodedItem $color={segmentColors.region}>
            <DecodedLabel>Region</DecodedLabel>
            <DecodedValue>{decoded.regionName}</DecodedValue>
          </DecodedItem>
        </DecodedSection>

        <LearnMoreRow>
          <span style={{ color: theme.colors.textMuted }}>Want to learn more?</span>
          <InfoButton
            onClick={() => onInfoClick('tariffCode')}
            title="Learn about tariff codes"
          >
            i
          </InfoButton>
        </LearnMoreRow>
      </Modal>
    </Overlay>
  );
}
