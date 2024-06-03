import React, { ReactNode, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
  import 'react-toastify/dist/ReactToastify.css';
import ToastComponent from "../../shared-components/ToastContainer";
import Navbar from "./NavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();


  interface NetworkErrorEvent extends Event {
    detail: {
      message: string;};
  }
  useEffect(() => {
    const handleNetworkError = (event:NetworkErrorEvent) => {
      navigate('/network-error');
    };

    window.addEventListener('network-error', handleNetworkError as EventListener);

    return () => {
      window.removeEventListener('network-error', handleNetworkError as EventListener);
    };
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <div >
        <CssBaseline />
        <Navbar />
        <div style={{ minHeight: "calc(100vh - 180px)" }}>{children}</div>
        <Footer />
      </div>
      <ToastComponent />
    </ThemeProvider>
  );
};

export default Layout;
