import {ITeam} from "../interfaces/TeamsList";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import parseTeams from "../parsers/teamsListPage";

export enum teamsPageActionTypes {
    SET_LOADING = 'TEAMS_PAGE/SET_LOADING',
    SET_TEAMS = 'TEAMS_PAGE/SET_TEAMS',
    GET_TEAMS = 'TEAMS_PAGE/GET_TEAMS'
}

interface SetLoadingAction {
    type: typeof teamsPageActionTypes.SET_LOADING,
    payload: boolean
}

export function setLoading(isLoading: boolean): SetLoadingAction {
    return {
        type: teamsPageActionTypes.SET_LOADING,
        payload: isLoading
    }
}

interface SetTeamsAction {
    type: typeof teamsPageActionTypes.SET_TEAMS,
    payload: ITeam[]
}

export function setTeams(teams: ITeam[]): SetTeamsAction {
    return {
        type: teamsPageActionTypes.SET_TEAMS,
        payload: teams
    }
}

interface GetTeamsAction {
    type: typeof teamsPageActionTypes.GET_TEAMS
}

// TODO: add return type to the function
// TODO: add redux-thunk dispatch type
export function getTeams() {
    // @ts-ignore
    return function (dispatch) {
        dispatch(setLoading(true));
        return Manager.getTeams()
            .then((response: unknown) => dispatch(setTeams(parseTeams(response))))
            .catch(error => showErrorMessage(error))
            .finally(() => {
                dispatch(setLoading(false));
            });
    }
}

export type TeamsPageActions = SetLoadingAction | SetTeamsAction | GetTeamsAction;
