import React from 'react';
import { Container } from 'Common';

import { Wrapper, Text } from './styles';

export const Details = () => {
  return (
    <Wrapper as={Container}>
      <Text>
        By day, I'm a GenAI guru and Principal Software Engineer at{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.atlassian.com"
        >
          Atlassian
        </a>
        , which mostly means teaching AI to be useful before it gets too
        confident. I work on bringing calm to the madness of the developer loop
        and shipping AI-powered features in Jira. My happy place is where
        product engineering, developer experience, and useful AI stop arguing
        and start helping people get work done.
      </Text>
      <Text>
        I have a suspicious amount of fun translating scary-looking technology
        into "oh, I get it now" moments. Sometimes that happens on conference
        stages, sometimes in blog posts or mentoring chats, and sometimes while
        politely convincing GenAI, browser APIs, and software architecture to
        behave like they are all on the same team.
      </Text>

      <Text>
        Outside work, I'm usually learning, writing, hiking, or tinkering with a
        new idea before it has fully agreed to become a project. I am still
        fascinated by WebAssembly, browser APIs, AI-assisted development, and
        all the small details that make software feel a little more magical and
        a lot less exhausting.
      </Text>
    </Wrapper>
  );
};
