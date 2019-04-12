import styled from 'styled-components'

const styles = `
display: inline-block;
color: #226fbe;
font-weight: 700;
padding: 12px 24px;
border: 1px solid #4f4f4f;
border-radius: 4px;
transition: all 0.2s ease-in;
position: relative;
overflow: hidden;
margin-right: 20px;

&:before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 100%;
  width: 140%;
  height: 180%;
  background-color: #226fbe;
  border-radius: 50%;
  display: block;
  transition: all 0.2s ease-in;
  z-index: -1;
}

&:after {
  content: '';
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: #226fbe;
  border-radius: 50%;
  display: block;
  transition: all 0.2s ease-in;
  z-index: -1;
}

&:hover {
  color: #fff;
  border: 1px solid #226fbe;

  &:before {
    top: -35%;
    background-color: #226fbe;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }

  &:after {
    top: -45%;
    background-color: #226fbe;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }
}

@media (max-width: 780px) {
  width: 30%;
  margin: 0 auto;
  text-align: center;
}

@media (max-width: 380px) {
  display: block;
  width: 100%;
  margin: 10px;
  text-align: center;
}

&:hover {
  box-shadow: 0px 0px 17px 0px rgba(185, 185, 185, 0.4);
}
`

export const MagicalButton = styled.a`
  ${styles}
`

export const MagicalSubmitButton = styled.button`
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
    `}
`
