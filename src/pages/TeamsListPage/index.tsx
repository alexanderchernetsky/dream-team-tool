import React, {useEffect} from "react";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {Col, Row, Spin} from "antd";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import {
    SpinnerWrapper,
    TeamsPageContent,
} from "../../styled-components/TeamsPage";
import randomGradient from "../../helpers/randomGradient";
import TeamCard from "../../components/TeamCard";
import {ITeam, ITeamsDispatchProps, ITeamsStatePageProps, TeamsPageProps} from "../../interfaces/TeamsList";
import {IGradient} from "../../interfaces/common";
import {RootState} from "../../reducers";
import {getTeams} from "../../actions";

const mapStateToProps = (state: RootState): ITeamsStatePageProps => ({
    isLoading: state.teamsListPage.loading,
    teams: state.teamsListPage.teams
})

const mapDispatchToProps = (dispatch: Dispatch): ITeamsDispatchProps => bindActionCreators({
    fetchTeams: getTeams
}, dispatch);

const TeamsPage = (props: TeamsPageProps): React.ReactElement => {
    const {isLoading, teams, fetchTeams} = props;

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <Layout>
            {/* Header */}
            <Header pageTitle="Teams"/>
            {/* Content */}
            <TeamsPageContent>
                {isLoading ? (
                    <SpinnerWrapper>
                        <Spin size="large"/>
                    </SpinnerWrapper>
                ) : (
                    <Row gutter={58}>
                        {teams.map((team: ITeam) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
