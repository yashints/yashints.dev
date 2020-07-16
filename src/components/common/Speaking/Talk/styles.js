import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  box-shadow: 0px 2px 28px -6px rgba(0, 0, 0, 0.09);
  padding: 1em;
`

export const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9em;
  img {
    margin-bottom: 0;
    width: 32px;
    height: 32px;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
      color: #fff;
      background-color: #333;
    
	`};
`

export const CardLink = styled.a`
  cursor: pointer;
  color: inherit;
`

export const CardHeader = styled.div`
  font-weight: 600;
  padding: 1rem;
  padding-left: 0;
  display: flex;
  width: 100%;

  a {
    display: inline;
    cursor: pointer;
    color: inherit;

    span {
      display: inline;
      display: inline-table;
      display: inline-block;
      vertical-align: middle;
      line-height: 24px;
    }

    img {
      margin-left: 10px;
    }
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
      color: #adad2e;
  `}
`

export const CardDescription = styled.div`
  display: inline-block;
`

export const CardDate = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1em;
  font-weight: 600;

  img {
    margin-right: 10px;
  }
`

export const CardActions = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  a {
    cursor: pointer;
    display: flex;
    align-items: center;

    img {
      margin-left: 10px;
    }
  }
`

export const Grow = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`
