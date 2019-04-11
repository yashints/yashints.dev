import React, { useContext } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Layout, Container, SEO, PageTitle, Talk, ThemeContext } from 'Common'

export default () => {
  const { theme } = useContext(ThemeContext)
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
        const pastEvents = speaking.edges.filter(
          x => x.node.postDate === 'past'
        )
        const futureEvents = speaking.edges.filter(
          x => x.node.postDate === 'future'
        )

        return (
          <Layout>
            <Container>
              <SEO title="Speaking" type="Organization" location="/speaking" />
              <PageTitle>Speaking schedule</PageTitle>
              <H3 theme={theme}>Future</H3>
              <HR />
              <Talk talks={futureEvents} />
              <H3 theme={theme}>Past</H3>
              <HR />
              <Talk talks={pastEvents} />
            </Container>
          </Layout>
        )
      }}
    />
  )
}

const H3 = styled.h3`
  ${({ theme }) =>
    theme === 'dark' &&
    `
  color: #fff;
`};
`

const HR = styled.hr`
  margin-bottom: 0;
`
