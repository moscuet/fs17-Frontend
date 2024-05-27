import React, { useState, useEffect } from "react";
import { Container, Box, Chip, SelectChangeEvent } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { CategoryReadDto } from "../categories/categoryDto";
import FilterBar from "../../shared-components/FilterBar";
import { useNavigate, useLocation } from 'react-router-dom';
import ProductsDisplay from "./ProductDisplay";
import { ProductReadDto } from "./productDto";
import { productsActions } from "./productsSlice";

const ProductsPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
    const [sortOption, setSortOption] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    console.log("priceRange", priceRange);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const products: ProductReadDto[] = useAppSelector(state => state.products.items);
    const categories: CategoryReadDto[] = useAppSelector(state => state.categories.items);

    console.log("products", products);
    const topCategories = categories.slice(0, 10);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const categoryId = query.get("categoryId");
        const search = query.get("search");
        const priceRangeParam = query.get("priceRange")?.split(',').map(Number) as number[];
        const sortOption = query.get("sortOption");

        if (categoryId) setSelectedCategory(categoryId);
        if (search) setSearchTerm(search);
        if (priceRangeParam && priceRangeParam.length === 2) setPriceRange(priceRangeParam);
        if (sortOption) setSortOption(sortOption);

        dispatch(productsActions.fetchAllWithParams({
            categoryId: categoryId,
            searchKey: search,
            sortBy: sortOption,
            limit: 50,
            startingAfter: 0,
            priceRange: priceRangeParam && priceRangeParam.length === 2 ? priceRangeParam.join(',') : undefined
          }));
    }, [location.search, dispatch]);

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setSelectedCategory(event.target.value);
        updateUrl(event.target.value, searchTerm, priceRange, sortOption);
    };

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    };

    const handlePriceChangeCommitted = (event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[]) => {
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

    const updateUrl = (category: string | null, search: string | null, priceRange: number[], sortOption: string | null) => {
        const params = new URLSearchParams();
        if (category) params.append("categoryId", category);
        if (search) params.append("search", search);
        if (priceRange) params.append("priceRange", priceRange.join(','));
        if (sortOption) params.append("sortOption", sortOption);
        navigate({ pathname: '/products', search: params.toString() });
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, paddingX: 2, marginBottom: 2 }}>
                {topCategories.map((category) => (
                    <Chip 
                        key={category.id}
                        label={category.name}
                        clickable
                        onClick={() => handleCategoryClick(category.id)}
                        color="primary"
                        sx={{ margin: '5px' }}
                    />
                ))}
            </Box>
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
            <ProductsDisplay filteredProducts={products} /> 
        </Container>
    );
};

export default ProductsPage;
