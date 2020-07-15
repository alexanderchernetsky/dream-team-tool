import React from "react";
import PropTypes from "prop-types";
import {
  GradientCard,
  MembersCount,
  StyledButton,
  TeamName,
} from "../styled-components/TeamsPage";

const TeamCard = ({ gradient, btnColor, teamName, usersCount, teamId }) => {
  return (
    <GradientCard gradient={gradient} buttonColor={btnColor}>
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

TeamCard.defaultProps = {
  gradient: "linear-gradient(90deg, #FFACCF 0%, #F9683A 100%)",
  btnColor: "#FA775C",
  teamName: "Best Team",
  usersCount: 4,
};

TeamCard.propTypes = {
  gradient: PropTypes.string,
  btnColor: PropTypes.string,
  teamName: PropTypes.string,
  usersCount: PropTypes.number,
  teamId: PropTypes.number.isRequired,
};

export default TeamCard;
