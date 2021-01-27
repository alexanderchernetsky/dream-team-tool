import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../helpers/authentication";
import { Routes } from "../constants/routes";

function PrivateRoute({
  location,
  component: Component,
  ...rest
}) {
  // const Component: FunctionComponent<RouteComponentProps>;
    return (
      <Route
        {...rest}
        render={(props) =>
          getToken() ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: Routes.LOGIN_PATH, state: { from: location } }} />
          )
        }
      />
    );
}

export default PrivateRoute;
