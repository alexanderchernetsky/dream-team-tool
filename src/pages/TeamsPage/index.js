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

const getTeamCard = (team) => (
  <Col span={8}>
    <GradientCard>
      <TeamName>{team.name}</TeamName>
      <MembersCount>{team.users_count} members</MembersCount>
      <StyledButton to={`/teams/${team.id}`}>
        View Team
      </StyledButton>
    </GradientCard>
  </Col>
);

const TeamsPage = () => {
  return (
    <Layout>
      {/* Header */}
      <Header pageTitle="Teams" />
      {/* Content */}
      <TeamsPageContent>
        <Row gutter={58}>
          {teams.data.map(getTeamCard)}
        </Row>
      </TeamsPageContent>
    </Layout>
  );
}

export default TeamsPage;
