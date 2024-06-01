import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B1A17', // Primary color
      light: '#3A3937', // Light shade of primary for contrast
      dark: '#000000', // Dark shade for contrast elements
    },
    secondary: {
      main: '#A35709', // Secondary color
      dark: '#7B4307', // Dark shade for secondary
      light: '#CC7224', // Light shade for secondary
    },
    error: {
      main: '#FF8303', // Error color
      dark: '#CC6902', // Darker shade for error
      light: '#FFAC4D', // Lighter shade for error
    },
    info: {
      main: '#F0E3CA', // Info color
      dark: '#CBB297', // Darker shade for contrast
      light: '#FFF6E5', // Lighter shade for background
    },
    warning: {
      main: '#FF8303', // Warning color
      dark: '#CC6902', // Darker shade for warning
      light: '#FFAC4D', // Lighter shade for warning
    },
    background: {
      default: '#fafafa', // Background color
      paper: '#ffffff', // Paper color
    },
    text: {
      primary: '#1B1A17', // Primary text color
      secondary: '#A35709', // Secondary text color
      disabled: '#B0BEC5', // Disabled text color
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
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: '#1B1A17',
            color: '#F0E3CA',
            '&:hover': {
              backgroundColor: '#3A3937',
            }
          }
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: '#A35709',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#7B4307',
            }
          }
        },
        {
          props: { variant: 'contained', color: 'error' },
          style: {
            backgroundColor: '#FF8303',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#CC6902',
            }
          }
        },
        {
          props: { variant: 'contained', color: 'info' },
          style: {
            backgroundColor: '#F0E3CA',
            color: '#1B1A17',
            '&:hover': {
              backgroundColor: '#CBB297',
            }
          }
        },
        {
          props: { variant: 'contained', color: 'warning' },
          style: {
            backgroundColor: '#FF8303',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#CC6902',
            }
          }
        },
      ]
    },
  },
});

export default theme;
