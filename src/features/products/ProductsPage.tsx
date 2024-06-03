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
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [ selectedSortOption, setSelectedSortOption] = useState<string | null>(null);


 
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
    console.log("search", search);
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
        sortBy: sortOption, 
        limit: 50,
        startingAfter: 0,
        sortOrder: sortOrder,
        priceRange:
          priceRangeParam && priceRangeParam.length === 2
            ? priceRangeParam.join(",")
            : undefined,
      })
    );
  }, [location.search, dispatch]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
    updateUrl(
      event.target.value,
      searchTerm,
      sortOption,
      sortOrder,
      priceRange
    );
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handlePriceChangeCommitted = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    updateUrl(selectedCategory, searchTerm, sortOption, sortOrder, priceRange);
  };

  const handleSortByPrice = (event: SelectChangeEvent<string>) => {
    setSelectedSortOption(event.target.value);
    let order 
    if (event.target.value === "Price increase") order = "ASC";
    if (event.target.value === "Price decrease") order = "DESC";
    setSortOption("Price");
    order && setSortOrder(order);
    
    updateUrl(selectedCategory, searchTerm, "price", order??"", priceRange);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSortOption(null);
    setSortOrder(null);
    updateUrl(categoryId, searchTerm, sortOption, sortOrder, priceRange);
  };

  const updateUrl = (
    category: string | null,
    search: string | null,
    sortOption: string | null,
    sortOrder: string | null,
    priceRange: number[]
  ) => {
    const params = new URLSearchParams();
    if (category) params.append("categoryId", category);
    if (search) params.append("search", search);
    if (priceRange) params.append("priceRange", priceRange.join(","));
    if (sortOption) params.append("sortOption", sortOption);
    if (sortOrder) params.append("sortOrder", sortOrder);
    console.log(params.toString());
    navigate({ pathname: "/products", search: params.toString() });
  };

  return (
    <Box>
      <TopCategory handleCategoryClick={handleCategoryClick} />
      <Box sx={{ display: "flex" }}>
        <FilterBar
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
          handlePriceChangeCommitted={handlePriceChangeCommitted}
          sortOption={sortOption}
          handleSortByPrice={handleSortByPrice}
          categories={categories}
          selectedSortOption={selectedSortOption}
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
