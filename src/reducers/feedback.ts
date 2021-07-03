import {IFeedbackPageStore} from "../interfaces/FeedbackPage";
import {IUser} from "../interfaces/user";
import {FeedbackPageActions, feedbackActionsTypes} from "../actions/feedbackActions";

const initialState: IFeedbackPageStore = {
    loadingEmployeesList: false,
    loadingSpecificEmployeeData: false,
    submittingFeedbackForm: false,
    employeesList: [],
    employeeData: {} as IUser,
}

export default function feedbackReducer (state=initialState, action: FeedbackPageActions) {
    switch (action.type) {
        case feedbackActionsTypes.SET_LOADING_EMPLOYEES_LIST:
            return {
                ...state,
                loadingEmployeesList: action.payload
            }
        case feedbackActionsTypes.SET_LOADING_SPECIFIC_EMPLOYEE_DATA:
            return {
                ...state,
                loadingSpecificEmployeeData: action.payload
            }
        case feedbackActionsTypes.SET_SUBMITTING_FEEDBACK_FORM:
            return {
                ...state,
                submittingFeedbackForm: action.payload
            }
        case feedbackActionsTypes.SET_EMPLOYEES_LIST:
            return {
                ...state,
                employeesList: action.payload
            }
        case feedbackActionsTypes.SET_EMPLOYEE_DATA:
            return {
                ...state,
                employeeData: action.payload
            }
        default:
            return state;
    }
}