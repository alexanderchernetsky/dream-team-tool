import { observable, action } from "mobx";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import { ITeam } from "../interfaces/team";

interface ITeamsPage {
  loading: boolean;
  teams: {
    data: ITeam[];
  };
}

class TeamsListPageStore implements ITeamsPage {
  @observable loading: boolean = false;

  @observable teams: {
    data: ITeam[];
  } = { data: [] };

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
