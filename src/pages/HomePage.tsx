import React, { useEffect } from "react";
import { useLocation} from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { fetchAllCategories } from "../features/categories/categoriesSlice";
import HeroPage from "../shared-components/LandingBanner";
import FeatureProducts from "../features/products/FeatureProducts";
import { productsActions } from "../features/products/productsSlice";


const HomePage: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(productsActions.fetchAllWithParams({}));
  }, [location.search, dispatch]);

  return <>
     <HeroPage />
     <FeatureProducts/>
  </>
};

export default HomePage;
