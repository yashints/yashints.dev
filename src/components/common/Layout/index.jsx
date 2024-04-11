import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext, Provider } from 'Common';
import { Header, Footer } from 'Theme';
import SpaceCraft from 'Static/icons/spacecraft.svg';
import './layout.scss';
import './main.scss';

function throttle(func, timeout) {
  let ready = true;
  return (...args) => {
    if (!ready) {
      return;
    }

    ready = false;
    func(...args);
    setTimeout(() => {
      ready = true;
    }, timeout);
  };
}

export const Layout = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  const scrollHandler = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    const handleInputThrottled = throttle(scrollHandler, 200);

    function watchScroll() {
      window.addEventListener('scroll', handleInputThrottled);
    }
    watchScroll();

    return () => {
      window.removeEventListener('scroll', handleInputThrottled);
    };
  });

  return (
    <Provider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <>
            <div id="top">
              <a
                className={scrollY > 350 ? 'visible' : ''}
                id="back2Top"
                title="Back to top"
                href="#top"
              >
                <img
                  src={SpaceCraft}
                  width="48px"
                  alt="Back to top"
                  title="Back to top"
                />
              </a>
              <Header />
              <LayoutStyled theme={theme}>{children}</LayoutStyled>
              <Footer />
            </div>
          </>
        )}
      </ThemeContext.Consumer>
    </Provider>
  );
};

const LayoutStyled = styled.div`
  width: 100%;
  padding-top: 7rem;

  ${({ theme }) =>
    theme === 'dark' &&
    `
		background: #212121;
	`};
`;
