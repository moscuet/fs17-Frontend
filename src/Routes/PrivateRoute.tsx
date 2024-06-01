import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import LoginModal from '../features/auth/LoginModal';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);
const navigate = useNavigate();
    const token = useAppSelector(state => state.auth.token);

    useEffect(() => {
        if (!token) {
            setModalOpen(true);
        } else {
            setModalOpen(false);
        }
    }, [token]);

    const handleClose = () => {
        setModalOpen(false);
        navigate("/");
    };

    if (!token && !isModalOpen) {
        return null; 
    }

    return (
        <>
            {token ? children : null}
            <LoginModal
                title="Login Required to View Profile"
                open={isModalOpen}
                handleClose={handleClose}
            />
        </>
    );
};

export default PrivateRoute;
