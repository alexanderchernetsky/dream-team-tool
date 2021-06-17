export interface ICreateTeamPageUrlParams {
  sort_column?: string;
  sort_direction?: string;
  page?: string | number;
}

export interface IEmployeeHomepageUrlParams {
  rating?: string;
  searchPhrase?: string;
}

export interface IFeedbackPageUrlParams {
  user?: string;
}

export interface IHomepageManagerUrlParams {
  rating?: string;
  searchPhrase?: string;
  sort_column?: string;
  sort_direction?: string;
  page?: number | string;
  job_title?: string;
  focus?: string;
}
