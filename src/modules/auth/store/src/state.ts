import { IUser } from "@/modules/auth/types";

interface IUserState {
    user: IUser| null;
}

const initialState: IUserState = {
  user: null,
};

export default initialState;
