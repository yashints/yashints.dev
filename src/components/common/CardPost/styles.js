import styled from 'styled-components';

export const Item = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  height: 100%;
`;

export const Post = styled.div`
  border-radius: 0.2rem;
  box-shadow: 0 0 10px 0 rgba(33, 33, 33, 0.14);
  background: #fff;
  transition: 0.7s;
  width: 100%;
  display: flex;
  flex-direction: row;

  @media (max-width: 680px) {
    flex-direction: column;
  }

  &:hover,
  &:focus {
    box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.2);
    transition: 0.7s;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
      background: #2b2a2a;
      
      a {
        color: #adad2e;
      }
	`};
`;

export const ArticleContent = styled.div`
  padding: 1rem;
  flex: auto;

  @media (max-width: 680px) {
    flex: 2;
    padding: 1.5rem;
  }
`;

export const ArticleImg = styled.div`
  width: 250px;
  min-width: 250px;
  overflow: hidden;
  background: linear-gradient(
    to right,
    rgba(47, 151, 237, 0.5) 0%,
    rgba(176, 219, 242, 0.51) 2%,
    rgba(167, 202, 229, 1) 100%
  );
  opacity: 0.5;

  .gatsby-image-wrapper {
    height: 100%;
  }

  @media (max-width: 992px) {
    height: 300px;
    display: none;
  }

  @media (max-width: 680px) {
    height: 100px;
    width: auto;
    flex: 1;
  }
`;

export const ArticleTitle = styled.h2`
  color: #212121;

  a {
    color: inherit;
  }

  @media (max-width: 680px) {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
      color: #fff;
      
      a {
        color: #fff;
      }
	`};
`;

export const Paragraph = styled.p`
  color: #616161;

  @media (max-width: 680px) {
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
			color: #fff;
	`};
`;

export const Info = styled.i`
  color: #212121;
  font-size: 0.85em;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    margin-bottom: 0;
    margin-right: 10px;
  }

  @media (max-width: 680px) {
    flex-direction: column;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
			color: #fff;
	`};
`;

export const PublishInfo = styled.div`
  width: 40%;
  padding: 0 1rem;
  display: flex;
  align-items: center;

  @media only screen and (min-width: 680px) and (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 680px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const StyledSpan = styled.div`
  margin-right: 20px;
  display: inline-flex;
  align-items: center;
`;

export const TagWrapper = styled.span`
  width: 35%;
  display: flex;

  @media only screen and (min-width: 680px) and (max-width: 1024px) {
    display: none;
  }

  @media (max-width: 680px) {
    width: 100%;
    margin-left: 2rem;
    justify-content: center;
    margin: 1rem 0;
    font-size: 0.7rem;
  }
`;

export const Tag = styled.a`
  cursor: pointer;
  margin-right: 10px;
  padding: 8px;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 20px;
  text-align: center;
  color: rgba(0, 0, 0, 0.8);
  background: rgba(0, 0, 0, 0.1);

  @media (max-width: 680px) {
    padding: 8px;
    margin-top: 5px;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
      background: rgba(255, 255, 255, 0.1);
	`};
`;
