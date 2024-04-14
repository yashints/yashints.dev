import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Container, MostPopularPosts, Subtitle } from 'Common';
import { Wrapper } from './styles.js';

export const query = graphql`
  query popularQuery {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { popular: { eq: true } } }
      limit: 3
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
            tags
            author
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

export const Popular = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(query);
  return (
    <Wrapper id="popular" as={Container}>
      <Subtitle>Popular articles</Subtitle>
      <MostPopularPosts edges={edges} />
    </Wrapper>
  );
};
