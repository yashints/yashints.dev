import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Project, GithubIcon, Container, Subtitle, ThemeContext } from 'Common';
import { Wrapper } from './styles';
import config from 'Data';

export const gitHubQuery = graphql`
  query githubQuery {
    github {
      viewer {
        repositories(first: 5, isFork: false) {
          edges {
            node {
              id
              name
              description
              stargazers {
                totalCount
              }
              url
              forkCount
            }
          }
        }
      }
    }
  }
`;

export const GitHub = () => {
  const { theme } = useContext(ThemeContext);
  // this throws error when building
  //const data = useStaticQuery(gitHubQuery);
  //console.log(data);
  return (
    <Wrapper theme={theme}>
      {/* <Container>
        <Subtitle>Open Source</Subtitle>
        <Project
          icon={GithubIcon}
          type="Github"
          projects={repositories.edges}
          link={config.socialLinks.github}
          color="#000"
          github
        />
      </Container> */}
    </Wrapper>
  );
};
