import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0.8rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 680px) {
    padding: 1rem 2rem;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  color: #212121;

  img {
    width: 80px;
  }
`;

export const BrandLogo = styled.div`
  transition: 0.5s;
  height: 2.8rem;
  width: 2.8rem;
  margin-bottom: 0;
  margin-right: 0.5rem;

  &:hover {
    transform: scale(1.3);
    transition: all 0.2s ease-in-out;
  }
`;

export const RoundImage = styled.img`
  border-radius: 50%;
`;
