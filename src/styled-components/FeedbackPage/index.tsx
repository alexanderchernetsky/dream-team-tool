import { Button, Form, Input, Select } from "antd";
import styled, { css } from "styled-components";
import ax from "../accessor";

const { Item } = Form;
const { TextArea } = Input;

const EmployeeHomepageContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const FiltersWrapper = styled.div`
  width: 283px;
  max-width: 283px;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  border-right: 2px solid ${ax("border-color")};
`;

const FiltersSpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  width: 283px;
  max-width: 283px;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const StyledSelect = styled(Select)`
  margin-top: 45px;
  width: 183px;
  height: 35px;
  background-color: ${ax("menu-item-hover-bg-color")};
  .ant-select-selector {
    border: none !important;
    background-color: ${ax("menu-item-hover-bg-color")} !important;
    width: 183px !important;
    height: 35px !important;
    .ant-select-selection-search-input {
      height: 35px !important;
    }
    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      display: flex;
      align-items: center;
    }
  }
`;

const NoResults = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const FeedbackFormWrapper = styled.div`
  padding: 0 35px;
  box-sizing: border-box;
`;

const StyledFeedbackForm = styled(Form)`
  width: 100%;
  max-width: 880px;
`;

const SectionHeading = styled.div`
  font-weight: 500;
  font-size: 25px;
  line-height: 38px;
  color: ${ax("form-section-heading-color")};
  display: flex;
  width: fit-content;
  border-bottom: 2px solid ${(props) => props.color};
`;

const SectionCard = styled.div`
  background: ${ax("secondary-color")};
  box-shadow: 4px 4px 10px ${ax("form-section-card-shadow-color")};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 23px 84px 58px 27px;
  width: 880px;
  max-width: 880px;
  margin-bottom: 39px;
`;

const StyledFormItem = styled(Item)<{
  withTextArea?: boolean;
  submitButton?: boolean;
}>`
  margin: 25px 0 0 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .ant-form-item-control {
    max-width: 183px;
  }
  ${(props) =>
    props.withTextArea &&
    css`
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .ant-form-item-control {
        width: 100%;
        max-width: 672px;
      }
    `};
  ${(props) =>
    props.submitButton &&
    css`
      justify-content: flex-end;
    `};
`;

const StyledFormSelect = styled(Select)`
  margin-left: auto;
  width: 165px !important;
  height: 35px !important;
  background-color: ${ax("menu-item-hover-bg-color")};
  .ant-select-selector {
    border: none !important;
    background-color: ${ax("menu-item-hover-bg-color")} !important;
    width: 165px; !important;
    height: 35px !important;
    .ant-select-selection-search-input {
      height: 35px !important;
    }
    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      display: flex;
      align-items: center;
    }
  }
`;

const StyledButton = styled(Button)`
  width: 140px;
  height: 35px;
  background: linear-gradient(180deg, #1168ff 0%, #0046bf 100%);
  border-radius: 5px;
  margin-bottom: 30px;
`;

const StyledTextArea = styled(TextArea)`
  background: ${ax("input-bg-color")};
  border: 0.5px solid ${ax("primary-color")};
  border-radius: 5px;
`;

export {
  EmployeeHomepageContent,
  FiltersWrapper,
  FiltersSpinnerWrapper,
  SpinnerWrapper,
  StyledSelect,
  NoResults,
  FeedbackFormWrapper,
  StyledFeedbackForm,
  SectionHeading,
  SectionCard,
  StyledFormItem,
  StyledFormSelect,
  StyledButton,
  StyledTextArea,
};
