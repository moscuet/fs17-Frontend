import React from 'react';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { ProductLineReadDto } from './productLineDto';

interface ProductsDisplayProps {
  filteredProducts: ProductLineReadDto[];
}

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({ filteredProducts }) => {
  return (
    <Grid container spacing={4}>
      {filteredProducts.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              height="240"
              // image={product.imageUrl}
               image="/assets/productLineImages/defaultProductwebp"
              alt={product.title}
            />
            <CardContent>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body2" color="textSecondary">{product.categoryName}</Typography>
              <Typography variant="body2" color="textSecondary">{product.description}</Typography>
              <Typography variant="h6" color="dark">${product.price.toFixed(2)}</Typography>
              <Button variant="contained" color="primary">Buy Now</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsDisplay;
