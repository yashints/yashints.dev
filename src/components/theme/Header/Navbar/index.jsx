import React from 'react';
import { Link } from 'gatsby';
import { Container } from 'Common';
import { NavbarLinks } from '../NavbarLinks';
import { Wrapper, Brand, BrandLogo, RoundImage } from './styles';

export const Navbar = () => {
  return (
    <Wrapper as={Container}>
      <Brand as={Link} to="/">
        <BrandLogo>
          <RoundImage src="/me.jpg" alt="Yaser Adel Mehraban's headshot" />
        </BrandLogo>
        Yashints
      </Brand>
      <NavbarLinks $desktop />
    </Wrapper>
  );
};
