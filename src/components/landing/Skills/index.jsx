import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Container, ThemeContext } from 'Common';
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
  const { theme } = useContext(ThemeContext);
  const { skills } = useStaticQuery(query);
  return (
    <Wrapper theme={theme}>
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
