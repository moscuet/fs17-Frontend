import React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';

interface BaseButtonProps extends ButtonProps {
  text: string;
}

// BaseButton
const BaseButton: React.FC<BaseButtonProps> = ({ text, size = 'medium', color, variant, onClick }) => (
  <Button variant={variant} color={color} size={size} onClick={onClick} sx={{ margin: 1 }}>
    {text}
  </Button>
);
const PrimaryButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="primary" variant="contained" />
)

// SaveButton
const SaveButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="primary" variant="contained" />
);

const ConfirmButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="warning" variant="contained" />
);

// InfoButton
const InfoButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="info" variant="outlined" />
);


// DeleteButton
const DeleteButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="error" variant="contained" />
);

// CancelButton
const CancelButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="info" variant="outlined" />
);

export { DeleteButton, CancelButton, SaveButton, PrimaryButton, InfoButton , ConfirmButton};
