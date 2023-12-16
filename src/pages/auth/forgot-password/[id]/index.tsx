import Logo from "@/common/assets/logo.png";
import { Spinner } from "@/common/components";
import { useCustomForm } from "@/common/hooks";
import { BaseHead } from "@/common/layout";
import {
  useConfirmEmailResetPasswordToken,
  useResetPassword,
} from "@/modules/auth/api";
import { useValidateAuthCredentials } from "@/modules/auth/utils";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface IResetPasswordProps {
  password: string
  confirmPassword: string
}
const ResetPassword: FunctionComponent = () => {
  const { t } = useTranslation("auth");
  const token = useRouter().query.id as string;
  const enabled = token !== undefined;
  const { data } = useConfirmEmailResetPasswordToken({ enabled }, token);
  const { mutate } = useResetPassword();
  const { confirmPasswords } = useValidateAuthCredentials();

  const { formValues, handleChange } = useCustomForm<IResetPasswordProps>({
    password: "",
    confirmPassword: "",
  });

  const handleResetPassword = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!confirmPasswords(formValues.password, formValues.confirmPassword))
        return;

      mutate({
        password: formValues.password,
        token,
      });
    },
    [
      confirmPasswords,
      formValues.confirmPassword,
      formValues.password,
      mutate,
      token,
    ]
  );

  if (!data) {
    return <Spinner />;
  }

  return (
    <BaseHead pageName="Reset Password">
      <Stack
        maxWidth={400}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          margin: "0 auto",
          padding: "3rem 1rem",
          minHeight: "55vh",
          height: "100%",
        }}
      >
        <Image src={Logo} alt="Waycup-Logo" width={200} />
        <Grid container spacing={4} sx={{ textAlign: "center" }}>
          <Grid
            item
            xs={12}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            onSubmit={handleResetPassword}
          >
            <Typography variant="h5" fontWeight="bold">
              {t("forgotYourPassword")}
            </Typography>
            <TextField
              required
              fullWidth
              id="password"
              label={t("createNewPassword")}
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              id="confirmPassword"
              label={t("confirmNewPassword")}
              name="confirmPassword"
              type="password"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit" fullWidth>
              {t("resetPassword")}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </BaseHead>
  );
};

export default ResetPassword;
