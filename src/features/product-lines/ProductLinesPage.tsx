// src/ProductsPage.tsx
import React, { ReactNode, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Box,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { CategoryReadDto } from "../categories/categoryDto";
import { ProductLineReadDto } from "./productLineDto";
import { Theme } from "@mui/material/styles";


import { makeStyles } from '@mui/styles';



const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: 250,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 250,
      zIndex: theme.zIndex.appBar - 1,
    },
  }));

  const ContentContainer = styled('div')(({ theme }) => ({
    flexGrow: 1,
    paddingLeft: 250, 
  }));

  
const ProductLinesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const products: ProductLineReadDto[] = useAppSelector(
    (state) => state.productLines.items
  );
  const categories: CategoryReadDto[] = useAppSelector(
    (state) => state.categories.items
  );

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  


  const handleCategoryChange = (
    event: SelectChangeEvent<string | null>,
    child: ReactNode
  ) => {
    setSelectedCategory(event.target.value as string);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleSortChange = (
    event: SelectChangeEvent<string | null>,
    child: ReactNode
  ) => {
    setSortOption(event.target.value as string);
  };

  const filteredProducts = products
    .filter((product) =>
      selectedCategory ? product.categoryId === selectedCategory : true
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortOption === "date") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortOption === "price") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div>
      <Container>
      <Button onClick={toggleDrawer(true)}>Open Filters</Button>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Drawer variant="permanent" anchor="left" style={{ zIndex: 1250 }}>
              <Box sx={{ width: 250, padding: 2 }}>
                <Typography variant="h6">Filters</Typography>
                <List>
                  <ListItem>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </ListItem>
                  <ListItem>
                    <Typography gutterBottom>Price Range</Typography>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                    />
                  </ListItem>
                  <ListItem>
                    <FormControl fullWidth>
                      <InputLabel>Sort By</InputLabel>
                      <Select value={sortOption} onChange={handleSortChange}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Grid container spacing={4}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="240"
                      image={product.images[0].url}
                      alt={product.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{product.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product.categoryName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product.description}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${product.price}
                      </Typography>
                      <Button variant="contained" color="primary">
                        Buy Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductLinesPage;
