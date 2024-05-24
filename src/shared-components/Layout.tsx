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
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default Layout;
