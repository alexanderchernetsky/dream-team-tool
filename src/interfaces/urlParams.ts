export interface CreateTeamPageUrlParams {
  sort_column?: string;
  sort_direction?: string;
  page?: string | number;
}

export interface EmployyeHomepageUrlParams {
  rating?: string;
  searchPhrase?: string;
}

export interface FeedbackPageUrlParams {
  user?: string;
}

export interface HomepageManagerUrlParams {
  rating?: string;
  searchPhrase?: string;
  sort_column?: string;
  sort_direction?: string;
  page?: number | string;
  job_title?: string;
  focus?: string;
}
