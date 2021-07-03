import {TeamsPageActions, teamsPageActionTypes} from "../actions/teamsListActions";
import {ITeamsListStore} from "../interfaces/TeamsList";

const initialState: ITeamsListStore = {
    loading: false,
    teams: []
}

export default function teamsListPageReducer(state = initialState, action: TeamsPageActions): ITeamsListStore {
    switch (action.type) {
        case teamsPageActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case teamsPageActionTypes.SET_TEAMS:
            return {
                ...state,
                teams: action.payload
            }

        default:
            return state;
    }
}
