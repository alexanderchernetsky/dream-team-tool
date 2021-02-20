import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../helpers/authentication";
import { Routes } from "../constants/routes";

// eslint-disable-next-line react/prop-types
function PrivateRoute({ location, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: Routes.LOGIN_PATH, state: { from: location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
