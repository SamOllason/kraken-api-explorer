import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { concepts, type ConceptId } from '@/data/concepts';
import { CloseButton, CodeBlock } from '@/components/common/StyledComponents';

interface InfoPanelProps {
  conceptId: ConceptId | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToConcept: (conceptId: ConceptId) => void;
}

const PanelOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all ${theme.transitions.normal};
  z-index: 200;
`;

const Panel = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 480px;
  max-width: 100%;
  height: 100vh;
  background: ${theme.colors.surface};
  border-left: 1px solid ${theme.colors.surfaceBorder};
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform ${theme.transitions.normal};
  z-index: 201;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PanelHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.surfaceBorder};
  background: ${theme.colors.background};
`;

const PanelTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  span {
    font-size: ${theme.fontSizes['2xl']};
  }
`;

const PanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: clamp(${theme.spacing.md}, 3vw, ${theme.spacing.lg});
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const SectionTitle = styled.h3`
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Description = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
  white-space: pre-line;
`;

const FormatExample = styled.div`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.surfaceBorder};
  border-radius: ${theme.radii.md};
  padding: ${theme.spacing.md};
`;

const FormatSegments = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.sm};
`;

const Segment = styled.span<{ $color: string }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${({ $color }) => $color}20;
  border: 1px solid ${({ $color }) => $color}40;
  border-radius: ${theme.radii.sm};
`;

const SegmentValue = styled.span<{ $color: string }>`
  font-family: ${theme.fonts.mono};
  font-weight: 600;
  color: ${({ $color }) => $color};
`;

const SegmentLabel = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
`;

const ApiPath = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: clamp(0.7rem, 2.5vw, ${theme.fontSizes.sm});
  color: ${theme.colors.accentBlue};
  background: ${theme.colors.background};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.radii.md};
  border: 1px solid ${theme.colors.surfaceBorder};
  word-break: break-all;
  overflow-wrap: break-word;
`;

const RelatedConcepts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const RelatedButton = styled.button`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.surfaceBorder};
  border-radius: ${theme.radii.full};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  }
`;

// Simple syntax highlighting for GraphQL
function highlightGraphQL(query: string): React.ReactNode {
  const lines = query.split('\n');
  return lines.map((line, i) => {
    const highlighted = line
      .replace(/(query|mutation|fragment|on)\b/g, '<span class="keyword">$1</span>')
      .replace(/(\$\w+)/g, '<span class="string">$1</span>')
      .replace(/(\w+):/g, '<span class="property">$1</span>:')
      .replace(/(#.*)$/g, '<span class="comment">$1</span>');
    return (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: highlighted }} />
        {i < lines.length - 1 && '\n'}
      </span>
    );
  });
}

export function InfoPanel({ conceptId, isOpen, onClose, onNavigateToConcept }: InfoPanelProps) {
  const concept = conceptId ? concepts[conceptId] : null;

  return (
    <>
      <PanelOverlay $isOpen={isOpen} onClick={onClose} />
      <Panel $isOpen={isOpen} role="complementary" aria-hidden={!isOpen}>
        {concept && (
          <>
            <PanelHeader>
              <PanelTitle>
                <span>{concept.icon}</span>
                {concept.title}
              </PanelTitle>
              <CloseButton onClick={onClose} aria-label="Close panel">
                ×
              </CloseButton>
            </PanelHeader>

            <PanelContent>
              <Section>
                <SectionTitle>What is it?</SectionTitle>
                <Description>{concept.fullDescription}</Description>
              </Section>

              {concept.format && (
                <Section>
                  <SectionTitle>Format Breakdown</SectionTitle>
                  <FormatExample>
                    <code style={{ fontFamily: theme.fonts.mono, color: theme.colors.textPrimary }}>
                      {concept.format.example}
                    </code>
                    {concept.format.segments && (
                      <FormatSegments>
                        {concept.format.segments.map((segment, i) => (
                          <Segment key={i} $color={segment.color}>
                            <SegmentValue $color={segment.color}>{segment.value}</SegmentValue>
                            <SegmentLabel>{segment.label}</SegmentLabel>
                          </Segment>
                        ))}
                      </FormatSegments>
                    )}
                  </FormatExample>
                </Section>
              )}

              {concept.apiPath && (
                <Section>
                  <SectionTitle>API Path</SectionTitle>
                  <ApiPath>{concept.apiPath}</ApiPath>
                </Section>
              )}

              {concept.graphqlQuery && (
                <Section>
                  <SectionTitle>GraphQL Query</SectionTitle>
                  <CodeBlock>
                    <code>{highlightGraphQL(concept.graphqlQuery)}</code>
                  </CodeBlock>
                </Section>
              )}

              {concept.relatedConcepts.length > 0 && (
                <Section>
                  <SectionTitle>Related Concepts</SectionTitle>
                  <RelatedConcepts>
                    {concept.relatedConcepts.map((relatedId) => {
                      const related = concepts[relatedId as ConceptId];
                      if (!related) return null;
                      return (
                        <RelatedButton
                          key={relatedId}
                          onClick={() => onNavigateToConcept(relatedId as ConceptId)}
                        >
                          {related.icon} {related.title}
                        </RelatedButton>
                      );
                    })}
                  </RelatedConcepts>
                </Section>
              )}
            </PanelContent>
          </>
        )}
      </Panel>
    </>
  );
}
