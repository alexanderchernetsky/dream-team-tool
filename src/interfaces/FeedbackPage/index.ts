import { SelectOption } from "../common";
import { IUser } from "../user";

export interface IFeedbackPageStore {
  loadingEmployeesList: boolean;
  loadingSpecificEmployeeData: boolean;
  submittingFeedbackForm: boolean;
  employeesList: SelectOption[];
  employeeData: IUser;
}
