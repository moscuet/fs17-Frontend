import React, { ReactNode, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./NavBar";
import theme from "../theme/theme";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

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
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ border: "2px solid red" }}>
        <CssBaseline />
        <Navbar />
        <div style={{ minHeight: "calc(100vh - 180px)" }}>{children}</div>
        <Footer />
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Layout;
