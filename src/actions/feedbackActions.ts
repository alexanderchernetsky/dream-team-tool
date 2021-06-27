import {Dispatch} from "redux";
import {ISelectOption} from "../interfaces/common";
import {IUser} from "../interfaces/user";
import {IFeedbackPageUrlParams} from "../interfaces/urlParams";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import showSuccessMessage from "../helpers/showSuccessMessage";
import {parseSelectOptions, parseEmployee} from "../parsers/feedbackPage";
import {IFeedbackResponse} from "../interfaces/FeedbackPage";

export enum feedbackActionsTypes {
    SET_LOADING_EMPLOYEES_LIST = 'FEEDBACK/SET_LOADING_EMPLOYEES_LIST',
    SET_LOADING_SPECIFIC_EMPLOYEE_DATA = 'FEEDBACK/SET_LOADING_SPECIFIC_EMPLOYEE_DATA',
    SET_SUBMITTING_FEEDBACK_FORM = 'FEEDBACK/SET_SUBMITTING_FEEDBACK_FORM',
    SET_EMPLOYEES_LIST = 'FEEDBACK/SET_EMPLOYEES_LIST',
    SET_EMPLOYEE_DATA = 'FEEDBACK/SET_EMPLOYEE_DATA',
}



interface ISetLoadingEmployeesListAction {
    type: typeof feedbackActionsTypes.SET_LOADING_EMPLOYEES_LIST,
    payload: boolean
}

export const setLoadingEmployeesListAction = (loading: boolean): ISetLoadingEmployeesListAction => {
    return {
        type: feedbackActionsTypes.SET_LOADING_EMPLOYEES_LIST,
        payload: loading
    }
}

interface ISetLoadingSpecificEmployeeDataAction {
    type: typeof feedbackActionsTypes.SET_LOADING_SPECIFIC_EMPLOYEE_DATA,
    payload: boolean
}

export const setLoadingSpecificEmployeeDataAction = (loading: boolean): ISetLoadingSpecificEmployeeDataAction => {
    return {
        type: feedbackActionsTypes.SET_LOADING_SPECIFIC_EMPLOYEE_DATA,
        payload: loading
    }
}

interface ISetSubmittingFeedbackFormAction {
    type: typeof feedbackActionsTypes.SET_SUBMITTING_FEEDBACK_FORM,
    payload: boolean
}

export const setSubmittingFeedbackFormAction = (loading: boolean): ISetSubmittingFeedbackFormAction => {
    return {
        type: feedbackActionsTypes.SET_SUBMITTING_FEEDBACK_FORM,
        payload: loading
    }
}

interface ISetEmployeesListAction {
    type: typeof feedbackActionsTypes.SET_EMPLOYEES_LIST,
    payload: ISelectOption[]
}

export const setEmployeesListAction = (list: ISelectOption[]): ISetEmployeesListAction => {
    return {
        type: feedbackActionsTypes.SET_EMPLOYEES_LIST,
        payload: list
    }
}

interface ISetSpecificEmployeeDataAction {
    type: typeof feedbackActionsTypes.SET_EMPLOYEE_DATA,
    payload: IUser
}

export const setSpecificEmployeeDataAction = (user: IUser): ISetSpecificEmployeeDataAction => {
    return {
        type: feedbackActionsTypes.SET_EMPLOYEE_DATA,
        payload: user
    }
}

export const getEmployeesListAction = (params: IFeedbackPageUrlParams) => async (dispatch :Dispatch) => {
    dispatch(setLoadingEmployeesListAction(true));
    return Manager.getEmployeesList(params)
        .then((result :IFeedbackResponse) => {
            const parsedData = parseSelectOptions(result);

            dispatch(setEmployeesListAction(parsedData));
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setLoadingEmployeesListAction(false))
        });
}

export const getSpecificEmployeeDataAction = (id: number) => async (dispatch :Dispatch) => {
    dispatch(setLoadingSpecificEmployeeDataAction(true));

    return Manager.getSpecificEmployeeData(id)
        .then((result :unknown) => {
            const parsedData = parseEmployee(result);
            dispatch(setSpecificEmployeeDataAction(parsedData))
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
            dispatch(setLoadingSpecificEmployeeDataAction(false));
        });
}

export const removeSpecificEmployeeDataAction = () => (dispatch :Dispatch) => {
    dispatch(setSpecificEmployeeDataAction({} as IUser));
}

export const submitFeedbackFormAction = (formData: unknown, targetUserId: number) => async (dispatch :Dispatch) => {
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

export type FeedbackPageActions =
    ISetLoadingEmployeesListAction |
    ISetLoadingSpecificEmployeeDataAction |
    ISetSubmittingFeedbackFormAction |
    ISetEmployeesListAction |
    ISetSpecificEmployeeDataAction;