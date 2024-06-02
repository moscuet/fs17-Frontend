import { Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

function singularize(entityName: string): string {
    if (entityName.endsWith('addresses')) {
        return entityName.replace('addresses', 'address');
    } else if (entityName.endsWith('s')) {
        return entityName.slice(0, -1);
    }
    return entityName;
}

const toastMiddleware: Middleware = ({ getState }) => (next) => (action) => {
    const validActions = ['updateOne', 'createOne', 'deleteOne', 'signup', 'updateCurrentUser'];

    const parts = action.type.split('/');
    const entityName = parts[0];  
    const actionName = parts[1];  
    const status = parts[2];     

    // Check if the action is one of the valid actions
    if (validActions.includes(actionName)) {
        const verbMatch = actionName.match(/^(update|create|delete)/i);
        const verb = verbMatch ? verbMatch[0] : '';
        const formattedVerb = verb.charAt(0).toUpperCase() + verb.slice(1); 

        // Singularize the entity name
        const singularEntityName = singularize(entityName);
        const formattedEntityName = singularEntityName.charAt(0).toUpperCase() + singularEntityName.slice(1); // Capitalize first letter

        if (status === 'rejected') {
            let errorMessage = action.error?.message || 'An error occurred';
            if (typeof action.payload === 'string') {
                errorMessage = action.payload;
            }
            toast.error(errorMessage);
        } else if (status === 'fulfilled') {
            let successMessage = `${formattedEntityName} ${formattedVerb} successfully!`;
            toast.success(successMessage);
        }
    }
    return next(action);
};

export default toastMiddleware;
