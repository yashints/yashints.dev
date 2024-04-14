import React from 'react';
import { HamburgerIcon, Bar } from './styles';

export const Hamburger = ({ $sidebar, toggle, $theme, $isHomePage }) => {
  return (
    <HamburgerIcon
      $isHomePage={$isHomePage}
      $sidebar={$sidebar}
      $theme={$theme}
      onClick={toggle}
    >
      <Bar $theme={$theme} $top $sidebar={$sidebar} />
      <Bar $theme={$theme} $mid $sidebar={$sidebar} />
      <Bar $theme={$theme} $bottom $sidebar={$sidebar} />
    </HamburgerIcon>
  );
};
