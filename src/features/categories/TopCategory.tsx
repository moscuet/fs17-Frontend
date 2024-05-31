import React from 'react'
import { CategoryReadDto } from './categoryDto';
import { useAppSelector } from '../../app/hooks';
import { Box } from '@mui/system';
import { Chip } from '@mui/material';

type TopCategoryProps  = {
  handleCategoryClick: (categoryName: string) => void
}

export default function TopCategory({handleCategoryClick}: TopCategoryProps) {

  const categories: CategoryReadDto[] = useAppSelector(
    (state) => state.categories.items
  );

  const topCategories = categories.slice(0, 10);

  return (
   <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 1,
          paddingX: 2,
          marginBottom: 2,
        }}
      >
        {topCategories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            clickable
            onClick={() => handleCategoryClick(category.id)}
            color="primary"
            sx={{ margin: "5px" }}
          />
        ))}
      </Box>
  )
}
