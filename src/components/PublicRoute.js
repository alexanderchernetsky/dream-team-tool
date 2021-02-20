import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../helpers/authentication";
import { Routes } from "../constants/routes";

// eslint-disable-next-line react/prop-types
function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: Routes.HOMEPAGE_PATH }} />
        )
      }
    />
  );
}

export default PublicRoute;
