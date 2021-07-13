import React from "react";
import styled from "styled-components";
import moment from "moment";
import ax from "../styled-components/accessor";
import ProfileBackground from "../images/profile_background.jpg";
import SocMediaLink from "./SocMediaLink";
import capitalize from "../helpers/capitalize";
import { StyledButton } from "../styled-components/FeedbackPage";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 70px 50px;
  border-right: 2px solid ${ax("border-color")};
  position: relative;
  background: url(${ProfileBackground}) no-repeat center center fixed;
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

const MainInfoWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-top: 20px;
`;

const ProfileInfo = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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

const FullName = styled.h2`
  font-weight: 700;
  font-size: 22px;
  color: ${ax("user-info-text-color")};
`;

const RatingInfo = styled.h2`
  font-weight: 500;
  font-size: 20px;
  color: ${ax("primary-color")};
`;

const MainInfoText = styled.p`
  font-size: 14px;
  color: ${ax("user-main-info-text-color")};
`;

const TextWrapper = styled.article`
  font-size: 16px;
  line-height: 22px;
  color: ${ax("user-info-text-color")};
  width: 70%;
  margin-top: 30px;
  text-align: justify;
`;

const LinksWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  padding: 0;
`;

const ActionColWrapper = styled.li`
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

const CenterTextWrapper = styled.div`
  margin: 0 auto;
`;

interface IEmployeeInfo {
  imageSrc?: string;
  fullName: string;
  jobTitle: string;
  name: string;
  focus: string;
  rating: number;
  birth: string;
  age: number;
  yearsOfExperience: number;
  email: string;
  shortDescription: string;
  links: IEmployee[] | undefined;
}

interface IEmployee {
  link: string;
  name: string;
  profile_name: string;
}
const EmployeeInfo = ({
  imageSrc,
  fullName,
  name,
  jobTitle,
  focus,
  rating,
  birth,
  age,
  yearsOfExperience,
  email,
  shortDescription,
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
            {capitalize(focus)} <JobName>{jobTitle}</JobName>
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
            <ActionColWrapper key={index}>
              <CenterTextWrapper>
                <SocMediaLink
                  link={item.link}
                  name={item.name}
                  profileName={item.profile_name}
                />
              </CenterTextWrapper>
            </ActionColWrapper>
          );
        })}
      </LinksWrapper>
      <TextWrapper>{shortDescription}</TextWrapper>
    </Wrapper>
  );
};

export default EmployeeInfo;
