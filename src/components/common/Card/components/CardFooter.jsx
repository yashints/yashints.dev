import React from 'react';
import styled from 'styled-components';

const CardFooter = ({ description }) => {
  return (
    <Wrapper>
      <p>{description}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 16px 24px;

  p {
    font-size: 16px;
    line-height: 1.46429em;
    margin-bottom: 1rem;
  }
`;

export default CardFooter;
