import React, { useEffect } from "react";
import { Col, Row, Spin } from "antd";
import { observer } from "mobx-react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import {
  SpinnerWrapper,
  TeamsPageContent,
} from "../../styled-components/TeamsPage";
import store from "../../stores/TeamsListPageStore";
import randomGradient from "../../helpers/randomGradient";
import TeamCard from "../../components/TeamCard";
import { ITeam } from "../../interfaces/TeamsList";
import { IGradient } from "../../interfaces/common";

const TeamsPage = (): React.ReactElement => {
  useEffect((): void => {
    store.getTeams();
  }, []);

  return (
    <Layout>
      {/* Header */}
      <Header pageTitle="Teams" />
      {/* Content */}
      <TeamsPageContent>
        {store.loading ? (
          <SpinnerWrapper>
            <Spin size="large" />
          </SpinnerWrapper>
        ) : (
          <Row gutter={58}>
            {store?.teams?.data?.map((team: ITeam) => {
              const theme: IGradient = randomGradient();
              return (
                <Col span={8} key={team.id}>
                  <TeamCard
                    teamId={team.id}
                    btnColor={theme.buttonColor}
                    gradient={theme.gradient}
                    teamName={team.name}
                    usersCount={team.users_count}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </TeamsPageContent>
    </Layout>
  );
};

export default observer(TeamsPage);
