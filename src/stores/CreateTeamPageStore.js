import { observable, action } from "mobx";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import mapToGridData from "../helpers/mapToGridData";

class CreateTeamStore {
  @observable loadingGridData = false;

  @observable pagination = {};

  @observable gridData = [];

  @observable selectedUsersGridData = [];

  @action
  getGridData(params) {
    this.loadingGridData = true;
    return Manager.getGridData(params)
      .then((result) => {
        this.gridData = mapToGridData(result?.data?.data);
        this.pagination = {
          total: result?.data?.total,
          pageSize: result?.data?.per_page,
          current: result?.data?.current_page,
        };
      })
      .catch((error) => showErrorMessage(error))
      .finally(() => {
        this.loadingGridData = false;
      });
  }

  @action
  addTeamMember(id) {
    const targetMember = this.gridData.find(user => user.id === id);
    this.selectedUsersGridData = [...this.selectedUsersGridData, targetMember];
  }

  @action
  removeTeamMember(id) {
    const filtered = this.selectedUsersGridData.filter(user => user.id !== id);
    this.selectedUsersGridData = filtered;
  }
}

export default new CreateTeamStore();
