import styled from "styled-components";
import { Input } from "antd";
import ax from "../accessor";

const { Search } = Input;

const StyledSearch = styled(Search)`
  width: 208px;
  height: 50px;
  background-color: ${ax("menu-item-hover-bg-color")};
  margin-left: 40px;
  border: none;
  .ant-input {
    background-color: ${ax("menu-item-hover-bg-color")};
  }
  .ant-input-search-icon {
    :before {
      content: none;
    }
  }
`;

export default StyledSearch;
