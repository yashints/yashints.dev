import React from 'react'
import { graphql } from 'gatsby'
import { Layout, SmallerContainer, SEO, Post } from 'Common'
import './highlight.scss'
import Util from 'Util'

export default ({ data: { post } }) => {
  const postPath = Util.getPostPath(
    post.frontmatter.path,
    post.frontmatter.date
  )
  const thumbnail = post.frontmatter.thumbnail
    ? post.frontmatter.thumbnail.childImageSharp.fluid.originalImg
    : ''
  post.frontmatter.fullPath = postPath
  return (
    <Layout>
      <SmallerContainer>
        <SEO
          type="NewsArticle"
          title={post.frontmatter.title}
          articleBody={post.html}
          datePublished={post.frontmatter.date}
          cover={thumbnail}
          location={postPath}
        />
        <Post {...post} />
      </SmallerContainer>
    </Layout>
  )
}

export const postQuery = graphql`
  query($postPath: String!) {
    post: markdownRemark(frontmatter: { path: { eq: $postPath } }) {
      html
      timeToRead
      frontmatter {
        unformattedDate: date
        date(formatString: "MMMM DD, YYYY")
        path
        title
        id
        author
        tags
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 700) {
              originalImg
            }
          }
        }
      }
    }
  }
`
