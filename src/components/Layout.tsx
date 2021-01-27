import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
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
  Routes
} from "../constants/routes";
import { getUser } from "../helpers/authentication";
import HomeIcon from "../images/menu/Home";
import TeamIcon from "../images/menu/Team";
import loginStore from "../stores/LoginStore";
import TeamsIcon from "../images/menu/TeamsIcon";

interface IMenuItem {
  label:string;
  icon: React.ComponentType;
  linkTo:string;
  dataTestId: string;
  disabled:boolean;
}

const commonMenuItems :IMenuItem[] = [
  {
    label: "Write a feedback",
    icon: PencilIcon,
    linkTo: Routes.ADD_FEEDBACK_PATH,
    dataTestId: "write-feedback-menu-item",
    disabled: false,
  },
  {
    label: "Relationship map",
    icon: SmileIcon,
    linkTo: Routes.RELATIONSHIP_MAP_PATH,
    dataTestId: "relationship-map-menu-item",
    disabled: true,
  },
  {
    label: "Settings",
    icon: ToolsIcon,
    linkTo: Routes.SETTINGS_PATH,
    dataTestId: "settings-menu-item",
    disabled: true,
  },
];

const employeeMenuItems :IMenuItem[] = [
  {
    label: "Feedback on you",
    icon: FolderIcon,
    linkTo: Routes.HOMEPAGE_PATH,
    dataTestId: "employee-homepage-menu-item",
    disabled: false,
  },
  ...commonMenuItems,
];

const managerMenuItems :IMenuItem[] = [
  {
    label: "Home",
    icon: HomeIcon,
    linkTo: Routes.HOMEPAGE_PATH,
    dataTestId: "manager-homepage-menu-item",
    disabled: false,
  },
  {
    label: "Create a team",
    icon: TeamIcon,
    linkTo: Routes.CREATE_TEAM_PATH,
    dataTestId: "create-new-team-menu-item",
    disabled: false,
  },
  {
    label: "Teams",
    icon: TeamsIcon,
    linkTo: Routes.TEAMS_LIST_PATH,
    dataTestId: "teams-menu-item",
    disabled: false,
  },
  ...commonMenuItems,
];

interface ILayout extends RouteComponentProps {
  children?: React.ReactNode;
}

const Layout = (props: ILayout) :React.ReactElement => {
  useEffect(() => {
    loginStore.getAndSetAuthHeader();
  }, []);

  const onLogoClick = () => {
    props.history.push(Routes.HOMEPAGE_PATH);
  };

  const menuItems = getUser()?.is_manager
    ? managerMenuItems
    : employeeMenuItems;
  const { children } = props;
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
