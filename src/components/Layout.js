import React from "react";
import logo from "../images/_DTT.svg";
import FolderIcon from "../images/menu/Folder";
import PencilIcon from "../images/menu/Pencil";
import SmileIcon from "../images/menu/Smile";
import ToolsIcon from "../images/menu/Tools";
import MenuItemComponent from "./MenuItemComponent";
import {
  CompanyLogo,
  CompanyLogoWrapper,
  Content,
  Menu,
  PageWrapper,
  SideBar,
} from "../styled-components/Layout";
import {
  ADD_FEEDBACK_PATH,
  HOMEPAGE_PATH,
  RELATIONSHIP_MAP_PATH,
  SETTINGS_PATH,
} from "../constants/routes";

const menuItems = [
  {
    label: "Feedback on you",
    icon: FolderIcon,
    linkTo: HOMEPAGE_PATH,
  },
  {
    label: "Write a feedback",
    icon: PencilIcon,
    linkTo: ADD_FEEDBACK_PATH,
  },
  {
    label: "Relationship map",
    icon: SmileIcon,
    linkTo: RELATIONSHIP_MAP_PATH,
  },
  {
    label: "Settings",
    icon: ToolsIcon,
    linkTo: SETTINGS_PATH,
  },
];

const Layout = ({ children }) => {
  return (
    <PageWrapper>
      {/* Sidebar */}
      <SideBar>
        <CompanyLogoWrapper>
          <CompanyLogo>
            <img src={logo} alt="dream team tool logo" />
          </CompanyLogo>
        </CompanyLogoWrapper>
        <Menu>
          {menuItems.map((item, index) => {
            return (
              <MenuItemComponent
                key={index}
                label={item.label}
                IconComponent={item.icon}
                linkTo={item.linkTo}
              />
            );
          })}
        </Menu>
      </SideBar>
      {/* Content */}
      <Content>{children}</Content>
    </PageWrapper>
  );
};

export default Layout;
