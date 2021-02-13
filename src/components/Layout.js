import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import logo from "../images/_DTT.svg";
import FolderIcon from "../images/menu/Folder";
import PencilIcon from "../images/menu/Pencil";
import SmileIcon from "../images/menu/Smile";
import ToolsIcon from "../images/menu/Tools";
import MenuItemComponent from "./MenuItemComponent/MenuItemComponent";
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
  TEAMS_LIST_PATH,
} from "../constants/routes";
import { getUser } from "../helpers/authentication";
import HomeIcon from "../images/menu/Home";
import TeamIcon from "../images/menu/Team";
import loginStore from "../stores/LoginStore";
import TeamsIcon from "../images/menu/TeamsIcon";

const commonMenuItems = [
  {
    label: "Write a feedback",
    icon: PencilIcon,
    linkTo: ADD_FEEDBACK_PATH,
    dataTestId: "write-feedback-menu-item",
    disabled: false
  },
  {
    label: "Relationship map",
    icon: SmileIcon,
    linkTo: RELATIONSHIP_MAP_PATH,
    dataTestId: "relationship-map-menu-item",
    disabled: true
  },
  {
    label: "Settings",
    icon: ToolsIcon,
    linkTo: SETTINGS_PATH,
    dataTestId: "settings-menu-item",
    disabled: true
  },
];

const employeeMenuItems = [
  {
    label: "Feedback on you",
    icon: FolderIcon,
    linkTo: HOMEPAGE_PATH,
    dataTestId: "employee-homepage-menu-item",
    disabled: false
  },
  ...commonMenuItems,
];

const managerMenuItems = [
  {
    label: "Home",
    icon: HomeIcon,
    linkTo: HOMEPAGE_PATH,
    dataTestId: "manager-homepage-menu-item",
    disabled: false
  },
  {
    label: "Create a team",
    icon: TeamIcon,
    linkTo: CREATE_TEAM_PATH,
    dataTestId: "create-new-team-menu-item",
    disabled: false
  },
  {
    label: "Teams",
    icon: TeamsIcon,
    linkTo: TEAMS_LIST_PATH,
    dataTestId: "teams-menu-item",
    disabled: false
  },
  ...commonMenuItems,
];

const Layout = ({ children, history }) => {
  useEffect(() => {
    loginStore.getAndSetAuthHeader();
  }, []);

  const onLogoClick = () => {
    history.push(HOMEPAGE_PATH);
  };

  const menuItems = getUser()?.is_manager ? managerMenuItems : employeeMenuItems;

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
                dataTestId={item.dataTestId}
                disabled={item.disabled}
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
