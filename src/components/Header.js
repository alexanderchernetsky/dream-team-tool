import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Header = ({ children }) => {
  return <HeaderWrapper>{children}</HeaderWrapper>;
};

export default Header;
