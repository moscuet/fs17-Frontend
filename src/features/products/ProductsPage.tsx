import React, { useState, useEffect } from "react";
import { Box, SelectChangeEvent, Grid } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { CategoryReadDto } from "../categories/categoryDto";
import FilterBar from "../../shared-components/FilterBar";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductReadDto } from "./productDto";
import { productsActions } from "./productsSlice";
import TopCategory from "../categories/TopCategory";
import ProductCard from "./ProductCard";

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const products: ProductReadDto[] = useAppSelector(
    (state) => state.products.items
  );
  const categories: CategoryReadDto[] = useAppSelector(
    (state) => state.categories.items
  );


  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const categoryId = query.get("categoryId");
    const search = query.get("search");
    const priceRangeParam = query
      .get("priceRange")
      ?.split(",")
      .map(Number) as number[];
    const sortOption = query.get("sortOption");

    if (categoryId) setSelectedCategory(categoryId);
    if (search) setSearchTerm(search);
    if (priceRangeParam && priceRangeParam.length === 2)
      setPriceRange(priceRangeParam);
    if (sortOption) setSortOption(sortOption);

    dispatch(
      productsActions.fetchAllWithParams({
        categoryId: categoryId,
        searchKey: search,
        // sortBy: sortOption, // Check later
        sortBy: "Price",
        limit: 50,
        startingAfter: 0,
        sortOrder: "DESC",
        priceRange:
          priceRangeParam && priceRangeParam.length === 2
            ? priceRangeParam.join(",")
            : undefined,
      })
    );
  }, [location.search, dispatch]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
    updateUrl(event.target.value, searchTerm, priceRange, sortOption);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handlePriceChangeCommitted = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    updateUrl(selectedCategory, searchTerm, newValue as number[], sortOption);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
    updateUrl(selectedCategory, searchTerm, priceRange, event.target.value);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setPriceRange([0, 100]);
    setSortOption(null);
    updateUrl(categoryName, searchTerm, [0, 100], null);
  };

  const updateUrl = (
    category: string | null,
    search: string | null,
    priceRange: number[],
    sortOption: string | null
  ) => {
    const params = new URLSearchParams();
    if (category) params.append("categoryId", category);
    if (search) params.append("search", search);
    if (priceRange) params.append("priceRange", priceRange.join(","));
    if (sortOption) params.append("sortOption", sortOption);
    navigate({ pathname: "/products", search: params.toString() });
  };

  return (
    <Box >
      <TopCategory handleCategoryClick={handleCategoryClick} />
      <Box sx={{ display: "flex" }}>
        <FilterBar
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
          handlePriceChangeCommitted={handlePriceChangeCommitted}
          sortOption={sortOption}
          handleSortChange={handleSortChange}
          categories={categories}
        />

        <Grid container spacing={4} justifyContent={"center"}>
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductsPage;
