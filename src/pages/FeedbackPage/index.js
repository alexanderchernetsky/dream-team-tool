import React, { useEffect } from "react";
import styled from "styled-components";
import { Form, Select, Spin } from "antd";
import { observer } from "mobx-react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import ax from "../../styled-components/accessor";
import getUrlParams from "../../helpers/getUrlParams";
import loginStore from "../../stores/LoginStore";
import createSearchString from "../../helpers/createSearchString";
import feedbackPageStore from "../../stores/FeedbackPageStore";

const { Option } = Select;

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

const FeedbackFormWrapper = styled.div``;

const FeedbackForm = styled(Form)``;

const FeedbackPage = ({ history, location }) => {
  useEffect(() => {
    loginStore.checkAndSetAuthHeader();
    const targetUserId = getUrlParams().user;
    if (getUrlParams().user) {
      feedbackPageStore.getSpecificEmployeeData(targetUserId);
    }
  }, [location]);

  useEffect(() => {
    feedbackPageStore.getEmployeesList();
  }, []);

  const onSelectChange = (value) => {
    const urlParams = getUrlParams();
    if (!value) {
      delete urlParams.user;
      feedbackPageStore.removeSpecificEmployeeData();
      history.push(`${createSearchString(urlParams)}`);
    } else {
      history.push(`${createSearchString({ ...getUrlParams(), user: value })}`);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <Header pageTitle="Write a feedback" />
      {/* Content */}
      <EmployeeHomepageContent>
        {/* User selection */}
        <FiltersWrapper>
          {feedbackPageStore.loadingEmployeesList ? (
            <SpinnerWrapper>
              <Spin size="default" />
            </SpinnerWrapper>
          ) : (
            <StyledSelect
              placeholder="Please select user"
              allowClear
              onChange={onSelectChange}
              value={getUrlParams().user || null}
            >
              {feedbackPageStore?.employeesList?.map((item, index) => {
                return (
                  <Option value={item.value} key={index}>
                    {item.label}
                  </Option>
                );
              })}
            </StyledSelect>
          )}
        </FiltersWrapper>
        {/* FeedbackForm */}
        {feedbackPageStore.loadingSpecificEmployeeData ? (
          <SpinnerWrapper>
            <Spin size="large" />
          </SpinnerWrapper>
        ) : (
          <>
            {!feedbackPageStore?.employeeData?.id && (
              <NoResults>Please select the user.</NoResults>
            )}
            {feedbackPageStore?.employeeData?.id && (
              <FeedbackFormWrapper>
                <FeedbackForm>Form</FeedbackForm>
              </FeedbackFormWrapper>
            )}
          </>
        )}
      </EmployeeHomepageContent>
    </Layout>
  );
};

export default observer(FeedbackPage);
