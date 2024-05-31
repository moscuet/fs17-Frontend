import React from 'react';
import { Grid, Typography } from "@mui/material";
import { Box, Container, styled } from "@mui/system";

interface ImageCardProps {
  imageUrl: string;
  title?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, title }) => {
  return (
    <StyledBox
      sx={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {title && <Typography variant="h6" sx={{ color: 'white', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>{title}</Typography>}
    </StyledBox>
  );
};

const HeroPage = () => {
  return (
  <Container maxWidth="xl">
      <Box sx={{ height: 'calc(100vh - 100px)', width: '100%', mt:2}}>
      <Grid container sx={{ height: '100%' }} spacing={2} >
        <Grid item xs={3} sx={{ height: '100%' }}>
          <Box sx={{ height: '50%', mb: 1 }}>
            <ImageCard imageUrl="/assets/productLineImages/hero_cover.webp" title="Image 1" />
          </Box>
          <Box sx={{ height: '50%' }}>
            <ImageCard imageUrl="/assets/productLineImages/hero_cover.webp" title="Image 2" />
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ height: '100%' }}>
          <ImageCard imageUrl="/assets/productLineImages/hero_cover.webp" title="Main Feature" />
        </Grid>
        <Grid item xs={3} sx={{ height: '100%' }}>
          <Box sx={{ height: '50%'  }}>
            <ImageCard imageUrl="/assets/productLineImages/hero_cover.webp" title="Image 3" />
          </Box>
          <Box sx={{ height: '50%' }}>
            <ImageCard imageUrl="/assets/productLineImages/hero_cover.webp" title="Image 4" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Container>
  );
};

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export default HeroPage;
