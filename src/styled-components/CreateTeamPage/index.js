import styled from "styled-components";
import { Input } from "antd";
import ax from "../accessor";
import {SectionCard} from "../FeedbackPage";

const CreateTeamPageContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 26px 46px;
`;

const TablesWrapper = styled(SectionCard)`
  width: 100%;
  max-width: unset;
  margin: 30px 0 0;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const EmployeesGridWrapper = styled.div`
  flex: 0 0 40%;
  margin-right: 60px;
`;

const SelectedGridWrapper = styled.div`
  flex: 0 0 40%;
  min-width: 571px;
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

const TeamAnalysisBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 42px;
`;

const AnalysisCard = styled(SectionCard)`
  width: 100%;
  max-width: unset;
  margin: 100px 0 0;
`;

const Legend = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  border-bottom: 2px solid ${ax("analysis-row-border-color")};
  box-sizing: border-box;
  padding: 7px 0;
`;

const LegendItemWrapper = styled.div`
  width: fit-content;
  margin-right: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Color = styled.div`
  background-color: ${(props) => props.color};
  width: 15px;
  height: 15px;
  border-radius: 8px;
`;

const Slug = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: ${ax("grid-text-color")};
  margin-left: 6px;
`;

export {
  CreateTeamPageContent,
  TeamNameWrapper,
  EmployeesGridWrapper,
  StyledInput,
  TablesWrapper,
  SelectedGridWrapper,
  GridName,
  TeamAnalysisBtnWrapper,
  AnalysisCard,
  Legend,
  LegendItemWrapper,
  Color,
  Slug
};
