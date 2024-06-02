import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B1A17', // Onyx
      light: '#3A3937', // Dark Charcoal
      dark: '#000000', // Black
    },
    secondary: {
      main: '#A35709', // Chocolate
      dark: '#7B4307', // Dark Brown
      light: '#CC7224', // Tawny
    },
    error: {
      main: '#FF8303', // Orange Peel
      dark: '#CC6902', // Dark Orange
      light: '#FFAC4D', // Peach Orange
    },
    info: {
      main: '#1B1A17', // Onyx
      dark: '#000000', // Black
      light: '#3A3937', // Dark Charcoal
    },
    warning: {
      main: '#FF8303', // Orange Peel
      dark: '#CC6902', // Dark Orange
      light: '#FFAC4D', // Peach Orange
    },
    background: {
      default: '#F0E3CA', // Almond
      paper: '#FFFFFF', // White
    },
    text: {
      primary: '#1B1A17', // Onyx
      secondary: '#A35709', // Chocolate
      disabled: '#B0BEC5', // Blue Gray
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
            backgroundColor: '#1B1A17', // Onyx
            color: '#F0E3CA', // Almond
            '&:hover': {
              backgroundColor: '#3A3937', // Dark Charcoal
            }
          }
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: '#A35709', // Chocolate
            color: '#FFFFFF', // White
            '&:hover': {
              backgroundColor: '#7B4307', // Dark Brown
            }
          }
        },
        {
          props: { variant: 'contained', color: 'error' },
          style: {
            backgroundColor: '#FF8303', // Orange Peel
            color: '#FFFFFF', // White
            '&:hover': {
              backgroundColor: '#CC6902', // Dark Orange
            }
          }
        },
        {
          props: { variant: 'contained', color: 'info' },
          style: {
            backgroundColor: '#1B1A17', // Onyx
            color: '#F0E3CA', // Almond
            '&:hover': {
              backgroundColor: '#3A3937', // Dark Charcoal
            }
          }
        },
        {
          props: { variant: 'contained', color: 'warning' },
          style: {
            backgroundColor: '#FF8303', // Orange Peel
            color: '#FFFFFF', // White
            '&:hover': {
              backgroundColor: '#CC6902', // Dark Orange
            }
          }
        },
      ]
    },
  },
});

export default theme;
