import React from "react";
import { observer } from "mobx-react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Switch } from "react-router-dom";
import theme from "./styled-components/theme";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import 'antd/dist/antd.css';
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default observer(App)
