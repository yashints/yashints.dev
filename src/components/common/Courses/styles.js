import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 2rem 0;
`;

export const Important = styled.span`
  font-weight: 500;
`;

export const H3 = styled.h3`
  font-weight: 500;
`;

export const Link = styled.a``;

export const DIV = styled.div`
  margin: 2em 0;
`;

export const GRID = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: space-between;
`;

export const CARD = styled.a`
  color: #000;
  border: 1px solid #eee;
  cursor: pointer;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 23%;

  img {
    max-height: 200px;
    object-fit: contain;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-bottom: 0;
  }
`;

export const TITLE = styled.h4`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  padding: 0 1rem;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
  align-items: center;
`;

export const SUBTITLE = styled.div`
  font-size: 12px;
  padding: 0 1rem;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
`;

export const RATING = styled.div`
  padding-left: 0.8rem;
  font-size: 12px;
  font-weight: 500;
  diplay: flex;
  span {
    color: #666;
    font-weight: 400;
  }
  margin-bottom: 0.5em;
`;

export const TAGS = styled.div`
  display: flex;
  padding: 1em;
  gap: 8px;
  margin-top: auto;
`;

export const TAG = styled.div`
  background-color: rgb(248, 248, 249);
  flex: 1 1 0%;
  font-size: 12px;
  border-radius: 8px;
  height: 58px;
  text-align: center;
  padding: 3px;
  justify-content: space-evenly;

  p {
    font-size: 16px;
    margin-bottom: 0;
    font-weight: 700;
  }

  span {
    line-height: 1.5;
    font-weight: 400;
    letter-spacing: 0px;
    display: block;
    font-size: 10px;
  }
`;

export const LINKS = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1em;
`;
