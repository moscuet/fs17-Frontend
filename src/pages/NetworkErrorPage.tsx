import { Typography, Button, Container, Box } from '@mui/material';

const NetworkErrorPage = () => {

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 4 }}>
            <Box textAlign="center" p={5} boxShadow={3}>
                <Typography variant="h1" color="error.main" gutterBottom>
                    Oops!
                </Typography>
                <Typography variant="h4" color="text.primary" paragraph>
                    Unable to reach the server.
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    This might be due to a network problem or the server being down. Please check your internet connection, or try again later.
                </Typography>
                <Button 
                    variant="outlined" 
                    color="error"
                    onClick={() => window.location.reload()}
                    sx={{ mt: 3, mb: 2, ml: 2 }}
                >
                    Retry
                </Button>
            </Box>
        </Container>
    );
}

export default NetworkErrorPage;
