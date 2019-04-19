import styled from 'styled-components'

export const ArticleWrapper = styled.div`
  color: #212121;
  padding: 2rem 1rem;

  a {
    text-decoration: none;
    color: rgb(0, 119, 255);
  }

  i {
    color: #a7a7a7;
  }

  h1 {
    font-size: 2rem;
  }

  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
    color: #808080;
    font-style: italic;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
      color: #fff;
      blockquote {
        color: #fff;
      }
	`};
`

export const LinksWrapper = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  a {
    cursor: pointer;
    padding: 1rem;
    display: block;
    border-radius: 5px;
    background-color: #f1f1f1;
    color: #000;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    span {
      position: relative;
      top: -3px;
    }
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
    a {
      color: #fff;
      background-color: #333;
    }
	`};
`

export const Back = styled.div``

export const Next = styled.div``

export const Content = styled.div`
  font-size: 1.2rem;
  line-height: 2rem;
`

export const Comments = styled.div`
  margin-top: 2rem;
`

export const ArticleDate = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: -1rem;
  margin-bottom: 1rem;

  i {
    font-size: 0.9em;

    &:first-child {
      margin-right: 0.2rem;
    }
  }
`

export const ArticleImg = styled.div`
  display: flex;
  justify-content: center;

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
