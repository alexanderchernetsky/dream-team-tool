import React from "react";
import { observer } from "mobx-react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Switch } from "react-router-dom";
import theme from "./styled-components/theme";
import HomePage from "./pages/HomepageEmployee";
import LoginPage from "./pages/LoginPage";
import "antd/dist/antd.css";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import {ADD_FEEDBACK_PATH, HOMEPAGE_PATH, LOGIN_PATH} from "./constants/routes";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path={LOGIN_PATH} component={LoginPage} />
          <PrivateRoute exact path={HOMEPAGE_PATH} component={HomePage} />
          <PrivateRoute exact path={ADD_FEEDBACK_PATH} component={FeedbackPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default observer(App);
