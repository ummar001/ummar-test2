import {
  useAppDispatch,
  useMutationWithLoading,
  useQueryWithLoading,
  useSnack,
} from "@/common/hooks";
import { AUTH_ROUTES } from "@/modules/auth/api/src/auth.api.enum";
import {
  IResetPasswordPayload,
  ISignInWithUserPasswordPayload,
  ISignUpWithUserPasswordPayload,
  IUser,
} from "@/modules/auth/types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { UseMutationResult, UseQueryResult } from "react-query";
import { setUser } from "../../store";
import { getAuthBackend } from "./backends";

export const useSignIn = (): UseMutationResult<
  IUser,
  Error,
  ISignInWithUserPasswordPayload
> => {
  const setSnack = useSnack();
  const dispatch = useAppDispatch();

  const signInUser = async (
    credentials: ISignInWithUserPasswordPayload
  ): Promise<IUser> => {
    const authBackend = await getAuthBackend();
    return await authBackend.signInWithEmailPassword(credentials);
  };

  return useMutationWithLoading(
    (credentials: ISignInWithUserPasswordPayload) => signInUser(credentials),
    {
      onSuccess(data: IUser) {
        dispatch(setUser({ user: data }));
      },
      onError(error) {
        setSnack({ title: error.message, severityType: "error" });
      },
    }
  );
};

export const useSignUp = (): UseMutationResult<
  IUser,
  Error,
  ISignUpWithUserPasswordPayload
> => {
  const setSnack = useSnack();
  const dispatch = useAppDispatch();

  const signUpUser = async (
    credentials: ISignUpWithUserPasswordPayload
  ): Promise<IUser> => {
    const authBackend = await getAuthBackend();
    return await authBackend.signUpWithEmailPassword(credentials);
  };

  return useMutationWithLoading(
    (credentials: ISignUpWithUserPasswordPayload) => signUpUser(credentials),
    {
      onSuccess(data: IUser) {
        dispatch(setUser({ user: data }));
      },
      onError(error) {
        setSnack({ title: error.message, severityType: "error" });
      },
    }
  );
};

export const useSendResetPasswordEmail = (): UseMutationResult<
  void,
  Error,
  string
> => {
  const { t } = useTranslation("auth");
  const setSnack = useSnack();

  const sendResetUserPasswordEmail = async (email: string): Promise<void> => {
    const authBackend = await getAuthBackend();
    return await authBackend.sendEmailResetPassword(email);
  };

  return useMutationWithLoading(
    (email: string) => sendResetUserPasswordEmail(email),
    {
      onSuccess() {
        setSnack({ title: t("emailSent"), severityType: "success" });
      },
      onError() {
        setSnack({
          title: t("cantSendEmail"),
          severityType: "error",
        });
      },
    }
  );
};

export const useConfirmEmailResetPasswordToken = (
  params: {
    enabled: boolean
  },
  token: string
): UseQueryResult<boolean> => {
  const { t } = useTranslation("auth");
  const setSnack = useSnack();
  const router = useRouter();

  const confirmResetPasswordToken = async (): Promise<boolean> => {
    const authBackend = await getAuthBackend();
    return await authBackend.confirmEmailResetPasswordToken(token);
  };

  return useQueryWithLoading(
    AUTH_ROUTES.CONFIRM_RESET_PASSWORD_TOKEN,
    () => confirmResetPasswordToken(),
    {
      onSuccess(data) {
        if (data == false) {
          setSnack({ title: t("invalidLink"), severityType: "error" });
          router.push("/");
        }
      },
      onError() {
        setSnack({ title: t("invalidLink"), severityType: "error" });
        router.push("/");
      },
      enabled: params.enabled,
    }
  );
};

export const useConfirmUserEmail = (
  params: {
    enabled: boolean
  },
  token: string
): UseQueryResult<IUser> => {
  const { t } = useTranslation("auth");
  const setSnack = useSnack();
  const dispatch = useAppDispatch();

  const confirmUserEmail = async (): Promise<IUser> => {
    const authBackend = await getAuthBackend();
    return await authBackend.confirmUserEmail(token);
  };

  return useQueryWithLoading(
    AUTH_ROUTES.CONFIRM_EMAIL,
    () => confirmUserEmail(),
    {
      onSuccess(user) {
        dispatch(setUser({ user }));
      },
      onError() {
        setSnack({ title: t("invalidLink"), severityType: "error" });
      },
      enabled: params.enabled,
    }
  );
};

export const useResetPassword = (): UseMutationResult<
  IUser,
  Error,
  IResetPasswordPayload
> => {
  const { t } = useTranslation("auth");
  const setSnack = useSnack();
  const dispatch = useAppDispatch();

  const resetUserPassword = async (
    payload: IResetPasswordPayload
  ): Promise<IUser> => {
    const authBackend = await getAuthBackend();
    return await authBackend.resetPassword(payload);
  };

  return useMutationWithLoading(
    (payload: IResetPasswordPayload) => resetUserPassword(payload),
    {
      onSuccess(data: IUser) {
        dispatch(setUser({ user: data }));
        setSnack({ title: "Email confirmed.", severityType: "success" });
      },
      onError() {
        setSnack({
          title: t("cantChangePassword"),
          severityType: "error",
        });
      },
    }
  );
};
