import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';

declare module '@mui/material/styles' {
  interface Palette {
    palette: {
      background: {
        default: string;
      };

      primary: {
        main: string;
      };
      error: {
        main: string;
      };
      warning: {
        main: string;
      };
      success: {
        main: string;
      };
      grey: {
        '300': string;
        '400': string;
        '500': string;
        '600': string;
        '700': string;
        '800': string;
        '900': string;
      };
    };
    typography: {
      button: {
        textTransform: string;
        fontWeight: string;
        color: string;
      };
      fontFamily: string;
      allVariants: {
        color: string;
        fontWeight: string | number;
      };
      h1: {
        fontSize: string;
        fontWeight: string;
      };
      h2: {
        fontSize: string;
        fontWeight: string;
      };
      h3: {
        fontSize: string;
        fontWeight: string;
      };
      h4: {
        fontSize: string;
        fontWeight: string;
      };
      h5: {
        fontSize: string;
        fontWeight: string;
      };
      h6: {
        fontSize: string;
        fontWeight: string;
      };
      subtitle1: {
        fontSize: string;
      };
      subtitle2: {
        fontSize: string;
      };
    };
  }

  interface PaletteOptions {
    palette?: {
      background?: {
        default?: string;
      };

      primary?: {
        main?: string;
      };
      error?: {
        main?: string;
      };
      warning?: {
        main?: string;
      };
      success?: {
        main?: string;
      };
      grey?: {
        '300'?: string;
        '400'?: string;
        '500'?: string;
        '600'?: string;
        '700'?: string;
        '800'?: string;
        '900'?: string;
      };
    };
    typography?: {
      button?: {
        textTransform?: string;
        fontWeight?: string;
        color?: string;
      };
      fontFamily?: string;
      allVariants?: {
        color?: string;
        fontWeight?: string | number;
      };
      h1?: {
        fontSize?: string;
        fontWeight?: string;
      };
      h2?: {
        fontSize?: string;
        fontWeight?: string;
      };
      h3?: {
        fontSize?: string;
        fontWeight?: string;
      };
      h4?: {
        fontSize?: string;
        fontWeight?: string;
      };
      h5?: {
        fontSize?: string;
        fontWeight?: string;
      };
      h6?: {
        fontSize?: string;
        fontWeight?: string;
      };
      subtitle1?: {
        fontSize?: string;
      };
      subtitle2?: {
        fontSize?: string;
      };
    };
  }
}

export const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#333333',
    },
    primary: {
      main: '#1A65DA',
    },
    error: {
      main: '#D65555',
    },
    warning: {
      main: '#C58E00',
    },
    success: {
      main: '#1D9F55',
    },
    grey: {
      '300': '#F9F9FB',
      '400': '#F2F2F2',
      '500': '#E2E2E2',
      '600': '#C2C2C2',
      '700': '#949494',
      '800': '#5C5C5C',
      '900': '#333333',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
      color: 'white',
    },
    allVariants: {
      color: '#333333',
      fontWeight: 500,
    },
    fontFamily: 'Montserrat',
    h1: {
      fontWeight: 'bold',
      fontSize: '2.25rem',
    },
    h2: {
      fontWeight: 'bold',
      fontSize: '1.5rem',
    },
    h3: {
      fontWeight: 'bold',
      fontSize: '1.25rem',
    },
    h4: {
      fontWeight: 'bold',
      fontSize: '1rem',
    },
    h5: {
      fontWeight: 'bold',
      fontSize: '0.875rem',
    },
    h6: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
    },
    subtitle1: {
      fontSize: '1rem',
    },
    subtitle2: {
      fontSize: '0.875rem',
    },
  },
});

export const DefaultThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const withTheme = (node: ReactNode) => {
  return <DefaultThemeProvider>{node}</DefaultThemeProvider>;
};
