import React from 'react';
import { Intro, Skills, Services, GitHub, Popular } from 'Components/landing';
import config from 'Data';
import { graphql } from 'gatsby';
import { Layout, SEO } from 'Common';

const IndexPage = ( { data }) => {
 return (
  <Layout>
    <Intro />
    <Skills />
    <Services />
    <GitHub data={data} />
    <Popular />
  </Layout>
 )
};

export const Head = () => (
  <SEO title={`(${config.legalName}) Personal site`} type="Organization" />
);

export default IndexPage;

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