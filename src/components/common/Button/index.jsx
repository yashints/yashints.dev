import React, { useContext } from 'react';
import { ThemeContext } from 'Common';
import { Link } from 'gatsby';
import { LinkButton } from './styles';

export const ButtonLink = ({
  to,
  linkText,
  minwidth,
  hasMarginTop,
  hasMargin,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <LinkButton
      as={Link}
      to={to}
      theme={theme}
      minwidth={minwidth}
      hasMarginTop={hasMarginTop}
      hasMargin={hasMargin}
    >
      {linkText}
    </LinkButton>
  );
};
