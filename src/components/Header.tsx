import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import ax from "../styled-components/accessor";
import { Routes } from "../constants/routes";
import {logOutAction} from "../actions/loginPageActions";

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  background-color: ${ax("secondary-color")};
  box-sizing: border-box;
  padding: 30px;
  border-bottom: 2px solid ${ax("border-color")};
`;

const LogOutButton = styled(Button)`
  margin-left: auto;
`;

const PageTitle = styled.div`
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
`;

interface IHeader extends RouteComponentProps {
  pageTitle: string;
  logOut: () => void;
  children?: React.ReactNode;
}

const mapDispatchToProps = (dispatch :Dispatch) => ({
  logOut: bindActionCreators(logOutAction, dispatch)
})

const Header = ({
  history,
  pageTitle,
  children,
  logOut
}: IHeader): React.ReactElement => {
  const logOutClickHandler = () => {
    logOut();
    history.push(Routes.LOGIN_PATH);
  };

  return (
    <HeaderWrapper>
      <PageTitle>{pageTitle}</PageTitle>
      {children}
      <LogOutButton onClick={logOutClickHandler}>Log Out</LogOutButton>
    </HeaderWrapper>
  );
};

export default withRouter(connect(null, mapDispatchToProps)(Header));
