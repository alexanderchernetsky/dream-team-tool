import {RouteComponentProps} from "react-router";
import {IHomepageEmployeeUser} from "../user";
import {IEmployeeHomepageUrlParams} from "../urlParams";

export interface IHomepageEmployeeStore {
  feedItems: IHomepageEmployeeUser[];
  loading: boolean;
}

export interface IHomepageEmployeeStatePageProps {
  loading: boolean,
  feedItems: IHomepageEmployeeUser[]
}

export interface IHomepageEmployeeDispatchProps {
  getFeedItems: (params: IEmployeeHomepageUrlParams) => void
}

export type HomepageEmployeePageProps = IHomepageEmployeeStatePageProps & IHomepageEmployeeDispatchProps & RouteComponentProps;