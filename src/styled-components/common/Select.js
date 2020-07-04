import styled from "styled-components";
import {Select} from "antd";
import ax from "../accessor";

const StyledSelect = styled(Select)`
  width: 183px;
  height: 50px;
  background-color: ${ax("menu-item-hover-bg-color")};
  .ant-select-selector {
    border: none !important;
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

export default StyledSelect;
