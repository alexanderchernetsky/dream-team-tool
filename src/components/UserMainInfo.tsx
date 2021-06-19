import React from "react";
import styled from "styled-components";
import moment from "moment";
import ax from "../styled-components/accessor";
import noLogoImage from "../images/no_logo_image.png";
import SocMediaLink from "./SocMediaLink";
import capitalize from "../helpers/capitalize";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 100%;
  min-width: 400px;
  box-sizing: border-box;
  padding: 70px 50px;
  border-right: 2px solid ${ax("border-color")};
`;

const PhotoAndMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Photo = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 5px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 22px;
`;

const FullName = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${ax("user-info-text-color")};
`;

const MainInfoText = styled.div`
  font-size: 14px;
  color: ${ax("user-main-info-text-color")};
`;

const TextWrapper = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: ${ax("user-info-text-color")};
  width: 100%;
  margin-top: 30px;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 40px;
`;

interface IUserMainInfo {
  imageSrc?: string;
  fullName?: string;
  jobTitle?: string;
  focus?: string;
  rating?: number;
  birth?: string;
  age?: number;
  yearsOfExperience?: number;
  email?: string;
  shortDescription?: string;
  links: IProfile[] | undefined;
}

interface IProfile {
  link: string;
  name: string;
  profile_name: string;
}

const UserMainInfo = ({
  imageSrc = noLogoImage,
  fullName = "Full Name",
  jobTitle = "Employee",
  focus = "Frontend",
  rating = 1,
  birth = "24 may 2020",
  age = 25,
  yearsOfExperience = 0,
  email = "example@mail.ru",
  shortDescription = "Employee short description.",
  links = [],
}: IUserMainInfo): React.ReactElement => {
  return (
    <Wrapper>
      <PhotoAndMainInfoWrapper>
        <Photo>
          <img src={imageSrc} alt="user" />
        </Photo>
        <MainInfo>
          <FullName>{fullName}</FullName>
          <MainInfoText>{capitalize(focus)}</MainInfoText>
          <MainInfoText>{jobTitle}</MainInfoText>
          <MainInfoText>Date of birth - {moment(birth).format("MMM Do YYYY")}</MainInfoText>
          <MainInfoText>
            {age} years old - {yearsOfExperience} years of exp
          </MainInfoText>
          <MainInfoText>{email}</MainInfoText>
          <TextWrapper>Rating: {rating}</TextWrapper>
        </MainInfo>
      </PhotoAndMainInfoWrapper>
      <TextWrapper>{shortDescription}</TextWrapper>
      <LinksWrapper>
        {links.map((item: IProfile, index: number) => {
          return (
            <SocMediaLink
              key={index}
              link={item.link}
              name={item.name}
              profileName={item.profile_name}
            />
          );
        })}
      </LinksWrapper>
    </Wrapper>
  );
};

export default UserMainInfo;
