import { observable, action } from "mobx";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import mapToGridData from "../helpers/mapToGridData";
import mapResultsToManagerGridSelectOptions from "../helpers/mapResultsToManagerGridSelectOptions";

class ManagerHomepageStore {
  @observable loadingSelectOptions = false;

  @observable loadingGridData = false;

  @observable selectOptionsJobTitle = [];

  @observable pagination = {};

  @observable selectOptionsFocus = [];

  @observable gridData = [];

  @action
  getSelectOptions() {
    this.loadingSelectOptions = true;
    return Manager.getSelectOptions()
        .then((result) => {
          this.selectOptionsJobTitle = mapResultsToManagerGridSelectOptions(result?.data?.jobs);
          this.selectOptionsFocus = mapResultsToManagerGridSelectOptions(result?.data?.focuses);
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
          this.loadingSelectOptions = false;
        });
  }

  @action
  getGridData(params) {
    this.loadingGridData = true;
    return Manager.getGridData(params)
        .then((result) => {
          this.gridData = mapToGridData(result?.data?.data);
          this.pagination = {
            total: result?.data?.total,
            pageSize: result?.data?.per_page,
            current: result?.data?.current_page
          }
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
          this.loadingGridData = false;
        });
  }
}

export default new ManagerHomepageStore();
