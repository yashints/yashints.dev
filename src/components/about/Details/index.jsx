import React from 'react';
import { Container } from 'Common';

import { Wrapper, Text } from './styles';

export const Details = () => {
  return (
    <Wrapper as={Container}>
      <Text>
        As a seasoned software engineering lead at{' '}
        <a target="_blank" href="innovategpt.ai">
          {' '}
          InnovateGPT Group
        </a>
        , I thrive on the intersection of human ingenuity and technological
        innovation. When not crafting elegant solutions powered by GenAI, you can find me exploring the latest
        advancements in AI, cloud computing, and software engineering.
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
        it's harnessing the power of GenAI, working on (progressive) web apps, optimizing
        Client-side APIs for seamless user experiences, or utilising machine
        learning algorithms to drive intelligent solutions – I'm all about
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
