import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Layout from "./features/layout/Layout";
import UserProfile from "./features/users/UserProfile";
import ProductDetailsPage from "./features/products/ProductDetailsPage";
import Cart from "./features/cart/CartPage";
import OrderDetails from "./features/orders/OrderDetailsPage";
import ProductsPage from "./features/products/ProductsPage";
import UserPrivateRoute from "./Routes/UserPrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";
import NetworkErrorPage from "./pages/NetworkErrorPage";
import SignUpPage from "./features/users/SignUpPage ";
import Contact from "./features/contact/componenets/Contact";
import AdminPrivateRoute from "./Routes/AdminPrivateRoute";
import AdminProfile from "./features/admin/AdminProfile";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { addressActions } from "./features/addresses/addressSlice";
import { rehydrateAuth } from "./features/auth/authSlice";
import { ordersActions } from "./features/orders/orderSlice";
import { colorsActions } from "./features/product-colors/productColorSlice";
import { productLinesActions } from "./features/product-lines/productLinesSlice";
import { sizesActions } from "./features/product-sizes/productSizeSlice";
import EditProductPage from "./features/products/EditProductPage";

const App: React.FC = () => {

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);

  useEffect(() => {
    dispatch(productLinesActions.fetchAll());
    dispatch(colorsActions.fetchAll());
    dispatch(sizesActions.fetchAll());

    if (!userId) {
      dispatch(rehydrateAuth());
    }

    if (userId) {
      dispatch(addressActions.fetchAddressByUserId(userId));
      dispatch(ordersActions.fetchAll());
    }
  }, [dispatch, userId]);

  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/products/edit/:id" element={<EditProductPage/>} />
          
          <Route 
          path="/user-profile" 
          element={
            <UserPrivateRoute>
              <UserProfile />
            </UserPrivateRoute>
          } 
        />
        
        <Route 
          path="/admin-profile" 
          element={
            <AdminPrivateRoute>
              <AdminProfile />
            </AdminPrivateRoute>
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
