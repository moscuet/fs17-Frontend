import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FAF9F6',
      dark: '#36454F',
    },
    secondary: {
      main: '#607D8B',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#ff9800',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#36454F',
      secondary: '#607D8B',
      disabled: '#607D8B',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'uppercase',
    },
    h1: {
      fontSize: '2.125rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          padding: '8px 16px',
          fontWeight: '500',
          borderRadius: '4px',
          backgroundColor: '#607D8B',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#455a64',
          }
        },
      },
    },
  },
});

export default theme;
