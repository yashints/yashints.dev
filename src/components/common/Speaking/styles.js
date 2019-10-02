import styled from 'styled-components'

export const Wrapper = styled.div`
  #back2Top {
    width: 40px;
    line-height: 40px;
    overflow: hidden;
    z-index: 999;
    cursor: pointer;
    transform: rotate(270deg);
    position: fixed;
    bottom: 50px;
    right: 0;
    background-color: #ddd;
    color: #555;
    text-align: center;
    font-size: 30px;
    text-decoration: none;
  }
  #back2Top:hover {
    background-color: #ddf;
    color: #000;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
      color: #fff;
  `};

  @media (max-width: 680px) {
    padding: 2rem;
    text-align: center;
  }
`

export const HR = styled.hr`
  margin: 1em 0;
  ${({ theme }) =>
    theme === 'dark' &&
    `
			color: #fff;
	`};
`

export const Tags = styled.div`
  padding: 0.5rem 0 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  span {
    color: #7a7a8c;
    font-weight: 700;
    font-size: 0.66rem;
    white-space: nowrap;
    border: 3px solid #28242f;
    border-radius: 2rem;
    padding: 0.2rem 0.85rem 0.25rem;
    margin: 0.3em;
  }
`
