import { observable, action } from "mobx";
import { Store } from "antd/lib/form/interface";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import mapResultsToSelectOptions from "../helpers/mapResultsToSelectOptions";
import showSuccessMessage from "../helpers/showSuccessMessage";
import { FeedbackPageUrlParams } from "../interfaces/urlParams";
import { IUser } from "../interfaces/user";
import { SelectOption } from "../interfaces/common";
import { IFeedbackPageStore } from "../interfaces/FeedbackPage";

class FeedbackPageStore implements IFeedbackPageStore {
  @observable loadingEmployeesList: boolean = false;

  @observable loadingSpecificEmployeeData: boolean = false;

  @observable submittingFeedbackForm: boolean = false;

  @observable employeesList: SelectOption[] = [];

  @observable employeeData: IUser = <IUser>{};

  @action
  getEmployeesList(params: FeedbackPageUrlParams) {
    this.loadingEmployeesList = true;
    return Manager.getEmployeesList(params)
      .then((result) => {
        this.employeesList = mapResultsToSelectOptions(result.data);
      })
      .catch((error) => showErrorMessage(error))
      .finally(() => {
        this.loadingEmployeesList = false;
      });
  }

  @action
  getSpecificEmployeeData(id: string | number) {
    this.loadingSpecificEmployeeData = true;
    return Manager.getSpecificEmployeeData(id)
      .then((result) => {
        this.employeeData = result.data;
      })
      .catch((error) => showErrorMessage(error))
      .finally(() => {
        this.loadingSpecificEmployeeData = false;
      });
  }

  @action
  removeSpecificEmployeeData() {
    this.employeeData = <IUser>{};
  }

  @action
  submitFeedbackForm(formData: Store, targetUserId: number | string) {
    this.submittingFeedbackForm = true;
    return Manager.sendFeedbackForm(formData, targetUserId)
      .then(() => {
        showSuccessMessage("success");
      })
      .catch((error) => showErrorMessage(error))
      .finally(() => {
        this.submittingFeedbackForm = false;
      });
  }
}

export default new FeedbackPageStore();
