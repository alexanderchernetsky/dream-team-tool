import React from "react";
import {Button} from "antd";
import loginStore from "../../stores/LoginStore";
import {LOGIN_PATH} from "../../constants/routes";
import UserMainInfo from "../../components/UserMainInfo";

const Homepage = ({ history }) => {
  const logOutClickHandler = () => {
    loginStore.logOut();
    history.push(LOGIN_PATH);
  }

  return (
    <div>
      <div><Button onClick={logOutClickHandler}>Log Out</Button></div>
      <UserMainInfo />
    </div>
  );
};

export default Homepage;
