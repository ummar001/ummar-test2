import { IUser } from "@/modules/auth/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./state";

interface ISetUserPayload {
  user: IUser;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<ISetUserPayload>) {
      state.user = action.payload.user;
    },
    resetUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
