import {Dispatch} from "redux";
import {TablePaginationConfig} from "antd/lib/table/interface";
import {IGridDataUser, ITeamAnalysisUser} from "../interfaces/user";
import Manager from "../services/Manager";
import mapToGridData from "../helpers/mapToGridData";
import showErrorMessage from "../helpers/showErrorMessage";
import {ICreateTeamPageUrlParams} from "../interfaces/urlParams";
import {RootState} from "../reducers";
import showSuccessMessage from "../helpers/showSuccessMessage";
import {parseGridData} from "../parsers/common";
import parseAnalysisData from "../parsers/createTeamPage";

export enum createTeamActionsTypes {
    SET_LOADING_ANALYSIS_DATA = 'CREATE_TEAM/SET_LOADING_ANALYSIS_DATA',
    SET_LOADING_GRID_DATA = 'CREATE_TEAM/SET_LOADING_GRID_DATA',
    SET_SAVING_TEAM_IN_PROGRESS = 'CREATE_TEAM/SET_SAVING_TEAM_IN_PROGRESS',
    SET_PAGINATION = 'CREATE_TEAM/SET_PAGINATION',
    SET_GRID_DATA = 'CREATE_TEAM/SET_GRID_DATA',
    SET_SELECTED_USERS_GRID_DATA = 'CREATE_TEAM/SET_SELECTED_USERS_GRID_DATA',
    SET_ANALYSIS_DATA = 'CREATE_TEAM/SET_ANALYSIS_DATA',
    SET_TEAM_NAME = 'CREATE_TEAM/SET_TEAM_NAME'
}

interface ISetLoadingAnalysisData {
    type: typeof createTeamActionsTypes.SET_LOADING_ANALYSIS_DATA,
    payload: boolean
}

export const setLoadingAnalysisDataAction = (loading: boolean): ISetLoadingAnalysisData => {
    return {
        type: createTeamActionsTypes.SET_LOADING_ANALYSIS_DATA,
        payload: loading
    }
}

interface ISetLoadingGridData {
    type: typeof createTeamActionsTypes.SET_LOADING_GRID_DATA,
    payload: boolean
}

export const setLoadingGridDataAction = (loading: boolean): ISetLoadingGridData => {
    return {
        type: createTeamActionsTypes.SET_LOADING_GRID_DATA,
        payload: loading
    }
}

interface ISavingTeamInProgress {
    type: typeof createTeamActionsTypes.SET_SAVING_TEAM_IN_PROGRESS,
    payload: boolean
}

export const setSavingTeamInProgressAction = (loading: boolean): ISavingTeamInProgress => {
    return {
        type: createTeamActionsTypes.SET_SAVING_TEAM_IN_PROGRESS,
        payload: loading
    }
}

interface ISetPagination {
    type: typeof createTeamActionsTypes.SET_PAGINATION,
    payload: TablePaginationConfig
}

export const setPaginationAction = (pagination: TablePaginationConfig): ISetPagination => {
    return {
        type: createTeamActionsTypes.SET_PAGINATION,
        payload: pagination
    }
}

interface ISetGridData {
    type: typeof createTeamActionsTypes.SET_GRID_DATA,
    payload: IGridDataUser[]
}

export const setGridDataAction = (gridData: IGridDataUser[]): ISetGridData => {
    return {
        type: createTeamActionsTypes.SET_GRID_DATA,
        payload: gridData
    }
}

interface ISetSelectedUsersGridData {
    type: typeof createTeamActionsTypes.SET_SELECTED_USERS_GRID_DATA,
    payload: IGridDataUser[]
}

export const setSelectedUsersGridDataAction = (gridData: IGridDataUser[]): ISetSelectedUsersGridData => {
    return {
        type: createTeamActionsTypes.SET_SELECTED_USERS_GRID_DATA,
        payload: gridData
    }
}

interface ISetAnalysisUsersGridData {
    type: typeof createTeamActionsTypes.SET_ANALYSIS_DATA,
    payload: ITeamAnalysisUser[]
}

export const setAnalysisDataAction = (gridData: ITeamAnalysisUser[]): ISetAnalysisUsersGridData => {
    return {
        type: createTeamActionsTypes.SET_ANALYSIS_DATA,
        payload: gridData
    }
}

export const getGridDataAction = (params: ICreateTeamPageUrlParams) => async (dispatch :Dispatch) => {
    dispatch(setLoadingGridDataAction(true));
    return Manager.getGridData(params)
        .then((result :unknown) => {
            const parsedData = parseGridData(result);
            dispatch(setGridDataAction(mapToGridData(parsedData.data)))
            dispatch(
                setPaginationAction({
                   total: parsedData.total,
                   pageSize:parsedData.per_page,
                   current: parsedData.current_page,
                })
            );
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setLoadingGridDataAction(false));
        });
}

export const addTeamMemberAction = (id: number) => (dispatch :Dispatch, getState: () => RootState) => {
    const {gridData, selectedUsersGridData} = getState()?.createTeam;
    const targetMember :IGridDataUser | undefined = gridData.find(
        (user :IGridDataUser) => user.id === id
    );
    if (targetMember) {
        dispatch(setSelectedUsersGridDataAction([
           ...selectedUsersGridData,
           targetMember
        ]))
    }
}

export const removeTeamMemberAction = (id: number) => (dispatch :Dispatch, getState :() => RootState) => {
    const {selectedUsersGridData} = getState()?.createTeam;
    const filtered: IGridDataUser[] = selectedUsersGridData.filter(
        (user: IGridDataUser) => user.id !== id
    );
    dispatch(setSelectedUsersGridDataAction(filtered));
}

export const getAnalysisDataAction = () => (dispatch :Dispatch, getState :() => RootState) => {
    dispatch(setLoadingAnalysisDataAction(true));
    const {selectedUsersGridData} = getState()?.createTeam;
    const users = selectedUsersGridData.map(
        (item: IGridDataUser) => item.id
    );

    return Manager.getAnalysis({ users })
        .then((result :unknown) => {
            const parsedData = parseAnalysisData(result);
            dispatch(setAnalysisDataAction(parsedData));
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setLoadingAnalysisDataAction(false));
        });
}

export const saveTeamAction = (name :string) => (dispatch :Dispatch, getState :() => RootState) => {
    dispatch(setSavingTeamInProgressAction(true));
    const {selectedUsersGridData} = getState()?.createTeam;
    const users = selectedUsersGridData.map(
        (item: IGridDataUser) => item.id
    );
    return Manager.saveTeam({ name, users })
        .then(() => {
            showSuccessMessage();
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setSavingTeamInProgressAction(false));
        });
}

interface ISetTeamNameValue {
    type: createTeamActionsTypes.SET_TEAM_NAME,
    payload: string
}

export const setTeamNameValueAction = (value :string): ISetTeamNameValue => {
    return {
        type: createTeamActionsTypes.SET_TEAM_NAME,
        payload: value
    }
}

export type CreateTeamPageActions = ISetLoadingAnalysisData | ISetLoadingGridData | ISavingTeamInProgress | ISetPagination | ISetGridData | ISetSelectedUsersGridData | ISetAnalysisUsersGridData | ISetTeamNameValue;