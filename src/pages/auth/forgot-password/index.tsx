import Logo from "@/common/assets/logo.png";
import { useCustomForm, useSnack } from "@/common/hooks";
import { BaseHead } from "@/common/layout";
import { useSendResetPasswordEmail } from "@/modules/auth/api";
import { ValidateEmail } from "@/modules/auth/utils";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import { FormEvent, FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface IForgotPasswordProps {
  email: string
}

const ForgotPassword: FunctionComponent = () => {
  const { t } = useTranslation("auth");
  const { formValues, handleChange } = useCustomForm<IForgotPasswordProps>({
    email: "",
  });
  const { mutate } = useSendResetPasswordEmail();
  const snack = useSnack();
  const { email } = formValues;

  const handleSendResetPasswordEmail = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (ValidateEmail(email)) {
        mutate(email);
      } else {
        snack({
          title: "Please enter a valid email address",
          severityType: "error",
        });
      }
    },
    [email, mutate, snack]
  );

  return (
    <BaseHead pageName="Forgot Password">
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
            onSubmit={handleSendResetPasswordEmail}
          >
            <Typography variant="h5" fontWeight="bold">
              {t("forgotYourPassword")}
            </Typography>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit" fullWidth>
              {t("resetPassword")}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Link
              href="/auth/signin"
              variant="body1"
              sx={{
                color: "black",
                textDecorationColor: "black",
              }}
            >
              {t("backToSignIn")}
            </Link>
          </Grid>
        </Grid>
      </Stack>
    </BaseHead>
  );
};

export default ForgotPassword;
