import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import AddCategory from './CategorySetting';
import EditCategory from './EditCategory';

const AdminCategories = () => {
  return (
    <div className="admin-categories">
      <nav className="category-sub-nav">
        <NavLink to="add" end>Add Category</NavLink>
        <NavLink to="edit">Edit Category</NavLink>
      </nav>
      <div className="category-content">
        <Routes>
          <Route path="add" element={<AddCategory />} />
          <Route path="edit" element={<EditCategory />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminCategories;
