import React from "react";
import {
  GradientCard,
  MembersCount,
  StyledButton,
  TeamName,
} from "../styled-components/TeamsPage";

interface ITeamCard {
  gradient?: string;
  btnColor?: string;
  teamName?: string;
  usersCount?: number;
  teamId: number;
}

const TeamCard = ({
  gradient = "linear-gradient(90deg, #FFACCF 0%, #F9683A 100%)",
  btnColor = "#FA775C",
  teamName = "Best Team",
  usersCount = 4,
  teamId,
}: ITeamCard) :React.ReactElement => {
  return (
    <GradientCard {...gradient} buttonColor={btnColor}>
      <TeamName>{teamName}</TeamName>
      <MembersCount>{usersCount} members</MembersCount>
      <StyledButton
        to={`/teams/${teamId}`}
        className="view-button"
        onClick={(event) => {
          event.preventDefault();
          alert("Coming soon...");
        }}
      >
        View Team
      </StyledButton>
    </GradientCard>
  );
};

export default TeamCard;
