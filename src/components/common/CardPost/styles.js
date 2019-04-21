import styled from 'styled-components'

export const Item = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  height: 100%;
`

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
`

export const ArticleContent = styled.div`
  padding: 1rem;
  flex: auto;

  @media (max-width: 680px) {
    flex: 2;
    padding: 1.5rem;
  }
`

export const ArticleImg = styled.div`
  width: 250px;
  min-width: 250px;
  overflow: hidden;

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
`

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
	`};
`

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
`

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
`

export const StyledSpan = styled.div`
  margin-left: 20px;
  display: inline-flex;
  align-items: center;

  @media (max-width: 680px) {
    margin-left: 0;
  }
`

export const TagWrapper = styled.span`
  margin-left: 2rem;

  @media (max-width: 680px) {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem 0;
  }
`

export const Tag = styled.span`
  margin-right: 10px;
  padding: 8px;
  font-weight: 500;
  border-radius: 20px;
  color: rgba(0, 0, 0, 0.8);
  background: rgba(0, 0, 0, 0.1);

  @media (max-width: 680px) {
    margin-top: 5px;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
	`};
`
