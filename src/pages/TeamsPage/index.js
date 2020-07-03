import React from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import {
  GradientCard,
  MembersCount,
  StyledButton,
  TeamName,
  TeamsPageContent
} from "../../styled-components/TeamsPage";
import teams from '../../__moks__/teams.json';
import { Col, Row } from "antd";
import randomGradient from "../../helpers/randomGradient";


const getTeamCard = (team) => {
  const item = randomGradient();

  return (
    <Col span={8} key={team.id}>
      <GradientCard
        gradient={item.gradient}
        buttonColor={item.buttonColor}
      >
        <TeamName>{team.name}</TeamName>
        <MembersCount>{team.users_count} members</MembersCount>
        <StyledButton to={`/teams/${team.id}`} className="view-button">
          View Team
        </StyledButton>
      </GradientCard>
    </Col>
  )
};

const TeamsPage = () => {
  return (
    <Layout>
      {/* Header */}
      <Header pageTitle="Teams" />
      {/* Content */}
      <TeamsPageContent>
        {/* Row */}
        <Row gutter={58}>
          {/* Column */}
          {teams.data.map(getTeamCard)}
        </Row>
      </TeamsPageContent>
    </Layout>
  );
}

export default TeamsPage;
