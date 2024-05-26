// new code start
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Chip } from "@mui/material";
import ProductLinesPage from "../features/product-lines/ProductLinesPage";
import { CategoryReadDto } from "../features/categories/categoryDto";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAllCategories } from "../features/categories/categoriesSlice";


const Home: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [location.search, dispatch]);
  
  return <ProductLinesPage />;
};

export default Home;
