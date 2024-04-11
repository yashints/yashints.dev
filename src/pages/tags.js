import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Layout, Container, SEO, PageTitle, Tag } from 'Common';
import styled from 'styled-components';

const TagsPage = () => {
  const data = useStaticQuery(pageQuery);
  const group = data.allMarkdownRemark.group;
  return (
    <Layout>
      <Container>
        <PageTitle>Tags</PageTitle>
        <Wrapper>
          {group.map((tag) => (
            <Tag {...tag} key={tag.fieldValue} />
          ))}
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default TagsPage;

export const Head = () => (
  <SEO title="Tags" type="Organization" location="/tags" />
);

export const pageQuery = graphql`
  query tagsQuery {
    allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT } }) {
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
