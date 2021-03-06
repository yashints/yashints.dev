import React from 'react';
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import {
  Layout,
  Container,
  SEO,
  PageTitle,
} from 'Common';
import {
  Details,
  Socials,
} from 'Components/about';

export default () => (
  <StaticQuery
    query={graphql`
      query AboutImageQuery {
        AboutImage: imageSharp(
          fluid: {
            originalName: { eq: "me.jpg" }
          }
        ) {
          ...imageFields
        }
      }
    `}
    render={data => (
      <Layout>
        <Container>
          <SEO
            title="About"
            type="Organization"
            location="/about"
          />
          <PageTitle>Who is this guy?</PageTitle>
          <Flex>
            <Details />
            <Portrait>
              <a href={data.AboutImage.fluid.src}>
                <Img
                  fluid={data.AboutImage.fluid}
                  alt="Yaser Adel Mehraban's photo"
                />
              </a>
            </Portrait>
          </Flex>
          <Socials />
        </Container>
      </Layout>
    )}
  />
);

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
