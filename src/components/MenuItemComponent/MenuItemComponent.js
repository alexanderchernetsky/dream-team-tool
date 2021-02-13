import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import ax from "../../styled-components/accessor";
import FolderIcon from "../../images/menu/Folder";

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

const MenuItemComponent = ({
  label,
  IconComponent,
  linkTo,
  history,
  dataTestId,
  disabled,
}) => {
  const onMenuItemClickHandler = (link, disabled) => {
    if (disabled) {
      alert("Comming soon...");
      return;
    }
    history.push(link);
  };

  return (
    <MenuItemWrapper
      onClick={() => onMenuItemClickHandler(linkTo, disabled)}
      data-test-id={dataTestId}
      data-testid={dataTestId}
    >
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
  dataTestId: "default-menu-item",
  disabled: false,
};

MenuItemComponent.propTypes = {
  linkTo: PropTypes.string.isRequired,
  label: PropTypes.string,
  IconComponent: PropTypes.func,
  dataTestId: PropTypes.string,
  disabled: PropTypes.bool,
};

export default withRouter(MenuItemComponent);
