import {RouteComponentProps} from "react-router";
import { TablePaginationConfig } from "antd/lib/table/interface";
import {IGridDataUser} from "../user";
import { ISelectOption } from "../common";
import {IHomepageManagerUrlParams} from "../urlParams";

export interface IManagerHomepageStore {
  loadingSelectOptions: boolean;
  loadingGridData: boolean;
  selectOptionsJobTitle: ISelectOption[];
  pagination: TablePaginationConfig;
  selectOptionsFocus: ISelectOption[];
  gridData: IGridDataUser[];
}

export interface IHomepageManagerStatePageProps {
  selectOptionsJobTitle: ISelectOption[],
  selectOptionsFocus: ISelectOption[],
  gridData: IGridDataUser[],
  pagination: TablePaginationConfig,
  loadingGridData: boolean
}

export interface IHomepageManagerDispatchProps {
  getSelectOptions: () => void,
  getGridData: (params: IHomepageManagerUrlParams) => void
}

export type HomepageManagerPageProps = IHomepageManagerStatePageProps & IHomepageManagerDispatchProps & RouteComponentProps;

export interface IHomepageManagerSelectOptions {
  jobs: string[],
  focuses: string[]
}
