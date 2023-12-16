import { useCustomForm, useSnack } from "@/common/hooks";
import { useSignIn } from "@/modules/auth/api";
import { SignInSidebar } from "@/modules/auth/components";
import { AuthLayout } from "@/modules/auth/layout";
import { ISignInWithUserPasswordPayload } from "@/modules/auth/types";
import { ValidateEmail } from "@/modules/auth/utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, FunctionComponent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const Signin: FunctionComponent = () => {
  const { t } = useTranslation("auth");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate } = useSignIn();
  const snack = useSnack();

  const formatEmail = (email: string): string => {
    return email.replace(/\s/g, "").toLowerCase();
  };

  const { formValues, handleChange, setFormValues } =
    useCustomForm<ISignInWithUserPasswordPayload>({
      email: "",
      password: "",
    });

  const handleSubmit = useCallback(
    (e: FormEvent): void => {
      e.preventDefault();
      if (ValidateEmail(formValues.email)) {
        mutate(formValues);
      } else {
        snack({
          title: t("invalidEmail"),
          severityType: "error",
        });
      }
    },
    [formValues, mutate, snack, t]
  );

  return (
    <AuthLayout sidebar={<SignInSidebar />} pageName="Sign In">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <Grid maxWidth={550} sx={{ margin: "0 auto" }}>
          <Grid item xs={12} container spacing={1} textAlign="center">
            <Grid item xs={12}>
              <Typography component="h1" variant="h4" fontWeight="bold">
                {t("signIn")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">{t("signInDesc")}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 4,
            }}
          >
            <TextField
              required
              fullWidth
              id="email"
              label={t("emailAddress")}
              name="email"
              autoComplete="email"
              type="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  email: formatEmail(e.target.value),
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(true)}
                      onMouseDown={() => setShowPassword(false)}
                    >
                      {showPassword && <Visibility />}
                      {!showPassword && <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoComplete="current-password"
              value={formValues.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
              }}
            >
              {t("signIn")}
            </Button>
            <Grid container textAlign="center">
              <Grid item xs={12}>
                <Link href="/auth/forgot-password" variant="body1">
                  {t("forgotPassword")}
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  {t("noAccount")}{" "}
                  <Link href="/auth/signup" variant="body1">
                    {t("signUp")}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default Signin;
