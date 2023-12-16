import { environment } from "@/common/environment";
import {
  IResetPasswordPayload,
  ISignInWithUserPasswordPayload,
  ISignUpWithUserPasswordPayload,
  IUser
} from "@/modules/auth/types";
export interface IAuthBackend {
  signInWithEmailPassword: ({ email, password }: ISignInWithUserPasswordPayload) => Promise<IUser>

  signUpWithEmailPassword: ({ email, password, lastName, firstName }: ISignUpWithUserPasswordPayload) => Promise<IUser>

  sendEmailResetPassword: (email: string) => Promise<void>;

  confirmEmailResetPasswordToken: (token: string) => Promise<boolean>;

  resetPassword: ({ password, token }: IResetPasswordPayload) => Promise<IUser>;

  confirmUserEmail: (token: string) => Promise<IUser>
}

let authBackendInstance: IAuthBackend | undefined;

export async function getAuthBackend (): Promise<IAuthBackend> {
  if (authBackendInstance === undefined) {
    const mod = await import(`./${environment.AUTH_BACKEND}`);
    authBackendInstance = new mod.default() as IAuthBackend;
  }
  return authBackendInstance;
}
