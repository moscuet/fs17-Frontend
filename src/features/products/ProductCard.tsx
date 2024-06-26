import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProductReadDto } from "./productDto";
import { addToCart } from "../cart/cartSlice";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import theme from "../../theme/theme";
import { SaveButton } from "../../shared-components/CustomButton";
import { getModifiedImagesUrl } from "../../shared-features/utils";
import { useAppSelector } from "../../app/hooks";

const ProductCard: React.FC<{ product: ProductReadDto }> = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
   const isAdmin = useAppSelector (state => state.auth.user?.userRole ==="Admin")

    const navigateToProductDetail = () => {
      navigate(`/products/${product.id}`);
    };
  
    const handleAddToCart = () => {
      if (isAdmin){
        navigate( "/products/edit/" + product.id  );
        return
      }
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
  
  const imageUrl = getModifiedImagesUrl(product.images[0]?.url || 'image_url1.webp');
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
            image={imageUrl}
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
            <Typography variant="h6" sx={{ color: theme.palette.warning.main }}>
              ${product.price.toFixed(2)}
            </Typography>
            <SaveButton
              onClick={handleAddToCart} 
              text={isAdmin? "Edit product" : "Add to Cart"}
            />
          </CardContent>
        </Card>
      </Grid>
    );
  };

  export default ProductCard;