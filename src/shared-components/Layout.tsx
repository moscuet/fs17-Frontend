import React, { ReactNode } from "react";
import { CssBaseline, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./NavBar";
import theme from "../theme/theme";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
