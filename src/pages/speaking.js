import React, { useContext } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import {
  Layout,
  Container,
  SEO,
  PageTitle,
  Speaking,
} from 'Common'

export default () => {
  return (
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
                postDate
                video
                slides
                code
              }
            }
          }
        }
      `}
      render={({ speaking }) => {
        return (
          <Layout>
            <Container>
              <SEO
                title="Speaking"
                type="Organization"
                location="/speaking"
              />
              <PageTitle>Speaking</PageTitle>
              <Speaking events={speaking.edges} />
            </Container>
          </Layout>
        )
      }}
    />
  )
}
