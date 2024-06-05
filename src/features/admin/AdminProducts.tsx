import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import AddProduct from './AddProduct';
import EditProduct from './EditProducts';

const AdminProducts = () => {
  return (
    <div className="admin-products">
      <nav className="product-sub-nav">
        <NavLink to="add" end>Add Product</NavLink>
        <NavLink to="edit">Edit Product</NavLink>
      </nav>
      <div className="product-content">
        <Routes>
          <Route path="add" element={<AddProduct />} />
          <Route path="edit" element={<EditProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminProducts;
