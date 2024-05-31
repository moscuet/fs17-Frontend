import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button, Grid, Paper, Box, Container } from "@mui/material";
import { productsActions } from "./productsSlice";
import { addToCart } from "../cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ImageSlider from "../product-lines/ImageSlider";
import theme from "../../theme/theme";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {
    selectedItem: product,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(productsActions.fetchById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!product) {
    return <Typography>Product not found!</Typography>;
  }

  const images = product.images.map((img) => img.url);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        productLineName: product.productLineName,
        productSizeValue: product.productSizeValue,
        productColorValue: product.productColorValue,
        price: product.price,
        quantity: 1,
      })
    );
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid
          item
          md={8}
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageSlider images={images} />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            {product.productLineName}
          </Typography>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.info.main,
                fontWeight: "bold",
              }}
            >
              Price: ${product.price}
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2, fontStyle: "italic" }}>
              See shipping costs from €4.90
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 1, fontStyle: "italic" }}>
              Up to one hour delivery
            </Typography>
            <Typography
              variant="h6"
              sx={{
                marginTop: 1,
                fontStyle: "italic",
                color: theme.palette.info.main,
                fontWeight: "bold",
              }}
            >
              Price from €4.99
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 3, padding: "10px 20px", fontSize: "16px" }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box mt={2}>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="h6">Review {index + 1}</Typography>
                  <Typography variant="body2">{review.comment}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1">No reviews available</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailsPage;
