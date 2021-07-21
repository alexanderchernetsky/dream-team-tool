import React from "react";
import StyledModal from "../styled-components/common/Modal";
import styled from "styled-components";
import ax from "../styled-components/accessor";
import { Link } from "react-router-dom";
import ReviewsList from "./ReviewsList";

const Header = styled.div`
  margin-bottom: 11px;
  font-size: 20px;
  line-height: 150%;
  color: #000;
`;

const Status = styled.span`
  &.negative {
    color: ${ax("negative-color")};
  }
  
  &.positive {
    color: ${ax("positive-color")};
  }
  
  &.neutral {
     color: ${ax("neutral-color")};
  }
`;

const Content = styled.div`
  padding: 34px 0;
  border-bottom: 2px solid ${ax("modal-border-color")};
  border-top: 2px solid ${ax("modal-border-color")};
  margin-bottom: 11px;
`;

const AnalyzeModal = ({percent, status, user, isVisible, reviews} = props) => {
  return (
    <StyledModal
      visible={isVisible}
      footer={null}
    >
      {/* Header */}
      <Header>
        {percent}% of the team <br />
        left <Status className={status.toLowerCase()}>{status}</Status> feedback
        about <Link to="/">{user.full_name}</Link>:
      </Header>

      {/* Content */}
      <Content>
        {/* User List*/}
        <ReviewsList reviews={reviews} />
      </Content>
    </StyledModal>
  );
}

export default AnalyzeModal;
