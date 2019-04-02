import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Container, CardPost, Row, Subtitle } from 'Common'
import { MagicalButton } from '../../theme/shared-styles'
import { Wrapper, Center } from './styles.js'

export const imageFields = graphql`
  fragment imageFields on ImageSharp {
    fluid(maxWidth: 630) {
      ...GatsbyImageSharpFluid_tracedSVG
    }
  }
`

export const Popular = () => (
  <StaticQuery
    query={graphql`
      query {
        popular: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { popular: { eq: true } } }
          limit: 3
        ) {
          edges {
            node {
              excerpt(pruneLength: 230)
              id
              timeToRead
              frontmatter {
                title
                unformattedDate: date
                date(formatString: "MMM DD, YYYY")
                path
                thumbnail {
                  childImageSharp {
                    ...imageFields
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={({ popular: { edges } }) => (
      <Wrapper id="popular" as={Container}>
        <Subtitle>Popular articles</Subtitle>
        <Row>
          {edges.map(post => (
            <CardPost landing key={post.node.id} {...post} />
          ))}
        </Row>
        <Center>
          <MagicalButton as={Link} to="/blog/">
            See more
          </MagicalButton>
        </Center>
      </Wrapper>
    )}
  />
)
