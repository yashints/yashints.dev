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
  post.frontmatter.fullPath = postPath
  return (
    <Layout>
      <SmallerContainer>
        <SEO
          type="NewsArticle"
          title={post.frontmatter.title}
          articleBody={post.html}
          datePublished={post.frontmatter.date}
          dateModified={
            post.frontmatter.edited
              ? post.frontmatter.edited
              : post.frontmatter.date
          }
          cover={post.frontmatter.thumbnail.childImageSharp.fluid.originalImg}
          location={postPath}
        />
        <Post {...post} />
      </SmallerContainer>
    </Layout>
  )
}

export const postQuery = graphql`
  query($path: String!) {
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
      frontmatter {
        unformattedDate: date
        date(formatString: "MMMM DD, YYYY")
        edited(formatString: "MMMM DD, YYYY")
        path
        title
        next
        id
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
