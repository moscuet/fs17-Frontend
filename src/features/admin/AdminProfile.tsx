import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import theme from "../../theme/theme";
import { ordersActions } from "../orders/orderSlice";
import UserAccountSetting from "../users/UserAccountSetting";
import CircularImageBox from "../../shared-components/CircularImageBox";
import AdminProfileTabs from "./AdminProfileTabs";
import ProductSetting from "../products/productSetting/ProductSetting";
import CategorySetting from "../categories/CategorySetting";
import ColorSetting from "../product-colors/ColorSetting";
import SizeSetting from "../product-sizes/SizeSetting";
import { isValidUrl } from "../../shared-features/utils";
import ProductLineSetting from "../product-lines/ProductLineSetting";

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const error = useAppSelector(
    (state) => state.auth.error || state.address.error
  );

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (user) {
      dispatch(ordersActions.fetchAll());
    }
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const avatarImage = user?.avatar
    ? isValidUrl(user.avatar)
      ? user.avatar
      : `/assets/${user.avatar}`
    : "/assets/default_avatar.webp";

  if (error) return <Typography>Error: {error}</Typography>;
  if (!user) return <Typography>User not found!</Typography>;

  return (
    <Container maxWidth="xl">
      <Box mt={4} display="flex">
        <Box sx={{ ml: "60px" }}></Box>
        <Box
          sx={{
            width: "240px",
            borderRight: `2px solid ${theme.palette.divider}`,
            mr: 4,
            position: "fixed",
            height: "calc(100vh - 0px)",
            overflow: "auto",
            top: "100px",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Box display={"flex"} justifyContent={"center"} mb={1} mt={1}>
            <CircularImageBox
              imageUrl={avatarImage}
              size={120}
            />
          </Box>
          <AdminProfileTabs
            tabIndex={tabIndex}
            handleTabChange={handleTabChange}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            ml: "280px",
            padding: "20px",
            maxWidth: "600px",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          {tabIndex === 0 && <UserAccountSetting />}
          {tabIndex === 1 && <ProductSetting />}
          {tabIndex === 2 && <ProductLineSetting />}
          {tabIndex === 3 && <CategorySetting />}
          {tabIndex === 4 && <ColorSetting />}
          {tabIndex === 5 && <SizeSetting />}
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
