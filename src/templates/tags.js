import React from 'react';
import { graphql } from 'gatsby';
import {
  Layout,
  Container,
  SEO,
  PageTitle,
  CardPost,
  Row,
  ButtonLink,
} from 'Common';
import styled from 'styled-components';

const Tags = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <Layout>
      <Container>
        <SEO
          title={tag}
          type="Organization"
          location={`/tags/${tag.replace(' ', '')}`}
        />
        <PageTitle>{tagHeader}</PageTitle>
        <TagContainer>
          <Row>
            {edges.map((post) => (
              <CardPost key={post.node.id} {...post} />
            ))}

            <Center>
              <ButtonLink
                to="/tags"
                linkText="All tags"
                minwidth="200px"
                hasMarginTop={true}
              />
            </Center>
          </Row>
        </TagContainer>
      </Container>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query postsByTagsQuery($tag: String) {
    allMarkdownRemark(
      limit: 50
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TagContainer = styled.div`
  padding-top: 2rem;
  min-height: 470px;
`;
