import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Container, SEO, PageTitle } from 'Common';
import { Details, Socials } from 'Components/about';

export const query = graphql`
  query AboutImageQuery {
    file(name: { eq: "me" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
  }
`;

const AboutPage = () => {
  const {
    file: {
      childImageSharp: { gatsbyImageData },
    },
  } = useStaticQuery(query);
  return (
    <Layout>
      <Container>
        <PageTitle>Who is this guy?</PageTitle>
        <Flex>
          <Details />
          <Portrait>
            <a href={gatsbyImageData.src}>
              <GatsbyImage
                image={gatsbyImageData}
                alt="Yaser Adel Mehraban's photo"
              />
            </a>
          </Portrait>
        </Flex>
        <Socials />
      </Container>
    </Layout>
  );
};

export default AboutPage;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 960px) {
    flex-direction: column;
    padding: 2rem;
  }
`;

const Portrait = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  padding-left: 0.5rem;
`;

export const Head = () => (
  <SEO title="About" type="Organization" location="/about" />
);
