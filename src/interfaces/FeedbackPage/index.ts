import {RouteComponentProps} from "react-router";
import { ISelectOption } from "../common";
import { IUser, UserId } from "../user";
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
  getSpecificEmployeeData: (id: UserId) => void,
  removeSpecificEmployeeData: () => void,
  submitFeedbackForm: (formData: unknown, targetUserId: UserId) => void,
  getEmployeesList: (params: IFeedbackPageUrlParams) => void
}

export type FeedbackPageProps = IFeedbackStatePageProps & IFeedbackDispatchPageProps & RouteComponentProps