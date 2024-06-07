import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import AddColor from "./AddColor";
import EditColor from "./EditColor";

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
        {subTabIndex === 0 && <AddColor/>}
        {subTabIndex === 1 && <EditColor />}
      </Box>
    </Box>
  );
};

export default ColorSetting;
