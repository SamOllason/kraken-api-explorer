import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.background};
    color: ${theme.colors.textPrimary};
    line-height: 1.6;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
  }

  code, pre {
    font-family: ${theme.fonts.mono};
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.surfaceBorder};
    border-radius: ${theme.radii.full};
    
    &:hover {
      background: ${theme.colors.textMuted};
    }
  }

  /* Selection */
  ::selection {
    background: ${theme.colors.primary}40;
    color: ${theme.colors.textPrimary};
  }
`;
