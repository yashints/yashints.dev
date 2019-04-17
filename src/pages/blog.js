import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Layout, Container, SEO, PageTitle, CardPost, Row } from 'Common'

export default () => (
  <StaticQuery
    query={graphql`
      query BlogQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 20
        ) {
          edges {
            previous {
              frontmatter {
                path
              }
            }
            node {
              id
              html
              timeToRead
              frontmatter {
                title
                unformattedDate: date
                date(formatString: "MMM DD, YYYY")
                path
                author
                tags
                thumbnail {
                  childImageSharp {
                    ...imageFields
                  }
                }
              }
            }
            next {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <Container>
          <SEO title="Blog" type="Organization" location="/blog" />
          <PageTitle>Articles</PageTitle>
          <Row>
            {data.allMarkdownRemark.edges.map(post => (
              <CardPost key={post.node.id} {...post} />
            ))}
          </Row>
        </Container>
      </Layout>
    )}
  />
)
