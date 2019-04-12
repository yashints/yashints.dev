import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 1rem 0 2rem 0;
`

export const Card = styled.div`
  flex: 0 0 15%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  &:not(first-of-type) {
    margin-right: 1rem;
    margin-top: 15px;
  }

  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);

  img {
    margin-bottom: 0;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
      color: #fff;
      background-color: #333;
      
      box-shadow: 0 2px 1px -1px rgba(255, 255, 255, 0.2), 0 1px 1px 0 rgba(255, 255, 255, 0.14),
    0 1px 3px 0 rgba(255, 255, 255, 0.12);
	`};
`

export const CardHeader = styled.div`
  font-weight: 700;
  padding: 1rem;
`

export const CardDescription = styled.div`
  font-size: 0.9em;
  padding: 1rem;
  margin-bottom: auto;
`

export const CardDate = styled.div`
  display: flex;
  font-size: 0.9em;
  flex-direction: row;
  align-items: center;
  padding-left: 0.8em;
  padding-top: 0.8em;
  border-top: 1px solid #ddd;

  img {
    margin-right: 10px;
  }
`

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  justify-content: flex-end;
  a {
    margin: 10px;
    cursor: pointer;
  }
`

export const Grow = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`
