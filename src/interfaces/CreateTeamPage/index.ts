import { TablePaginationConfig } from "antd/lib/table/interface";
import { TeamAnalisysUser, GridDataUser } from "../user";

export interface ILegendItems {
  color: string;
  slug: string;
}

export interface ICreateTeamStore {
  loadingGridData: boolean;
  loadingAnalysisData: boolean;
  savingTeamInProgress: boolean;
  gridData: GridDataUser[];
  selectedUsersGridData: GridDataUser[];
  analysisData: TeamAnalisysUser[];
  pagination: TablePaginationConfig;
}
