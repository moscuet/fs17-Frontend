import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Slider,
  Typography,
  useTheme 
} from "@mui/material";
import { PrimaryButton } from "./CustomButton";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
}

interface FilterBarProps {
  selectedCategory: string | null;
  handleCategoryChange: (event: SelectChangeEvent<string>) => void;
  priceRange: number[];
  handlePriceChange: (event: Event, newValue: number | number[]) => void;
  handlePriceChangeCommitted: (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => void;
  sortOption: string | null;
  selectedSortOption: string | null;
  categories: Category[];
  handleSortByPrice: (event: SelectChangeEvent<string>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  handleCategoryChange,
  priceRange,
  handlePriceChange,
  handlePriceChangeCommitted,
  sortOption,
  handleSortByPrice,
 categories,
 selectedSortOption
}) => {
  const theme = useTheme(); 
  const navigate = useNavigate();

  return (
    <Box
  sx={{
    width: "200px",
    backgroundColor: theme.palette.background.paper,
    padding: 2,
    marginRight: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    position: "sticky",
    top: 0,
    left: 0,
    color: theme.palette.text.primary,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
    borderRadius: "4px" 
  }}
>
      <Box
        sx={{ width: "100%", position: "relative", padding: 0 }}
      >
        <Slider
    value={priceRange}
    onChange={handlePriceChange}
    onChangeCommitted={handlePriceChangeCommitted}
    valueLabelDisplay="auto"
    min={0}
    max={100}
    sx={{
      '& .MuiSlider-thumb': {
        backgroundColor: theme.palette.secondary.main, 
        '&:hover': {
          boxShadow: '0px 0px 0px 8px rgba(96, 125, 139, 0.16)' 
        }
      },
      '& .MuiSlider-track': {
        backgroundColor: theme.palette.primary.dark, 
      },
      '& .MuiSlider-rail': {
        backgroundColor: theme.palette.text.secondary
      },
      '& .MuiSlider-valueLabel': {
        backgroundColor: theme.palette.secondary.dark, 
        color: theme.palette.background.paper 
      }
    }}
  />
  <Typography
    gutterBottom
    component="div"
    sx={{
      position: "absolute",
      bottom: 0,
      width: "100%",
      textAlign: "center",
      marginBottom: -1,
      color: theme.palette.text.secondary
    }}
  >
          Price Range
        </Typography>
      </Box>
      <FormControl
        fullWidth
        sx={{
          width: "180px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: 1,
          '.MuiSelect-select': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }
        }}
      >
        <InputLabel id="category-select-label" sx={{ color: theme.palette.text.primary }}>Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory || ""}
          onChange={handleCategoryChange}
          size="small"
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
      <FormControl
        fullWidth
        sx={{
          width: "180px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: 1,
          '.MuiSelect-select': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }
        }}
      >
        <InputLabel id="sort-select-label" sx={{ color: theme.palette.text.primary }}>Sort By</InputLabel>
        <Select
          labelId="sort-select-label"
          value={selectedSortOption || ""}
          onChange={handleSortByPrice}
          size="small"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Price increase">Price increase</MenuItem>
          <MenuItem value="Price decrease">Price decrease</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <PrimaryButton text={" Clear filter"} onClick={()=>navigate("/products")} />
      </Box>
    </Box>
  );
};

export default FilterBar;
