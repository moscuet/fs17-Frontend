import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface Category {
    id: string;
    name: string;
}

interface FilterBarProps {
    selectedCategory: string | null;
    handleCategoryChange: (event: SelectChangeEvent<string>) => void;
    priceRange: number[];
    handlePriceChange: (event: Event, newValue: number | number[]) => void;
    handlePriceChangeCommitted: (event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[]) => void;
    sortOption: string | null;
    handleSortChange: (event: SelectChangeEvent<string>) => void;
    categories: Category[];
}

const FilterBar: React.FC<FilterBarProps> = ({
    selectedCategory,
    handleCategoryChange,
    priceRange,
    handlePriceChange,
    handlePriceChangeCommitted,
    sortOption,
    handleSortChange,
    categories
}) => {
    return (
        <Box sx={{
            width: '100%',
            backgroundColor: 'white',
            padding: 2,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 2,
        }}>
            <FormControl fullWidth sx={{ minWidth: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 1 }}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    value={selectedCategory || ''}
                    onChange={handleCategoryChange}
                    size="small"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/* <Box sx={{ minWidth: 200, maxWidth: 300, position: 'relative', padding: 0 }}>
                <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    onChangeCommitted={handlePriceChangeCommitted}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                />
                <Typography gutterBottom component="div" sx={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center',marginBottom: -1 }}>
                    Price Range
                </Typography>
            </Box> */}
            <FormControl fullWidth sx={{ minWidth: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 1 }}>
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select
                    labelId="sort-select-label"
                    value={sortOption || ''}
                    onChange={handleSortChange}
                    size="small"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default FilterBar;
