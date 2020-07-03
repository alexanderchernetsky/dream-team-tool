import React, { useEffect } from "react";
import { observer } from "mobx-react";
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
  CreateTeamPageContent,
  EmployeesGridWrapper, GridName,
  SelectedGridWrapper,
  StyledInput,
  TablesWrapper,
  TeamNameWrapper,
} from "../../styled-components/CreateTeamPage";

// add team member button handler
const addButtonClickHandler = (id) => {
  store.addTeamMember(id);
};

// remove team member button handler
const removeButtonClickHandler = (id) => {
  store.removeTeamMember(id);
};

// common columns
const commonUserColumn = {
  title: "User",
  dataIndex: "user",
  key: "user",
  render: (src) => <GridImage src={src} alt="user" />,
};

const commonFocusColumn = {
  title: "Focus",
  key: "focus",
  dataIndex: "focus",
  render: (text) => <GridText>{text}</GridText>,
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
    render: (text) => <GridText>{text}</GridText>,
  },
  {
    title: "Rating",
    key: "rating",
    dataIndex: "rating",
    sortable: true,
    sorter: ["ascend", "descend"],
    render: (text) => <Rating>{text}</Rating>,
  },
  commonFocusColumn,
  {
    title: "Actions",
    key: "actions",
    render: (data) => {
      return (
        <ActionColWrapper>
          <StyledActionColButton
            type="primary"
            htmlType="button"
            onClick={() => addButtonClickHandler(data.id)}
            disabled={store.selectedUsersGridData.some(item => item.id === data.id)}
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
    render: (text) => <GridText>{text}</GridText>,
  },
  {
    title: "Rating",
    key: "rating",
    dataIndex: "rating",
    render: (text) => <Rating>{text}</Rating>,
  },
  commonFocusColumn,
  {
    title: "Actions",
    key: "actions",
    render: (data) => {
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

const CreateTeamPage = ({ location, history }) => {
  useEffect(() => {
    store.getGridData(getUrlParams());
  }, [location]);

  const tableChangeHandler = (pagination, filters, sorter) => {
    const urlParams = getUrlParams();
    // handle sorting or pagination change
    if (!sorter || !sorter?.order) {
      delete urlParams.sort_column;
      delete urlParams.sort_direction;
      urlParams.page = pagination.current;
      history.push(`${createSearchString(urlParams)}`);
    } else {
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

  return (
    <Layout>
      {/* Header */}
      <Header pageTitle="Create new team" />
      {/* Content */}
      <CreateTeamPageContent>
        <TeamNameWrapper>
          <StyledInput placeholder="Please enter a team name" />
        </TeamNameWrapper>
        <TablesWrapper>
          <EmployeesGridWrapper>
            <GridName>Select employee</GridName>
            <StyledTable
              columns={allEmployeesGridColumns}
              dataSource={store.gridData}
              loading={store.loadingGridData}
              pagination={store.pagination}
              onChange={tableChangeHandler}
            />
          </EmployeesGridWrapper>
          <SelectedGridWrapper>
            <GridName>Team</GridName>
            <StyledTable
              columns={selectedUsersGridColumns}
              dataSource={store.selectedUsersGridData}
              pagination={false}
            />
          </SelectedGridWrapper>
        </TablesWrapper>
      </CreateTeamPageContent>
    </Layout>
  );
};

export default observer(CreateTeamPage);
