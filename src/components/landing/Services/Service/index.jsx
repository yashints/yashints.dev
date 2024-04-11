import React from 'react';
import { Wrapper, Grow, Title, Description } from './styles';

export const Service = ({ $theme, icon, title, description }) => (
  <Wrapper $theme={$theme}>
    <Grow>
      <img src={icon} alt={title} />
    </Grow>
    <Title>{title}</Title>
    <Description>{description}</Description>
  </Wrapper>
);
