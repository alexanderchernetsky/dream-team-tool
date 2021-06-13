import {RouteComponentProps} from "react-router";
import { SelectOption } from "../common";
import { IUser } from "../user";
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
  getSpecificEmployeeData: (id: number | string) => void,
  removeSpecificEmployeeData: () => void,
  submitFeedbackForm: (formData: unknown, targetUserId: number | string) => void,
  getEmployeesList: (params: FeedbackPageUrlParams) => void
}

export type FeedbackPageProps = IFeedbackStatePageProps & IFeedbackDispatchPageProps & RouteComponentProps