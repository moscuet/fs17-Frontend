import { Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const toastMiddleware: Middleware = ({ getState }) => (next) => (action) => {
    if (action.type.endsWith('rejected')) {
        let errorMessage = action.error?.message || 'An error occurred';
        if (typeof action.payload === 'string') {
            errorMessage = action.payload;
        }
        toast.error(errorMessage);
    }
    
    if (action.type.endsWith('fulfilled')) {
        const [entityName, actionType] = action.type.split('/'); 
        const actionTypePart = actionType.replace(/[A-Z][a-z]+/g, (word: string) => ` ${word.toLowerCase()}`).trim();
        let successMessage = `${entityName.charAt(0).toUpperCase() + entityName.slice(1)} ${actionTypePart} successfully!`;
        
        toast.success(successMessage);
    }
    return next(action);
};

export default toastMiddleware;
