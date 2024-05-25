import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
    return (
        <div style={{border: '1px solid black', padding:'500px'}}>
            <h2>About Page</h2>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default About;
