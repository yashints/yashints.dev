import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 1rem;
  padding: 1rem 0 1rem 0;
  clip-path: polygon(0% 10%, 100% 0, 100% 84%, 0 100%);
  text-align: center;

  @media (max-width: 680px) {
    clip-path: unset;
    padding: 0 1rem;
    margin-bottom: 0;
  }
`;

export const Grid = styled.div`
  padding: 1rem;
  display: grid;
  margin: auto 1em;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 4fr;
  gap: 1rem 1rem;
  box-shadow: 0px 2px 28px -6px rgba(0, 0, 0, 0.09);

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;
