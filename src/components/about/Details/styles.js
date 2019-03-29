import styled from 'styled-components'

export const Wrapper = styled.div`
  flex: 1;
`

export const Text = styled.p`
  color: #212121;
  text-align: justify;

  ${({ theme }) =>
    theme === 'dark' &&
    `
		color: #fff;
	`};
`
