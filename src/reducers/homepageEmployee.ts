import {IHomepageEmployeeStore} from "../interfaces/HomepageEmployee";
import {HomepageEmployeePageActions, homepageEmployeeActionTypes} from "../actions/homepageEmployeeActions";

const initialState: IHomepageEmployeeStore = {
    loading: false,
    feedItems: []
}

export default function homepageEmployeeReducer (state = initialState, action: HomepageEmployeePageActions) {
    switch (action.type) {
        case homepageEmployeeActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case homepageEmployeeActionTypes.SET_FEED_ITEMS:
            return {
                ...state,
                feedItems: action.payload
            }
        default:
            return state;
    }
}