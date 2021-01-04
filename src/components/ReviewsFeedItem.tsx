import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import ax from "../styled-components/accessor";
import noLogoImage from "../images/no_logo_image.png";
import ArrowIcon from "../images/Arrow";
import { RouteComponentProps } from "react-router";

const ReviewWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 50px;
  box-sizing: border-box;
`;

const PhotoAndMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Photo = styled.div`
  width: 65px;
  height: 65px;
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
  margin-left: 20px;
`;

const FullName = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${ax("user-info-text-color")};
`;

const MainInfoText = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: ${ax("user-main-info-text-color")};
`;

const Review = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-left: 2px solid ${(props) => props.color};
  margin-top: 30px;
  padding-left: 21px;
`;

const Text = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${ax("review-link-color")};
  display: flex;
  flex-direction: row;
  align-items: center;
  svg {
    margin-left: 14px;
  }
`;

function getColorForReviewBorder(number: number) {
  if (number > 0) {
    return "#5FB840"; // positive
  }
  if (number < 0) {
    return "#F16B41"; // negative
  }
  return "#B6B5BB"; // neutral
}

interface IReviewsFeedItem extends RouteComponentProps {
  photoSrc?: string;
  fullName?: string;
  jobTitle?: string;
  date?: string;
  personalCharacteristics?: string;
  weakSides?: string;
  otherComments?: string;
  rating?: number;
  id?: number;
}

const ReviewsFeedItem = ({
  photoSrc = noLogoImage,
  fullName = "Full Name",
  jobTitle = "Employee",
  date = "14 apr 2020, 13:11",
  personalCharacteristics = "An ambitious person is someone who has a strong desire to achieve success by meeting their goals. You might demonstrate ambition when you applied hard work and dedication to overcome a challenge or exceed company objectives.",
  weakSides = "Not taking criticism well. Impatient. Lazy. Easily bored. Procrastinate.",
  otherComments = "Karl is fantastic to work with. He has helped us build our new website which is awesome. I'd highly recommend him as quick, creative and very resourceful.",
  rating = 5,
  id = 1,
}: IReviewsFeedItem) => {
  return (
    <ReviewWrapper>
      <PhotoAndMainInfoWrapper>
        <Photo>
          <img src={photoSrc} alt={fullName} />
        </Photo>
        <MainInfo>
          <FullName>{fullName}</FullName>
          <MainInfoText>{jobTitle}</MainInfoText>
          <MainInfoText>{moment(date).format("LLL")}</MainInfoText>
        </MainInfo>
      </PhotoAndMainInfoWrapper>
      <Review color={getColorForReviewBorder(rating)}>
        <Text>{personalCharacteristics}</Text>
        <Text>{weakSides}</Text>
        <Text>{otherComments}</Text>
        <StyledLink
          to={`/review/${id}`}
          onClick={(event) => {
            event.preventDefault();
            alert("Coming soon...");
          }}
        >
          Full review <ArrowIcon />
        </StyledLink>
      </Review>
    </ReviewWrapper>
  );
};

export default withRouter(ReviewsFeedItem);
