import React, { useState } from 'react';
import ToolButton from '../ToolButton/ToolButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { SelectActionMethod } from '../ViewerMenu/ViewerMenu';
import MenuIcon from '@mui/icons-material/Menu';

const StyledMenuItem = styled(MenuItem)`
  & > svg {
    margin-right: 12px;
  }
`;

type MenuItem = {
  itemKey: string;
  name?: string;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
};

/* eslint-disable-next-line */
export interface MenuSelectorProps {
  mainIcon?: React.ReactElement;
  onSelect?: SelectActionMethod;
  name: string;
  items?: MenuItem[];
  disabled?: boolean;
}

const DefaultIcon = <MenuIcon />;

export function MenuSelector({
  name,
  disabled,
  mainIcon = DefaultIcon,
  items = [],
  onSelect,
}: MenuSelectorProps) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const clickHandlers = items.reduce(
    (acc: Record<string, () => void>, item) => {
      acc[item.itemKey] = () => {
        if (onSelect) {
          onSelect(item.itemKey);
        }
        closeMenu();
      };
      return acc;
    },
    {}
  );

  return (
    <>
      <ToolButton
        name={name}
        isActive={!disabled}
        customIcon={mainIcon}
        disabled={disabled}
        size={'large'}
        fontSize={'medium'}
        onClick={openMenu}
      />
      <Menu
        id="measurement-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={closeMenu}
      >
        {items.map(({ itemKey, name, icon, iconPosition, disabled }) => (
          <StyledMenuItem key={itemKey} onClick={clickHandlers[itemKey]}>
            {icon &&
              iconPosition !== 'right' &&
              React.cloneElement(icon, {
                fontSize: 'medium',
                color: disabled ? 'disabled' : 'inherit',
              })}
            {name}
            {icon &&
              iconPosition === 'right' &&
              React.cloneElement(icon, {
                fontSize: 'medium',
                color: disabled ? 'disabled' : 'inherit',
              })}
          </StyledMenuItem>
        ))}
      </Menu>
    </>
  );
}

export default MenuSelector;
