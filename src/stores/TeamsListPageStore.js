import { observable, action } from "mobx";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";

class TeamsListPageStore {
  @observable loading = false;

  @observable teams = [];

  @action
  getTeams() {
    this.loading = true;
    return Manager.getTeams()
      .then((result) => {
        this.teams = result;
      })
      .catch((error) => showErrorMessage(error))
      .finally(() => {
        this.loading = false;
      });
  }
}

export default new TeamsListPageStore();
