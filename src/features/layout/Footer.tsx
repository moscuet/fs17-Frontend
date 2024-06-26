import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt:3,
        backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(3),
        zIndex: 99,
        position: 'relative',
        minHeight: '100px',
      }}
    >
      <Typography variant="body1" align="center" color="white">
        © 2024 Eshop. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
