import React from "react";
import {
  Grid,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import { ProductReadDto } from "./productDto";
import { shuffleArray } from "./helpers";
import ProductCard from "./ProductCard";
import { InfoButton } from "../../shared-components/CustomButton";

const ProductsDisplay: React.FC<{ products: ProductReadDto[] }> = ({
  products,
}) => {
  return (
    <Grid container spacing={4} justifyContent="center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

const FeatureProducts: React.FC = () => {
  const products: ProductReadDto[] = useAppSelector(
    (state) => state.products.items
  );
  const navigate = useNavigate();

  const randomProducts = shuffleArray([...products]).slice(0, 6);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom textAlign={"center"}>
            Featured Products
          </Typography>
          <ProductsDisplay products={randomProducts} />
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <InfoButton
              onClick={() => navigate("/products")}
              text="Discover More"
            />
              
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FeatureProducts;
