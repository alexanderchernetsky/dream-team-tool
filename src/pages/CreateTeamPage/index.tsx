import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { RouteComponentProps } from "react-router";
import {
  SorterResult,
  TablePaginationConfig,
  ColumnsType,
} from "antd/lib/table/interface";
import {
  ActionColWrapper,
  GridImage,
  GridText,
  Rating,
  StyledActionColButton,
  StyledTable,
} from "../../styled-components/HomepageManager";
import store from "../../stores/CreateTeamPageStore";
import getUrlParams from "../../helpers/getUrlParams";
import createSearchString from "../../helpers/createSearchString";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import {
  AnalysisCard,
  Color,
  CreateTeamPageContent,
  EmployeesGridWrapper,
  GridName,
  Legend,
  LegendItemWrapper,
  SelectedGridWrapper,
  Slug,
  StyledInput,
  TablesWrapper,
  TeamAnalysisBtnWrapper,
  TeamNameWrapper,
} from "../../styled-components/CreateTeamPage";
import UserAnalysisRow from "../../components/UserAnalysisRow";
import { Routes } from "../../constants/routes";
import { TeamAnalisysUser, GridDataUser } from "../../interfaces/user";
import { CreateTeamPageUrlParams } from "../../interfaces/urlParams";
import { ILegendItems } from "../../interfaces/CreateTeamPage";

// add team member button handler
const addButtonClickHandler = (id: number): void => {
  store.addTeamMember(id);
};

// remove team member button handler
const removeButtonClickHandler = (id: number) => {
  store.removeTeamMember(id);
};

// common columns
const commonUserColumn = {
  title: "User",
  dataIndex: "user",
  key: "user",
  render: (text: string): React.ReactElement => (
    <GridImage src={text} alt="user" />
  ),
};

const commonFocusColumn = {
  title: "Focus",
  key: "focus",
  dataIndex: "focus",
  render: (text: string): React.ReactElement => <GridText>{text}</GridText>,
};

// Select employee table
const allEmployeesGridColumns = [
  commonUserColumn,
  {
    title: "Full name",
    dataIndex: "full_name",
    key: "full_name",
    sortable: true,
    sorter: ["ascend", "descend"],
    render: (text: string): React.ReactElement => <GridText>{text}</GridText>,
  },
  {
    title: "Rating",
    key: "rating",
    dataIndex: "rating",
    sortable: true,
    sorter: ["ascend", "descend"],
    render: (text: string): React.ReactElement => <Rating>{text}</Rating>,
  },
  commonFocusColumn,
  {
    title: "Actions",
    key: "actions",
    render: (data: GridDataUser): React.ReactElement => {
      return (
        <ActionColWrapper>
          <StyledActionColButton
            type="primary"
            htmlType="button"
            onClick={() => addButtonClickHandler(data.id)}
            disabled={store.selectedUsersGridData.some(
              (item: GridDataUser) => item.id === data.id
            )}
            data-test-id="add-employee-to-new-team-btn"
          >
            Add
          </StyledActionColButton>
        </ActionColWrapper>
      );
    },
  },
];

// Team table
const selectedUsersGridColumns = [
  commonUserColumn,
  {
    title: "Full name",
    dataIndex: "full_name",
    key: "full_name",
    render: (text: string): React.ReactElement => <GridText>{text}</GridText>,
  },
  {
    title: "Rating",
    key: "rating",
    dataIndex: "rating",
    render: (text: string): React.ReactElement => <Rating>{text}</Rating>,
  },
  commonFocusColumn,
  {
    title: "Actions",
    key: "actions",
    render: (data: GridDataUser): React.ReactElement => {
      return (
        <ActionColWrapper>
          <StyledActionColButton
            type="primary"
            htmlType="button"
            onClick={() => removeButtonClickHandler(data.id)}
          >
            Remove
          </StyledActionColButton>
        </ActionColWrapper>
      );
    },
  },
];

const legendItems: ILegendItems[] = [
  {
    color: "#A5F081",
    slug: "Positive",
  },
  {
    color: "#CFCFCF",
    slug: "Neutral",
  },
  {
    color: "#C78AF7",
    slug: "Negative",
  },
];

