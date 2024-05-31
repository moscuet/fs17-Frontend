import { Box } from "@mui/system";
import TextFieldComponent from "./TextField";
import { Button, Typography } from "@mui/material";

interface Field {
    name: string;
    label: string;
  }
  
  interface EditableViewProps {
    data: { [key: string]: any };
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSave: () => void;
    editMode: boolean;
    fields: Field[];
    toggleEdit: () => void;
  }
  
  const EditableView: React.FC<EditableViewProps> = ({
    data,
    onChange,
    onSave,
    editMode,
    fields,
    toggleEdit
  }) => {
  
    return editMode ? (
      <Box>
        {fields.map(field => (
          <TextFieldComponent
            key={field.name}
            label={field.label}
            name={field.name}
            value={data[field.name]}
            onChange={onChange}
          />
        ))}
        <Button variant="contained" color="primary" onClick={onSave} sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    ) : (
      <Box>
        {fields.map(field => (
          <Typography key={field?.name} variant="subtitle1">
            {data[field?.name]}
          </Typography>
        ))}
        <Button variant="contained" color="primary" onClick={toggleEdit} sx={{ mt: 2 }}>
          Edit
        </Button>
      </Box>
    );
  };
  
  export default EditableView;