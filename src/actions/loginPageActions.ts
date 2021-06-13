import { Dispatch } from 'redux';
import Manager from "../services/Manager";
import { IParams } from "../interfaces/LoginPage";
import {getToken, getUser, removeUserSession, setUserSession} from "../helpers/authentication";
import showErrorMessage from "../helpers/showErrorMessage";
import {IUser} from "../interfaces/user";
import {IActionPromise} from "../interfaces/common";


export enum loginPageActionTypes {
    SET_LOGIN_IN_PROGRESS = 'LOGIN_PAGE/SET_LOGIN_IN_PROGRESS',
    SET_USER = 'LOGIN_PAGE/SET_USER',
}

interface SetLoginInProgressAction {
    type: typeof loginPageActionTypes.SET_LOGIN_IN_PROGRESS,
    payload: boolean
}

export function setLoginInProgress(loading: boolean): SetLoginInProgressAction {
    return {
        type: loginPageActionTypes.SET_LOGIN_IN_PROGRESS,
        payload: loading
    }
}

export interface SetUser {
    type: typeof loginPageActionTypes.SET_USER,
    payload: IUser | null
}

export const setUser = (user: IUser | null) :SetUser => {
    return {
        type: loginPageActionTypes.SET_USER,
        payload: user
    }
}

export const loginAction = (params: IParams): IActionPromise<Promise<SetUser | void>> => async (dispatch: Dispatch) => {
    dispatch(setLoginInProgress(true));

    return Manager.login(params)
        .then((result) => {
            setUserSession(result?.data?.access_token, result?.data?.user);
            Manager.setAuthHeader(`Bearer ${getToken()}`);
            dispatch(setUser(result?.data?.user));
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setLoginInProgress(false));
        });
}

export const logOutAction = (): IActionPromise<Promise<SetUser | void>> => async (dispatch: Dispatch) => {
    removeUserSession();
    dispatch(setUser(null));
}

export const getAndSetCurrentUserAction = (): IActionPromise<Promise<SetUser | void>> => async (dispatch: Dispatch) => {
    const user = getUser();
    if (user) {
        dispatch(setUser(user));
    }
}

export const getAndSetAuthHeaderAction = () :IActionPromise<Promise<void>> => async () => {
    const token = getToken();
    if (token) {
        Manager.setAuthHeader(`Bearer ${token}`);
    }
}

export type LoginPageActions = SetLoginInProgressAction | SetUser;