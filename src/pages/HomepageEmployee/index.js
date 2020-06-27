import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Select } from "antd";
import UserMainInfo from "../../components/UserMainInfo";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import ax from "../../styled-components/accessor";
import LoopIcon from "../../images/Loop";
import { getUser } from "../../helpers/authentication";
import ReviewsFeedItem from "../../components/ReviewsFeedItem";

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
  .ant-input {
    background-color: ${ax("menu-item-hover-bg-color")};
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

const selectOptions = [
  {
    value: "positive",
    label: "Positive",
  },
  {
    value: "neutral",
    label: "Neutral",
  },
  {
    value: "negative",
    label: "Negative",
  },
];

const Homepage = () => {
  const [feedItems, setFeedItems] = useState([{}, {}]);
  useEffect(() => {
    // todo fetch data from backend
  }, []);

  const user = getUser();

  const onSelectChange = (value) => {
    console.log("value", value);
  };
  const searchHandler = (value) => {
    console.log("value", value);
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
        <FeedWrapper>
          {feedItems.map((item) => {
            return <ReviewsFeedItem key={item.id} />;
          })}
        </FeedWrapper>
      </EmployeeHomepageContent>
    </Layout>
  );
};

export default Homepage;
