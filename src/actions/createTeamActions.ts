import {Dispatch} from "redux";
import {TablePaginationConfig} from "antd/lib/table/interface";
import {GridDataUser, TeamAnalisysUser} from "../interfaces/user";
import Manager from "../services/Manager";
import mapToGridData from "../helpers/mapToGridData";
import showErrorMessage from "../helpers/showErrorMessage";
import {CreateTeamPageUrlParams} from "../interfaces/urlParams";
import {RootState} from "../reducers";
import showSuccessMessage from "../helpers/showSuccessMessage";

export enum createTeamActionsTypes {
    SET_LOADING_ANALYSIS_DATA = 'CREATE_TEAM/SET_LOADING_ANALYSIS_DATA',
    SET_LOADING_GRID_DATA = 'CREATE_TEAM/SET_LOADING_GRID_DATA',
    SET_SAVING_TEAM_IN_PROGRESS = 'CREATE_TEAM/SET_SAVING_TEAM_IN_PROGRESS',
    SET_PAGINATION = 'CREATE_TEAM/SET_PAGINATION',
    SET_GRID_DATA = 'CREATE_TEAM/SET_GRID_DATA',
    SET_SELECTED_USERS_GRID_DATA = 'CREATE_TEAM/SET_SELECTED_USERS_GRID_DATA',
    SET_ANALYSIS_DATA = 'CREATE_TEAM/SET_ANALYSIS_DATA',
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
    payload: GridDataUser[]
}

export const setGridDataAction = (gridData: GridDataUser[]): ISetGridData => {
    return {
        type: createTeamActionsTypes.SET_GRID_DATA,
        payload: gridData
    }
}

interface ISetSelectedUsersGridData {
    type: typeof createTeamActionsTypes.SET_SELECTED_USERS_GRID_DATA,
    payload: GridDataUser[]
}

export const setSelectedUsersGridDataAction = (gridData: GridDataUser[]): ISetSelectedUsersGridData => {
    return {
        type: createTeamActionsTypes.SET_SELECTED_USERS_GRID_DATA,
        payload: gridData
    }
}

interface ISetAnalysisUsersGridData {
    type: typeof createTeamActionsTypes.SET_ANALYSIS_DATA,
    payload: TeamAnalisysUser[]
}

export const setAnalysisDataAction = (gridData: TeamAnalisysUser[]): ISetAnalysisUsersGridData => {
    return {
        type: createTeamActionsTypes.SET_ANALYSIS_DATA,
        payload: gridData
    }
}

export const getGridDataAction = (params: CreateTeamPageUrlParams) => async (dispatch :Dispatch) => {
    dispatch(setLoadingGridDataAction(true));
    return Manager.getGridData(params)
        .then((result) => {
            dispatch(setGridDataAction(mapToGridData(result?.data?.data)))
            dispatch(
                setPaginationAction({
                   total: result?.data?.total,
                   pageSize: result?.data?.per_page,
                   current: result?.data?.current_page,
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
    const targetMember :GridDataUser | undefined = gridData.find(
        (user :GridDataUser) => user.id === id
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
    const filtered: GridDataUser[] = selectedUsersGridData.filter(
        (user: GridDataUser) => user.id !== id
    );
    dispatch(setSelectedUsersGridDataAction(filtered));
}

export const getAnalysisDataAction = () => (dispatch :Dispatch, getState :() => RootState) => {
    dispatch(setLoadingAnalysisDataAction(true));
    const {selectedUsersGridData} = getState()?.createTeam;
    const users = selectedUsersGridData.map(
        (item: GridDataUser) => item.id
    );

    return Manager.getAnalysis({ users })
        .then((result) => {
            dispatch(setAnalysisDataAction(result?.data));
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
        (item: GridDataUser) => item.id
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

export type CreateTeamPageActions = ISetLoadingAnalysisData | ISetLoadingGridData | ISavingTeamInProgress | ISetPagination | ISetGridData | ISetSelectedUsersGridData | ISetAnalysisUsersGridData;