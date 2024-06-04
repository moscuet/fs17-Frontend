import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProductReadDto } from "./productDto";
import { addToCart } from "../cart/cartSlice";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import theme from "../../theme/theme";
import { SaveButton } from "../../shared-components/CustomButton";

const ProductCard: React.FC<{ product: ProductReadDto }> = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const navigateToProductDetail = () => {
      navigate(`/products/${product.id}`);
    };
  
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
      <Grid item xs={12} sm={6} md={4} key={product.id}>
        <Card
          sx={{
            cursor: "pointer",
            "&:hover": {
              boxShadow: 6,
            },
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <CardMedia
            component="img"
            height="240"
            image={"/assets/productLineImages/"+ product.images[0].url+'.webp' }// Replace withactual path later
            alt={product.productLineName}
            onClick={navigateToProductDetail} 
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" component="h2">
              {product.productLineName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Size: {product.productSizeValue}, Color: {product.productColorValue}
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.info.main }}>
              ${product.price.toFixed(2)}
            </Typography>
            <SaveButton
              onClick={handleAddToCart} 
              text="Add to Cart"
            />
          </CardContent>
        </Card>
      </Grid>
    );
  };

  export default ProductCard;