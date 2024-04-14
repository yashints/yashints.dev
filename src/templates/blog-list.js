import React from 'react';
import { graphql } from 'gatsby';
import {
  Layout,
  Container,
  SEO,
  PageTitle,
  CardPost,
  Row,
  PostsPagination,
} from 'Common';

const BlogList = ({ data, location, pageContext }) => {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog/${(currentPage - 1).toString()}`;
  const nextPage = `/blog/${(currentPage + 1).toString()}`;

  return (
    <Layout>
      <Container>
        <PageTitle>Articles</PageTitle>
        <br />
        <Row>
          {data.allMarkdownRemark.edges.map((post) => (
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
  );
};

export default BlogList;

export const Head = ({ location }) => (
  <SEO title="Blog" type="Organization" location={location.pathName} />
);

export const pageQuery = graphql`
  query ($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
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
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
