import React from 'react';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cart/cartSlice';
import { ProductReadDto } from './productDto';

interface ProductsDisplayProps {
  filteredProducts: ProductReadDto[];
}

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({ filteredProducts }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (product: ProductReadDto) => {
    dispatch(addToCart({
      id: product.id,
      productLineName: product.productLineName,
      productSizeValue: product.productSizeValue,
      productColorValue: product.productColorValue,
      price: product.price,
      quantity: 1,
    }));
  };

  return (
    <Grid container spacing={4}>
      {filteredProducts.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              onClick={() => handleCardClick(product.id)}
              style={{ cursor: 'pointer' }}
              component="img"
              height="240"
              // image={product.images[0]?.url || '/assets/productLineImages/defaultProduct.webp'}
              image={'/assets/productLineImages/defaultProduct.webp'}

              alt={product.productLineName}
            />
            <CardContent>
              <Typography variant="h6">{product.productLineName}</Typography>
              <Typography variant="body2" color="textSecondary">{product.productSizeValue}</Typography>
              <Typography variant="body2" color="textSecondary">{product.productColorValue}</Typography>
              <Typography variant="h6" color="dark">Price: {product.price}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsDisplay;
