import { Dispatch } from 'redux';
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import {IActionPromise} from "../interfaces/common";
import {IEmployeeHomepageUrlParams} from "../interfaces/urlParams";
import parseHomepageEmployeeResponse from "../parsers/homepageEmloyeePage";
import {IHomepageEmployeeUser} from "../interfaces/user";

export enum homepageEmployeeActionTypes {
    SET_LOADING = 'HOMEPAGE_EMPLOYEE/SET_LOADING',
    SET_FEED_ITEMS = 'HOMEPAGE_EMPLOYEE/SET_FEED_ITEMS',
}

interface ISetLoadingAction {
    type: typeof homepageEmployeeActionTypes.SET_LOADING,
    payload: boolean
}

export function setLoadingAction(loading: boolean) :ISetLoadingAction {
    return {
        type: homepageEmployeeActionTypes.SET_LOADING,
        payload: loading
    }
}

export interface ISetFeedItemsAction {
    type: typeof homepageEmployeeActionTypes.SET_FEED_ITEMS,
    payload: IHomepageEmployeeUser[]
}

export const setFeedItemsAction = (feedItems: IHomepageEmployeeUser[] ) :ISetFeedItemsAction => {
    return {
        type: homepageEmployeeActionTypes.SET_FEED_ITEMS,
        payload: feedItems
    }
}

export const getFeedItemsAction = (params: IEmployeeHomepageUrlParams) :IActionPromise<Promise<ISetFeedItemsAction | void>> => async (dispatch: Dispatch) => {
    dispatch(setLoadingAction(true));

    return Manager.getFeedItems(params)
        .then((result :unknown) => {
            const parsedData = parseHomepageEmployeeResponse(result);
            dispatch(setFeedItemsAction(parsedData));
        })
        .catch((error: Response) => showErrorMessage(error))
        .finally(() => {
            dispatch(setLoadingAction(false));
        });
}

export type HomepageEmployeePageActions = ISetFeedItemsAction | ISetLoadingAction;