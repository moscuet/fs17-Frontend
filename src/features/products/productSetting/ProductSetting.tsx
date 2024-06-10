import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import AddProduct from "./AddProduct";
import EditableProducts from "./EditableProducts";

const ProductSetting: React.FC = () => {
  const [subTabIndex, setSubTabIndex] = useState(0);

  const handleSubTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSubTabIndex(newValue);
  };

  return (
    <Box>
      <Tabs value={subTabIndex} onChange={handleSubTabChange}>
        <Tab label="Add Product" />
        <Tab label="Edit Product" />
      </Tabs>
      <Box mt={2}>
        {subTabIndex === 0 && <AddProduct />}
        {subTabIndex === 1 && <EditableProducts />}
      </Box>
    </Box>
  );
};

export default ProductSetting;
