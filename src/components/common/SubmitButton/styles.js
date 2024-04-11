import styled from 'styled-components';

export const Btn = styled.button`
  width: 100%;
  display: block;
  margin-top: 2em;
  padding: 1em 2em;
  border: 1px solid #eceff1;
  vertical-align: middle;
  text-transform: uppercase;
  outline: none;
  position: relative;
  z-index: 1;
  cursor: pointer;
  font-weight: 600;
  color: #eceff1;
  background-color: #226fbe;
  transition: all 0.3s;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    transition: all 0.3s;
    width: 100%;
    height: 0;
    top: 50%;
    left: 50%;
    background: #fff;
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
  }

  &:hover {
    color: #0e83cd;
    border: 1px solid #0e83cd;
    &:after {
      height: 960%;
      opacity: 1;
    }
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
      color: #fff;
      background-color: #333;
      
      &:hover {
        color: #000;
        border: 1px solid #333;
      }

      a {
        color: #adad2e;
      }
    `}
`;
