import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { Container, ThemeContext } from 'Common';
import { NavbarLinks } from '../NavbarLinks';
import { Wrapper, Brand, BrandLogo } from './styles';

export const Navbar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper as={Container}>
      <Brand as={Link} $theme={theme} to="/">
        <BrandLogo>
          <img src="/me.jpg" alt="Yaser Adel Mehraban's headshot" />
        </BrandLogo>
        Yashints
      </Brand>
      <NavbarLinks $desktop />
    </Wrapper>
  );
};
