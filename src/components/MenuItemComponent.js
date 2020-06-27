import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
  :hover {
    font-weight: 600;\
    background-color: ${ax("menu-item-hover-bg-color")};
    svg {
      path {
        fill: ${ax("user-info-text-color")};
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

const MenuItemComponent = ({ label, IconComponent }) => {
  return (
    <MenuItemWrapper>
      <Label>{label}</Label>
      <IconWrapper>
        <IconComponent />
      </IconWrapper>
    </MenuItemWrapper>
  );
};

MenuItemComponent.defaultProps = {
  label: "Menu Item",
  IconComponent: FolderIcon,
};

MenuItemComponent.propTypes = {
  label: PropTypes.string,
  IconComponent: PropTypes.func,
};

export default MenuItemComponent;
