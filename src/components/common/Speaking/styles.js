import styled from 'styled-components';

export const Wrapper = styled.div`
  @media (max-width: 680px) {
    padding: 2rem;
  }
`;

export const H3 = styled.h3`
  ${({ theme }) =>
    theme === 'dark' &&
    `
  color: #fff;
`};

  @media (max-width: 680px) {
    text-align: center;
  }
`;

export const HR = styled.hr`
  margin-bottom: 0;
  ${({ theme }) =>
    theme === 'dark' &&
    `
			color: #fff;
	`};
`;
