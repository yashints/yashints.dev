import styled from 'styled-components';

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
    border-left: 8px solid #bbb;
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

      .custom-block {
        &.info, &.error, &.warning {
          box-shadow: 0 5px 5px rgba(255,255,255,0.15), 0 2px 2px rgba(255,255,255,0.15);
          border-top-color: #444;
          border-bottom-color: #444;
          border-right-color: #444;
          background-color: #444;
        }   
      }
	`};
`;

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
    box-shadow:
      0 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
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
`;

export const Back = styled.div``;

export const Next = styled.div``;

export const Content = styled.div`
  .gatsby-resp-image-wrapper {
    margin-left: unset !important;
  }
`;

export const PageSubtitle = styled.h3`
  font-weight: 400;
  margin-bottom: 3rem;
`;

export const Author = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  color: #a7a7a7;
  align-items: center;

  img {
    border-radius: 50%;
    margin-bottom: 0;
    margin-right: 20px;
  }
`;

export const Comments = styled.div`
  margin-top: 2rem;
`;

export const ArticleDate = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: -1rem;
  margin-bottom: 1rem;

  img {
    margin: 0 0.8rem;
  }

  i {
    font-size: 0.9em;

    &:first-child {
      margin-right: 0.2rem;
    }
  }
`;
export const DonateContainer = styled.div`
  img {
    margin-bottom: 0;
    margin-right: 10px;
  }

  .btn-donate {
    display: inline-block;
    margin-right: 20px;
  }

  form {
    display: inline-block;
  }
`;

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
`;

export const DonateButton = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  color: rgb(0, 119, 255);

  img {
    margin-bottom: 0;
    margin-right: 10px;
  }
`;
