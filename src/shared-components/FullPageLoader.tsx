import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface FullPageLoaderProps {
  loading: boolean;
}

const FullPageLoader: React.FC<FullPageLoaderProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.3)',
      zIndex: 1301 
    }}>
      <CircularProgress size={80} style={{ color: '#1a90ff' }} /> 
    </Box>
  );
};

export default FullPageLoader;
