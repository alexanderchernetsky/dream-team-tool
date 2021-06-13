import {TablePaginationConfig} from "antd/lib/table/interface";
import {Dispatch} from "redux";
import {GridDataUser} from "../interfaces/user";
import {IActionPromise, SelectOption} from "../interfaces/common";
import {HomepageManagerUrlParams} from "../interfaces/urlParams";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import mapToGridData from "../helpers/mapToGridData";
import mapResultsToManagerGridSelectOptions from "../helpers/mapResultsToManagerGridSelectOptions";

export enum homepageManagerActionTypes {
    SET_LOADING_SElECT_OPTIONS = 'HOMEPAGE_MANAGER/SET_LOADING_SElECT_OPTIONS',
    SET_LOADING_GRID_DATA = 'HOMEPAGE_MANAGER/SET_LOADING_GRID_DATA',
    SET_SELECT_OPTIONS_JOB_TITLE = 'HOMEPAGE_MANAGER/SET_SELECT_OPTIONS_JOB_TITLE',
    SET_PAGINATION = 'HOMEPAGE_MANAGER/SET_PAGINATION',
    SET_SELECT_OPTIONS_FOCUS = 'HOMEPAGE_MANAGER/SET_SELECT_OPTIONS_FOCUS',
    SET_GRID_DATA = 'HOMEPAGE_MANAGER/SET_GRID_DATA'
}

interface SetLoadingSelectOptions {
    type: typeof homepageManagerActionTypes.SET_LOADING_SElECT_OPTIONS,
    payload: boolean
}

export const setLoadingSelectOptionsAction = (loading: boolean): SetLoadingSelectOptions => {
    return {
        type: homepageManagerActionTypes.SET_LOADING_SElECT_OPTIONS,
        payload: loading
    }
}

interface SetLoadingGridData {
    type: typeof homepageManagerActionTypes.SET_LOADING_GRID_DATA,
    payload: boolean
}

export const setLoadingGridDataAction = (loading: boolean): SetLoadingGridData => {
    return {
        type: homepageManagerActionTypes.SET_LOADING_GRID_DATA,
        payload: loading
    }
}

interface SetSelectOptionsJobTitle {
    type: typeof homepageManagerActionTypes.SET_SELECT_OPTIONS_JOB_TITLE,
    payload: SelectOption[]
}

export const setSelectOptionsJobTitleAction = (gridData: SelectOption[]): SetSelectOptionsJobTitle => {
    return {
        type: homepageManagerActionTypes.SET_SELECT_OPTIONS_JOB_TITLE,
        payload: gridData
    }
}

interface SetPagination {
    type: typeof homepageManagerActionTypes.SET_PAGINATION,
    payload: TablePaginationConfig
}

export const setPaginationAction = (pagination: TablePaginationConfig): SetPagination => {
    return {
        type: homepageManagerActionTypes.SET_PAGINATION,
        payload: pagination
    }
}

interface SetSelectOptionsFocus {
    type: typeof homepageManagerActionTypes.SET_SELECT_OPTIONS_FOCUS,
    payload: SelectOption[]
}

export const setSelectOptionsFocusAction = (options: SelectOption[]): SetSelectOptionsFocus => {
    return {
        type: homepageManagerActionTypes.SET_SELECT_OPTIONS_FOCUS,
        payload: options
    }
}

interface SetGridData {
    type: typeof homepageManagerActionTypes.SET_GRID_DATA,
    payload: GridDataUser[]
}

export const setGridDataAction = (gridData: GridDataUser[]): SetGridData => {
    return {
        type: homepageManagerActionTypes.SET_GRID_DATA,
        payload: gridData
    }
}

export const getGridDataAction = (params: HomepageManagerUrlParams): IActionPromise<Promise<SetGridData | void>> => async (dispatch: Dispatch) => {
    dispatch(setLoadingGridDataAction(true));

    return Manager.getGridData(params)
        .then((result) => {
            dispatch(setGridDataAction(mapToGridData(result?.data?.data)));
            dispatch(setPaginationAction({
                total: result?.data?.total,
                pageSize: result?.data?.per_page,
                current: result?.data?.current_page,
            }));
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setLoadingGridDataAction(false));
        });
}

export const getSelectOptionsAction = (): IActionPromise<Promise<SetSelectOptionsJobTitle | void>> => async (dispatch: Dispatch) => {
    dispatch(setLoadingSelectOptionsAction(true));
    return Manager.getSelectOptions()
        .then((result) => {
            dispatch(
                setSelectOptionsJobTitleAction(
                    mapResultsToManagerGridSelectOptions(result?.data?.jobs)
                )
            );
            dispatch(
                setSelectOptionsFocusAction(
                    mapResultsToManagerGridSelectOptions(result?.data?.focuses)
                )
            );
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setLoadingSelectOptionsAction(false));
        });
}

export type HomepageManagerPageActions = SetLoadingSelectOptions | SetLoadingGridData | SetSelectOptionsJobTitle | SetPagination | SetSelectOptionsFocus | SetGridData;