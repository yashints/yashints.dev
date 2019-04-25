import React from 'react';
import { graphql, Link } from 'gatsby';
import {
  Layout,
  Container,
  SEO,
  PageTitle,
  Tag,
} from 'Common';
import styled from 'styled-components';

export default ({
  data: {
    allMarkdownRemark: { group },
  },
}) => {
  return (
    <Layout>
      <Container>
        <SEO
          title="Tags"
          type="Organization"
          location="/tags"
        />
        <PageTitle>Tags</PageTitle>
        <Wrapper>
          {group.map(tag => (
            <Tag {...tag} key={tag.fieldValue} />
          ))}
        </Wrapper>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

const Wrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 780px) {
    padding: 2rem;
  }
`;
