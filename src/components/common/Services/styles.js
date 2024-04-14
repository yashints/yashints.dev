import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 2rem 0;
`;

export const Important = styled.span`
  font-weight: 500;
`;

export const H3 = styled.h3`
  font-weight: 500;
`;

export const Link = styled.a``;

export const DIV = styled.div`
  margin: 2em 0;
`;

export const Summary = styled.summary`
  font-weight: 500;
  cursor: pointer;
  color: #000;
  padding-top: 1em;
  ${({ $active }) =>
    !!$active &&
    `
      text-decoration: underline;
      color: #000;
    `};

  + div {
    padding-left: 1.1em;
    margin-top: 1em;
  }
`;
