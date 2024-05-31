import React, { useEffect } from "react";
import { useLocation} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAllCategories } from "../features/categories/categoriesSlice";
import ProductsPage from "./ProductsPage";
import HeroPage from "../shared-components/LandingBanner";
import FeatureProducts from "../features/products/FeatureProducts";
import { ProductReadDto } from "../features/products/productDto";
import { productsActions } from "../features/products/productsSlice";


const HomePage: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(productsActions.fetchAllWithParams({}));
  }, [location.search, dispatch]);

  const products: ProductReadDto[] = useAppSelector(
    (state) => state.products.items
  );
  return <>
     <HeroPage />
     <FeatureProducts/>
  </>
};

export default HomePage;
