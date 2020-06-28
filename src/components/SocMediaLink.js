import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withRouter} from "react-router-dom";
import ax from "../styled-components/accessor";
import GithubIcon from "../images/socialMedia/Github";
import SlackIcon from "../images/socialMedia/Slack";

function getIconForName(name) {
  switch (name) {
    case "github":
      return <GithubIcon />;
    default:
      return <SlackIcon />;
  }
}

const ProfileName = styled.span`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${ax("soc-media-link-color")};
  padding-left: 10px;
`;

const StyledLink = styled.a`
  background-color: ${ax("menu-item-hover-bg-color")};
  margin: 0 15px 15px 0;
  padding: 6px 17px;
`;

const SocMediaLinkComponent = ({ name, link, profileName }) => {
  return (
      <StyledLink href={link} target="_blank">
        {getIconForName(name)}
        <ProfileName>{profileName}</ProfileName>
      </StyledLink>
  );
};

SocMediaLinkComponent.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
};

export default withRouter(SocMediaLinkComponent);
