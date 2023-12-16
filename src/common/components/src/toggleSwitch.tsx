import { Stack, Switch, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface IToggleSwitchProps {
  checked: boolean
  onChange: () => void
  label: string
}

export const ToggleSwitch: FunctionComponent<IToggleSwitchProps> = ({
  checked,
  label,
  onChange,
}) => {
  return (
    <Stack flexDirection="row" alignItems="center">
      <Switch checked={checked} onChange={onChange} />
      <Typography
        fontWeight="bold"
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
};
