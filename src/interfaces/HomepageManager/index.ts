import { TablePaginationConfig } from "antd/lib/table/interface";
import { GridDataUser } from "../user";
import { SelectOption } from "../common";

export interface IManagerHomepageStore {
  loadingSelectOptions: boolean;
  loadingGridData: boolean;
  selectOptionsJobTitle: SelectOption[];
  pagination: TablePaginationConfig;
  selectOptionsFocus: SelectOption[];
  gridData: GridDataUser[];
}
