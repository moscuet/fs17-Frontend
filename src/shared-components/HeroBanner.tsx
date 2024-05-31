import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { styled, Theme } from '@mui/system';

interface HeroBannerProps {
  imageUrl: string;
  children: ReactNode;
}

const FullWidthBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '100%',
  height: 'calc(100vh - 100px)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
}));

const HeroBanner: React.FC<HeroBannerProps> = ({ imageUrl, children }) => {
  return (
    <FullWidthBox style={{ backgroundImage: `url(${imageUrl})` }}>
      {children}
    </FullWidthBox>
  );
};

export default HeroBanner;
