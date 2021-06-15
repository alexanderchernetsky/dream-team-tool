import {ITeam} from "../interfaces/TeamsList";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import parseTeams from "../parsers/teamsListPage";
import {IActionPromise} from "../interfaces/common";

export enum teamsPageActionTypes {
    SET_LOADING = 'TEAMS_PAGE/SET_LOADING',
    SET_TEAMS = 'TEAMS_PAGE/SET_TEAMS',
    GET_TEAMS = 'TEAMS_PAGE/GET_TEAMS'
}

interface ISetLoadingAction {
    type: typeof teamsPageActionTypes.SET_LOADING,
    payload: boolean
}

export function setLoading(isLoading: boolean): ISetLoadingAction {
    return {
        type: teamsPageActionTypes.SET_LOADING,
        payload: isLoading
    }
}

interface ISetTeamsAction {
    type: typeof teamsPageActionTypes.SET_TEAMS,
    payload: ITeam[]
}

export function setTeams(teams: ITeam[]): ISetTeamsAction {
    return {
        type: teamsPageActionTypes.SET_TEAMS,
        payload: teams
    }
}

interface IGetTeamsAction {
    type: typeof teamsPageActionTypes.GET_TEAMS
}

export function getTeams(): IActionPromise<Promise<ISetTeamsAction | void>> {
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

export type TeamsPageActions = ISetLoadingAction | ISetTeamsAction | IGetTeamsAction;
