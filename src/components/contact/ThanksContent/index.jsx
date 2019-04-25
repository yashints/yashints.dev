import React, { useContext } from 'react';
import { Link } from 'gatsby';
import {
  SmallerContainer,
  ThemeContext,
  ButtonLink,
} from 'Common';
import { Wrapper } from './styles';

export default () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Wrapper theme={theme} as={SmallerContainer}>
      <h2>
        Your email has been sent successfully
      </h2>
      <p>
        I will get back to you as soon as
        possible!
      </p>

      <ButtonLink
        to="/"
        linkText="Go Back Home"
        minwidth="200px"
      />
    </Wrapper>
  );
};
