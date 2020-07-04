import { observable, action } from "mobx";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";

class EmployeeHomepageStore {
  @observable loading = false;

  @observable feedItems = [];

  @action
  getFeedItems(params) {
    this.loading = true;
    return Manager.getFeedItems(params)
        .then((result) => {
          this.feedItems = result.data;
        })
        .catch((error) => showErrorMessage(error))
        .finally(() => {
          this.loading = false;
        });
  }
}

export default new EmployeeHomepageStore();
