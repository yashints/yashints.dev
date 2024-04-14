import React, { useContext } from 'react';
import { NavbarLinks } from '../NavbarLinks';
import { SidebarContainer } from './styles';
import { ThemeContext } from 'Common';

export const Sidebar = ({ $sidebar, toggle }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <SidebarContainer $theme={theme} $active={$sidebar} onClick={toggle}>
      <NavbarLinks />
    </SidebarContainer>
  );
};
