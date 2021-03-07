import {TeamsPageActions, teamsPageActionTypes} from "../actions";
import {ITeamsListStore} from "../interfaces/TeamsList";

const intialState: ITeamsListStore = {
    loading: false,
    teams: []
}

export default function teamsListPageReducer(state = intialState, action: TeamsPageActions): ITeamsListStore {
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
