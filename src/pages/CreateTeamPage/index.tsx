import React, { useEffect } from "react";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
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
import { ITeamAnalysisUser, IGridDataUser } from "../../interfaces/user";
import { ICreateTeamPageUrlParams } from "../../interfaces/urlParams";
import { ILegendItems, CreateTeamPageProps } from "../../interfaces/CreateTeamPage";
import {RootState} from "../../reducers";
import {
  addTeamMemberAction, getAnalysisDataAction,
  getGridDataAction,
  removeTeamMemberAction,
  saveTeamAction,
  setTeamNameValueAction
} from "../../actions/createTeamActions";

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

const mapStateToProps = (state :RootState) => ({
  gridData: state.createTeam.gridData,
  loadingGridData: state.createTeam.loadingGridData,
  pagination: state.createTeam.pagination,
  analysisData: state.createTeam.analysisData,
  savingTeamInProgress: state.createTeam.savingTeamInProgress,
  selectedUsersGridData: state.createTeam.selectedUsersGridData,
  loadingAnalysisData: state.createTeam.loadingAnalysisData,
  teamNameValue: state.createTeam.teamNameValue
})

const mapDispatchToProps = (dispatch :Dispatch) => ({
  getGridData: bindActionCreators(getGridDataAction, dispatch),
  saveTeam: bindActionCreators(saveTeamAction, dispatch),
  addTeamMember: bindActionCreators(addTeamMemberAction, dispatch),
  removeTeamMember: bindActionCreators(removeTeamMemberAction, dispatch),
  getAnalysisData: bindActionCreators(getAnalysisDataAction, dispatch),
  setTeamNameValue: bindActionCreators(setTeamNameValueAction, dispatch)
})

const CreateTeamPage = (props :CreateTeamPageProps): React.ReactElement => {
  const {
    location,
    history,
    gridData,
    loadingGridData,
    pagination,
    analysisData,
    savingTeamInProgress,
    selectedUsersGridData,
    loadingAnalysisData,
    getGridData,
    saveTeam,
    addTeamMember,
    removeTeamMember,
    getAnalysisData,
    teamNameValue,
    setTeamNameValue
  } = props;

  useEffect((): void => {
    getGridData(getUrlParams());
  }, [location]);

  const tableChangeHandler = (
    currentPagination: TablePaginationConfig,
    filters: Record<string, (string | number | boolean)[] | null> ,
    sorter: SorterResult<object> | SorterResult<object>[]
  ) => {
    const urlParams: ICreateTeamPageUrlParams = getUrlParams();
    // handle sorting or pagination change
    if (!sorter || (!Array.isArray(sorter) && !sorter.order)) {
      delete urlParams.sort_column;
      delete urlParams.sort_direction;
      urlParams.page = currentPagination.current;
      history.push(`${createSearchString(urlParams)}`);
    } else if (!Array.isArray(sorter)) {
      history.push(
        `${createSearchString({
          ...getUrlParams(),
          sort_column: sorter.field,
          sort_direction: sorter.order,
          page: currentPagination.current,
        })}`
      );
    }
  };

  const addTeamMemberHandler = (id: number): void => {
    addTeamMember(id);
  };

  const removeTeamMemberHandler = (id: number) => {
    removeTeamMember(id);
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
      render: (data: IGridDataUser): React.ReactElement => {
        return (
            <ActionColWrapper>
              <StyledActionColButton
                  type="primary"
                  htmlType="button"
                  onClick={() => addTeamMemberHandler(data.id)}
                  disabled={[...selectedUsersGridData].some(
                      (item: IGridDataUser) => item.id === data.id
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
      render: (data: IGridDataUser): React.ReactElement => {
        return (
            <ActionColWrapper>
              <StyledActionColButton
                  type="primary"
                  htmlType="button"
                  onClick={() => removeTeamMemberHandler(data.id)}
              >
                Remove
              </StyledActionColButton>
            </ActionColWrapper>
        );
      },
    },
  ];


  const saveTeamButtonHandler = () => {
    saveTeam(teamNameValue);
    history.push(Routes.TEAMS_LIST_PATH);
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
              dataSource={gridData}
              loading={loadingGridData}
              pagination={pagination}
              onChange={tableChangeHandler}
            />
          </EmployeesGridWrapper>
          {/* Team grid */}
          <SelectedGridWrapper>
            <GridName>Team</GridName>
            <StyledTable
              columns={selectedUsersGridColumns}
              dataSource={[...selectedUsersGridData]}
              pagination={false}
            />
          </SelectedGridWrapper>
        </TablesWrapper>
        <TeamAnalysisBtnWrapper>
          <StyledActionColButton
            data-test-id="new-team-analyze-btn"
            type="primary"
            htmlType="button"
            onClick={() => getAnalysisData()}
            loading={loadingAnalysisData}
            disabled={!selectedUsersGridData.length}
          >
            Team analysis
          </StyledActionColButton>
        </TeamAnalysisBtnWrapper>
        {/* Team analysis */}
        {analysisData.length !== 0 && (
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
              {analysisData.map(
                (item: ITeamAnalysisUser, index: number) => {
                  return (
                    <UserAnalysisRow
                      key={index}
                      id={item.user.id}
                      jobTitle={item.user.profile.job_title}
                      photoSrc={item.user.image_src}
                      fullName={item.user.full_name}
                      rating={item.user.profile.rating}
                      negative={item.statistic.negative}
                      neutral={item.statistic.neutral}
                      positive={item.statistic.positive}
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
                loading={savingTeamInProgress}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeamPage);
