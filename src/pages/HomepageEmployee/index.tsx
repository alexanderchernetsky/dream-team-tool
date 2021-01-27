import React, { useEffect } from "react";
import { Select, Spin } from "antd";
import { observer } from "mobx-react";
import { RouteComponentProps } from "react-router";
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
import { SelectValue } from 'antd/lib/select';
import { Store } from "antd/lib/form/interface";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

const { Option } = Select;

interface IOption {
  label: string;
  value: string;
}

interface IProfile {
  created_at: string;
  focus: string;
  id: number;
  job_title: string;
  rating: number;
  short_description: string;
}

interface IUser {
  age: number;
  created_at: string;
  date_of_birth: string;
  email: string;
  first_name: string;
  first_work_date: string;
  full_name: string;
  id: number;
  image: string | undefined;
  image_src: string | undefined;
  last_name: string;
  remember_token: string | undefined;
  years_of_experience: number;
  profile: IProfile;
}

interface IAttributes {
  communication_explainsIdeasInSpokenLanguage: string;
  communication_explainsWrittenIdeas: string;
  communication_listensAndClarifiesInformation: string;
  communication_openAndAvailableForCommunication: string;
  communication_respectAndTactfulInCommunication: string;
  effectiveness_findsEffectiveSolutionsToSimplifyWork: string;
  effectiveness_goodInMultitasking: string;
  effectiveness_meetsDeadlines: string;
  effectiveness_showsDiligenceInDayToDayWork: string;
  effectiveness_worksWithoutMistakes: string;
  independence_ableToTakeResponsibilityForMistakes: string;
  independence_adequatelyEvaluateSkillsAndAbilities: string;
  independence_independentWork: string;
  independence_independentWorkWithDifficulties: string;
  independence_responsibleForResultsOfHisWork: string;
  interpersonalQualities_openForNewIdeas: string;
  interpersonalQualities_providesHonestReviews: string;
  interpersonalQualities_stressResistance: string;
  interpersonalQualities_takesIntoConsiderationOtherPointsOfView: string;
  interpersonalQualities_understandingOfOtherPointsOfView: string;
  otherComments: string;
  strongPersonalCharacteristics: string;
  weakSides: string;
  workExperienceWithAnEmployee: string;
  workInTeam_involvedInWork: string;
  workInTeam_perceiveConstructiveCriticism: string;
  workInTeam_takesInitiative: string;
  workInTeam_teamworkToSolveProblems: string;
  workInTeam_trustworthyTeamMember: string;
}

interface IItem {
  attributes: IAttributes;
  author: IUser;
  author_id: number;
  created_at: string;
  id: number;
  rating: number;
  updated_at: string;
  user_id: number;
  user: IUser;
}

const selectOptions :IOption[] = [
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

interface IUrlParams {
  rating?: string;
  searchPhrase?: string;
}

const HomePageEmployee = ({ history, location }: RouteComponentProps) :React.ReactElement => {
  useEffect(() => {
    store.getFeedItems(getUrlParams());
  }, [location]);

  const user = getUser();

  const onSelectChange = (value: SelectValue) => {
    const urlParams: IUrlParams = getUrlParams();
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
    const urlParams: IUrlParams = getUrlParams();
    if (!value) {
      delete urlParams.searchPhrase;
      history.push(`${createSearchString(urlParams)}`);
    } else {
      history.push(
        `${createSearchString({ ...urlParams, searchPhrase: value })}`
      );
    }
  };

  const urlParams: IUrlParams = getUrlParams();

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
                value={urlParams.rating || ""}
              >
                {selectOptions.map((item: IOption, index: number) => {
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
                {store?.feedItems?.data?.map((item: IItem) => {
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
