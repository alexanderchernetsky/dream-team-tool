import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Switch } from "react-router-dom";
import theme from "./styled-components/theme";
import HomePageEmployee from "./pages/HomepageEmployee";
import LoginPage from "./pages/LoginPage";
import "antd/dist/antd.css";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import {
  ADD_FEEDBACK_PATH,
  CREATE_TEAM_PATH,
  HOMEPAGE_PATH,
  LOGIN_PATH,
  TEAMS_LIST_PATH,
  VIEW_EMPLOYEE_PROFILE_PATH,
} from "./constants/routes";
import FeedbackPage from "./pages/FeedbackPage";
import HomepageManager from "./pages/HomepageManager";
import CreateTeamPage from "./pages/CreateTeamPage";
import TeamsPage from "./pages/TeamsListPage";
import loginStore from "./stores/LoginStore";

function App() {
  useEffect(() => {
    loginStore.getAndSetCurrentUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path={LOGIN_PATH} component={LoginPage} />
          {loginStore?.user?.is_manager && (
            <PrivateRoute
              exact
              path={HOMEPAGE_PATH}
              component={HomepageManager}
            />
          )}
          {!loginStore?.user?.is_manager && (
            <PrivateRoute
              exact
              path={HOMEPAGE_PATH}
              component={HomePageEmployee}
            />
          )}
          <PrivateRoute
            exact
            path={ADD_FEEDBACK_PATH}
            component={FeedbackPage}
          />
          <PrivateRoute
            exact
            path={VIEW_EMPLOYEE_PROFILE_PATH}
            component={HomePageEmployee}
          />
          <PrivateRoute
            exact
            path={CREATE_TEAM_PATH}
            component={CreateTeamPage}
          />
          <PrivateRoute exact path={TEAMS_LIST_PATH} component={TeamsPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default observer(App);
