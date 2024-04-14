import styled from 'styled-components';

export const DetailsContainer = styled.div`
  &:last-of-type {
    margin-left: 3rem;
  }

  @media (max-width: 960px) {
    padding: 2rem;
    text-align: center;

    &:last-of-type {
      margin-left: 0;
    }
  }
`;

export const Wrapper = styled.div`
  margin-top: 2rem;
  padding: 2rem 0;
  display: flex;

  @media (max-width: 960px) {
    margin-top: 0;
    padding-top: 0;
    flex-direction: column;
  }
`;

export const Title = styled.h2`
  margin-bottom: 3rem;

  @media (max-width: 680px) {
    margin-bottom: 2rem;
  }
`;

export const Img = styled.img`
  margin-right: 0.6rem;
`;

export const P = styled.p`
  display: flex;
  align-items: center;

  @media (max-width: 680px) {
    padding-left: 2rem;
  }
`;

export const Text = styled.p`
  color: #212121;
  text-align: justify;
`;

export const Social = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 4fr);
  grid-gap: 1.2rem;
  align-items: center;
  margin-bottom: 1rem;

  img {
    width: 32px;
    height: 32px;
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(4, 1fr);
    align-items: left;
    grid-gap: 6rem;

    img {
      width: 48px;
      height: 48px;
    }
  }

  @media (max-width: 680px) {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
    }
  }
`;
