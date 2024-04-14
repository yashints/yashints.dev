import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Container } from 'Common';
import { Skill } from './Skill';
import { Wrapper, Flex } from './styles';

export const query = graphql`
  query skillsQuery {
    skills: allSkillsYaml {
      edges {
        node {
          id
          title
          icon
        }
      }
    }
  }
`;

export const Skills = () => {
  const { skills } = useStaticQuery(query);
  return (
    <Wrapper>
      <Container>
        <h2>What he does</h2>
        <Flex>
          {skills.edges.map(({ node }) => (
            <Skill key={node.id} {...node} />
          ))}
        </Flex>
      </Container>
    </Wrapper>
  );
};
