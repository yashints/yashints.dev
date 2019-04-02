import styled from 'styled-components'

export const MagicalButton = styled.a`
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