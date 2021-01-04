import React from "react";
import styled from "styled-components";
import ax from "../styled-components/accessor";
import noLogoImage from "../images/no_logo_image.png";
import SocMediaLink from "./SocMediaLink";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 500px;
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
  width: 100px;
  height: 100px;
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
  age?: number;
  yearsOfExperience?: number;
  email?: string;
  shortDescription?: string;
  links: any;
}

const UserMainInfo = ({
  imageSrc = noLogoImage,
  fullName = "Full Name",
  jobTitle = "Employee",
  age = 25,
  yearsOfExperience = 0,
  email = "example@mail.ru",
  shortDescription = "Employee short description.",
  links = [],
}: IUserMainInfo) => {
  return (
    <Wrapper>
      <PhotoAndMainInfoWrapper>
        <Photo>
          <img src={imageSrc} alt="user" />
        </Photo>
        <MainInfo>
          <FullName>{fullName}</FullName>
          <MainInfoText>{jobTitle}</MainInfoText>
          <MainInfoText>
            {age} years old - {yearsOfExperience} years of exp
          </MainInfoText>
          <MainInfoText>{email}</MainInfoText>
        </MainInfo>
      </PhotoAndMainInfoWrapper>
      <TextWrapper>{shortDescription}</TextWrapper>
      <LinksWrapper>
        {links.map((item: any, index: number) => {
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
