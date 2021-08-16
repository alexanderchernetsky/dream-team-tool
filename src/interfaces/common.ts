import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers";
import {IUser} from "./user";

export interface ISelectOption {
  label: string;
  value: string;
}

export interface IGradient {
  gradient: string;
  buttonColor: string;
}

export interface IAction<T extends string> {
  type: T;
}

export interface IGridParsedData {
  total: number;
  per_page: number;
  current_page: number;
  data: IUser[];
}

export interface IActionWithPayload<T extends string, P> extends IAction<T> {
  payload: P;
}

// IActionPromise is a thunk action containing
// - a return type. Defaulting to any (complicated promise types, actions, or dispatches)
// - RootState (application state)
// - no extra argument
// - any action
export type IActionPromise<R> = ThunkAction<R, RootState, undefined, IActionWithPayload<string, any> | IAction<string>>;
