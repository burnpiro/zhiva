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
  IconClass?: React.ElementType;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
};

/* eslint-disable-next-line */
export interface MenuSelectorProps {
  mainIcon?: React.ReactElement;
  onSelect?: SelectActionMethod;
  name: string;
  toolKey?: string;
  replaceWithSelectedIcon?: boolean;
  items?: MenuItem[];
  activeItems?: string[];
  disabled?: boolean;
}

const DefaultIcon = <MenuIcon />;

export function MenuSelector({
  name,
  toolKey,
  disabled,
  mainIcon = DefaultIcon,
  items = [],
  replaceWithSelectedIcon,
  activeItems,
  onSelect,
}: MenuSelectorProps) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );

  const openMenu = (
    toolKey: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const clickHandlers = items.reduce(
    (acc: Record<string, () => void>, item) => {
      acc[item.itemKey] = () => {
        if (onSelect) {
          onSelect(toolKey || '', item.itemKey);
        }
        closeMenu();
      };
      return acc;
    },
    {}
  );

  const selectedItems = items.filter((item) =>
    activeItems?.includes(item.itemKey)
  );

  const selectedIcon =
    replaceWithSelectedIcon && selectedItems.length === 1
      ? selectedItems.map(({ icon, IconClass }) =>
          IconClass != null ? <IconClass /> : icon
        )[0]
      : mainIcon;

  return (
    <>
      <ToolButton
        name={name}
        isActive={!disabled}
        customIcon={selectedIcon}
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
        {items.map(
          ({ itemKey, name, icon, IconClass, iconPosition, disabled }) => {
            const isActive =
              !disabled && (!activeItems || activeItems?.includes(itemKey));

            return (
              <StyledMenuItem
                key={itemKey}
                onClick={clickHandlers[itemKey]}
                sx={{ color: !isActive ? 'text.disabled' : 'text.active' }}
              >
                {icon &&
                  iconPosition !== 'right' &&
                  React.cloneElement(icon, {
                    fontSize: 'medium',
                  })}
                {IconClass && iconPosition !== 'right' && (
                  <IconClass
                    fontSize={'medium'}
                  />
                )}
                {name}
                {icon &&
                  iconPosition === 'right' &&
                  React.cloneElement(icon, {
                    fontSize: 'medium',
                  })}
                {IconClass && iconPosition === 'right' && (
                  <IconClass
                    fontSize={'medium'}
                  />
                )}
              </StyledMenuItem>
            );
          }
        )}
      </Menu>
    </>
  );
}

export default MenuSelector;
