import { Dispatch } from 'redux';
import Manager from "../services/Manager";
import { IParams } from "../interfaces/LoginPage";
import {getToken, getUser, removeUserSession, setUserSession} from "../helpers/authentication";
import showErrorMessage from "../helpers/showErrorMessage";
import {IUser} from "../interfaces/user";
import {IActionPromise} from "../interfaces/common";
import parseLoginResponse from "../parsers/loginPage";


export enum loginPageActionTypes {
    SET_LOGIN_IN_PROGRESS = 'LOGIN_PAGE/SET_LOGIN_IN_PROGRESS',
    SET_USER = 'LOGIN_PAGE/SET_USER',
    SET_REMEMBER_CHECKED = 'LOGIN_PAGE/SET_REMEMBER_CHECKED'
}

interface ISetLoginInProgressAction {
    type: typeof loginPageActionTypes.SET_LOGIN_IN_PROGRESS,
    payload: boolean
}

export function setLoginInProgress(loading: boolean): ISetLoginInProgressAction {
    return {
        type: loginPageActionTypes.SET_LOGIN_IN_PROGRESS,
        payload: loading
    }
}

export interface ISetUserAction {
    type: typeof loginPageActionTypes.SET_USER,
    payload: IUser | null
}

export const setUser = (user: IUser | null) :ISetUserAction => {
    return {
        type: loginPageActionTypes.SET_USER,
        payload: user
    }
}

export interface ISetRememberCheckedAction {
    type: typeof loginPageActionTypes.SET_REMEMBER_CHECKED,
    payload: boolean
}

export const setRememberCheckedAction = (value: boolean): ISetRememberCheckedAction => {
    return {
        type: loginPageActionTypes.SET_REMEMBER_CHECKED,
        payload: value
    }
}

export const loginAction = (params: IParams): IActionPromise<Promise<ISetUserAction | void>> => async (dispatch: Dispatch) => {
    dispatch(setLoginInProgress(true));

    return Manager.login(params)
        .then((result :unknown) => {
            const parsedInfo = parseLoginResponse(result);
            setUserSession(parsedInfo.access_token, parsedInfo.user);
            Manager.setAuthHeader(`Bearer ${getToken()}`);

            dispatch(setUser(parsedInfo.user));
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setLoginInProgress(false));
        });
}

export const logOutAction = (): IActionPromise<Promise<ISetUserAction | void>> => async (dispatch: Dispatch) => {
    removeUserSession();
    dispatch(setUser(null));
}

export const getAndSetCurrentUserAction = (): IActionPromise<Promise<ISetUserAction | void>> => async (dispatch: Dispatch) => {
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

export type LoginPageActions = ISetLoginInProgressAction | ISetUserAction | ISetRememberCheckedAction;