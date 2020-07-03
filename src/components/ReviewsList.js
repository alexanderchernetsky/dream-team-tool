import React from "react";
import styled from "styled-components";
import ax from "../styled-components/accessor";
import { StyledPrimaryButton } from "../styled-components/HomepageManager";
import { withRouter } from "react-router-dom";

const PhotoAndMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  min-width: 190px;
  margin: 10px 0;
  
  .ant-btn-primary {
    margin-left: auto;
    margin-bottom: 0;
  }
`;

const Photo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;

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
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: ${ax("grid-text-color")};
`;

const MainInfoText = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 20px;
`;

const ReviewsList = ({reviews, history} = props) => {
  const reviewItem = (review) => (
    <PhotoAndMainInfoWrapper>
      <Photo>
        <img src={review.author?.image_src} alt="user" />
      </Photo>
      <MainInfo>
        <FullName>{review.author?.full_name}</FullName>
        <MainInfoText>{review.author?.profile?.job_title}</MainInfoText>
      </MainInfo>

      <StyledPrimaryButton
        type="primary"
        htmlType="button"
        onClick={() => addButtonClickHandler(review.id)}
      >
        Read the review
      </StyledPrimaryButton>
    </PhotoAndMainInfoWrapper>
  );

  const addButtonClickHandler = (userId) => {
    history.push(`/reviews/${userId}`);
  }

  return (
    <div>
      {reviews.map((review) => {
        return reviewItem(review);
      })}
    </div>
  );
};

export default withRouter(ReviewsList);
