import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Layout, Container, SEO, PageTitle, Speaking } from 'Common';

export const query = graphql`
  query speakingQuery {
    speaking: allSpeakingYaml {
      edges {
        node {
          title
          image
          link
          description
          date
          postDate
          video
          slides
          code
        }
      }
    }
  }
`;

const SpeakingPage = () => {
  const { speaking } = useStaticQuery(query);
  return (
    <Layout>
      <Container>
        <PageTitle>Speaking</PageTitle>
        <Speaking events={speaking.edges} />
      </Container>
    </Layout>
  );
};

export default SpeakingPage;

export const Head = () => (
  <SEO title="Speaking" type="Organization" location="/speaking" />
);
