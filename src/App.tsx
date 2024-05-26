import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Layout from './shared-components/Layout';
import { useAppDispatch } from './app/hooks'; // Ensure you import your hook for dispatching
import { rehydrateAuth } from './features/auth/authSlice';
import ProductLineDetailsPage from './features/products/ProductLineDetailsPage';
import UserProfile from './features/users/UserProfile';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);

  return (<Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-lines" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/product-lines/:id" element={<ProductLineDetailsPage />} />
      </Routes>
    </Layout>
  </Router>
  );
}

export default App;
