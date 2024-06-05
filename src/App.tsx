import React from "react";
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
import AdminDashboard from "./features/admin/AdminDashboard";

const App: React.FC = () => {
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
          <Route path="/admin" element={<AdminDashboard />} />

         
          <Route 
          path="/user-profile" 
          element={
            <UserPrivateRoute>
              <UserProfile />
            </UserPrivateRoute>
          } 
        />
{/*         
        <Route 
          path="/admin-profile" 
          element={
            <AdminPrivateRoute>
              <AdminProfile />
            </AdminPrivateRoute>
          } 
        /> */}

          <Route path="/network-error" element={<NetworkErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
