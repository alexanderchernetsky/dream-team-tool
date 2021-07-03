import React, { useEffect } from "react";
import { Select } from "antd";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import { SelectValue } from "antd/lib/select";
import {
  SorterResult,
  TablePaginationConfig,
  ColumnsType,
} from "antd/lib/table/interface";
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
import { IGridDataUser } from "../../interfaces/user";
import { IHomepageManagerUrlParams } from "../../interfaces/urlParams";
import { ISelectOption } from "../../interfaces/common";
import {RootState} from "../../reducers";
import {getSelectOptionsAction, getGridDataAction} from "../../actions/homepageManagerActions";
import {HomepageManagerPageProps} from "../../interfaces/HomepageManager";

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
    render: (data: IGridDataUser) => {
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

const mapStateToProps = (state :RootState) => ({
  selectOptionsJobTitle: state.homepageManager.selectOptionsJobTitle,
  selectOptionsFocus: state.homepageManager.selectOptionsFocus,
  gridData: state.homepageManager.gridData,
  pagination: state.homepageManager.pagination,
  loadingGridData: state.homepageManager.loadingGridData
});

const mapDispatchToProps = (dispatch :Dispatch) => ({
  getSelectOptions: bindActionCreators(getSelectOptionsAction, dispatch),
  getGridData: bindActionCreators(getGridDataAction, dispatch)
})

const HomepageManager = (props: HomepageManagerPageProps): React.ReactElement => {
  const {
    location,
    history,
    getSelectOptions,
    getGridData,
    pagination,
    gridData,
    loadingGridData,
    selectOptionsJobTitle,
    selectOptionsFocus
  } = props;
  useEffect((): void => {
    getSelectOptions();
  }, []);

  useEffect((): void => {
    getGridData(getUrlParams());
  }, [location]);

  const onSelectChange = (selectName: string, value: SelectValue): void => {
    const urlParams: IHomepageManagerUrlParams = getUrlParams();
    if (!value) {
      if (!Array.isArray(urlParams)) {
        delete urlParams[selectName as keyof IHomepageManagerUrlParams];
        history.push(`${createSearchString(urlParams)}`);
      }
    } else {
      delete urlParams.page;
      history.push(
        `${createSearchString({ ...urlParams, [`${selectName}`]: value })}`
      );
    }
  };

  const searchHandler = (value: string): void => {
    const urlParams: IHomepageManagerUrlParams = getUrlParams();
    if (!value) {
      delete urlParams.searchPhrase;
      history.push(`${createSearchString(urlParams)}`);
    } else {
      delete urlParams.page;
      history.push(
        `${createSearchString({ ...urlParams, searchPhrase: value })}`
      );
    }
  };

  const tableChangeHandler = (
    currentPagination: TablePaginationConfig,
    filters: Record<string, (string | number | boolean)[] | null>,
    sorter: SorterResult<object> | SorterResult<object>[]
  ): void => {
    const urlParams: IHomepageManagerUrlParams = getUrlParams();
    // handle sorting or pagination change
    if (!sorter || (!Array.isArray(sorter) && !sorter.order)) {
      delete urlParams.sort_column;
      delete urlParams.sort_direction;
      urlParams.page = currentPagination.current;
      history.push(`${createSearchString(urlParams)}`);
    } else if (!Array.isArray(sorter)) {
      history.push(
        `${createSearchString({
          ...urlParams,
          sort_column: sorter.field,
          sort_direction: sorter.order,
          page: currentPagination.current,
        })}`
      );
    }
  };
  const urlParams: IHomepageManagerUrlParams = getUrlParams();

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
            {selectOptionsJobTitle.map(
              (item: ISelectOption, index: number) => {
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
            {selectOptionsFocus.map(
              (item: ISelectOption, index: number) => {
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
            dataSource={gridData}
            loading={loadingGridData}
            pagination={pagination}
            onChange={tableChangeHandler}
          />
        </GridWrapper>
      </ManagerHomepageContent>
    </Layout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomepageManager);
