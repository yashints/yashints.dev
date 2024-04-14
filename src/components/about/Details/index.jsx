import React from 'react';
import { Container } from 'Common';

import { Wrapper, Text } from './styles';

export const Details = () => {
  return (
    <Wrapper as={Container}>
      <Text>
        I am a developer by heart and a currently a technical trainer at
        <a target="_blank" href="microsoft.com">
          {' '}
          Microsoft
        </a>
        , who enjoys coding, learning, and sharing what I've learnt with the dev
        community. I also love building stuff (mostly apps, but sometimes wooden
        projects) and solving real world problems.
      </Text>
      <Text>
        I use HTML, CSS, JavaScript, TypeScript and C# to build web apps, and
        have worked with frameworks such as React.js, Angular.js, Node, Next.js
        and DotNet.
      </Text>
      <Text>
        I am passionate about everything cloud and web, and in my spare time,
        apart from some woodworking, read, write, and work on the latest and
        greatest web technologies and frameworks.
      </Text>
      <Text>
        Progressive web apps, WebAssembly, Client side web APIs, web
        performance, you name it. I am all in.
      </Text>
    </Wrapper>
  );
};
