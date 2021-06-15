import {Dispatch} from "redux";
import {SelectOption} from "../interfaces/common";
import {IUser, UserId} from "../interfaces/user";
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

interface ISetLoadingEmployeesList {
    type: typeof feedbackActionsTypes.SET_LOADING_EMPLOYEES_LIST,
    payload: boolean
}

export const setLoadingEmployeesListAction = (loading: boolean): ISetLoadingEmployeesList => {
    return {
        type: feedbackActionsTypes.SET_LOADING_EMPLOYEES_LIST,
        payload: loading
    }
}

interface ISetLoadingSpecificEmployeeData {
    type: typeof feedbackActionsTypes.SET_LOADING_SPECIFIC_EMPLOYEE_DATA,
    payload: boolean
}

export const setLoadingSpecificEmployeeDataAction = (loading: boolean): ISetLoadingSpecificEmployeeData => {
    return {
        type: feedbackActionsTypes.SET_LOADING_SPECIFIC_EMPLOYEE_DATA,
        payload: loading
    }
}

interface ISetSubmittingFeedbackForm {
    type: typeof feedbackActionsTypes.SET_SUBMITTING_FEEDBACK_FORM,
    payload: boolean
}

export const setSubmittingFeedbackFormAction = (loading: boolean): ISetSubmittingFeedbackForm => {
    return {
        type: feedbackActionsTypes.SET_SUBMITTING_FEEDBACK_FORM,
        payload: loading
    }
}

interface ISetEmployeesList {
    type: typeof feedbackActionsTypes.SET_EMPLOYEES_LIST,
    payload: SelectOption[]
}

export const setEmployeesListAction = (list: SelectOption[]): ISetEmployeesList => {
    return {
        type: feedbackActionsTypes.SET_EMPLOYEES_LIST,
        payload: list
    }
}

interface ISetSpecificEmployeeData {
    type: typeof feedbackActionsTypes.SET_EMPLOYEE_DATA,
    payload: IUser
}

export const setSpecificEmployeeDataAction = (user: IUser): ISetSpecificEmployeeData => {
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

export const getSpecificEmployeeDataAction = (id: UserId) => async (dispatch :Dispatch) => {
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

export const submitFeedbackFormAction = (formData: unknown, targetUserId: UserId) => async (dispatch :Dispatch) => {
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

export type FeedbackPageActions = ISetLoadingEmployeesList | ISetLoadingSpecificEmployeeData | ISetSubmittingFeedbackForm | ISetEmployeesList | ISetSpecificEmployeeData;