import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#E6F2D6', // Lighter shade of green
        },
        secondary: {
            main: '#FFC107', // Lighter shade of orange
        },
        background: {
            default: '#FFFFFF', // White background
            paper: '#FAFAFA', // Slightly off-white paper background
        },
        text: {
            primary: '#333333',
            secondary: '#757575',
        },
        error: {
            main: '#FF6F61',
        },
        warning: {
            main: '#FFA726',
        },
        info: {
            main: '#29B6F6',
        },
        success: {
            main: '#66BB6A',
        },
    },
    spacing: 8,
    typography: {
        fontFamily: 'Arial, sans-serif',
        h1: {
            fontSize: '20px',
            fontWeight: 700,
            color: '#333333',
        },
        h2: {
            fontSize: '18px',
            fontWeight: 700,
            color: '#333333',
        },
        h3: {
            fontSize: '15px',
            fontWeight: 700,
            color: '#333333',
        },
        h4: {
            fontSize: '15px',
            fontWeight: 700,
            color: '#333333',
        },
        h5: {
            fontSize: '12px',
            fontWeight: 700,
            color: '#333333',
        },
        h6: {
            fontSize: '12px',
            fontWeight: 700,
            color: '#333333',
        },
        body1: {
            fontSize: '12px',
            fontWeight: 400,
            color: '#333333',
        },
        body2: {
            fontSize: '10px',
            fontWeight: 400,
            color: '#757575',
        },
        button: {
            fontSize: '10px',
            fontWeight: 700,
        },
    },
});

export default theme;
