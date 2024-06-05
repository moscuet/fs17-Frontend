import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import AdminCategories from './AdminCategories';
import AdminProducts from './AdminProducts';


const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <NavLink to="products">Products</NavLink>
        <NavLink to="categories">Categories</NavLink>
        <NavLink to="size-color">Size & Color</NavLink>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="products/*" element={<AdminProducts />} />
          <Route path="categories/*" element={<AdminCategories />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
