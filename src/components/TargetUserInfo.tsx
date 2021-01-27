import React from "react";
import styled from "styled-components";
import ax from "../styled-components/accessor";
import noLogoImage from "../images/no_logo_image.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 47px 35px 20px;
`;

const PhotoAndMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Photo = styled.div`
  width: 87px;
  height: 87px;
  border-radius: 10px;
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
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: ${ax("user-info-text-color")};
`;

const MainInfoText = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: ${ax("user-main-info-text-color")};
`;

const TextWrapper = styled.div`
  font-weight: normal;
  font-size: 20px;
  line-height: 20px;
  color: ${ax("user-info-text-color")};
  width: 100%;
  margin-top: 35px;
`;

const NameHighlighted = styled.span`
  color: ${ax("primary-color")};
`;

interface ITargetUserInfo {
  photoSrc?: string;
  fullName?: string;
  jobTitle?: string;
}

const TargetUserInfo = ({
  photoSrc = noLogoImage,
  fullName = "Full Name",
  jobTitle = "Employee",
}: ITargetUserInfo):React.ReactElement => {
  return (
    <Wrapper>
      <PhotoAndMainInfoWrapper>
        <Photo>
          <img src={photoSrc} alt="target user" />
        </Photo>
        <MainInfo>
          <FullName>{fullName}</FullName>
          <MainInfoText>{jobTitle}</MainInfoText>
        </MainInfo>
      </PhotoAndMainInfoWrapper>
      <TextWrapper>
        How ofter <NameHighlighted>{fullName}</NameHighlighted> shows the
        following features:
      </TextWrapper>
    </Wrapper>
  );
};

export default TargetUserInfo;
