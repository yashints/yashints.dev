import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import {
  Layout,
  Container,
  SEO,
  PageTitle,
  CardPost,
  Row,
  PostsPagination,
} from 'Common';

const BlogList = ({ pageContext, location }) => {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog/${(currentPage - 1).toString()}`;
  const nextPage = `/blog/${(currentPage + 1).toString()}`;
  const data = useStaticQuery(pageQuery);

  return (
    <Layout>
      <Container>
        <SEO title="Blog" type="Organization" location={location.pathName} />
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

export const Head = () => <SEO title="Blog" type="Organization" />;

const pageQuery = graphql`
  query ($limit: Int!, $skip: Int!) {
    allMarkdownRemark(limit: $limit, skip: $skip) {
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
