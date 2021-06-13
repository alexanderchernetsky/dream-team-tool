import {TablePaginationConfig} from "antd/lib/table/interface";
import {IManagerHomepageStore} from "../interfaces/HomepageManager";
import {HomepageManagerPageActions, homepageManagerActionTypes} from "../actions/homepageManagerActions";

const initialState: IManagerHomepageStore = {
    loadingSelectOptions: false,
    loadingGridData: false,
    selectOptionsJobTitle: [],
    pagination: {} as TablePaginationConfig,
    selectOptionsFocus: [],
    gridData: []
}

export default function homepageManagerReducer (state = initialState, action: HomepageManagerPageActions) {
    switch (action.type) {
        case homepageManagerActionTypes.SET_LOADING_SElECT_OPTIONS:
            return {
                ...state,
                loadingSelectOptions: action.payload
            }
        case homepageManagerActionTypes.SET_LOADING_GRID_DATA:
            return {
                ...state,
                loadingGridData: action.payload
            }
        case homepageManagerActionTypes.SET_SELECT_OPTIONS_JOB_TITLE:
            return {
                ...state,
                selectOptionsJobTitle: action.payload
            }
        case homepageManagerActionTypes.SET_PAGINATION:
            return {
                ...state,
                pagination: action.payload
            }
        case homepageManagerActionTypes.SET_SELECT_OPTIONS_FOCUS:
            return {
                ...state,
                selectOptionsFocus: action.payload
            }
        case homepageManagerActionTypes.SET_GRID_DATA:
            return {
                ...state,
                gridData: action.payload
            }
        default:
            return state;
    }
}