const CreateTeamPage = ({
  location,
  history,
}: RouteComponentProps): React.ReactElement => {
  const [teamNameValue, setTeamNameValue] = useState("");

  useEffect((): void => {
    store.getGridData(getUrlParams());
  }, [location]);

  const tableChangeHandler = (
    pagination: TablePaginationConfig,
    filters: Record<string, (string | number | boolean)[] | null> ,
    sorter: SorterResult<object> | SorterResult<object>[]
  ) => {
    const urlParams: CreateTeamPageUrlParams = getUrlParams();
    // handle sorting or pagination change
    if (!sorter || (!Array.isArray(sorter) && !sorter.order)) {
      delete urlParams.sort_column;
      delete urlParams.sort_direction;
      urlParams.page = pagination.current;
      history.push(`${createSearchString(urlParams)}`);
    } else if (!Array.isArray(sorter)) {
      history.push(
        `${createSearchString({
          ...getUrlParams(),
          sort_column: sorter.field,
          sort_direction: sorter.order,
          page: pagination.current,
        })}`
      );
    }
  };

  const saveTeamButtonHandler = () => {
    store.saveTeam(teamNameValue).then(() => {
      history.push(Routes.TEAMS_LIST_PATH);
    });
  };

  return (
    <Layout>
      {/* Header */}
      <Header pageTitle="Create new team" />
      {/* Content */}
      <CreateTeamPageContent>
        {/* Input team name */}
        <TeamNameWrapper>
          <StyledInput
            data-test-id="new-team-name-input"
            placeholder="Please enter a team name"
            value={teamNameValue}
            onChange={(event) => {
              return setTeamNameValue(event.target.value);
            }}
          />
        </TeamNameWrapper>
        <TablesWrapper>
          {/* Select employee grid */}
          <EmployeesGridWrapper>
            <GridName>Select employee</GridName>
            <StyledTable
              columns={allEmployeesGridColumns as ColumnsType<object>}
              dataSource={store.gridData}
              loading={store.loadingGridData}
              pagination={store.pagination}
              onChange={tableChangeHandler}
            />
          </EmployeesGridWrapper>
          {/* Team grid */}
          <SelectedGridWrapper>
            <GridName>Team</GridName>
            <StyledTable
              columns={selectedUsersGridColumns}
              dataSource={[...store.selectedUsersGridData]}
              pagination={false}
            />
          </SelectedGridWrapper>
        </TablesWrapper>
        <TeamAnalysisBtnWrapper>
          <StyledActionColButton
            data-test-id="new-team-analyze-btn"
            type="primary"
            htmlType="button"
            onClick={() => store.getAnalysisData()}
            loading={store.loadingAnalysisData}
            disabled={!store.selectedUsersGridData.length}
          >
            Team analysis
          </StyledActionColButton>
        </TeamAnalysisBtnWrapper>
        {/* Team analysis */}
        {store.analysisData.length !== 0 && (
          <>
            <AnalysisCard>
              <GridName>Team analysis</GridName>
              <Legend>
                {legendItems.map((item: ILegendItems, index: number) => {
                  return (
                    <LegendItemWrapper key={index}>
                      <Color color={item.color} />
                      <Slug>{item.slug}</Slug>
                    </LegendItemWrapper>
                  );
                })}
              </Legend>
              {store.analysisData.map(
                (item: TeamAnalisysUser, index: number) => {
                  return (
                    <UserAnalysisRow
                      key={index}
                      id={item.user?.id}
                      jobTitle={item.user?.profile?.job_title}
                      photoSrc={item.user?.image_src}
                      fullName={item.user?.full_name}
                      rating={item.user?.profile?.rating}
                      negative={item.statistic?.negative}
                      neutral={item.statistic?.neutral}
                      positive={item.statistic?.positive}
                    />
                  );
                }
              )}
            </AnalysisCard>
            <TeamAnalysisBtnWrapper>
              <StyledActionColButton
                data-test-id="save-new-team-btn"
                type="primary"
                htmlType="button"
                onClick={saveTeamButtonHandler}
                loading={store.savingTeamInProgress}
                disabled={!teamNameValue}
              >
                Save team
              </StyledActionColButton>
            </TeamAnalysisBtnWrapper>
          </>
        )}
      </CreateTeamPageContent>
    </Layout>
  );
};

export default observer(CreateTeamPage);
