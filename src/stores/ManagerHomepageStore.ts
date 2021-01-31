import { observable, action } from "mobx";
import { TablePaginationConfig } from "antd/lib/table/interface";
import Manager from "../services/Manager";
import showErrorMessage from "../helpers/showErrorMessage";
import mapToGridData from "../helpers/mapToGridData";
import mapResultsToManagerGridSelectOptions from "../helpers/mapResultsToManagerGridSelectOptions";
import { GridDataUser } from "../interfaces/user";
import { HomepageManagerUrlParams } from "../interfaces/urlParams";
import { SelectOption } from "../interfaces/common";
import { IManagerHomepageStore } from "../interfaces/HomepageManager";

class ManagerHomepageStore implements IManagerHomepageStore {
  @observable loadingSelectOptions: boolean = false;

  @observable loadingGridData: boolean = false;

  @observable selectOptionsJobTitle: SelectOption[] = [];

  @observable pagination: TablePaginationConfig = <TablePaginationConfig>{};

  @observable selectOptionsFocus: SelectOption[] = [];

  @observable gridData: GridDataUser[] = [];

  @action
  getSelectOptions() {
    this.loadingSelectOptions = true;
    return Manager.getSelectOptions()
      .then((result) => {
        this.selectOptionsJobTitle = mapResultsToManagerGridSelectOptions(
          result?.data?.jobs
        );
        this.selectOptionsFocus = mapResultsToManagerGridSelectOptions(
          result?.data?.focuses
        );
      })
      .catch((error) => showErrorMessage(error))
      .finally(() => {
        this.loadingSelectOptions = false;
      });
  }

  @action
  getGridData(params: HomepageManagerUrlParams) {
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
}

export default new ManagerHomepageStore();
