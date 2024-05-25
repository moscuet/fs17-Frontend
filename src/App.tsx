import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Layout from './shared-components/Layout';
import ProductLinesPage from './features/product-lines/ProductLinesPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product-lines" element={<ProductLinesPage/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
