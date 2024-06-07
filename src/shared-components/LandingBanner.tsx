import React from "react";
import { Grid } from "@mui/material";
import { Box, Container, styled } from "@mui/system";

interface ImageCardProps {
  imageUrl: string;
  title?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl }) => {
  return (
    <StyledBox
      sx={{
        backgroundImage: `url(${
          imageUrl
        })`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    ></StyledBox>
  );
};

const HeroPage = () => {
  return (
    <Container maxWidth="xl"><Box sx={{ height: "calc(100vh - 100px)", width: "100%", mt: 2 }}>
    <Grid container sx={{ height: "100%", boxSizing: "border-box" }} alignItems="flex-end">
      <Grid item xs={3} sx={{ height: "100%", boxSizing: "border-box", pr: 1 }}> 
        <Box sx={{ height: "48%", mb: "8%" }}>  
          <ImageCard
            imageUrl="/assets/productImages/hero_cover1.webp"
            title="Image 1"
          />
        </Box>
        <Box sx={{ height: "48%" }}>  
          <ImageCard
            imageUrl="/assets/productImages/hero_cover2.webp"
            title="Image 2"
          />
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ height: "100%" }}>
        <ImageCard
          imageUrl="/assets/productImages/hero_cover.webp"
          title="Main Feature"
        />
      </Grid>
      <Grid item xs={3} sx={{ height: "100%", boxSizing: "border-box", pl: 1 }}> 
        <Box sx={{ height: "48%", mb: "8%" }}> 
          <ImageCard
            imageUrl="/assets/productImages/hero_cover3.webp"
            title="Image 3"
          />
        </Box>
        <Box sx={{ height: "48%" }}>
          <ImageCard
            imageUrl="/assets/productImages/hero_cover4.webp"
            title="Image 4"
          />
        </Box>
      </Grid>
    </Grid>
  </Box>
  

    </Container>
  );
};

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
}));

export default HeroPage;
