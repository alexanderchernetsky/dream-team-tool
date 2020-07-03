import styled from "styled-components";
import { Table } from "antd";
import { StyledButton, StyledSelect } from "../FeedbackPage";
import ax from "../accessor";
import StyledSearch from "../common/Search";

const ManagerHomepageContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FiltersWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 48px 119px 48px 74px;
`;

const StyledManagerHomepageSelect = styled(StyledSelect)`
  margin: 0 30px 0 0;
  .ant-select-selection-placeholder {
    color: ${ax("user-info-text-color")};
  }
`;

const StyledManagerHomepageSearch = styled(StyledSearch)`
  width: 314px;
  height: 35px;
  margin-left: auto;
`;

const GridWrapper = styled.div`
  padding: 0 119px 0 74px;
`;

const GridImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

const ActionColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GridText = styled.span`
  font-weight: 300;
  font-size: 15px;
  line-height: 20px;
  color: ${ax("grid-text-color")};
  text-transform: capitalize;
`;

const Rating = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 20px;
  color: ${ax("primary-color")};
`;

const StyledActionColButton = styled(StyledButton)`
  margin: 0;
`;

const StyledTable = styled(Table)`
  .ant-table-thead {
    tr {
      th {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 20px;
        color: ${ax("grid-text-color")};
        background-color: ${ax("menu-item-hover-bg-color")};
      }
    }
  }
  .ant-table-tbody {
    tr {
      :hover {
        background-color: ${ax("menu-item-hover-bg-color")};
        td {
          background-color: ${ax("menu-item-hover-bg-color")};
        }
      }
    }
  }
`;

export {
  ManagerHomepageContent,
  FiltersWrapper,
  StyledManagerHomepageSelect,
  StyledManagerHomepageSearch,
  GridWrapper,
  GridImage,
  ActionColWrapper,
  GridText,
  Rating,
  StyledActionColButton,
  StyledTable,
};
