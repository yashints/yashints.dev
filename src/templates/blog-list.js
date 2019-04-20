import React, { useContext } from 'react'
import { graphql, Link } from 'gatsby'
import {
  Layout,
  Container,
  SEO,
  PageTitle,
  CardPost,
  Row,
  PostsPagination,
} from 'Common'

export default ({ data, pageContext, location }) => {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog/${(currentPage - 1).toString()}`
  const nextPage = `/blog/${(currentPage + 1).toString()}`

  return (
    <Layout>
      <Container>
        <SEO title="Blog" type="Organization" location={location.pathName} />
        <PageTitle>Articles</PageTitle>
        <Row>
          {data.allMarkdownRemark.edges.map(post => (
            <CardPost key={post.node.id} {...post} />
          ))}
        </Row>
        <PostsPagination
          isFirst={isFirst}
          isLast={isLast}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPageQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
    ) {
      edges {
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
      }
    }
  }
`
