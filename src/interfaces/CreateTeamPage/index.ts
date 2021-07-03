import {RouteComponentProps} from "react-router";
import { TablePaginationConfig } from "antd/lib/table/interface";
import {ITeamAnalysisUser, IGridDataUser} from "../user";
import {ICreateTeamPageUrlParams} from "../urlParams";

export interface ILegendItems {
  color: string;
  slug: string;
}

export interface ICreateTeamStore {
  loadingGridData: boolean;
  loadingAnalysisData: boolean;
  savingTeamInProgress: boolean;
  gridData: IGridDataUser[];
  selectedUsersGridData: IGridDataUser[];
  analysisData: ITeamAnalysisUser[];
  pagination: TablePaginationConfig;
  teamNameValue: string;
}

export interface ICreateTeamStatePageProps {
  gridData: IGridDataUser[],
  loadingGridData: boolean,
  pagination: TablePaginationConfig,
  analysisData: ITeamAnalysisUser[],
  savingTeamInProgress: boolean,
  selectedUsersGridData: IGridDataUser[],
  loadingAnalysisData: boolean,
  teamNameValue: string
}

export interface ICreateTeamDispatchPageProps {
  getGridData: (params: ICreateTeamPageUrlParams) => void,
  saveTeam: (name :string) => void,
  addTeamMember: (id: number) => void,
  removeTeamMember: (id: number) => void,
  getAnalysisData: () => void,
  setTeamNameValue: (name :string) => void,
}

export type CreateTeamPageProps = ICreateTeamStatePageProps & ICreateTeamDispatchPageProps & RouteComponentProps;