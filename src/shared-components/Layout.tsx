import React, { ReactNode, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./NavBar";
import theme from "../theme/theme";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

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
      console.log(event.detail.message, "Network Error detected");  // "Network Error"
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
    </ThemeProvider>
  );
};

export default Layout;
