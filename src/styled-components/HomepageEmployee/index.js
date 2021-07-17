import styled from "styled-components";

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const EmployeeHomepageContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const FeedWrapper = styled.div`
  display: flex;
  min-width: 50%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

export { FiltersWrapper, EmployeeHomepageContent, FeedWrapper, SpinnerWrapper };
