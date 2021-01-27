import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Select } from "antd";
import { RouteComponentProps } from "react-router";
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
import { SelectValue } from 'antd/lib/select';

const { Option } = Select;

interface IData {
  focus: string;
  full_name: string;
  id: number;
  job_title: string;
  key: number;
  rating: number;
  user: string;
}

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
    render: (data: IData) => {
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

interface IUrlParams {
  rating?: string;
  searchPhrase?: string;
  sort_column?: string;
  sort_direction?: string;
  page?: number | string;
  job_title?: string;
  focus?: string;
}

interface IPagination {
  current?: number;
  pageSize?: number;
  total?: number;
  page?: number;
}

interface IOption {
  value: string;
  label: string;
}

const HomepageManager = ({ history, location }: RouteComponentProps) :React.ReactElement => {
  useEffect(() => {
    store.getSelectOptions();
  }, []);

  useEffect(() => {
    store.getGridData(getUrlParams());
  }, [location]);

  const onSelectChange = (selectName: string, value: SelectValue) => {
    const urlParams: IUrlParams & any = getUrlParams();
    if (!value) {
      delete urlParams[`${selectName}`];
      history.push(`${createSearchString(urlParams)}`);
    } else {
      history.push(
        `${createSearchString({ ...getUrlParams(), [`${selectName}`]: value })}`
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

  const tableChangeHandler = (
    pagination: IPagination,
    filters: any,
    sorter: any
  ) => {
    const urlParams: IUrlParams = getUrlParams();
    // handle sorting or pagination change
    if (!sorter || !sorter?.order) {
      delete urlParams.sort_column;
      delete urlParams.sort_direction;
      urlParams.page = pagination.current;
      history.push(`${createSearchString(urlParams)}`);
    } else {
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
  const urlParams: IUrlParams = getUrlParams();

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
            value={urlParams.job_title || ""}
          >
            {store?.selectOptionsJobTitle?.map((item :IOption, index: number) => {
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
            value={urlParams.focus || ""}
          >
            {store?.selectOptionsFocus?.map((item :IOption, index :number) => {
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
            defaultValue={urlParams.searchPhrase}
            allowClear
          />
        </FiltersWrapper>
        <GridWrapper>
          <StyledTable
            columns={columns as any}
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