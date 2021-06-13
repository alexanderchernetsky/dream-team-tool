import {Dispatch} from "redux";
import {SelectOption} from "../interfaces/common";
import {IUser} from "../interfaces/user";
import {FeedbackPageUrlParams} from "../interfaces/urlParams";
import Manager from "../services/Manager";
import mapResultsToSelectOptions from "../helpers/mapResultsToSelectOptions";
import showErrorMessage from "../helpers/showErrorMessage";
import showSuccessMessage from "../helpers/showSuccessMessage";

export enum feedbackActionsTypes {
    SET_LOADING_EMPLOYEES_LIST = 'FEEDBACK/SET_LOADING_EMPLOYEES_LIST',
    SET_LOADING_SPECIFIC_EMPLOYEE_DATA = 'FEEDBACK/SET_LOADING_SPECIFIC_EMPLOYEE_DATA',
    SET_SUBMITTING_FEEDBACK_FORM = 'FEEDBACK/SET_SUBMITTING_FEEDBACK_FORM',
    SET_EMPLOYEES_LIST = 'FEEDBACK/SET_EMPLOYEES_LIST',
    SET_EMPLOYEE_DATA = 'FEEDBACK/SET_EMPLOYEE_DATA',
}

interface SetLoadingEmployeesList {
    type: typeof feedbackActionsTypes.SET_LOADING_EMPLOYEES_LIST,
    payload: boolean
}

export const setLoadingEmployeesListAction = (loading: boolean): SetLoadingEmployeesList => {
    return {
        type: feedbackActionsTypes.SET_LOADING_EMPLOYEES_LIST,
        payload: loading
    }
}

interface SetLoadingSpecificEmployeeData {
    type: typeof feedbackActionsTypes.SET_LOADING_SPECIFIC_EMPLOYEE_DATA,
    payload: boolean
}

export const setLoadingSpecificEmployeeDataAction = (loading: boolean): SetLoadingSpecificEmployeeData => {
    return {
        type: feedbackActionsTypes.SET_LOADING_SPECIFIC_EMPLOYEE_DATA,
        payload: loading
    }
}

interface SetSubmittingFeedbackForm {
    type: typeof feedbackActionsTypes.SET_SUBMITTING_FEEDBACK_FORM,
    payload: boolean
}

export const setSubmittingFeedbackFormAction = (loading: boolean): SetSubmittingFeedbackForm => {
    return {
        type: feedbackActionsTypes.SET_SUBMITTING_FEEDBACK_FORM,
        payload: loading
    }
}

interface SetEmployeesList {
    type: typeof feedbackActionsTypes.SET_EMPLOYEES_LIST,
    payload: SelectOption[]
}

export const setEmployeesListAction = (list: SelectOption[]): SetEmployeesList => {
    return {
        type: feedbackActionsTypes.SET_EMPLOYEES_LIST,
        payload: list
    }
}

interface SetSpecificEmployeeData {
    type: typeof feedbackActionsTypes.SET_EMPLOYEE_DATA,
    payload: IUser
}

export const setSpecificEmployeeDataAction = (user: IUser): SetSpecificEmployeeData => {
    return {
        type: feedbackActionsTypes.SET_EMPLOYEE_DATA,
        payload: user
    }
}

export const getEmployeesListAction = (params: FeedbackPageUrlParams) => async (dispatch :Dispatch) => {
    dispatch(setLoadingEmployeesListAction(true));
    return Manager.getEmployeesList(params)
        .then((result) => {
            dispatch(setEmployeesListAction(mapResultsToSelectOptions(result?.data)))
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setLoadingEmployeesListAction(false))
        });
}

export const getSpecificEmployeeDataAction = (id: number | string) => async( dispatch :Dispatch) => {
    dispatch(setLoadingSpecificEmployeeDataAction(true));

    return Manager.getSpecificEmployeeData(id)
        .then((result) => {
            dispatch(setSpecificEmployeeDataAction(result?.data))
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setLoadingSpecificEmployeeDataAction(false));
        });
}

export const removeSpecificEmployeeDataAction = () => (dispatch :Dispatch) => {
    dispatch(setSpecificEmployeeDataAction({} as IUser));
}

export const submitFeedbackFormAction = (formData: unknown, targetUserId: number | string) => async (dispatch :Dispatch) => {
    dispatch(setSubmittingFeedbackFormAction(true));
    return Manager.sendFeedbackForm(formData, targetUserId)
        .then(() => {
            showSuccessMessage("success");
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setSubmittingFeedbackFormAction(false));
        });
}

export type FeedbackPageActions = SetLoadingEmployeesList | SetLoadingSpecificEmployeeData | SetSubmittingFeedbackForm | SetEmployeesList | SetSpecificEmployeeData;