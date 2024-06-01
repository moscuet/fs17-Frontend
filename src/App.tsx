import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Layout from "./shared-components/Layout";
import { useAppDispatch } from "./app/hooks";
import { rehydrateAuth } from "./features/auth/authSlice";
import UserProfile from "./features/users/UserProfile";
import ProductDetailsPage from "./features/products/ProductDetailsPage";
import Cart from "./features/cart/CartPage";
import OrderDetails from "./features/orders/OrderDetailsPage";
import ProductsPage from "./features/products/ProductsPage";
import PrivateRoute from "./Routes/PrivateRoute";
import SignUpPage from "./features/users/SignUpPage ";
import NotFoundPage from "./pages/NotFoundPage";
import NetworkErrorPage from "./pages/NetworkErrorPage";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />

          <Route path="/network-error" element={<NetworkErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
