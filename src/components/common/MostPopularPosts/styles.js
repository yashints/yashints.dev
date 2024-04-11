import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 2rem 0;
  ${({ theme }) =>
    theme === 'dark' &&
    `
    a {
      color: #adad2e;
    }
	`};
`;

export const Center = styled.div`
  padding: 2rem 0;
  text-align: center;

  @media (max-width: 680px) {
    padding: 0 2rem;

    a {
      margin: 0;
    }
  }
`;
