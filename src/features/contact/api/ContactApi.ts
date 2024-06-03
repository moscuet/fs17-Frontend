import axios from 'axios';

const apiClient = axios.create({
    // baseURL: process.env.API_URL,
    baseURL:'https://library-server100.up.railway.app/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const post = async (endpoint: string, data: any) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;  
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;  
    }
};
