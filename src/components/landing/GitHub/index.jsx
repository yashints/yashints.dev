import React from 'react';
import { Project, GithubIcon, Container, Subtitle } from 'Common';
import { Wrapper } from './styles';
import config from 'Data';

export const GitHub = ({ data }) => {
  const {github: {viewer: {repositories}}} = data;
  return (
    <Wrapper>
      <Container>
        <Subtitle>Open Source</Subtitle>
        <Project
          icon={GithubIcon}
          type="Github"
          projects={repositories.edges}
          link={config.socialLinks.github}
          color="#000"
          github
        />
      </Container>
    </Wrapper>
  );
};
