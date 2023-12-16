export interface IUser {
  email: string
  firstName: string
  lastName: string
  accountId: string;
  emailVerified: boolean
  token: {
    accessToken: string
  }
}

export interface ISignInWithUserPasswordPayload {
  email: string;
  password: string;
}

export interface ISignUpWithUserPasswordPayload {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
}

export interface ISendResetPassword {
  email: string;
}

export interface IResetPassword {
  token: string;
  password: string;
}

export interface IResetPasswordPayload {
  password: string;
  token: string;
}
