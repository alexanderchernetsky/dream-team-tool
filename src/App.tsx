import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Switch } from "react-router-dom";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import theme from "./styled-components/theme";
import HomePageEmployee from "./pages/HomepageEmployee";
import LoginPage from "./pages/LoginPage";
import "antd/dist/antd.css";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import {
  Routes
} from "./constants/routes";
import FeedbackPage from "./pages/FeedbackPage";
import HomepageManager from "./pages/HomepageManager";
import CreateTeamPage from "./pages/CreateTeamPage";
import TeamsPage from "./pages/TeamsListPage";
import {getAndSetCurrentUserAction} from "./actions/loginPageActions";
import {RootState} from "./reducers";
import {IUser} from "./interfaces/user";

const mapStateToProps = (state :RootState) => ({
  user: state.loginPage.user
});

const mapDispatchToProps = (dispatch :Dispatch) => ({
  getAndSetCurrentUser: bindActionCreators(getAndSetCurrentUserAction, dispatch)
})

interface IProps {
  user: IUser | null,
  getAndSetCurrentUser: () => void
}

function App(props :IProps) {
  const {user, getAndSetCurrentUser} = props;
  useEffect(() => {
    getAndSetCurrentUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path={Routes.LOGIN_PATH} component={LoginPage} />
          {user?.is_manager && (
            <PrivateRoute
              exact
              path={Routes.HOMEPAGE_PATH}
              component={HomepageManager}
            />
          )}
          {!user?.is_manager && (
            <PrivateRoute
              exact
              path={Routes.HOMEPAGE_PATH}
              component={HomePageEmployee}
            />
          )}
          <PrivateRoute
            exact
            path={Routes.ADD_FEEDBACK_PATH}
            component={FeedbackPage}
          />
          <PrivateRoute
            exact
            path={Routes.VIEW_EMPLOYEE_PROFILE_PATH}
            component={HomePageEmployee}
          />
          <PrivateRoute
            exact
            path={Routes.CREATE_TEAM_PATH}
            component={CreateTeamPage}
          />
          <PrivateRoute exact path={Routes.TEAMS_LIST_PATH} component={TeamsPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
