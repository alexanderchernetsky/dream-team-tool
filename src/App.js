import React from "react";
import { observer } from "mobx-react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import theme from "./styled-components/theme";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import 'antd/dist/antd.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default observer(App)
