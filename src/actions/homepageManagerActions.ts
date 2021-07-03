import {TablePaginationConfig} from "antd/lib/table/interface";
import {Dispatch} from "redux";
import {IGridDataUser} from "../interfaces/user";
import {IActionPromise, ISelectOption} from "../interfaces/common";
import {IHomepageManagerUrlParams} from "../interfaces/urlParams";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import mapToGridData from "../helpers/mapToGridData";
import mapResultsToManagerGridSelectOptions from "../helpers/mapResultsToManagerGridSelectOptions";
import parseSelectOptions from "../parsers/homepageManagerPage";
import parseGridData from "../parsers/parseGridData";

export enum homepageManagerActionTypes {
    SET_LOADING_SElECT_OPTIONS = 'HOMEPAGE_MANAGER/SET_LOADING_SElECT_OPTIONS',
    SET_LOADING_GRID_DATA = 'HOMEPAGE_MANAGER/SET_LOADING_GRID_DATA',
    SET_SELECT_OPTIONS_JOB_TITLE = 'HOMEPAGE_MANAGER/SET_SELECT_OPTIONS_JOB_TITLE',
    SET_PAGINATION = 'HOMEPAGE_MANAGER/SET_PAGINATION',
    SET_SELECT_OPTIONS_FOCUS = 'HOMEPAGE_MANAGER/SET_SELECT_OPTIONS_FOCUS',
    SET_GRID_DATA = 'HOMEPAGE_MANAGER/SET_GRID_DATA'
}

interface ISetLoadingSelectOptionsAction {
    type: typeof homepageManagerActionTypes.SET_LOADING_SElECT_OPTIONS,
    payload: boolean
}

export const setLoadingSelectOptionsAction = (loading: boolean): ISetLoadingSelectOptionsAction => {
    return {
        type: homepageManagerActionTypes.SET_LOADING_SElECT_OPTIONS,
        payload: loading
    }
}

interface ISetLoadingGridDataAction {
    type: typeof homepageManagerActionTypes.SET_LOADING_GRID_DATA,
    payload: boolean
}

export const setLoadingGridDataAction = (loading: boolean): ISetLoadingGridDataAction => {
    return {
        type: homepageManagerActionTypes.SET_LOADING_GRID_DATA,
        payload: loading
    }
}

interface ISetSelectOptionsJobTitleAction {
    type: typeof homepageManagerActionTypes.SET_SELECT_OPTIONS_JOB_TITLE,
    payload: ISelectOption[]
}

export const setSelectOptionsJobTitleAction = (gridData: ISelectOption[]): ISetSelectOptionsJobTitleAction => {
    return {
        type: homepageManagerActionTypes.SET_SELECT_OPTIONS_JOB_TITLE,
        payload: gridData
    }
}

interface ISetPaginationAction {
    type: typeof homepageManagerActionTypes.SET_PAGINATION,
    payload: TablePaginationConfig
}

export const setPaginationAction = (pagination: TablePaginationConfig): ISetPaginationAction => {
    return {
        type: homepageManagerActionTypes.SET_PAGINATION,
        payload: pagination
    }
}

interface ISetSelectOptionsFocusAction {
    type: typeof homepageManagerActionTypes.SET_SELECT_OPTIONS_FOCUS,
    payload: ISelectOption[]
}

export const setSelectOptionsFocusAction = (options: ISelectOption[]): ISetSelectOptionsFocusAction => {
    return {
        type: homepageManagerActionTypes.SET_SELECT_OPTIONS_FOCUS,
        payload: options
    }
}

interface ISetGridDataAction {
    type: typeof homepageManagerActionTypes.SET_GRID_DATA,
    payload: IGridDataUser[]
}

export const setGridDataAction = (gridData: IGridDataUser[]): ISetGridDataAction => {
    return {
        type: homepageManagerActionTypes.SET_GRID_DATA,
        payload: gridData
    }
}

export const getGridDataAction = (params: IHomepageManagerUrlParams): IActionPromise<Promise<ISetGridDataAction | void>> => async (dispatch: Dispatch) => {
    dispatch(setLoadingGridDataAction(true));

    return Manager.getGridData(params)
        .then((result :unknown) => {
            const parsedData = parseGridData(result);
            dispatch(setGridDataAction(mapToGridData(parsedData.data)));
            dispatch(setPaginationAction({
                total: parsedData.total,
                pageSize: parsedData.per_page,
                current: parsedData.current_page,
            }));
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setLoadingGridDataAction(false));
        });
}

export const getSelectOptionsAction = (): IActionPromise<Promise<ISetSelectOptionsJobTitleAction | void>> => async (dispatch: Dispatch) => {
    dispatch(setLoadingSelectOptionsAction(true));
    return Manager.getSelectOptions()
        .then((result :unknown) => {
            const parsedOptions = parseSelectOptions(result);
            dispatch(
                setSelectOptionsJobTitleAction(
                    mapResultsToManagerGridSelectOptions(parsedOptions.jobs)
                )
            );
            dispatch(
                setSelectOptionsFocusAction(
                    mapResultsToManagerGridSelectOptions(parsedOptions.focuses)
                )
            );
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setLoadingSelectOptionsAction(false));
        });
}

export type HomepageManagerPageActions =
    ISetLoadingSelectOptionsAction |
    ISetLoadingGridDataAction |
    ISetSelectOptionsJobTitleAction |
    ISetPaginationAction |
    ISetSelectOptionsFocusAction |
    ISetGridDataAction;