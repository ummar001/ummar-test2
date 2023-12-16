import { Box, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import React, {
  BaseSyntheticEvent,
  FunctionComponent,
  useCallback,
} from "react";

interface IFormFieldProps {
  label?: string
  placeholder?: string
  onChange?: (e: BaseSyntheticEvent) => void
  id?: string
  value: string | number | undefined
  type?: React.InputHTMLAttributes<unknown>["type"]
  required?: boolean
  maxLength?: number
  rows?: number
  inputAdornment?: string | React.ReactNode
  inputAdornmentPosition?: "start" | "end"
  disabled?: boolean
  bgColor?: string
}

export const FormField: FunctionComponent<IFormFieldProps> = ({
  id,
  label,
  placeholder,
  onChange,
  value,
  type = "text",
  required = false,
  maxLength = -1,
  rows,
  inputAdornment,
  disabled,
  bgColor,
  inputAdornmentPosition = "end",
}) => {
  const handleRenderLabel = useCallback(() => {
    if (!label) return;

    return (
      <Typography variant="body1" ml={0.5}>
        {label}
        {required && <span>*</span>}
      </Typography>
    );
  }, [label, required]);

  return (
    <Box sx={{ width: "100%" }}>
      {handleRenderLabel()}
      <TextField
        required={required}
        sx={{
          borderRadius: 5,
          marginTop: 1.5,
          backgroundColor: bgColor ? "white" : "",
        }}
        disabled={disabled}
        fullWidth
        id={id}
        label={placeholder}
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        inputProps={{ maxLength }}
        multiline={rows !== undefined}
        rows={rows}
        InputProps={
          inputAdornmentPosition === "end"
            ? {
              endAdornment: (
                <InputAdornment position="end">
                  {inputAdornment}
                </InputAdornment>
              ),
            }
            : {
              startAdornment: (
                <InputAdornment position="start">
                  {inputAdornment}
                </InputAdornment>
              ),
            }
        }
      />
    </Box>
  );
};
