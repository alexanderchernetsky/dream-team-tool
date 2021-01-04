import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../helpers/authentication";
import { HOMEPAGE_PATH } from "../constants/routes";

interface IPublicRoute {
  component: any;
  rest?: any;
}

// handle the public routes
function PublicRoute({ component: Component, ...rest }: IPublicRoute) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: HOMEPAGE_PATH }} />
        )
      }
    />
  );
}

export default PublicRoute;
