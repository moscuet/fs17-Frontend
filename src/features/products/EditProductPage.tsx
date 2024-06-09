import { Box } from '@mui/material';
import AddEditProduct from './productSetting/AddProduct';

const ProductPageLayout = () => {
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
        <AddEditProduct />
      </Box>
    </Box>
  );
};

export default ProductPageLayout;
