import { Snackbar, Alert } from "@mui/material";
import React, { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useState } from "react";
import { useCustomForm } from "@/common/hooks";
import { AlertColor } from "@mui/material/Alert/Alert";

interface IUseSnackProps {
    title: string;
    severityType: AlertColor;
}

type SnackBarContextActions = {
    setSnackBar: ({ title, severityType }: IUseSnackProps) => void;
};

const SnackBarContext = createContext({} as SnackBarContextActions);

export const SnackBarProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const { formValues, setFormValues } = useCustomForm<IUseSnackProps>({
    title: "",
    severityType: "success",
  });

  const setSnackBar = useCallback(
    ({
      title,
      severityType,
    }: IUseSnackProps): void => {
      setOpen(true);
      setFormValues({ ...formValues, severityType, title });
    },
    [formValues, setFormValues]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <SnackBarContext.Provider value={{ setSnackBar }}>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={formValues.severityType}
          sx={{
            alignItems:"center"
          }}
        >
          {formValues.title}
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnack = (): (({
  title,
  severityType,
}: IUseSnackProps) => void) => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error("useSnack must be used within an SnackBarProvider");
  }

  return context.setSnackBar;
};

