import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { productsActions } from './productsSlice';
import { useParams } from 'react-router-dom';
import EditProduct from './productSetting/EditProduct';

const ProductPageLayout = () => {
const dispatch = useAppDispatch()
const { id } = useParams<{ id?: string }>();

useEffect ( ()=>{
   id && dispatch(productsActions.fetchById(id))
  },[id, dispatch])

  const selectedProduct = useAppSelector( state => state.products.selectedItem)

  return (
    <Box display={"flex"} justifyContent={"center"} maxWidth={"xl"}>
      <Box
        sx={{
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
          border: '1px solid #ccc' ,
          marginTop:"20px",
          padding:"20px",
          borderRadius:"8px"

        }}
      >
        {selectedProduct?.id && <EditProduct product={selectedProduct} />}
      </Box>
    </Box>
  );
};

export default ProductPageLayout;
