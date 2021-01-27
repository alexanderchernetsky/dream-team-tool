import React, { useState } from "react";
import { Checkbox } from "antd";
import { observer } from "mobx-react";
import logo from "../../images/_DTT.svg";
import { RouteComponentProps } from "react-router";
import loginStore from "../../stores/LoginStore";
import { Routes } from "../../constants/routes";
import {
  ForgotPasswordText,
  LoginPageWrapper,
  Logo,
  SignUpLink,
  SignUpWrapper,
  SingInButton,
  StyledForm,
  StyledInput,
  StyledItem,
} from "../../styled-components/LoginPage/index";
import { Store } from "antd/lib/form/interface";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

const LoginPage = ({ history }: RouteComponentProps) :React.ReactElement => {
  const [rememberChecked, setRememberChecked] = useState(false);

  const onFinish = (values: Store) => {
    loginStore
      .login({
        email: values.email,
        password: values.password,
      })
      .then(() => {
        history.push(Routes.HOMEPAGE_PATH);
      });
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
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
          data-test-id="login-email"
        >
          <StyledInput />
        </StyledItem>

        <StyledItem
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          data-test-id="login-password"
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
