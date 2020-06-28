import { observable, action } from "mobx";
import Manager from "../services/Manager";

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
        .catch((error) => console.log(error))
        .finally(() => {
          this.loading = false;
        });
  }
}

export default new EmployeeHomepageStore();
