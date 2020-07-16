import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 2rem 2em;

  p {
    margin-bottom: 1rem;
    &:last-of-type {
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 680px) {
    padding: 2rem;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
      color: #fff;

      a {
        color: #adad2e;
      }
	`}
`

export const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  a {
    margin: 5px;
  }

  @media (max-width: 505px) {
    a {
      width: 100%;
    }
  }

  @media (max-width: 380px) {
    flex-direction: column;
  }
`

export const Box = styled.div`
  box-shadow: 0px 2px 28px -6px rgba(0, 0, 0, 0.09);
  padding: 1em;
`
