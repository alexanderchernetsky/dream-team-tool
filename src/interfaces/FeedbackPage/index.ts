import {RouteComponentProps} from "react-router";
import { ISelectOption } from "../common";
import { IUser } from "../user";
import {IFeedbackPageUrlParams} from "../urlParams";

export interface IFeedbackPageStore {
  loadingEmployeesList: boolean;
  loadingSpecificEmployeeData: boolean;
  submittingFeedbackForm: boolean;
  employeesList: ISelectOption[];
  employeeData: IUser;
}

export interface IFeedbackStatePageProps {
  loadingEmployeesList: boolean;
  loadingSpecificEmployeeData: boolean;
  submittingFeedbackForm: boolean;
  employeesList: ISelectOption[];
  employeeData: IUser;
}

export interface IFeedbackDispatchPageProps {
  getSpecificEmployeeData: (id: number) => void,
  removeSpecificEmployeeData: () => void,
  submitFeedbackForm: (formData: unknown, targetUserId: number) => void,
  getEmployeesList: (params: IFeedbackPageUrlParams) => void
}

export interface IFeedbackResponse {
  data: {}
}

export type FeedbackPageProps = IFeedbackStatePageProps & IFeedbackDispatchPageProps & RouteComponentProps