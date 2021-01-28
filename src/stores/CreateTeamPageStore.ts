import { observable, action } from "mobx";
import { TablePaginationConfig } from "antd/lib/table/interface";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import mapToGridData from "../helpers/mapToGridData";
import showSuccessMessage from "../helpers/showSuccessMessage";
import { TeamAnalisysUser, GridDataUser } from "../interfaces/user";
import { CreateTeamPageUrlParams } from "../interfaces/urlParams";

interface ICreateTeamStore {
  loadingGridData: boolean;
  loadingAnalysisData: boolean;
  savingTeamInProgress: boolean;
  gridData: GridDataUser[];
  selectedUsersGridData: GridDataUser[];
  analysisData: TeamAnalisysUser[];
  pagination: TablePaginationConfig;
}

class CreateTeamStore implements ICreateTeamStore {
  @observable loadingGridData: boolean = false;

  @observable loadingAnalysisData: boolean = false;

  @observable savingTeamInProgress: boolean = false;

  @observable pagination: TablePaginationConfig = {};

  @observable gridData: GridDataUser[] = [];

  @observable selectedUsersGridData: GridDataUser[] = [];

  @observable analysisData: TeamAnalisysUser[] = [];

  @action
  getGridData(params: CreateTeamPageUrlParams) {
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
  addTeamMember(id: number) {
    const targetMember: GridDataUser | undefined = this.gridData.find(
      (user: GridDataUser) => user.id === id
    );
    if (targetMember) {
      this.selectedUsersGridData.push(targetMember);
    }
  }

  @action
  removeTeamMember(id: number) {
    const filtered: GridDataUser[] = this.selectedUsersGridData.filter(
      (user: GridDataUser) => user.id !== id
    );
    this.selectedUsersGridData = filtered;
  }

  @action
  getAnalysisData() {
    this.loadingAnalysisData = true;
    const users = this.selectedUsersGridData.map(
      (item: GridDataUser) => item.id
    );
    return Manager.getAnalysis({ users })
      .then((result) => {
        this.analysisData = result?.data;
      })
      .catch((error) => showErrorMessage(error))
      .finally(() => {
        this.loadingAnalysisData = false;
      });
  }

  @action
  saveTeam(name: string) {
    this.savingTeamInProgress = true;
    const users = this.selectedUsersGridData.map(
      (item: GridDataUser) => item.id
    );
    return Manager.saveTeam({ name, users })
      .then(() => {
        showSuccessMessage();
      })
      .catch((error) => showErrorMessage(error))
      .finally(() => {
        this.savingTeamInProgress = false;
      });
  }
}

export default new CreateTeamStore();
