import React, { useContext } from 'react';
import { ThemeContext } from 'Common';
import StarIcon from 'Static/icons/star.svg';
import ForkIcon from 'Static/icons/fork.svg';
import StarIconWhite from 'Static/icons/star-white.svg';
import ForkIconWhite from 'Static/icons/fork-white.svg';
import {
  Wrapper,
  StyledRepository,
  Stars,
  Header,
  Description,
} from './styles';

export const Repository = ({
  id,
  node: {
    name,
    url,
    description,
    stargazers: { totalCount },
    forkCount,
  },
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Wrapper id={id} as="a" href={url}>
      <StyledRepository theme={theme}>
        <Header>
          <h3>{name}</h3>
        </Header>
        <Description>
          <p>{description}</p>
        </Description>
        <Stars>
          <img src={theme === 'dark' ? StarIconWhite : StarIcon} alt="stars" />
          {totalCount}
          <img src={theme === 'dark' ? ForkIconWhite : ForkIcon} alt="forks" />
          {forkCount}
        </Stars>
      </StyledRepository>
    </Wrapper>
  );
};
