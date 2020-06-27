import styled from "styled-components";
import ax from "../accessor";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SideBar = styled.div`
  width: 270px;
  height: 100vh;
  border-right: 2px solid #f3f4f6;
`;

const CompanyLogoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CompanyLogo = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 40px;
  background-color: ${ax("secondary-color")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 20px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export { PageWrapper, SideBar, CompanyLogoWrapper, CompanyLogo, Menu, Content };
