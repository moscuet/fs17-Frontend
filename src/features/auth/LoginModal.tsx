import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "./authSlice";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  open: boolean;
  handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const isAuthenticated = useAppSelector( state  => state.auth.user !== null);

  const handleLogin = () => {
    dispatch(login({ email, password }));
    handleClose();
  };


  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <Dialog open={open} onClose={handleClose}>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#333333" }}>
            Cancel
          </Button>
          <Button onClick={handleLogin} style={{ color: "#333333" }}>
            Login
          </Button>
        </DialogActions>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
