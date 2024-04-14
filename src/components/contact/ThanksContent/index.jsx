import React from 'react';
import { SmallerContainer, ButtonLink } from 'Common';
import { Wrapper } from './styles';

export const ThanksContent = () => {
  return (
    <Wrapper as={SmallerContainer}>
      <h2>Your email has been sent successfully</h2>
      <p>I will get back to you as soon as possible!</p>

      <ButtonLink to="/" linkText="Go Back Home" minwidth="200px" />
    </Wrapper>
  );
};
