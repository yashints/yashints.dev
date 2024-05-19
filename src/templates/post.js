import React from 'react';
import { graphql } from 'gatsby';
import { Layout, SmallerContainer, SEO, Post } from 'Common';
import './highlight.scss';

const PostTemplate = ({ data: { post }, pageContext }) => {
  post.postPath = pageContext.postPath;
  post.frontmatter.nextPost = pageContext.nextPost;
  post.frontmatter.previousPost = pageContext.previousPost;

  return (
    <Layout>
      <SmallerContainer>
        <Post {...post} />
      </SmallerContainer>
    </Layout>
  );
};

export const Head = ({ data: { post }, pageContext }) => {
  const cover = post.frontmatter.socialPreview
    ? post.frontmatter.socialPreview.publicURL
    : '';
  return (
    <SEO
      type="NewsArticle"
      title={post.frontmatter.title}
      articleBody={post.html}
      datePublished={post.frontmatter.date}
      cover={cover}
      canonical_url={post.frontmatter.canonical_url}
      location={pageContext.postPath}
    />
  );
};

export default PostTemplate;

export const postQuery = graphql`
  query postQuery($title: String) {
    post: markdownRemark(frontmatter: { title: { eq: $title } }) {
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
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
        cover {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
        img: thumbnail {
          publicURL
        }
        socialPreview: cover {
          publicURL
        }
      }
    }
  }
`;
