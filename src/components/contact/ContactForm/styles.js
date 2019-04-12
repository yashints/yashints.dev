import styled from 'styled-components'

export const ContactWrapper = styled.div`
  text-align: left;

  hr {
    margin-top: 1rem;
  }
  form {
    margin-top: 3rem;
    padding: 3rem;
    box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.5);
    transition: transform 0.6s 0.6s;

    textarea {
      margin-top: 1rem;
    }
  }
  ${({ theme }) =>
    theme === 'dark' &&
    `
		color: #fff;
		hr {
			background: rgb(255, 255, 255, 0.4);
		}
		a {
			color: #6e9fef;
		}
		input, textarea {
			background: #333;
			color: #fff;
		}
	`};
`

export const Wrapper = styled.div`
  margin-bottom: 1rem;
`

export const InputField = styled.div`
  width: 100%;
  margin-top: 1rem;
  box-sizing: border-box;
  transition: all 0.2s ease;
  text-align: left;
  border: none;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
  transition: transform 0.5s 0.6s;
  -webkit-appearance: none;
  color: #828282;

  &:focus {
    border-color: #212121;
    transition: all 0.2s ease;
  }

  ${({ error }) =>
    error &&
    `
		border-color: red;
	`};

  ${({ textarea }) =>
    textarea &&
    `
		resize: vertical;
		min-height: 8rem;
		margin: 0;
	`};
`

export const Center = styled.div`
  text-align: center;
`

export const Error = styled.div`
  color: red;
`

export const Text = styled.div`
  margin-bottom: 1rem;
`
export const StackedText = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;

  svg {
    margin-right: 20px;
  }
`

export const Icon = styled.div``
