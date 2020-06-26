import React from "react";
import {Button} from "antd";
import loginStore from "../../stores/LoginStore";
import {LOGIN_PATH} from "../../constants/routes";

const Homepage = ({ history }) => {
  const logOutClickHandler = () => {
    loginStore.logOut();
    history.push(LOGIN_PATH);
  }

  return (
    <div>
      Homepage
      <Button onClick={logOutClickHandler}>Log Out</Button>
    </div>
  );
};

export default Homepage;
