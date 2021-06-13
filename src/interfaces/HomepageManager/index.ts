import {RouteComponentProps} from "react-router";
import { TablePaginationConfig } from "antd/lib/table/interface";
import { GridDataUser } from "../user";
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