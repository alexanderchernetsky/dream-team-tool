import styled from "styled-components";
import { Link } from "react-router-dom";
import ax from "../accessor";

const TeamsPageContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 45px 86px;
  min-width: 1150px;
`;

const GradientCard = styled.div`
  margin: 19px 0;
  padding: 25px 30px;
  background: ${(props) => props.gradient};
  border-radius: 10px;
  color: ${ax("secondary-color")};
  min-width: 300px;
  .view-button {
    color: ${(props) => props.buttonColor};
  }
`;

const TeamName = styled.div`
  display: inline-block;
  padding-right: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${ax("secondary-color")};
  font-weight: 500;
  font-size: 30px;
  line-height: 67%;
`;

const MembersCount = styled.div`
  margin-top: 10px;
  font-weight: 500;
  font-size: 15px;
  line-height: 133%;
`;

const StyledButton = styled(Link)`
  display: block;
  max-width: 110px;
  padding: 10px 5px;
  margin-top: -15px;
  margin-left: auto;
  border-radius: 5px;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  background: ${ax("secondary-color")};
  text-align: center;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

export {
  TeamsPageContent,
  GradientCard,
  TeamName,
  MembersCount,
  StyledButton,
  SpinnerWrapper,
};
