import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import AddCategory from "./AddCategory";
import Editcategory from "./EditCategory";

const CategorySetting: React.FC = () => {
  const [subTabIndex, setSubTabIndex] = useState(0);

  const handleSubTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSubTabIndex(newValue);
  };

  return (
    <Box>
      <Tabs value={subTabIndex} onChange={handleSubTabChange}>
        <Tab label="Add Category" />
        <Tab label="Edit Category" />
      </Tabs>
      <Box mt={2}>
        {subTabIndex === 0 && <AddCategory/>}
        {subTabIndex === 1 && <Editcategory />}
      </Box>
    </Box>
  );
};

export default CategorySetting;
