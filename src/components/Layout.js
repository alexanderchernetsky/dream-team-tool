import React from "react";
import { withRouter } from "react-router-dom";
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
  CREATE_TEAM_PATH,
  HOMEPAGE_PATH,
  RELATIONSHIP_MAP_PATH,
  SETTINGS_PATH,
} from "../constants/routes";
import { getUser } from "../helpers/authentication";
import HomeIcon from "../images/menu/Home";
import TeamIcon from "../images/menu/Team";

const commonMenuItems = [
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

const employeeMenuItems = [
  {
    label: "Feedback on you",
    icon: FolderIcon,
    linkTo: HOMEPAGE_PATH,
  },
  ...commonMenuItems,
];

const managerMenuItems = [
  {
    label: "Home",
    icon: HomeIcon,
    linkTo: HOMEPAGE_PATH,
  },
  {
    label: "Create a team",
    icon: TeamIcon,
    linkTo: CREATE_TEAM_PATH,
  },
  ...commonMenuItems,
];

const Layout = ({ children, history }) => {
  const onLogoClick = () => {
    history.push(HOMEPAGE_PATH);
  };

  const menuItems = getUser().is_manager ? managerMenuItems : employeeMenuItems;

  return (
    <PageWrapper>
      {/* Sidebar */}
      <SideBar>
        <CompanyLogoWrapper>
          <CompanyLogo onClick={onLogoClick}>
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

export default withRouter(Layout);
