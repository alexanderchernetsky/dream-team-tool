import { HomepageEmployeeUser } from "../user";

export interface IFeedItems {
  data: HomepageEmployeeUser[];
}

export interface IHomepageEmployeeStore {
  feedItems: IFeedItems;
  loading: boolean;
}
