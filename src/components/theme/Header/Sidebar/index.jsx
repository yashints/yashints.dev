import React, { useContext } from 'react';
import { ThemeContext } from 'Common';
import { NavbarLinks } from '../NavbarLinks';
import { SidebarContainer } from './styles';

export const Sidebar = ({ $sidebar, toggle }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <SidebarContainer $active={$sidebar} onClick={toggle} $theme={theme}>
      <NavbarLinks />
    </SidebarContainer>
  );
};
