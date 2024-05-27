import React, { ReactNode } from 'react';
import { CssBaseline, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './NavBar';
import theme from '../theme/theme';
import Footer from './Footer';


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container component="main" sx={{ mt: 2, mb: 4, minHeight: 'calc(100vh - 220px)' }}>
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default Layout;
