// CustomButtons.tsx
import React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';

interface BaseButtonProps extends ButtonProps {
  text: string;
}

// BaseButton
const BaseButton: React.FC<BaseButtonProps> = ({ text, size = 'medium', color, variant, onClick }) => (
  <Button variant={variant} color={color} size={size} onClick={onClick}>
    {text}
  </Button>
);

// DeleteButton
const DeleteButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="error" variant="contained" />
);

// CancelButton
const CancelButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="secondary" variant="outlined" />
);

// SaveButton
const SaveButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="secondary" variant="contained" />
);

const PrimaryButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="secondary" variant="contained" />
);


export {  DeleteButton, CancelButton, SaveButton , PrimaryButton};
