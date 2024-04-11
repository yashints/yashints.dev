import React, { useContext } from 'react';
import { ThemeContext } from 'Common';
import { HamburgerIcon, Bar } from './styles';

export const Hamburger = ({ $sidebar, toggle, $isHomePage }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <HamburgerIcon
      $isHomePage={$isHomePage}
      $sidebar={$sidebar}
      onClick={toggle}
    >
      <Bar $top $sidebar={$sidebar} $theme={theme} />
      <Bar $mid $sidebar={$sidebar} $theme={theme} />
      <Bar $bottom $sidebar={$sidebar} $theme={theme} />
    </HamburgerIcon>
  );
};
