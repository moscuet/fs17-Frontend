import React from 'react';
import { Link } from 'react-router-dom';
import ProductLinesPage from '../features/product-lines/ProductLinesPage';

const Home: React.FC = () => {

    return (
        <div>
            <h2>Home Page</h2>
            <Link to="/about">Go to About</Link>
            <ProductLinesPage/>
        </div>
    );
};

export default Home;
