import React from "react";
import { Route, Redirect } from "react-router-dom";
import {getToken} from "../helpers/authentication";
import {LOGIN_PATH} from "../constants/routes";


// handle the private routes
function PrivateRoute({ location, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
          getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: LOGIN_PATH, state: { from: location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
