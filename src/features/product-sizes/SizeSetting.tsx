import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import AddSize from "./AddSize";
import EditSize from "./EditSize";

const ColorSetting: React.FC = () => {
  const [subTabIndex, setSubTabIndex] = useState(0);

  const handleSubTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSubTabIndex(newValue);
  };

  return (
    <Box>
      <Tabs value={subTabIndex} onChange={handleSubTabChange}>
        <Tab label="Add Color" />
        <Tab label="Edit Color" />
      </Tabs>
      <Box mt={2}>
        {subTabIndex === 0 && <AddSize/>}
        {subTabIndex === 1 && <EditSize />}
      </Box>
    </Box>
  );
};

export default ColorSetting;
