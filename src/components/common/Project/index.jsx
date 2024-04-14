import React from 'react';
import { Card, Repository, ButtonLink } from 'Common';
import { Wrapper, Work } from './styles';

export const Project = ({ title, projects, link, side, github }) => {
  return (
    <Wrapper>
      <h4>{title}</h4>
      <Work $github={github} $side={side}>
        {!github
          ? projects.edges.map(({ node }) => <Card key={node.id} {...node} />)
          : projects.map((project, index) => (
              <Repository key={project.node.id} id={index} {...project} />
            ))}
        {!side && <ButtonLink linkText="See more" to={link} external={true} />}
      </Work>
    </Wrapper>
  );
};
