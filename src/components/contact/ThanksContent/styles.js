import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 6rem;
  padding-bottom: 16rem;
  text-align: center;
  height: 100%;
  h2,
  p {
    color: #212121;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
    h2, p {
      color: #fff;
    }
  `};
`;
