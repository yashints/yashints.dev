import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  clip-path: polygon(0% 2%, 100% 0, 100% 84%, 0 100%);
  text-align: center;

  @media (max-width: 680px) {
    padding: 1rem;
    margin-bottom: 0;
  }
`;
