import React, {useState} from "react";
import { Form, Input, Button, Checkbox } from "antd";
import styled from "styled-components";
import ax from "../../styled-components/accessor";
import logo from "../../images/_DTT.svg";
import LoginStore from "../../stores/LoginStore";

const { Item } = Form;

const LoginPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 40px;
  background-color: ${ax("secondary-color")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(Form)`
  width: 334px;
`

const StyledInput = styled(Input)`
  height: 50px;
  background: ${ax("input-bg-color")};
  border: 1px solid ${ax("input-border-color")};
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  color: ${ax("input-text-color")} !important;
`;

const SingInButton = styled(Button)`
  width: 100%;
  height: 50px;
  background-color: ${ax("sign-in-btn-bg-color")};
  color: ${ax("secondary-color")};
  border-radius: 4px;
  margin: 5px 0;
  font-size: 16px;
`;

const StyledItem = styled(Item)`
  margin-bottom: 20px;
`;

const ForgotPasswordText = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: ${ax("forgot-text-color")};
  float: right;
`;

const SignUpWrapper = styled.div`
  width: 150px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: ${ax("text-color")};
  margin-top: 40px;
`;

const SignUpLink = styled.div`
  color: ${ax("forgot-text-color")};
  font-weight: 600;
`;

const LoginPage = () => {
  const [rememberChecked, setRememberChecked] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", {...values, remember: rememberChecked});
    LoginStore.login({
      email: values.email,
      password: values.password
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LoginPageWrapper>
      <Logo><img src={logo} alt="Dream Team Tool Logo"/></Logo>
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
          <SingInButton type="primary" htmlType="submit">
            Submit
          </SingInButton>
        </StyledItem>

        <StyledItem name="remember">
          <Checkbox checked={rememberChecked} onChange={() => setRememberChecked(!rememberChecked)}>Remember me</Checkbox>
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

export default LoginPage;
