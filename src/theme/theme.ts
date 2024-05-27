import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#D9EDBF',
            dark: '#2C7865',
            light: '#90D26D'
        },
        secondary: {
            main: '#FF9800',
            dark: '#CC7A00',
            light: '#FFB347'
        },
        background: {
            default: '#FFFFFF',
            paper: '#FAFAFA'
        },
        text: {
            primary: '#333333',
            secondary: '#757575'
        },
        error: {
            main: '#E57373'
        },
        warning: {
            main: '#FFB74D'
        },
        info: {
            main: '#64B5F6'
        },
        success: {
            main: '#81C784'
        }
    },
    spacing: 8,
    typography: {
        fontFamily: 'Arial, sans-serif',
        h1: {
            fontSize: '20px',
            fontWeight: 700,
            color: '#333333'
        },
        h2: {
            fontSize: '18px',
            fontWeight: 700,
            color: '#333333'
        },
        h3: {
            fontSize: '15px',
            fontWeight: 700,
            color: '#333333'
        },
        h4: {
            fontSize: '15px',
            fontWeight: 700,
            color: '#333333'
        },
        h5: {
            fontSize: '12px',
            fontWeight: 700,
            color: '#333333'
        },
        h6: {
            fontSize: '12px',
            fontWeight: 700,
            color: '#333333'
        },
        body1: {
            fontSize: '12px',
            fontWeight: 400,
            color: '#333333'
        },
        body2: {
            fontSize: '10px',
            fontWeight: 400,
            color: '#757575'
        },
        button: {
            fontSize: '12px',
            fontWeight: 700,
            color: '#FFFFFF',
            backgroundColor: '#FF9800'
        }
    }
});

export default theme;
