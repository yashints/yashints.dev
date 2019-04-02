import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 4rem 1rem;

  p {
    color: gray;
    margin-bottom: 1rem;
    &:last-of-type {
      margin-bottom: 2rem;
    }
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
			color: #fff;
	`}
`

export const Flex = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 380px) {
    flex-direction: column;
  }
`
