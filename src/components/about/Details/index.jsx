import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { Container, ThemeContext } from 'Common';

import { Wrapper, Text } from './styles';

export const Details = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Wrapper as={Container}>
      <Text theme={theme}>
        He is a Melbourne based lead consultant at
        <a
          href="https://readify.net"
          target="_blank"
        >
          {' '}
          Readify
        </a>
        , (a successful software consultancy based
        in Australia) and enjoys building
        everything from small business sites to
        large scale rich interactive web apps.
      </Text>
      <Text>
        He is passionate about everything web and
        in his spare time, apart from some wood
        working, he reads, writes, and works on
        the latest and greatest web technologies
        and frameworks.
      </Text>
      <Text theme={theme}>
        Progressive web apps, WebAssembly, Payment
        API, Web Share API, web performance, you
        name it. He is all in.
      </Text>
    </Wrapper>
  );
};
