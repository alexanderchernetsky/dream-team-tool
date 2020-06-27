import React from "react";
import styled from "styled-components";
import { Input, Select } from "antd";
import UserMainInfo from "../../components/UserMainInfo";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import ax from "../../styled-components/accessor";
import LoopIcon from "../../images/Loop";

const { Option } = Select;
const { Search } = Input;

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const StyledSelect = styled(Select)`
  width: 183px;
  height: 50px;
  background-color: ${ax("menu-item-hover-bg-color")};
  .ant-select-selector {
    background-color: ${ax("menu-item-hover-bg-color")} !important;
    width: 183px !important;
    height: 50px !important;
    .ant-select-selection-search-input {
      height: 50px !important;
    }
    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      display: flex;
      align-items: center;
    }
  }
`;

const StyledSearch = styled(Search)`
  width: 208px;
  height: 50px;
  background-color: ${ax("menu-item-hover-bg-color")};
  margin-left: 40px;
  .ant-input {
    background-color: ${ax("menu-item-hover-bg-color")};
  }
`;

const selectOptions = [
  {
    value: "positive",
    label: "Positive",
  },
  {
    value: "neutral",
    label: "Neutral",
  },
  {
    value: "negative",
    label: "Negative",
  },
];

const Homepage = () => {
  const onSelectChange = value => {
    console.log("value", value);

  }
  const searchHandler = value => {
    console.log("value", value);
  }

  return (
    <Layout>
      <Header pageTitle="Feedback on you">
        <FiltersWrapper>
          <StyledSelect placeholder="All feedback" allowClear onChange={onSelectChange}>
            {selectOptions.map((item, index) => {
              return (
                <Option value={item.value} key={index}>
                  {item.label}
                </Option>
              );
            })}
          </StyledSelect>
          <StyledSearch type="search" placeholder="Search everything" onSearch={searchHandler} suffix={LoopIcon} />
        </FiltersWrapper>
      </Header>
      <UserMainInfo />
    </Layout>
  );
};

export default Homepage;
