import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

// Extend MUI palette with tertiary + accent
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    accent?: PaletteOptions['primary'];
  }
}

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#6366F1',
            light: '#818CF8',
            dark: '#4F46E5',
          },
          secondary: {
            main: '#10B981',
            light: '#34D399',
            dark: '#059669',
          },
          tertiary: {
            main: '#F43F5E',
            light: '#FB7185',
            dark: '#E11D48',
          },
          accent: {
            main: '#8B5CF6',
            light: '#A78BFA',
            dark: '#7C3AED',
          },
          background: {
            default: '#F8FAFC',
            paper: '#FFFFFF',
          },
        }
      : {
          primary: {
            main: '#818CF8',
            light: '#6366F1',
            dark: '#4F46E5',
          },
          secondary: {
            main: '#34D399',
            light: '#10B981',
            dark: '#059669',
          },
          tertiary: {
            main: '#FB7185',
            light: '#F43F5E',
            dark: '#E11D48',
          },
          accent: {
            main: '#A78BFA',
            light: '#8B5CF6',
            dark: '#7C3AED',
          },
          background: {
            default: '#1A1C23',
            paper: '#2D3748',
          },
        }),
  },
});

// Main theme factory
export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    ...getDesignTokens(mode),
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            padding: '8px 16px',
            fontWeight: 500,
          },
          containedPrimary: {
            background: 'linear-gradient(45deg, #6366F1 30%, #818CF8 90%)',
            boxShadow: '0 3px 12px rgba(99, 102, 241, 0.2)',
            '&:hover': {
              background: 'linear-gradient(45deg, #4F46E5 30%, #6366F1 90%)',
              boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            transition:
              'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
          },
        },
      },
    },
  });
