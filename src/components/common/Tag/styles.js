import styled from 'styled-components';

export const TagWrapper = styled.div`
  width: 25%;
  display: inline-block;
  position: relative;

  @media (max-width: 1100px) {
    width: 30%;
  }

  @media (max-width: 930px) {
    width: 50%;
  }

  @media (max-width: 680px) {
    width: 100%;
  }

  span {
    top: 0;
    right: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    padding: 0 4px;
    position: absolute;
    background-color: #9b6bcc;
    color: white;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
      color: #fff;
      
      a {
        background-color: #444;
      }

      span {
        background-color: #adad2e;
        color: #333;
      }
	`};
`;

export const A = styled.a`
  display: flex;
  justify-content: space-between;
  color: inherit;
  padding: 1rem;
  margin: 10px;
  border-radius: 4px;
  transition: all ease 0.4s;
  background-color: #efefef;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;
