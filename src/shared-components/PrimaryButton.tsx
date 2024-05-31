import { Button } from "@mui/material";

interface ButtonProps {
    onClick: () => void;  
    text: string;
  }
  
  export function PrimaryButton({ onClick, text }: ButtonProps): JSX.Element {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={onClick} 
        size="small"
      >
        {text}
      </Button>
    );
  }
  