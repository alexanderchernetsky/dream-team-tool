import {RouteComponentProps} from "react-router";
import { IUser } from "../user";

export interface IParams {
  email: string;
  password: string;
}

export interface ILogin {
  loginInProgress: boolean;
  user: IUser | null;
}

export interface ILoginPage {
  email: string;
  password: string;
}

export interface ILoginStatePageProps {
  loginInProgress: boolean,
  user: IUser | null
}

export interface ILoginDispatchProps {
  login: (params: IParams) => void
}

export type LoginPageProps = ILoginStatePageProps & ILoginDispatchProps & RouteComponentProps;
