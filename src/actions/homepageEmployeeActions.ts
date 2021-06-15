import { Dispatch } from 'redux';
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import {IActionPromise} from "../interfaces/common";
import {IFeedItems} from "../interfaces/HomepageEmployee";
import {EmployeeHomepageUrlParams} from "../interfaces/urlParams";
import parseHomepageEmployeeResponse from "../parsers/homepageEmloyeePage";

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

export interface ISetFeedItems {
    type: typeof homepageEmployeeActionTypes.SET_FEED_ITEMS,
    payload: IFeedItems
}

export const setFeedItemsAction = (feedItems: IFeedItems ) :ISetFeedItems => {
    return {
        type: homepageEmployeeActionTypes.SET_FEED_ITEMS,
        payload: feedItems
    }
}

export const getFeedItemsAction = (params: EmployeeHomepageUrlParams) :IActionPromise<Promise<ISetFeedItems | void>> => async (dispatch: Dispatch) => {
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

export type HomepageEmployeePageActions = ISetFeedItems | ISetLoadingAction;