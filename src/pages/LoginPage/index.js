import React, { useState } from "react";
import { Checkbox } from "antd";
import { observer } from "mobx-react";
import logo from "../../images/_DTT.svg";
import loginStore from "../../stores/LoginStore";
import {HOMEPAGE_PATH} from "../../constants/routes";
import {
  ForgotPasswordText,
  LoginPageWrapper,
  Logo, SignUpLink, SignUpWrapper,
  SingInButton,
  StyledForm,
  StyledInput,
  StyledItem
} from "../../styled-components/LoginPage/index";



const LoginPage = ({ history }) => {
  const [rememberChecked, setRememberChecked] = useState(false);

  const onFinish = (values) => {
    loginStore.login({
      email: values.email,
      password: values.password,
    }).then(
        () => {
          history.push(HOMEPAGE_PATH);
        }
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LoginPageWrapper>
      <Logo>
        <img src={logo} alt="Dream Team Tool Logo" />
      </Logo>
      <StyledForm
        name="login-form"
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <StyledItem
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <StyledInput />
        </StyledItem>

        <StyledItem
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <StyledInput type="password" />
        </StyledItem>

        <StyledItem>
          <SingInButton
            type="primary"
            htmlType="submit"
            loading={loginStore.loginInProgress}
          >
            Submit
          </SingInButton>
        </StyledItem>

        <StyledItem name="remember">
          <Checkbox
            checked={rememberChecked}
            onChange={() => setRememberChecked(!rememberChecked)}
          >
            Remember me
          </Checkbox>
          <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
        </StyledItem>
      </StyledForm>

      <SignUpWrapper>
        <div>Don&apos;t have an account yet?</div>
        <SignUpLink>Sign up!</SignUpLink>
      </SignUpWrapper>
    </LoginPageWrapper>
  );
};

export default observer(LoginPage);
