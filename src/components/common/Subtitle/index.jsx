import React from 'react';
import { StyledSubtitle } from './styles';

export const Subtitle = ({ id, children, active }) => {
  return (
    <StyledSubtitle id={id} $active={active}>
      {children}
    </StyledSubtitle>
  );
};
