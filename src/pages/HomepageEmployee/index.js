import React from "react";
import {Button} from "antd";
import loginStore from "../../stores/LoginStore";
import {LOGIN_PATH} from "../../constants/routes";
import UserMainInfo from "../../components/UserMainInfo";
import Layout from "../../components/Layout";
import Header from "../../components/Header";

const Homepage = ({ history }) => {
  const logOutClickHandler = () => {
    loginStore.logOut();
    history.push(LOGIN_PATH);
  }

  return (
      <Layout>
        <Header><Button onClick={logOutClickHandler}>Log Out</Button></Header>
        <UserMainInfo />
      </Layout>
  );
};

export default Homepage;
