import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 1.45rem;
  color: #212121;
  padding: 4rem 0 4rem 0;
  clip-path: polygon(0% 14%, 100% 0, 100% 84%, 0 100%);
  background-color: #fff;
  text-align: center;

  @media (max-width: 680px) {
    clip-path: unset;
    padding: 0 2rem;
    margin-bottom: 0;
  }

  ${({ $theme }) =>
    $theme === 'dark' &&
    `
		color: #fff;
    background-color: inherit;
    
    a {
      color: #adad2e;
    }
	`}
`;

export const Grid = styled.div`
  padding: 2rem;
  display: grid;
  margin: auto 2em;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 4fr;
  gap: 1.2rem 3rem;
  box-shadow: 0px 2px 28px -6px rgba(0, 0, 0, 0.09);

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;
