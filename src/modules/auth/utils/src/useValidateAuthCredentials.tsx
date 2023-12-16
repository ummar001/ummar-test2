import { useSnack } from "@/common/hooks";
import { ValidateEmail, ValidatePassword } from "@/modules/auth/utils";
import { useTranslation } from "react-i18next";

export const useValidateAuthCredentials = () => {
  const { t } = useTranslation("auth");
  const snack = useSnack();
  const validateCredentials = (email: string, password: string): boolean => {
    if (!email || !password) {
      snack({ title: t("allField"), severityType: "error" });
      return false;
    } else if (!ValidateEmail(email)) {
      snack({
        title: t("enterEmail"),
        severityType: "error",
      });
      return false;
    } else if (!ValidatePassword(password)) {
      snack({
        title: t("passwordMustContain"),
        severityType: "error",
      });
      return false;
    }
    return true;
  };

  const confirmPasswords = (password: string, password2: string): boolean => {
    if (password !== password2) {
      snack({ title: t("passwordMustMatch"), severityType: "error" });
      return false;
    }
    return true;
  };

  return { validateCredentials, confirmPasswords };
};
