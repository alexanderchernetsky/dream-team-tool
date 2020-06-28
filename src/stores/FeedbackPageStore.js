import { observable, action } from "mobx";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import mapResultsToSelectOptions from "../helpers/mapResultsToSelectOptions";
import showSuccessMessage from "../helpers/showSuccessMessage";

class FeedbackPageStore {
  @observable loadingEmployeesList = false;

  @observable loadingSpecificEmployeeData = false;

  @observable submittingFeedbackForm = false;

  @observable employeesList = [];

  @observable employeeData = [];

  @action
  getEmployeesList(params) {
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
  getSpecificEmployeeData(id) {
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
    this.employeeData = [];
  }

  @action
  submitFeedbackForm(formData, targetUserId) {
    this.submittingFeedbackForm = true;
    return Manager.sendFeedbackForm(formData, targetUserId)
        .then((result) => {
          showSuccessMessage(result.message);
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
          this.submittingFeedbackForm = false;
        });
  }
}

export default new FeedbackPageStore();
