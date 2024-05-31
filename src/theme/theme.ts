import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FAF9F6', // Keeping your original light primary color
      dark: '#b0bec5', // A darker shade for contrasting elements if needed
    },
    secondary: {
      main: '#607D8B', // Secondary color stays the same
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#ff9800',
    },
    warning: {
      main: '#FFA726',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2C3E50', // Dark blue shade for high contrast text
      secondary: '#607D8B', // This remains the same
      disabled: '#B0BEC5',
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
          padding: '4px 16px',
          fontWeight: '500',
          borderRadius: '4px',
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: '#607D8B',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#455a64',
            }
          }
        },
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: '#FAF9F6', // Light primary background
            color: '#2C3E50', // Dark text for visibility
            '&:hover': {
              backgroundColor: '#EDE7F6', // A light hover effect
            }
          }
        },
        {
          props: { variant: 'contained', color: 'error' },
          style: {
            backgroundColor: '#f44336',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#d32f2f',
            }
          }
        },
        {
          props: { variant: 'contained', color: 'warning' },
          style: {
            backgroundColor: '#FFA726',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#fb8c00',
            }
          }
        },
      ]
    },
  },
});

export default theme;
