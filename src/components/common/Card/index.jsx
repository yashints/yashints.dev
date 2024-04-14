import React from 'react';
import CardHeader from './components/CardHeader';
import CardBody from './components/CardBody';
import CardFooter from './components/CardFooter';
import { Wrapper, StyledCard } from './styles';

export const Card = ({ id, link, title, image, description }) => {
  return (
    <Wrapper id={id} as="a" href={link}>
      <StyledCard>
        <CardHeader title={title} />
        <CardBody image={image} title={title} />
        <CardFooter description={description} />
      </StyledCard>
    </Wrapper>
  );
};
