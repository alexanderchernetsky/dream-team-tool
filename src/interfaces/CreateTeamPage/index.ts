import {RouteComponentProps} from "react-router";
import { TablePaginationConfig } from "antd/lib/table/interface";
import {TeamAnalisysUser, GridDataUser} from "../user";
import {CreateTeamPageUrlParams} from "../urlParams";

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

export interface ICreateTeamStatePageProps {
  gridData: GridDataUser[],
  loadingGridData: boolean,
  pagination: TablePaginationConfig,
  analysisData: TeamAnalisysUser[],
  savingTeamInProgress: boolean,
  selectedUsersGridData: GridDataUser[],
  loadingAnalysisData: boolean
}

export interface ICreateTeamDispatchPageProps {
  getGridData: (params: CreateTeamPageUrlParams) => void,
  saveTeam: (name :string) => void,
  addTeamMember: (id: number) => void,
  removeTeamMember: (id: number) => void,
  getAnalysisData: () => void,
}

export type CreateTeamPageProps =  ICreateTeamStatePageProps & ICreateTeamDispatchPageProps & RouteComponentProps