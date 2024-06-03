import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../../shared-components/CustomButton';

interface ModalProps {
    open: boolean,
    onClose: () => void
}

const ConfirmationModal = ({ open, onClose }: ModalProps) => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        onClose();
        navigate('/'); 
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <DialogTitle id="confirmation-dialog-title">{"Thank You for Contacting Us!"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">
                    We have received your message and will get back to you as soon as possible.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <PrimaryButton onClick={handleGoHome} color="primary" autoFocus text={' Go to Home'}/>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
