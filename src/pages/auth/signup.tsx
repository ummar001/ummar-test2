import { useCustomForm } from "@/common/hooks";
import { useSignUp } from "@/modules/auth/api";
import { SignUpSidebar } from "@/modules/auth/components";
import { AuthLayout } from "@/modules/auth/layout";
import { ISignUpWithUserPasswordPayload } from "@/modules/auth/types";
import { useValidateAuthCredentials } from "@/modules/auth/utils";
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

const Signup: FunctionComponent = () => {
  const { t } = useTranslation("auth");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { mutate } = useSignUp();
  const { validateCredentials, confirmPasswords } = useValidateAuthCredentials();

  const { formValues, handleChange } =
    useCustomForm<ISignUpWithUserPasswordPayload>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

  const handleSubmit = useCallback(
    (e: FormEvent): void => {
      e.preventDefault();
      if (
        validateCredentials(formValues.email, formValues.password) &&
        confirmPasswords(formValues.password, confirmPassword)
      ) {
        mutate(formValues);
      }
    },
    [confirmPassword, confirmPasswords, formValues, mutate, validateCredentials]
  );

  return (
    <AuthLayout sidebar={<SignUpSidebar />} pageName="Sign Up">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          minHeight: "100vh",
          margin: "0 auto",
        }}
        maxWidth={550}
      >
        <Grid sx={{ width: "100%" }}>
          <Grid item xs={12} textAlign="center">
            <Typography component="h1" variant="h4" fontWeight="bold">
              {t("createNewAcc")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 5,
            }}
            spacing={2}
          >
            <Grid
              item
              container
              spacing={2}
              sx={{ marginBottom: 2 }}
              textAlign="center"
            >
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label={t("firstName")}
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={t("lastName")}
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={t("emailAddress")}
                name="email"
                type="email"
                autoComplete="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label={t("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword(true)}
                        onMouseDown={() => setShowConfirmPassword(false)}
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                id="confirmPassword"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("password")}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(true)}
                        onMouseDown={() => setShowPassword(false)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                id="password"
                autoComplete="current-password"
                value={formValues.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                }}
              >
                {t("createAccount")}
              </Button>
            </Grid>
            <Grid container textAlign="center">
              <Grid item xs={12}>
                <Typography variant="body1">
                  {t("alreadyHaveAcc")}{" "}
                  <Link href="/auth/signin" variant="body1">
                    {t("signIn")}
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

export default Signup;
