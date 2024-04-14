import styled from 'styled-components';

export const StyledTitle = styled.h2`
  position: relative;
  display: inline-block;
  &:before {
    /* Highlight color */
    background-color: rgb(0, 191, 255, 0.2);

    content: '';
    position: absolute;
    width: calc(100% + 4px);
    height: 100%;
    left: -2px;
    bottom: 0;
    z-index: -1;
  }
  @media (max-width: 960px) {
    text-align: center;
  }
`;
