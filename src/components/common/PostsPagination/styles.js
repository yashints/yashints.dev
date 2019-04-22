import styled from 'styled-components';

export const PageWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;

  a {
    cursor: pointer;
    padding: 1rem;
    display: block;
    border-radius: 5px;
    background-color: #f1f1f1;
    color: #000;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
    span {
      position: relative;
      top: -3px;
    }
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
    padding-bottom: 2rem;
    a {
      color: #fff;
      background-color: #333;
    }
  `};

  @media (max-width: 680px) {
    padding: 2rem;
    padding-top: 0;
  }
`;
export const PageLink = styled.div``;
