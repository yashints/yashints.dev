import React from 'react'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Layout, Container, SEO, PageTitle } from 'Common'

export default () => (
  <StaticQuery
    query={graphql`
      query {
        speaking: allSpeakingYaml {
          edges {
            node {
              title
              image
              link
              description
              date
            }
          }
        }
      }
    `}
    render={({ speaking }) => (
      <Layout>
        <Container>
          <SEO title="Speaking" type="Organization" location="/speaking" />
          <PageTitle>Speaking schedule</PageTitle>
          {speaking.edges.map(({ node }) => (
            <div key={node.title}>{node.title}</div>
          ))}
          <Flex />
        </Container>
      </Layout>
    )}
  />
)

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`
