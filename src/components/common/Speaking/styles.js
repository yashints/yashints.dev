import styled from 'styled-components'

export const H3 = styled.h3`
  ${({ theme }) =>
    theme === 'dark' &&
    `
  color: #fff;
`};
`

export const HR = styled.hr`
  margin-bottom: 0;
  ${({ theme }) =>
    theme === 'dark' &&
    `
			color: #fff;
	`};
`
