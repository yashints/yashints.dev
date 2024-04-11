import React, { useState, useEffect, useContext } from 'react';
import { withPrefix } from 'gatsby';
import { ThemeContext } from 'Common';
import { Navbar } from './Navbar';
import { Hamburger } from './Hamburger';
import { Sidebar } from './Sidebar';
import { Wrapper, Overlay } from './styles';

export const Header = () => {
  const [isHomePage, setHomePage] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (window.location.pathname === withPrefix('/')) {
      setHomePage(!isHomePage);
    }
  }, []);

  const toggle = () => setShowSidebar(!showSidebar);

  return (
    <Wrapper $theme={theme}>
      <Overlay $sidebar={showSidebar} onClick={toggle} />
      <Navbar />
      <Hamburger
        $isHomePage={isHomePage}
        $sidebar={showSidebar}
        toggle={toggle}
      />
      <Sidebar $sidebar={showSidebar} toggle={toggle} />
    </Wrapper>
  );
};
