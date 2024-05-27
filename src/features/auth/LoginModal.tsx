import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { login } from './authSlice';

interface LoginModalProps {
    open: boolean;
    handleClose: () => void;
  }

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose }) => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        dispatch(login({ email, password }));
        handleClose(); 
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Login</DialogTitle>
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
                <Button onClick={handleClose} style={{ color: '#333333' }}>Cancel</Button>
                <Button onClick={handleLogin} style={{ color: '#333333' }}>Login</Button>
            </DialogActions>
            </DialogActions>
        </Dialog>
    );
};

export default LoginModal;
