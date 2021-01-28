import { observable, action } from "mobx";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import { HomepageEmployeeUser } from "../interfaces/user";
import { EmployyeHomepageUrlParams } from "../interfaces/urlParams";

interface IFeedItems {
  data: HomepageEmployeeUser[];
}

interface IHomepageEmployee {
  feedItems: IFeedItems;
  loading: boolean;
}

class EmployeeHomepageStore implements IHomepageEmployee {
  @observable loading: boolean = false;

  @observable feedItems: IFeedItems = {
    data: [],
  };

  @action
  getFeedItems(params: EmployyeHomepageUrlParams) {
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
