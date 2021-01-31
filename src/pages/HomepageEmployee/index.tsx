import React, { useEffect } from "react";
import { Select, Spin } from "antd";
import { observer } from "mobx-react";
import { RouteComponentProps } from "react-router";
import { SelectValue } from "antd/lib/select";
import UserMainInfo from "../../components/UserMainInfo";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import LoopIcon from "../../images/Loop";
import { getUser } from "../../helpers/authentication";
import ReviewsFeedItem from "../../components/ReviewsFeedItem";
import store from "../../stores/EmployeeHomepageStore";
import getUrlParams from "../../helpers/getUrlParams";
import createSearchString from "../../helpers/createSearchString";
import {
  EmployeeHomepageContent,
  FeedWrapper,
  FiltersWrapper,
  SpinnerWrapper,
} from "../../styled-components/HomepageEmployee";
import StyledSelect from "../../styled-components/common/Select";
import StyledSearch from "../../styled-components/common/Search";
import loginStore from "../../stores/LoginStore";
import { HomepageEmployeeUser } from "../../interfaces/user";
import { EmployeeHomepageUrlParams } from "../../interfaces/urlParams";
import { SelectOption } from "../../interfaces/common";

const { Option } = Select;

const selectOptions: SelectOption[] = [
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

const HomePageEmployee = ({
  history,
  location,
}: RouteComponentProps): React.ReactElement => {
  useEffect(() => {
    store.getFeedItems(getUrlParams());
  }, [location]);

  const user = getUser();

  const onSelectChange = (value: SelectValue) => {
    const urlParams: EmployeeHomepageUrlParams = getUrlParams();
    if (!value) {
      delete urlParams.rating;
      history.push(`${createSearchString(urlParams)}`);
    } else {
      history.push(
        `${createSearchString({ ...getUrlParams(), rating: value })}`
      );
    }
  };

  const searchHandler = (value: string) => {
    const urlParams: EmployeeHomepageUrlParams = getUrlParams();
    if (!value) {
      delete urlParams.searchPhrase;
      history.push(`${createSearchString(urlParams)}`);
    } else {
      history.push(
        `${createSearchString({ ...urlParams, searchPhrase: value })}`
      );
    }
  };

  const urlParams: EmployeeHomepageUrlParams = getUrlParams();

  return (
    <Layout>
      {!loginStore?.user ? (
        <SpinnerWrapper>
          <Spin size="large" />
        </SpinnerWrapper>
      ) : (
        <>
          {/* Header */}
          <Header pageTitle="Feedback on you">
            <FiltersWrapper>
              <StyledSelect
                placeholder="All feedback"
                allowClear
                onChange={onSelectChange}
                value={urlParams.rating || undefined}
              >
                {selectOptions.map((item: SelectOption, index: number) => {
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
                defaultValue={urlParams.searchPhrase}
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
                {store?.feedItems?.data?.map((item: HomepageEmployeeUser) => {
                  return (
                    <ReviewsFeedItem
                      key={item.id}
                      jobTitle={item.author?.profile?.job_title}
                      fullName={item.author?.full_name}
                      date={item.created_at}
                      id={item.id}
                      photoSrc={item.author?.image_src}
                      otherComments={item.attributes?.otherComments}
                      personalCharacteristics={
                        item.attributes?.strongPersonalCharacteristics
                      }
                      rating={item.rating}
                      weakSides={item.attributes?.weakSides}
                    />
                  );
                })}
              </FeedWrapper>
            )}
          </EmployeeHomepageContent>
        </>
      )}
    </Layout>
  );
};

export default observer(HomePageEmployee);
