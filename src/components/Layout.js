import React from "react";
import logo from "../images/_DTT.svg";
import FolderIcon from "../images/menu/Folder";
import PencilIcon from "../images/menu/Pencil";
import SmileIcon from "../images/menu/Smile";
import ToolsIcon from "../images/menu/Tools";
import MenuItemComponent from "./MenuItemComponent";
import {CompanyLogo, CompanyLogoWrapper, Content, Menu, PageWrapper, SideBar} from "../styled-components/Layout";

const menuItems = [
  {
    label: "Feedback on you",
    icon: FolderIcon,
  },
  {
    label: "Write a feedback",
    icon: PencilIcon,
  },
  {
    label: "Relationship map",
    icon: SmileIcon,
  },
  {
    label: "Settings",
    icon: ToolsIcon,
  },
];

const Layout = ({ children }) => {
  return (
    <PageWrapper>
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
              />
            );
          })}
        </Menu>
      </SideBar>
      <Content>{children}</Content>
    </PageWrapper>
  );
};

export default Layout;
