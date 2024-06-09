import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import AddEditProductLine from "./EditableProductLineView";
import AddProductLine from "./AddProductLine";


const ProductLineSetting: React.FC = () => {
  const [subTabIndex, setSubTabIndex] = useState(0);

  const handleSubTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSubTabIndex(newValue);
  };

  return (
    <Box>
      <Tabs value={subTabIndex} onChange={handleSubTabChange}>
        <Tab label="Add Product Line" />
        <Tab label="Edit Product Line" />
      </Tabs>
      <Box mt={2}>
        {subTabIndex === 0 && <AddProductLine/>}
        {subTabIndex === 1 && <AddEditProductLine />}
      </Box>
    </Box>
  );
};

export default ProductLineSetting;
