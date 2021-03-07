export interface ITeam {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
  users_count: number;
}

export interface ITeamsListStore {
  loading: boolean;
  teams: ITeam[];
}

export interface ITeamsStatePageProps {
  isLoading: boolean,
  teams: ITeam[]
}

export interface ITeamsDispatchProps {
  fetchTeams: () => void
}

export type TeamsPageProps = ITeamsStatePageProps & ITeamsDispatchProps;
