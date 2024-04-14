import React, { useContext } from 'react';
import { Wrapper, Grow, Title, Description } from './styles';
import { ThemeContext } from 'Common';

export const Service = ({ icon, title, description }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Wrapper $theme={theme}>
      <Grow>
        <img src={icon} alt={title} />
      </Grow>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Wrapper>
  );
};
