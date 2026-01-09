import styled from 'styled-components';
import { theme } from '@/styles/theme';

// Card Components
export const Card = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.surfaceBorder};
  border-radius: ${theme.radii.lg};
  padding: ${theme.spacing.lg};
  transition: all ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.primary}40;
    box-shadow: ${theme.shadows.md};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

export const CardTitle = styled.h3`
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
  color: ${theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  span {
    font-size: ${theme.fontSizes.lg};
  }
`;

export const CardValue = styled.div`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${theme.colors.textPrimary};
`;

// Info Button - the key interactive element
export const InfoButton = styled.button<{ $visited?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: ${theme.radii.full};
  border: 2px solid ${({ $visited }) => $visited ? theme.colors.primary : theme.colors.textMuted};
  background: ${({ $visited }) => $visited ? theme.colors.primary + '20' : 'transparent'};
  color: ${({ $visited }) => $visited ? theme.colors.primary : theme.colors.textMuted};
  font-size: ${theme.fontSizes.xs};
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.fast};
  flex-shrink: 0;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    background: ${theme.colors.primary}20;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Badge
export const Badge = styled.span<{ $variant?: 'success' | 'warning' | 'error' | 'info' }>`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.radii.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  ${({ $variant = 'info' }) => {
    const colors = {
      success: { bg: theme.colors.success, text: '#000' },
      warning: { bg: theme.colors.warning, text: '#000' },
      error: { bg: theme.colors.error, text: '#fff' },
      info: { bg: theme.colors.accentBlue, text: '#fff' },
    };
    return `
      background: ${colors[$variant].bg}20;
      color: ${colors[$variant].bg};
    `;
  }}
`;

// Clickable data values
export const ClickableValue = styled.span`
  font-family: ${theme.fonts.mono};
  color: ${theme.colors.textPrimary};
  cursor: pointer;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.radii.md};
  transition: all ${theme.transitions.fast};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primary}15;
    color: ${theme.colors.primary};
  }
`;

// Code Block
export const CodeBlock = styled.pre`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.surfaceBorder};
  border-radius: ${theme.radii.md};
  padding: ${theme.spacing.md};
  font-family: ${theme.fonts.mono};
  font-size: ${theme.fontSizes.sm};
  overflow-x: auto;
  line-height: 1.6;

  code {
    color: ${theme.colors.textSecondary};
  }

  .keyword {
    color: ${theme.colors.accentPurple};
  }

  .string {
    color: ${theme.colors.primary};
  }

  .property {
    color: ${theme.colors.accentBlue};
  }

  .comment {
    color: ${theme.colors.textMuted};
    font-style: italic;
  }
`;

// Layout helpers
export const Grid = styled.div<{ $columns?: number; $gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns = 2 }) => $columns}, 1fr);
  gap: ${({ $gap = theme.spacing.md }) => $gap};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FlexRow = styled.div<{ $gap?: string; $justify?: string; $align?: string }>`
  display: flex;
  flex-direction: row;
  gap: ${({ $gap = theme.spacing.sm }) => $gap};
  justify-content: ${({ $justify = 'flex-start' }) => $justify};
  align-items: ${({ $align = 'center' }) => $align};
`;

export const FlexCol = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap = theme.spacing.sm }) => $gap};
`;

// Label
export const Label = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
`;

// Panel/Modal backdrop
export const Overlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transition: all ${theme.transitions.normal};
  z-index: 100;
`;

// Close button
export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${theme.radii.md};
  border: 1px solid ${theme.colors.surfaceBorder};
  background: ${theme.colors.surface};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.lg};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.error};
    color: ${theme.colors.error};
    background: ${theme.colors.error}10;
  }
`;
