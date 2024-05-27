// new code start
import React, { useEffect } from "react";
import { useLocation} from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { fetchAllCategories } from "../features/categories/categoriesSlice";
import ProductsPage from "../features/products/ProductsPage";


const Home: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [location.search, dispatch]);
  
  return <ProductsPage />;
};

export default Home;
