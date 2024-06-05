import React, { ReactNode, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ToastComponent from "../../shared-components/ToastContainer";
import Navbar from "./NavBar";
import { rehydrateAuth } from "../auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addressActions } from "../addresses/addressSlice";
import { ordersActions } from "../orders/orderSlice";
import { productLinesActions } from "../product-lines/productLinesSlice";
import { colorsActions } from "../product-colors/productColorSlice";
import { sizesActions } from "../product-sizes/productSizeSlice";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const userId = useAppSelector((state) => state.auth.user?.id);
  interface NetworkErrorEvent extends Event {
    detail: {
      message: string;
    };
  }
  useEffect(() => {
    const handleNetworkError = (event: NetworkErrorEvent) => {
      navigate("/network-error");
    };

    window.addEventListener(
      "network-error",
      handleNetworkError as EventListener
    );

    return () => {
      window.removeEventListener(
        "network-error",
        handleNetworkError as EventListener
      );
    };
  }, [navigate]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productLinesActions.fetchAll());
    dispatch(colorsActions.fetchAll());
    dispatch(sizesActions.fetchAll());
    dispatch(productLinesActions.fetchAll());

    !userId && dispatch(rehydrateAuth());
    if (userId) {
      dispatch(addressActions.fetchAddressByUserId(userId));
      dispatch(ordersActions.fetchByUserId(userId));
    }
  }, [dispatch, userId]);

  return (
    <ThemeProvider theme={theme}>
      <div>
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
