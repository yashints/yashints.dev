import styled from 'styled-components';

export const SidebarContainer = styled.div`
  position: fixed;
  z-index: 4;
  overflow: auto;
  top: 0px;
  right: -275px;
  width: 0;
  opacity: 0;
  height: 100%;
  transition: all 350ms cubic-bezier(0.6, 0.05, 0.28, 0.91);

  ${({ $active }) =>
    $active &&
    `
    background-color: #fff;
		width: 20%;
		right: 0px;
		opacity: 1;

		@media (max-width: 960px) {
			width: 40%;
		}

		@media (max-width: 600px) {
			width: 75%;
		}
	`}

  ${({ $theme }) =>
    $theme === 'dark' &&
    `
    background-color: #212121;
  `}
`;
