import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  clip-path: polygon(0% 14%, 100% 0, 100% 84%, 0 100%);
  text-align: center;

  @media (max-width: 680px) {
    padding: 1rem;
    margin-bottom: 0;
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem;
  margin: auto 1rem;
  box-shadow: 0px 2px 28px -6px rgba(0, 0, 0, 0.09);

  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

export const Tech = styled.div`
  text-align: left;

  a {
    color: #212121;
    text-decoration: underline;
  }
`;
