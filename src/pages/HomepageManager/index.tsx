import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Select } from "antd";
import { RouteComponentProps } from "react-router";
import { SelectValue } from "antd/lib/select";
import {
  Key,
  SorterResult,
  TablePaginationConfig,
  ColumnsType,
} from "antd/lib/table/interface";
import store from "../../stores/ManagerHomepageStore";
import getUrlParams from "../../helpers/getUrlParams";
import createSearchString from "../../helpers/createSearchString";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import LoopIcon from "../../images/Loop";
import {
  ActionColWrapper,
  FiltersWrapper,
  GridImage,
  GridText,
  GridWrapper,
  ManagerHomepageContent,
  Rating,
  StyledActionColButton,
  StyledManagerHomepageSearch,
  StyledManagerHomepageSelect,
  StyledTable,
} from "../../styled-components/HomepageManager";
import { HomepageManagerUser } from "../../interfaces/user";
import { HomepageManagerUrlParams } from "../../interfaces/urlParams";
import { SelectOption } from "../../interfaces/common";
const { Option } = Select;

const columns = [
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    render: (src: string | undefined) => <GridImage src={src} alt="user" />,
  },
  {
    title: "Full name",
    dataIndex: "full_name",
    key: "full_name",
    sortable: true,
    sorter: ["ascend", "descend"],
    render: (text: string) => <GridText>{text}</GridText>,
  },
  {
    title: "Job title",
    dataIndex: "job_title",
    key: "job_title",
    render: (text: string) => <GridText>{text}</GridText>,
  },
  {
    title: "Rating",
    key: "rating",
    dataIndex: "rating",
    sortable: true,
    sorter: ["ascend", "descend"],
    render: (text: string) => <Rating>{text}</Rating>,
  },
  {
    title: "Focus",
    key: "focus",
    dataIndex: "focus",
    render: (text: string) => <GridText>{text}</GridText>,
  },
  {
    title: "Actions",
    key: "actions",
    render: (data: HomepageManagerUser) => {
      return (
        <ActionColWrapper>
          <StyledActionColButton
            type="primary"
            htmlType="button"
            href={`/view-profile/${data.id}`}
            onClick={(event) => {
              event.preventDefault();
              alert("Coming soon...");
            }}
          >
            View profile
          </StyledActionColButton>
        </ActionColWrapper>
      );
    },
  },
];

const HomepageManager = ({
  history,
  location,
}: RouteComponentProps): React.ReactElement => {
  useEffect(() => {
    store.getSelectOptions();
  }, []);

  useEffect(() => {
    store.getGridData(getUrlParams());
  }, [location]);

  const onSelectChange = (selectName: string, value: SelectValue) => {
    const urlParams: HomepageManagerUrlParams = getUrlParams();
    if (!value) {
      if (!Array.isArray(urlParams)) {
        delete urlParams[selectName as keyof HomepageManagerUrlParams];
        history.push(`${createSearchString(urlParams)}`);
      }
    } else {
      history.push(
        `${createSearchString({ ...getUrlParams(), [`${selectName}`]: value })}`
      );
    }
  };

  const searchHandler = (value: string) => {
    const urlParams: HomepageManagerUrlParams = getUrlParams();
    if (!value) {
      delete urlParams.searchPhrase;
      history.push(`${createSearchString(urlParams)}`);
    } else {
      history.push(
        `${createSearchString({ ...urlParams, searchPhrase: value })}`
      );
    }
  };

  const tableChangeHandler = (
    pagination: TablePaginationConfig,
    filters: Record<string, Key[] | null>,
    sorter: SorterResult<object> | SorterResult<object>[]
  ) => {
    const urlParams: HomepageManagerUrlParams = getUrlParams();
    // handle sorting or pagination change
    if (!sorter || (!Array.isArray(sorter) && !sorter.order)) {
      delete urlParams.sort_column;
      delete urlParams.sort_direction;
      urlParams.page = pagination.current;
      history.push(`${createSearchString(urlParams)}`);
    } else if (!Array.isArray(sorter)) {
      history.push(
        `${createSearchString({
          ...urlParams,
          sort_column: sorter.field,
          sort_direction: sorter.order,
          page: pagination.current,
        })}`
      );
    }
  };
  const urlParams: HomepageManagerUrlParams = getUrlParams();

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
            value={urlParams.job_title || undefined}
          >
            {store?.selectOptionsJobTitle?.map(
              (item: SelectOption, index: number) => {
                return (
                  <Option value={item.value} key={index}>
                    {item.label}
                  </Option>
                );
              }
            )}
          </StyledManagerHomepageSelect>
          {/* Focus */}
          <StyledManagerHomepageSelect
            placeholder="Focus"
            allowClear
            onChange={(value) => onSelectChange("focus", value)}
            value={urlParams.focus || undefined}
          >
            {store?.selectOptionsFocus?.map(
              (item: SelectOption, index: number) => {
                return (
                  <Option value={item.value} key={index}>
                    {item.label}
                  </Option>
                );
              }
            )}
          </StyledManagerHomepageSelect>
          {/* Search */}
          <StyledManagerHomepageSearch
            type="search"
            placeholder="Search by full name"
            onSearch={searchHandler}
            suffix={LoopIcon}
            defaultValue={urlParams.searchPhrase}
            allowClear
          />
        </FiltersWrapper>
        <GridWrapper>
          <StyledTable
            columns={columns as ColumnsType<object>}
            dataSource={store.gridData}
            loading={store.loadingGridData}
            pagination={store.pagination}
            onChange={tableChangeHandler}
          />
        </GridWrapper>
      </ManagerHomepageContent>
    </Layout>
  );
};

export default observer(HomepageManager);
