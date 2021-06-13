import {ICreateTeamStore} from "../interfaces/CreateTeamPage";
import {CreateTeamPageActions, createTeamActionsTypes} from "../actions/createTeamActions";

const initialState: ICreateTeamStore = {
    loadingGridData: false,
    loadingAnalysisData: false,
    savingTeamInProgress: false,
    pagination: {},
    gridData: [],
    selectedUsersGridData: [],
    analysisData: []
}

export default function createTeamReducer (state = initialState, action: CreateTeamPageActions) {
    switch(action.type) {
        case createTeamActionsTypes.SET_LOADING_GRID_DATA:
            return {
                ...state,
                loadingGridData: action.payload
            }
        case createTeamActionsTypes.SET_SAVING_TEAM_IN_PROGRESS:
            return {
                ...state,
                savingTeamInProgress: action.payload
            }
        case createTeamActionsTypes.SET_LOADING_ANALYSIS_DATA:
            return {
                ...state,
                loadingAnalysisData: action.payload
            }
        case createTeamActionsTypes.SET_PAGINATION:
            return {
                ...state,
                pagination: action.payload
            }
        case createTeamActionsTypes.SET_GRID_DATA:
            return {
                ...state,
                gridData: action.payload
            }
        case createTeamActionsTypes.SET_SELECTED_USERS_GRID_DATA:
            return {
                ...state,
                selectedUsersGridData: action.payload
            }
        case createTeamActionsTypes.SET_ANALYSIS_DATA:
            return {
                ...state,
                analysisData: action.payload
            }
        default:
            return state;
    }
}