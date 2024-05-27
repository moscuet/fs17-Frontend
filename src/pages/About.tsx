import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
    return (
        <div style={{ padding:'500px'}}>
            <h2>About Page</h2>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default About;
