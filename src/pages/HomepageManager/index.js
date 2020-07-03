import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Select } from "antd";
import loginStore from "../../stores/LoginStore";
import store from "../../stores/ManagerHomepageStore";
import getUrlParams from "../../helpers/getUrlParams";
import createSearchString from "../../helpers/createSearchString";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import LoopIcon from "../../images/Loop";
import {
  ActionColWrapper, FiltersWrapper,
  GridImage,
  GridText, GridWrapper, ManagerHomepageContent,
  Rating,
  StyledActionColButton, StyledManagerHomepageSearch, StyledManagerHomepageSelect, StyledTable
} from "../../styled-components/HomepageManager";

const { Option } = Select;

const columns = [
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    render: (src) => <GridImage src={src} alt="user" />,
  },
  {
    title: "Full name",
    dataIndex: "full_name",
    key: "full_name",
    sortable: true,
    sorter: ["ascend", "descend"],
    render: (text) => <GridText>{text}</GridText>,
  },
  {
    title: "Job title",
    dataIndex: "job_title",
    key: "job_title",
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
  {
    title: "Focus",
    key: "focus",
    dataIndex: "focus",
    render: (text) => <GridText>{text}</GridText>,
  },
  {
    title: "Actions",
    key: "actions",
    render: (data) => {
      return (
        <ActionColWrapper>
          <StyledActionColButton type="primary" htmlType="button" href={`/view-profile/${data.id}`}>
            View profile
          </StyledActionColButton>
        </ActionColWrapper>
      );
    },
  },
];

const HomepageManager = ({ history, location }) => {
  useEffect(() => {
    loginStore.checkAndSetAuthHeader();
    store.getSelectOptions();
  }, []);

  useEffect(() => {
    store.getGridData(getUrlParams());
  }, [location]);

  const onSelectChange = (selectName, value) => {
    const urlParams = getUrlParams();
    if (!value) {
      delete urlParams[`${selectName}`];
      history.push(`${createSearchString(urlParams)}`);
    } else {
      history.push(
        `${createSearchString({ ...getUrlParams(), [`${selectName}`]: value })}`
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

  const onTableChangeHandler = (pagination, filters, sorter) => {
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
            page: pagination.current
          })}`
      );
    }

  };

  return (
    <Layout>
      {/* Header */}
      <Header pageTitle="Home page" />
      {/* Content */}
      <ManagerHomepageContent>
        <FiltersWrapper>
          {/* Job title */}
          <StyledManagerHomepageSelect
            placeholder="Job title"
            allowClear
            onChange={(value) => onSelectChange("job_title", value)}
            value={getUrlParams().job_title || null}
          >
            {store?.selectOptionsJobTitle?.map((item, index) => {
              return (
                <Option value={item.value} key={index}>
                  {item.label}
                </Option>
              );
            })}
          </StyledManagerHomepageSelect>
          {/* Focus */}
          <StyledManagerHomepageSelect
            placeholder="Focus"
            allowClear
            onChange={(value) => onSelectChange("focus", value)}
            value={getUrlParams().focus || null}
          >
            {store?.selectOptionsFocus?.map((item, index) => {
              return (
                <Option value={item.value} key={index}>
                  {item.label}
                </Option>
              );
            })}
          </StyledManagerHomepageSelect>
          {/* Search */}
          <StyledManagerHomepageSearch
            type="search"
            placeholder="Search by full name"
            onSearch={searchHandler}
            suffix={LoopIcon}
            defaultValue={getUrlParams().searchPhrase}
            allowClear
          />
        </FiltersWrapper>
        <GridWrapper>
          <StyledTable
            columns={columns}
            dataSource={store.gridData}
            loading={store.loadingGridData}
            pagination={store.pagination}
            onChange={onTableChangeHandler}
          />
        </GridWrapper>
      </ManagerHomepageContent>
    </Layout>
  );
};

export default observer(HomepageManager);
