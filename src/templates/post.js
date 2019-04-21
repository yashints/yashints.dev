import React from 'react'
import { graphql } from 'gatsby'
import {
  Layout,
  SmallerContainer,
  SEO,
  Post,
} from 'Common'
import './highlight.scss'
import Util from 'Util'

export default ({
  data: { post },
  pageContext,
}) => {
  const thumbnail = post.frontmatter.thumbnail
    ? post.frontmatter.thumbnail.childImageSharp
        .fluid.originalImg
    : ''
  post.postPath = pageContext.postPath
  post.frontmatter.nextPost = pageContext.nextPost
  post.frontmatter.previousPost =
    pageContext.previousPost
  return (
    <Layout>
      <SmallerContainer>
        <SEO
          type="NewsArticle"
          title={post.frontmatter.title}
          articleBody={post.html}
          datePublished={post.frontmatter.date}
          cover={thumbnail}
          canonical_url={
            post.frontmatter.canonical_url
          }
          location={pageContext.postPath}
        />
        <Post {...post} />
      </SmallerContainer>
    </Layout>
  )
}

export const postQuery = graphql`
  query($title: String!) {
    post: markdownRemark(
      frontmatter: { title: { eq: $title } }
    ) {
      html
      timeToRead
      frontmatter {
        unformattedDate: date
        date(formatString: "MMMM DD, YYYY")
        title
        subtitle
        id
        author
        gravatar
        canonical_url
        tags
        img: thumbnail {
          publicURL
        }
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
