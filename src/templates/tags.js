import React from 'react';
import { graphql, Link } from 'gatsby';
import {
  Layout,
  Container,
  SEO,
  PageTitle,
  CardPost,
  Row,
} from 'Common';

export default ({ data, pageContext }) => {
  const { tag } = pageContext;
  const {
    edges,
    totalCount,
  } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <Layout>
      <Container>
        <SEO
          title={tag}
          type="Organization"
          location={`/tags/${tag}`}
        />
        <PageTitle>{tagHeader}</PageTitle>
        <br />
        <Row>
          {edges.map(post => (
            <CardPost
              key={post.node.id}
              {...post}
            />
          ))}
        </Row>
        <Link to="/tags">All tags</Link>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: {
        fields: [frontmatter___date]
        order: DESC
      }
      filter: {
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      totalCount
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
`;
