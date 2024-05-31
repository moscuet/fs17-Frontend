import React from 'react';
import { Box } from '@mui/material';

const CircularImageBox: React.FC<{ imageUrl: string, size: number}> = ({ imageUrl,size }) => {
  return (
    <Box
      sx={{
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #ccc",
      }}
    >
      <img
        src={imageUrl}
        alt="Circular"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
  );
};

export default CircularImageBox;
