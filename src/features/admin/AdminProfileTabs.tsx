import React from "react";
import theme from "../../theme/theme";
import { Box, Tab, Tabs } from "@mui/material";

interface TabProps {
  tabIndex: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}
export default function AdminProfileTabs({ tabIndex, handleTabChange }: TabProps) {
  return (
    <Box>
      <Tabs
        orientation="vertical"
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="Profile categories"
        textColor="primary"
        indicatorColor="secondary"
        sx={{
          ".MuiTabs-indicator": {
            width: "4px",
          },
          ".MuiTab-root": {
            alignItems: "flex-start",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: theme.palette.secondary.light,
              fontWeight: "bold",
            },
            "&.Mui-selected": {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
            },
          },
        }}
      >
        <Tab label="Account" />
        <Tab label="Product" />
        <Tab label="Category" />
        <Tab label="Size" />
        <Tab label="Color" />
      </Tabs>
    </Box>
  );
}
