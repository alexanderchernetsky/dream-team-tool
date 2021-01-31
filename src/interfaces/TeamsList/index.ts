export interface ITeam {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
  users_count: number;
}

export interface ITeamsListStore {
  loading: boolean;
  teams: {
    data: ITeam[];
  };
}
