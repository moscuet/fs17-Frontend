import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
            <Box textAlign="center" p={5} boxShadow={3}>
                <Typography variant="h1" color="text.primary" gutterBottom>
                    404
                </Typography>
                <Typography variant="h4" color="text.secondary" paragraph>
                    Oops! The page you're looking for isn't here.
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    You might have the wrong address, or the page may have moved.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/')}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
}

export default NotFoundPage;
