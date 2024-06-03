import React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface BaseButtonProps extends ButtonProps {
  text: string;
  isSubmitting?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = ({ text, isSubmitting = false, size = 'medium', color, variant, onClick, ...props }) => (
  <Button
    variant={variant}
    color={color}
    size={size}
    onClick={onClick}
    disabled={isSubmitting}
    sx={{ margin: 1, position: 'relative', ...props.sx }}
  >
    {isSubmitting ? (
      <CircularProgress
        size={24}
        sx={{
          color: 'white', 
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-12px',
          marginLeft: '-12px'
        }}
      />
    ) : text}
  </Button>
);

const PrimaryButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="primary" variant="contained" />
);

const SaveButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="primary" variant="contained" />
);

const ConfirmButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="warning" variant="contained" />
);

const InfoButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="info" variant="outlined" />
);

const DeleteButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="error" variant="contained" />
);

const CancelButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} color="info" variant="outlined" />
);

const SubmitButton: React.FC<BaseButtonProps> = (props) => (
  <BaseButton {...props} variant="contained" />
);

export { DeleteButton, CancelButton, SaveButton, PrimaryButton, InfoButton, ConfirmButton, SubmitButton };
