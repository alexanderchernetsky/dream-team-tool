import React, { useState } from "react";
import { Checkbox } from "antd";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import logo from "../../images/_DTT.svg";
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
} from "../../styled-components/LoginPage";
import {ILoginPage, LoginPageProps} from "../../interfaces/LoginPage";
import {RootState} from "../../reducers";
import {loginAction} from "../../actions/loginPageActions";

const mapStateToProps = (state: RootState) => ({
  loginInProgress: state.loginPage.loginInProgress,
  user: state.loginPage.user
})

const mapDispatchToProps = (dispatch :Dispatch) => ({
  login: bindActionCreators(loginAction, dispatch)
})

const LoginPage = (props: LoginPageProps): React.ReactElement => {
  const [rememberChecked, setRememberChecked] = useState(false);
  const {history, login, loginInProgress, user} = props;


  const onFinish = (values: unknown): void => {
    if(typeof values === "object") {
      const {email, password}: ILoginPage = values as ILoginPage;
      if(email && password) {
        login({ email, password });
        if(user) {
          history.push(Routes.HOMEPAGE_PATH);
        }
      }
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity): void => {
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
            loading={loginInProgress}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
