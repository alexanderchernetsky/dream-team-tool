import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import ax from "../styled-components/accessor";
import FolderIcon from "../images/menu/Folder";

const MenuItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
  transition: all 0.5s ease-out;
  :hover {
    color: ${ax("menu-item-hover-color")};
    background-color: ${ax("menu-item-hover-bg-color")};
    svg {
      path {
        fill: ${ax("user-info-text-color")};
        transition: all 0.5s ease-out;
      }
    }
  }
`;

const Label = styled.span`
  font-size: 12px;
  line-height: 20px;
`;

const IconWrapper = styled.span`
  svg {
    path {
      fill: ${ax("menu-icon-color")};
    }
  }
`;

interface IMenuItem extends RouteComponentProps {
  label?: string;
  IconComponent?: React.ComponentType;
  linkTo: string;
  dataTestId?: string;
  disabled?: boolean;
}

const MenuItemComponent = ({
  label = "Menu Item",
  IconComponent = FolderIcon,
  linkTo,
  history,
  dataTestId = "default-menu-item",
  disabled = false,
}: IMenuItem) :React.ReactElement => {
  const onMenuItemClickHandler = (link: string, flag: boolean) => {
    if (flag) {
      alert("Comming soon...");
      return;
    }
    history.push(link);
  };

  return (
    <MenuItemWrapper
      onClick={() => onMenuItemClickHandler(linkTo, disabled)}
      data-test-id={dataTestId}
    >
      <Label>{label}</Label>
      <IconWrapper>
        <IconComponent />
      </IconWrapper>
    </MenuItemWrapper>
  );
};

export default withRouter(MenuItemComponent);
