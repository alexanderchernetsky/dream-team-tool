import {RouteComponentProps} from "react-router";
import { TablePaginationConfig } from "antd/lib/table/interface";
import {GridDataUser, IUser} from "../user";
import { SelectOption } from "../common";
import {HomepageManagerUrlParams} from "../urlParams";

export interface IManagerHomepageStore {
  loadingSelectOptions: boolean;
  loadingGridData: boolean;
  selectOptionsJobTitle: SelectOption[];
  pagination: TablePaginationConfig;
  selectOptionsFocus: SelectOption[];
  gridData: GridDataUser[];
}

export interface IHomepageManagerStatePageProps {
  selectOptionsJobTitle: SelectOption[],
  selectOptionsFocus: SelectOption[],
  gridData: GridDataUser[],
  pagination: TablePaginationConfig,
  loadingGridData: boolean
}

export interface IHomepageManagerDispatchProps {
  getSelectOptions: () => void,
  getGridData: (params: HomepageManagerUrlParams) => void
}

export type HomepageManagerPageProps = IHomepageManagerStatePageProps & IHomepageManagerDispatchProps & RouteComponentProps;

export interface IHomepageManagerGridData {
  total: number;
  per_page: number;
  current_page: number;
  data: IUser[]
}
export interface IHomepageManagerSelectOptions {
  jobs: string[],
  focuses: string[]
}
