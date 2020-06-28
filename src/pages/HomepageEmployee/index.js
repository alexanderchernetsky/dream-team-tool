import React, { useEffect } from "react";
import styled from "styled-components";
import { Input, Select, Spin } from "antd";
import { observer } from "mobx-react";
import UserMainInfo from "../../components/UserMainInfo";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import ax from "../../styled-components/accessor";
import LoopIcon from "../../images/Loop";
import { getUser } from "../../helpers/authentication";
import ReviewsFeedItem from "../../components/ReviewsFeedItem";
import store from "../../stores/EmployeeHomepageStore";
import getUrlParams from "../../helpers/getUrlParams";
import loginStore from "../../stores/LoginStore";
import createSearchString from "../../helpers/createSearchString";

const { Option } = Select;
const { Search } = Input;

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const StyledSelect = styled(Select)`
  width: 183px;
  height: 50px;
  background-color: ${ax("menu-item-hover-bg-color")};
  .ant-select-selector {
    border: none !important;
    background-color: ${ax("menu-item-hover-bg-color")} !important;
    width: 183px !important;
    height: 50px !important;
    .ant-select-selection-search-input {
      height: 50px !important;
    }
    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      display: flex;
      align-items: center;
    }
  }
`;

const StyledSearch = styled(Search)`
  width: 208px;
  height: 50px;
  background-color: ${ax("menu-item-hover-bg-color")};
  margin-left: 40px;
  border: none;
  .ant-input {
    background-color: ${ax("menu-item-hover-bg-color")};
  }
  .ant-input-search-icon {
    :before {
      content: none;
    }
  }
`;

const EmployeeHomepageContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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

const selectOptions = [
  {
    value: "1",
    label: "Positive",
  },
  {
    value: "0",
    label: "Neutral",
  },
  {
    value: "-1",
    label: "Negative",
  },
];

const Homepage = ({ history, location }) => {
  useEffect(() => {
    loginStore.checkAndSetAuthHeader();
    store.getFeedItems(getUrlParams());
  }, [location]);

  const user = getUser();

  const onSelectChange = (value) => {
    const urlParams = getUrlParams();
    if (!value) {
      delete urlParams.rating;
      history.push(`${createSearchString(urlParams)}`);
    } else {
      history.push(
        `${createSearchString({ ...getUrlParams(), rating: value })}`
      );
    }
  };

  const searchHandler = (value) => {
    const urlParams = getUrlParams();
    if (!value) {
      delete urlParams.searchPhrase;
      history.push(`${createSearchString(urlParams)}`);
    } else {
      history.push(
          `${createSearchString({ ...getUrlParams(), searchPhrase: value })}`
      );
    }
  };

  return (
    <Layout>
      {/* Header */}
      <Header pageTitle="Feedback on you">
        <FiltersWrapper>
          <StyledSelect
            placeholder="All feedback"
            allowClear
            onChange={onSelectChange}
            value={getUrlParams().rating || null}
          >
            {selectOptions.map((item, index) => {
              return (
                <Option value={item.value} key={index}>
                  {item.label}
                </Option>
              );
            })}
          </StyledSelect>
          <StyledSearch
            type="search"
            placeholder="Search everything"
            onSearch={searchHandler}
            suffix={LoopIcon}
            defaultValue={getUrlParams().searchPhrase}
            allowClear
          />
        </FiltersWrapper>
      </Header>
      {/* Content */}
      <EmployeeHomepageContent>
        {/* User Info */}
        <UserMainInfo
          jobTitle={user?.profile?.job_title}
          fullName={user?.full_name}
          age={user?.age}
          email={user?.email}
          imageSrc={user?.image_src}
          yearsOfExperience={user?.years_of_experience}
          shortDescription={user?.profile?.short_description}
          links={user?.profile?.social_links}
        />
        {/* Feed with reviews */}
        {store.loading ? (
          <SpinnerWrapper>
            <Spin size="large" />
          </SpinnerWrapper>
        ) : (
          <FeedWrapper>
            {store?.feedItems?.data?.map((item) => {
              return (
                <ReviewsFeedItem
                  key={item.id}
                  jobTitle={item.author?.profile?.job_title}
                  fullName={item.author?.full_name}
                  date={item.created_at}
                  id={item.id}
                  photoSrc={item.author?.image_src}
                  otherComments={item.attributes?.otherComments}
                  personalCharacteristics={item.attributes?.strongPersonalCharacteristics}
                  rating={item.rating}
                  weakSides={item.attributes?.weakSides}
                />
              );
            })}
          </FeedWrapper>
        )}
      </EmployeeHomepageContent>
    </Layout>
  );
};

export default observer(Homepage);
