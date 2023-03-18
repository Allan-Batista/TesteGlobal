import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';

const breakpoints = {
  sm: '480px',
  md: '770px',
  lg: '1200px',
};

const theme = extendTheme({
  colors: {
    red: {
      600: '#FF0000',
      700: '#740000',
      800: '#590015',
      900: '#330000',
    },
  },

  fonts: {
    body: 'Poppins,system-ui, sans-serif',
    heading: 'Poppins, system-ui, Georgia, serif',
    mono: 'Poppins, monospace',
  },

  fontSizes: {
    xs: '1.2rem',
    sm: '1.4rem',
    md: '1.6rem',
    lg: '1.8rem',
    xl: '2rem',
    '2xl': '2.4rem',
    '3xl': '3rem',
    '4xl': '3.6rem',
    '5xl': '4rem',
    '6xl': '4.2rem',
    '7xl': '4.8rem',
  },

  breakpoints,
});

export default theme;
