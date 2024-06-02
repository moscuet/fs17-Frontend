import { TextField, TextFieldProps } from "@mui/material";

interface TextFieldComponentProps extends Omit<TextFieldProps, 'value' | 'onChange' | 'name'> {
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
    label,
    name,
    value,
    onChange,
    fullWidth = true,
    margin = "normal",
    error = false,
    helperText = "",
    ...otherProps
}) => {
    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth={fullWidth}
            margin={margin}
            error={error}
            helperText={helperText}
            {...otherProps} 
        />
    );
};

export default TextFieldComponent;
