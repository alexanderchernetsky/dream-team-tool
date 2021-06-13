import {RouteComponentProps} from "react-router";
import {HomepageEmployeeUser} from "../user";
import {EmployeeHomepageUrlParams} from "../urlParams";

export interface IFeedItems {
  data: HomepageEmployeeUser[];
}

export interface IHomepageEmployeeStore {
  feedItems: IFeedItems;
  loading: boolean;
}

export interface IHomepageEmployeeStatePageProps {
  loading: boolean,
  feedItems: IFeedItems
}

export interface IHomepageEmployeeDispatchProps {
  getFeedItems: (params: EmployeeHomepageUrlParams) => void
}

export type HomepageEmployeePageProps = IHomepageEmployeeStatePageProps & IHomepageEmployeeDispatchProps & RouteComponentProps;