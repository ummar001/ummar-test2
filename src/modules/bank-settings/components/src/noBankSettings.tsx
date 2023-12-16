import { NoDataBackground } from "@/common/components";
import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

export const NoBankSettings: FunctionComponent = () => {
  return (
    <NoDataBackground>
      <Typography variant="body1" fontWeight={600} color="#7E7E7E">
        You currently don&apos;t have a bank setup
      </Typography>
    </NoDataBackground>
  );
};
