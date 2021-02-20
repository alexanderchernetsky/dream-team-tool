import { observable, action } from "mobx";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import { EmployeeHomepageUrlParams } from "../interfaces/urlParams";
import {
  IHomepageEmployeeStore,
  IFeedItems,
} from "../interfaces/HomepageEmployee";

class EmployeeHomepageStore implements IHomepageEmployeeStore {
  @observable loading: boolean = false;

  @observable feedItems: IFeedItems = <IFeedItems>{};

  @action
  getFeedItems(params: EmployeeHomepageUrlParams) {
    this.loading = true;
    return Manager.getFeedItems(params)
      .then((result) => {
        this.feedItems = result.data;
      })
      .catch((error: Response) => showErrorMessage(error))
      .finally(() => {
        this.loading = false;
      });
  }
}

export default new EmployeeHomepageStore();
