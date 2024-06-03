import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  styled,
  alpha,
  Box,
} from "@mui/material";
import {
  Search as SearchIcon,
  AccountCircle,
  MoreVert as MoreIcon,
  ShoppingCart,
  ExitToApp as ExitToAppIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../auth/authSlice";
import LoginModal from "../auth/LoginModal";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "auto",
  },
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = Boolean(user);
  const cartItems = useAppSelector((state) => state.cart.items);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth >= 960) {
      navigate("/profile");
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      dispatch(logout());
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLoginModalOpen = () => {
    setModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setModalOpen(false);
  };

  const handleCartClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate("/cart");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => navigate("/signup")}>
        <IconButton color="inherit">
          <LoginIcon />
        </IconButton>
        <p>Signup</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show cart" color="inherit">
          <ShoppingCart />
          <span
            style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              background: "red",
              borderRadius: "50%",
              padding: "2px 6px",
              color: "white",
              fontSize: "12px",
              lineHeight: "1",
            }}
          >
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      {isLoggedIn && (
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            navigate("/profile");
          }}
        >
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      )}
      <MenuItem onClick={handleLoginLogout}>
        <IconButton color="inherit">
          {isLoggedIn ? <ExitToAppIcon /> : <LoginIcon />}
        </IconButton>
        <p>{isLoggedIn ? "Logout" : "Login"}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" sx={{ height: "80px" }}>
        <Toolbar>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Typography variant="h6" noWrap>
              Eshop
            </Typography>
          </Link>

          {!isLoggedIn && (
            <Typography
              component={Link}
              to="/signup"
              sx={{
                marginLeft:"1rem",
                textTransform: "none",
                color: "inherit",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              SIGNUP
            </Typography>
          )}

          <Typography
            component={Link}
            to="/contact"
            sx={{
              marginLeft:"1rem",
              textTransform: "none",
              color: "inherit",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            CONTACT
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <IconButton
              aria-label="show cart"
              color="inherit"
              style={{ position: "relative", fontSize: "1.5rem" }}
              onClick={handleCartClick}
            >
              <ShoppingCart />
              <span
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  background: "red",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  color: "white",
                  fontSize: "12px",
                  lineHeight: "1",
                }}
              >
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </IconButton>
            {isLoggedIn ? (
              <>
                <IconButton
                  edge="end"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{ fontSize: "1.5rem" }}
                >
                  <AccountCircle />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={handleLogout}
                  color="inherit"
                  sx={{ fontSize: "1.5rem" }}
                >
                  <ExitToAppIcon />
                </IconButton>
              </>
            ) : (
              <IconButton
                onClick={handleLoginModalOpen}
                color="inherit"
                sx={{ fontSize: "1.5rem" }}
              >
                <LoginIcon />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              sx={{ fontSize: "1.5rem" }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <LoginModal
        open={modalOpen}
        handleClose={handleLoginModalClose}
        title={"Login"}
      />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
