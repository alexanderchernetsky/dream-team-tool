import styled from "styled-components";
import { Link } from "react-router-dom";

const TeamsPageContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 45px 86px;
`;

const GradientCard = styled.div`
  margin: 19px 0;
  padding: 25px 30px;
  background: linear-gradient(90deg, #FFC7B6 0%, #FF65A6 100%);
  border-radius: 10px;
  color: #fff;
`;

const TeamName = styled.div`
  display: inline-block;
  padding-right: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #FFFFFF;
  font-weight: 500;
  font-size: 30px;
  line-height: 67%;  
`

const MembersCount = styled.div`
  margin-top: 10px;
  font-weight: 500;
  font-size: 15px;
  line-height: 133%;
`;

const StyledButton = styled(Link)`
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: #FF79A9;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 10px 5px;
  margin-left: auto;
  display: block;
  max-width: 110px;
  text-align: center;
  margin-top: -15px;
  
  &:hover {
    color: #ff1368;
  }
`;

export {
  TeamsPageContent,
  GradientCard,
  TeamName,
  MembersCount,
  StyledButton
}
