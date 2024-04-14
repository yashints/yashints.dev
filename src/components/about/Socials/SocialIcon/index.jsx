import React from 'react';
import { Social } from './styles';

export const SocialIcon = ({ name, link, icon }) => (
  <Social>
    <a href={link} rel="noopener noreferrer" target="_blank">
      <img src={icon} alt={name} />
      {name}
    </a>
  </Social>
);
