import React from 'react';
import { Container } from 'Common';

import { Wrapper, Text } from './styles';

export const Details = () => {
  return (
    <Wrapper as={Container}>
      <Text>
        As a seasoned developer and technical trainer at{' '}
        <a target="_blank" href="microsoft.com">
          {' '}
          Microsoft
        </a>
        , I thrive on the intersection of human ingenuity and technological
        innovation. When not crafting engaging training sessions or building
        cutting-edge web applications, you can find me exploring the latest
        advancements in cloud computing, artificial intelligence, and machine
        learning.
      </Text>
      <Text>
        My tech toolkit includes HTML, CSS, JavaScript, TypeScript, C#, and a
        range of frameworks and libraries that enable me to tackle complex
        problems on both frontend and backend. I've successfully applied my
        skills to build scalable, high-performing web solutions using React.js,
        Angular.js, Node, Next.js, and DotNet.
      </Text>
      <Text>
        With a passion for problem-solving and a knack for learning, I'm always
        on the lookout for new challenges and opportunities to grow. Whether
        it's harnessing the power of Progressive Web Apps, optimizing
        Client-side APIs for seamless user experiences, or leveraging machine
        learning algorithms to drive intelligent decisions – I'm all about
        pushing the boundaries of what's possible.
      </Text>

      <Text>
        In my free time, you'll find me staying up-to-date with the latest
        developments in web development, AI, and cloud computing. I'm fascinated
        by the potential of WebAssembly, Client-side APIs, and other emerging
        technologies to transform the way we build and interact with software.
      </Text>
    </Wrapper>
  );
};
