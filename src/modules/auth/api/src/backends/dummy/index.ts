import {
  IResetPasswordPayload,
  ISignInWithUserPasswordPayload,
  ISignUpWithUserPasswordPayload,
  IUser
} from "@/modules/auth/types";
import { IAuthBackend } from "..";

export default class AuthDummyBackend implements IAuthBackend {
  async signInWithEmailPassword ({ email }: ISignInWithUserPasswordPayload): Promise<IUser> {
    return {
      email,
      lastName: "John",
      firstName: "Dee",
      emailVerified: false,
      token: {
        accessToken: "dummy-token"
      },
      accountId: "account-id"
    };
  }

  async signUpWithEmailPassword ({ email }: ISignUpWithUserPasswordPayload): Promise<IUser> {
    return {
      email,
      lastName: "John",
      firstName: "Dee",
      emailVerified: false,
      token: {
        accessToken: "dummy-token"
      },
      accountId: "account-id"
    };
  }

  async sendEmailResetPassword(email: string): Promise<void> {
    if (email) return;

    throw new Error("No email");
  }

  async resetPassword({ password,token }: IResetPasswordPayload): Promise<IUser> {
    if (!password || !token) throw new Error("Missing properties.");

    return {
      email: "john.dee@gmail.com",
      lastName: "John",
      firstName: "Dee",
      emailVerified: false,
      token: {
        accessToken: "dummy-token"
      },
      accountId: "account-id"
    };
  }

  async confirmEmailResetPasswordToken(token: string): Promise<boolean> {
    return token === "success";
  }

  async confirmUserEmail(token: string): Promise<IUser> {
    if (token !== "success") throw new Error("Invalid token");

    return {
      email: "john.dee@gmail.com",
      lastName: "John",
      firstName: "Dee",
      emailVerified: true,
      token: {
        accessToken: "dummy-token"
      },
      accountId: "account-id"
    };
  }
}
