import styled from "styled-components";
import { Button, Form, Input } from "antd";
import ax from "../accessor";

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
`;

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

export {
  LoginPageWrapper,
  Logo,
  StyledForm,
  StyledInput,
  SingInButton,
  StyledItem,
  ForgotPasswordText,
  SignUpWrapper,
  SignUpLink,
};
