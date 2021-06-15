import {RouteComponentProps} from "react-router";
import { SelectOption } from "../common";
import { IUser, UserId } from "../user";
import {FeedbackPageUrlParams} from "../urlParams";

export interface IFeedbackPageStore {
  loadingEmployeesList: boolean;
  loadingSpecificEmployeeData: boolean;
  submittingFeedbackForm: boolean;
  employeesList: SelectOption[];
  employeeData: IUser;
}

export interface IFeedbackStatePageProps {
  loadingEmployeesList: boolean;
  loadingSpecificEmployeeData: boolean;
  submittingFeedbackForm: boolean;
  employeesList: SelectOption[];
  employeeData: IUser;
}

export interface IFeedbackDispatchPageProps {
  getSpecificEmployeeData: (id: UserId) => void,
  removeSpecificEmployeeData: () => void,
  submitFeedbackForm: (formData: unknown, targetUserId: UserId) => void,
  getEmployeesList: (params: FeedbackPageUrlParams) => void
}

export type FeedbackPageProps = IFeedbackStatePageProps & IFeedbackDispatchPageProps & RouteComponentProps