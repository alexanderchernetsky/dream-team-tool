import { IUser } from "../user";

export interface IParams {
  email: string;
  password: string;
}

export interface ILogin {
  loginInProgress: boolean;
  user: IUser | null;
}
