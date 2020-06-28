import { observable, action } from "mobx";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import mapResultsToSelectOptions from "../helpers/mapResultsToSelectOptions";

class FeedbackPageStore {
  @observable loadingEmployeesList = false;

  @observable loadingSpecificEmployeeData = false;

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
}

export default new FeedbackPageStore();
