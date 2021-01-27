import React, { useEffect } from "react";
import { Select, Spin } from "antd";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import getUrlParams from "../../helpers/getUrlParams";
import createSearchString from "../../helpers/createSearchString";
import feedbackPageStore from "../../stores/FeedbackPageStore";
import TargetUserInfo from "../../components/TargetUserInfo";
import {
  EmployeeHomepageContent,
  FeedbackFormWrapper,
  FiltersSpinnerWrapper,
  FiltersWrapper,
  NoResults,
  SectionCard,
  SectionHeading,
  SpinnerWrapper,
  StyledButton,
  StyledFeedbackForm,
  StyledFormItem,
  StyledFormSelect,
  StyledSelect,
  StyledTextArea,
} from "../../styled-components/FeedbackPage";
import { Routes } from "../../constants/routes";
import { SelectValue } from 'antd/lib/select';
import { Store } from "antd/lib/form/interface";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

const { Option } = Select;

const selectOptions = (
  <>
    <Option value="2">Always</Option>
    <Option value="1">Often</Option>
    <Option value="-1">Rarely</Option>
    <Option value="-2">Never</Option>
  </>
);

const requiredFieldRules = [
  { required: true, message: "This field is required." },
];

const requiredTextAreaRules = [
  { required: true, message: "This field is required." },
  { min: 20, message: "This field must be at least 20 characters." },
  { max: 32500, message: "This field should be less than 32500 characters." },
];

interface IUrlParams {
  user?: string;
}

interface IEmployeeData {
  id?: string | number;
  image_src?: string;
  full_name?: string;
  profile?: {
    job_title?: string;
  };
}

interface IEmployee {
  label: string;
  value: string;
}

