import React from "react";
import { Route, Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { getToken } from "../helpers/authentication";
import { LOGIN_PATH } from "../constants/routes";

interface IPrivateRoute extends RouteComponentProps {
  rest?: any;
  component: any;
}

// handle the private routes
function PrivateRoute({
  location,
  component: Component,
  ...rest
}: IPrivateRoute) {
  return (
    <Route
      {...rest}
      render={(props) =>
        getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: LOGIN_PATH, state: { from: location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
