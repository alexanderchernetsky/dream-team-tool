import React from "react";
import { Route, Redirect } from "react-router-dom";
import {getToken} from "../helpers/authentication";
import {HOMEPAGE_PATH} from "../constants/routes";

// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
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
