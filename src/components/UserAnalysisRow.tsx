import React from "react";
import styled from "styled-components";
import { Tooltip } from "antd";
import noLogoImage from "../images/no_logo_image.png";
import ax from "../styled-components/accessor";

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 10px 20px;
  border-bottom: 2px solid ${ax("analysis-row-border-color")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Photo = styled.div`
  width: 50px;
  min-width: 50px;
  height: 50px;
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

const Rating = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  color: ${ax("primary-color")};
`;

const PhotoAndMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  min-width: 190px;
`;

const Bar = styled.div`
  margin: 0 20px 0 115px;
  height: 26px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  div:first-child {
    border-radius: 5px 0 0 5px;
  }
  div:last-child {
    border-radius: 0 5px 5px 0;
  }
`;

const Part = styled.div<{ percent: number }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.percent}%;
  height: 100%;
  background-color: ${(props) => props.color};
  text-align: center;
  color: ${ax("primary-color")};
`;

interface IUserAnalysisRow {
  photoSrc?: string;
  fullName?: string;
  jobTitle?: string;
  rating?: number;
  positive?: number;
  negative?: number;
  neutral?: number;
  id: number;
}

const UserAnalysisRow = ({
  photoSrc = noLogoImage,
  fullName = "Full Name",
  jobTitle = "Employee",
  rating = 5,
  positive = 80,
  negative = 17,
  neutral = 3,
}: IUserAnalysisRow):React.ReactElement => {
  return (
    <Wrapper>
      <PhotoAndMainInfoWrapper>
        <Photo>
          <img src={photoSrc} alt="user" />
        </Photo>
        <MainInfo>
          <FullName>{fullName}</FullName>
          <MainInfoText>{jobTitle}</MainInfoText>
          <Rating>Rating: {rating}</Rating>
        </MainInfo>
      </PhotoAndMainInfoWrapper>
      <Tooltip title="Click for more information">
        <Bar>
          {positive !== 0 && (
            <Part percent={positive} color="#A5F081">
              {positive.toFixed(1)}%
            </Part>
          )}
          {neutral !== 0 && (
            <Part percent={neutral} color="#CFCFCF">
              {neutral.toFixed(1)}%
            </Part>
          )}
          {negative !== 0 && (
            <Part percent={negative} color="#C78AF7">
              {negative.toFixed(1)}%
            </Part>
          )}
          {positive === 0 && negative === 0 && neutral === 0 && "No info"}
        </Bar>
      </Tooltip>
    </Wrapper>
  );
};

export default UserAnalysisRow;
