import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { fetchAllCategories } from "../features/categories/categoriesSlice";
import HeroPage from "../shared-components/LandingBanner";
import FeatureProducts from "../features/products/FeatureProducts";
import { productsActions } from "../features/products/productsSlice";
import { Box } from "@mui/system";
import { InfoButton } from "../shared-components/CustomButton";

const HomePage: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(productsActions.fetchAllWithParams({}));
  }, [location.search, dispatch]);

  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ textAlign: "center", mt: 2}}>
        <InfoButton
          onClick={() => navigate("/products")}
          text="Discover Products"
        />
      </Box>
      <HeroPage />
      <FeatureProducts />
    </>
  );
};

export default HomePage;
