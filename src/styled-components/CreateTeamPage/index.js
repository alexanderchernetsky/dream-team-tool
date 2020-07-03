import styled from "styled-components";
import { Input } from "antd";
import ax from "../accessor";

const CreateTeamPageContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 26px 46px;
`;

const TablesWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const EmployeesGridWrapper = styled.div`
  flex: 0 0 50%;
`;

const SelectedGridWrapper = styled.div`
  flex: 0 0 50%;
  margin-left: 60px;
`;

const StyledInput = styled(Input)`
  width: 272px;
  height: 33px;
  background-color: ${ax("menu-item-hover-bg-color")};
  border: none;
  ::placeholder {
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    color: ${ax("input-placeholder-color")};
  }
`;

const GridName = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 38px;
  color: ${ax("form-section-heading-color")};
  border-bottom: 2px solid ${ax("primary-color")};
  margin-bottom: 23px;
  width: fit-content;
`;

const TeamNameWrapper = styled.div``;

export {
  CreateTeamPageContent,
  TeamNameWrapper,
  EmployeesGridWrapper,
  StyledInput,
  TablesWrapper,
  SelectedGridWrapper,
  GridName
};
