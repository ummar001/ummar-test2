import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FunctionComponent } from "react";

interface ICheckboxWithLabelProps {
  label: string
  checked: boolean
  id: string
  handleChange: (id: string, value: boolean) => void
}

export const CheckboxWithLabel: FunctionComponent<ICheckboxWithLabelProps> = ({
  checked,
  label,
  id,
  handleChange,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => handleChange(id, e.target.checked)}
          color="primary"
        />
      }
      label={label}
    />
  );
};
