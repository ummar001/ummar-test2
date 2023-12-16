import { postFromApi, putFromApi } from "@/common/api";
import { AUTH_ROUTES } from "@/modules/auth/api/src/auth.api.enum";
import {
  IResetPassword,
  IResetPasswordPayload,
  ISendResetPassword,
  ISignInWithUserPasswordPayload,
  ISignUpWithUserPasswordPayload,
  IUser,
} from "@/modules/auth/types";
import { IAuthBackend } from "..";

export default class AuthWaycupBackend implements IAuthBackend {
  async signInWithEmailPassword({
    email,
    password,
  }: ISignInWithUserPasswordPayload): Promise<IUser> {
    try {
      const payload: ISignInWithUserPasswordPayload = {
        password,
        email,
      };
      const user: IUser = await postFromApi<ISignInWithUserPasswordPayload>(
        AUTH_ROUTES.SIGN_IN,
        payload
      );
      return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async signUpWithEmailPassword({
    password,
    email,
    lastName,
    firstName,
  }: ISignUpWithUserPasswordPayload): Promise<IUser> {
    const payload: ISignUpWithUserPasswordPayload = {
      password,
      email,
      firstName,
      lastName,
    };
    const user: IUser = await postFromApi<ISignUpWithUserPasswordPayload>(
      AUTH_ROUTES.SIGN_UP,
      payload
    );
    return user;
  }

  async sendEmailResetPassword(email: string): Promise<void> {
    if (!email) throw new Error("No email");

    return await putFromApi<ISendResetPassword>(
      AUTH_ROUTES.SEND_RESET_PASSWORD_TOKEN,
      {
        email,
      }
    );
  }

  async confirmEmailResetPasswordToken(token: string): Promise<boolean> {
    return await putFromApi(
      AUTH_ROUTES.CONFIRM_RESET_PASSWORD_TOKEN + `/${token}`
    );
  }

  async resetPassword({
    password,
    token,
  }: IResetPasswordPayload): Promise<IUser> {
    if (!password || !token) throw new Error("Missing properties.");

    return await putFromApi<IResetPassword>(AUTH_ROUTES.RESET_PASSWORD, {
      password,
      token,
    });
  }

  async confirmUserEmail(token: string): Promise<IUser> {
    if (!token) throw new Error("Missing properties.");

    return await putFromApi(AUTH_ROUTES.CONFIRM_EMAIL + token);
  }
}
