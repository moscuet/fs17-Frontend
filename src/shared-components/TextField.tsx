import { TextField } from "@mui/material";

interface TextFieldComponentProps {
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fullWidth?: boolean;
    margin?: 'normal' | 'none' | 'dense';
  }
  
  const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
    label,
    name,
    value,
    onChange,
    fullWidth = true,
    margin = "normal"
  }) => {
    return (
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        fullWidth={fullWidth}
        margin={margin}
      />
    );
  };
  
  export default  TextFieldComponent;