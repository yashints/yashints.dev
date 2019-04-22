import styled from 'styled-components';

export const FooterContainer = styled.footer`
  margin-top: 2rem;

  @media (max-width: 680px) {
    margin-top: 0;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
		margin-top: 0;
    background: #212121;
    
    a {
      color: #adad2e;
    }
	`};
`;

export const FullContainer = styled.div`
  width: 100%;
  padding: 2rem 0 1rem 0;
  color: #fff;
  background-image: linear-gradient(
    to bottom,
    rgba(34, 111, 190, 1) 0%,
    rgba(35, 83, 138, 1) 100%
  );

  ${({ theme }) =>
    theme === 'dark' &&
    `
		color: #000;
		background-image: linear-gradient(10deg, #404040 0%, #303030 100%);		
	`};
`;

export const List = styled.ul`
  list-style: none;
  align-self: center;
  margin-bottom: 0;

  li {
    display: inline-block;
    padding: 0 1rem;
  }

  a {
    color: #fff;
  }
`;

export const Wrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;

  @media (max-width: 680px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLogo = styled.div`
  transition: 0.5s;
  height: 4rem;
  width: 4rem;
  margin-right: 1rem;
  margin-bottom: 0;

  &:hover {
    opacity: 0.7;
    transition: 0.5s;
    transform: rotate(360deg);
  }
`;

export const Social = styled.a`
  margin-right: 1rem;

  ${({ last }) =>
    last &&
    `
		margin-right: unset;
	`};
`;

export const Grow = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;
  }
`;
