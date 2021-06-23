import React from "react";
import styled from "styled-components";
import moment from "moment";
import ax from "../styled-components/accessor";
import noLogoImage from "../images/no_logo_image.png";
import SocMediaLink from "./SocMediaLink";
import capitalize from "../helpers/capitalize";
import { StyledButton } from "../styled-components/FeedbackPage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 70px 50px;
  border-right: 2px solid ${ax("border-color")};
  position: relative;
  background: url("https://st4.cannypic.com/thumbs/42/422973_632_canny_pic.jpg")
    no-repeat center center fixed;
  background-size: cover;
  height: 200px;
`;

const Photo = styled.div`
  width: 200px;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const MainInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-top: 20px;
`;

const JobInfo = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: ${ax("user-info-text-color")};
`;

const JobName = styled.div`
  display: inline-block;
  font-weight: 200;
  font-size: 20px;
  color: ${ax("user-info-text-color")};
`;

const FullName = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: ${ax("user-info-text-color")};
`;

const RatingInfo = styled.div`
  font-weight: 500;
  font-size: 20px;
  color: ${ax("primary-color")};
`;

const MainInfoText = styled.div`
  font-size: 14px;
  color: ${ax("user-main-info-text-color")};
`;

const TextWrapper = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: ${ax("user-info-text-color")};
  width: 70%;
  margin-top: 30px;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

const ActionColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
`;

const StyledActionColButton = styled(StyledButton)`
  margin: 0 auto;
  width: 100%;
`;

interface IEmployeeInfo {
  imageSrc?: string;
  fullName?: string;
  jobTitle?: string;
  name?: string;
  focus?: string;
  rating?: number;
  birth?: string;
  age?: number;
  yearsOfExperience?: number;
  email?: string;
  shortDescription?: string;
  links: IEmployee[] | undefined;
}

interface IEmployee {
  link: string;
  name: string;
  profile_name: string;
}

const EmployeeInfo = ({
  imageSrc = noLogoImage,
  fullName = "Full Name",
  name = "Name",
  jobTitle = "Employee",
  focus = "Frontend",
  rating = 1,
  birth = "24 may 2020",
  age = 25,
  yearsOfExperience = 0,
  email = "example@mail.ru",
  shortDescription = "Employee short description.",
  links = [],
}: IEmployeeInfo): React.ReactElement => {
  return (
    <Wrapper>
      <Photo>
        <img src={imageSrc} alt="user" />
      </Photo>
      <MainInfoWrapper>
        <ProfileInfo>
          <FullName>{fullName}</FullName>
          <JobInfo>
            {capitalize(focus)} <JobName>— {jobTitle}</JobName>
          </JobInfo>
          <MainInfoText>
            {moment(birth).format("YYYY-MM-DD")} ({age} y.o.)
          </MainInfoText>
          <MainInfoText>{email}</MainInfoText>
        </ProfileInfo>
        <ProfileInfo>
          <RatingInfo>Rating: {rating}</RatingInfo>
          <JobInfo>
            {yearsOfExperience} years in {focus}
          </JobInfo>
        </ProfileInfo>
      </MainInfoWrapper>
      <LinksWrapper>
        <ActionColWrapper>
          <StyledActionColButton
            type="primary"
            htmlType="button"
            href={`mailto:${email}`}
          >
            Contact {name}
          </StyledActionColButton>
        </ActionColWrapper>
        {links.map((item: IEmployee, index: number) => {
          return (
            <ActionColWrapper>
              <div style={{ margin: "0 auto" }}>
                <SocMediaLink
                  key={index}
                  link={item.link}
                  name={item.name}
                  profileName={item.profile_name}
                />
              </div>
            </ActionColWrapper>
          );
        })}
      </LinksWrapper>
      <TextWrapper>{shortDescription}</TextWrapper>
    </Wrapper>
  );
};

export default EmployeeInfo;
