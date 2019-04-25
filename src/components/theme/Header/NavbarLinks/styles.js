import styled from 'styled-components';

export const Links = styled.div`
  a {
    color: #6d6d6d;
    text-decoration: none;
    padding-bottom: 8px;
    transition: all ease-in-out 0.2s;

    &:hover {
      border-bottom: 3px solid #107dac;
    }

    &.current {
      color: #212121;

      border-bottom: 3px solid #107dac;
    }

    ${({ theme }) =>
      theme === 'dark' &&
      `
            color: #fff;
            &:hover {
              border-bottom: 3px solid #adad2e;
            }
            &.current {
              color: #929090;
              padding-bottom: 5px;
		          border-bottom: 2px solid #adad2e;
            }
        `}
  }

  ${({ desktop }) =>
    desktop
      ? `
        @media (max-width: 960px) {
            display: none;
        }

        a {
            margin-right: 1rem;

            &:last-child {
                margin-right: unset;
            }
        }
    `
      : `
        padding: 3rem;
        display: flex;
        flex-direction: column;

        a {
            margin-bottom: 1rem;

            &:last-child {
                margin-bottom: unset;
            }
        }
    `}
`;

export const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  position: relative;
  top: 0.3rem;
  background: none;
  text-align: left;

  img {
    margin: 0;
  }
`;