const FeedbackPage = ({ history, location }: RouteComponentProps) :React.ReactElement => {
  useEffect(() => {
    const urlParams: IUrlParams = getUrlParams();
    const targetUserId = urlParams.user;
    if (targetUserId) {
      feedbackPageStore.getSpecificEmployeeData(targetUserId);
    }
    return () => {
      feedbackPageStore.removeSpecificEmployeeData();
    };
  }, [location]);

  useEffect(() => {
    feedbackPageStore.getEmployeesList();
  }, []);

  const onSelectChange = (value: SelectValue) => {

    const urlParams: IUrlParams = getUrlParams();
    if (!value) {
      delete urlParams.user;
      feedbackPageStore.removeSpecificEmployeeData();
      history.push(`${createSearchString(urlParams)}`);
    } else {
      history.push(`${createSearchString({ ...getUrlParams(), user: value })}`);
    }
  };

  const onFinish = (values: Store) => {
    console.log(values);
    const employeeData: IEmployeeData = feedbackPageStore?.employeeData;
    feedbackPageStore.submitFeedbackForm(values, employeeData.id).then(() => {
      history.push(Routes.ADD_FEEDBACK_PATH);
    });
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
  };
  const urlParams: IUrlParams = getUrlParams();
  const employeeData: IEmployeeData = feedbackPageStore?.employeeData;
  return (
    <Layout>
      {/* Header */}
      <Header pageTitle="Write a feedback" />
      {/* Content */}
      <EmployeeHomepageContent>
        {/* User selection */}
        <FiltersWrapper>
          {feedbackPageStore.loadingEmployeesList ? (
            <FiltersSpinnerWrapper>
              <Spin size="default" />
            </FiltersSpinnerWrapper>
          ) : (
            <StyledSelect
              placeholder="Please select user"
              allowClear
              onChange={onSelectChange}
              value={urlParams.user || ""}
            >
              {feedbackPageStore?.employeesList?.map((item: IEmployee, index: number) => {
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
            {employeeData.id && <NoResults>Please select the user.</NoResults>}
            {employeeData.id && (
              <FeedbackFormWrapper>
                {/* Target user info */}
                <TargetUserInfo
                  photoSrc={employeeData.image_src}
                  fullName={employeeData.full_name}
                  jobTitle={employeeData.profile?.job_title}
                />
                {/* Feedback form */}
                <StyledFeedbackForm
                  name="feedback-form"
                  initialValues={{ remember: false }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  hideRequiredMark
                >
                  {/* Working in a team section */}
                  <SectionCard>
                    <SectionHeading color="#1168FF">
                      Working in a team
                    </SectionHeading>
                    <StyledFormItem
                      label="Perceive constructive criticism"
                      name="workInTeam_perceiveConstructiveCriticism"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>

                    <StyledFormItem
                      label="Takes the initiative"
                      name="workInTeam_takesInitiative"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>

                    <StyledFormItem
                      label="Works together with others to solve the problems"
                      name="workInTeam_teamworkToSolveProblems"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>

                    <StyledFormItem
                      label="Involved in work"
                      name="workInTeam_involvedInWork"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>

                    <StyledFormItem
                      label="Seems to be a trustworthy team member"
                      name="workInTeam_trustworthyTeamMember"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                  </SectionCard>

                  {/* Communication section */}
                  <SectionCard>
                    <SectionHeading color="#5FB840">
                      Communication
                    </SectionHeading>
                    {/* 1 */}
                    <StyledFormItem
                      label="Respectful and tactful in communication with colleagues"
                      name="communication_respectAndTactfulInCommunication"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 2 */}
                    <StyledFormItem
                      label="Listens to others and clarifies information when needed"
                      name="communication_listensAndClarifiesInformation"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 3 */}
                    <StyledFormItem
                      label="Open and available for communication"
                      name="communication_openAndAvailableForCommunication"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 4 */}
                    <StyledFormItem
                      label="Clearly explains his/her ideas in spoken language"
                      name="communication_explainsIdeasInSpokenLanguage"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 5 */}
                    <StyledFormItem
                      label="Clearly explains his/her ideas in written language"
                      name="communication_explainsWrittenIdeas"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                  </SectionCard>

                  {/* Effectiveness section */}
                  <SectionCard>
                    <SectionHeading color="#F16B41">
                      Effectiveness
                    </SectionHeading>
                    {/* 1 */}
                    <StyledFormItem
                      label="Shows diligence in day-to-day work"
                      name="effectiveness_showsDiligenceInDayToDayWork"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 2 */}
                    <StyledFormItem
                      label="Meets deadlines"
                      name="effectiveness_meetsDeadlines"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 3 */}
                    <StyledFormItem
                      label="Works without mistakes"
                      name="effectiveness_worksWithoutMistakes"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 4 */}
                    <StyledFormItem
                      label="Good in multitasking"
                      name="effectiveness_goodInMultitasking"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 5 */}
                    <StyledFormItem
                      label="Is able to find effective solutions to simplify work"
                      name="effectiveness_findsEffectiveSolutionsToSimplifyWork"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                  </SectionCard>

                  {/* Independence section */}
                  <SectionCard>
                    <SectionHeading color="#E8A7FF">
                      Independence
                    </SectionHeading>
                    {/* 1 */}
                    <StyledFormItem
                      label="Responsible for results of his work"
                      name="independence_responsibleForResultsOfHisWork"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 2 */}
                    <StyledFormItem
                      label="Works independently, without control from the side"
                      name="independence_independentWork"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 3 */}
                    <StyledFormItem
                      label="Able to handle independently difficulties in work"
                      name="independence_independentWorkWithDifficulties"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 4 */}
                    <StyledFormItem
                      label="Adequately evaluates his/her skills and abilities"
                      name="independence_adequatelyEvaluateSkillsAndAbilities"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 5 */}
                    <StyledFormItem
                      label="Able to take the responsibility for his/her mistakes"
                      name="independence_ableToTakeResponsibilityForMistakes"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                  </SectionCard>

                  {/* Interpersonal qualities */}
                  <SectionCard>
                    <SectionHeading color="#F1D541">
                      Interpersonal qualities
                    </SectionHeading>
                    {/* 1 */}
                    <StyledFormItem
                      label="Shows understanding of other points of view"
                      name="interpersonalQualities_understandingOfOtherPointsOfView"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 2 */}
                    <StyledFormItem
                      label="Takes into consideration other points of view"
                      name="interpersonalQualities_takesIntoConsiderationOtherPointsOfView"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 3 */}
                    <StyledFormItem
                      label="Does not allow stress to influence interpersonal communication with others"
                      name="interpersonalQualities_stressResistance"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 4 */}
                    <StyledFormItem
                      label="Provides honest reviews"
                      name="interpersonalQualities_providesHonestReviews"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 5 */}
                    <StyledFormItem
                      label="Open for new ideas"
                      name="interpersonalQualities_openForNewIdeas"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        {selectOptions}
                      </StyledFormSelect>
                    </StyledFormItem>
                  </SectionCard>

                  {/* General */}
                  <SectionCard>
                    {/* 1 */}
                    <StyledFormItem
                      label={`How could you estimate your experience of working with ${employeeData.full_name} in general?`}
                      name="workExperienceWithAnEmployee"
                      rules={requiredFieldRules}
                    >
                      <StyledFormSelect placeholder="Please select">
                        <Option value="2">Perfect</Option>
                        <Option value="1">Good</Option>
                        <Option value="0">Neutral</Option>
                        <Option value="-1">Bad</Option>
                        <Option value="-2">Awful</Option>
                      </StyledFormSelect>
                    </StyledFormItem>
                    {/* 2 */}
                    <StyledFormItem
                      withTextArea
                      label={`How do you think what are the strong personal characteristics of ${employeeData.full_name}?`}
                      name="strongPersonalCharacteristics"
                      rules={requiredTextAreaRules}
                    >
                      <StyledTextArea placeholder="Enter your answer...">
                        {selectOptions}
                      </StyledTextArea>
                    </StyledFormItem>
                    {/* 3 */}
                    <StyledFormItem
                      withTextArea
                      label={`What are weak sides of ${employeeData.full_name}?`}
                      name="weakSides"
                      rules={requiredTextAreaRules}
                    >
                      <StyledTextArea placeholder="Enter your answer...">
                        {selectOptions}
                      </StyledTextArea>
                    </StyledFormItem>
                    {/* 4 */}
                    <StyledFormItem
                      withTextArea
                      label="Other comments:"
                      name="otherComments"
                      rules={requiredTextAreaRules}
                    >
                      <StyledTextArea placeholder="Enter your answer...">
                        {selectOptions}
                      </StyledTextArea>
                    </StyledFormItem>
                  </SectionCard>

                  {/* Submit */}
                  <StyledFormItem submitButton>
                    <StyledButton
                      type="primary"
                      htmlType="submit"
                      loading={feedbackPageStore?.submittingFeedbackForm}
                    >
                      Send
                    </StyledButton>
                  </StyledFormItem>
                </StyledFeedbackForm>
              </FeedbackFormWrapper>
            )}
          </>
        )}
      </EmployeeHomepageContent>
    </Layout>
  );
};

export default observer(FeedbackPage);
