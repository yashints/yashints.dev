import React from 'react';
import { graphql, Link } from 'gatsby';
import {
  Layout,
  Container,
  SEO,
  PageTitle,
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
            <Tag key={tag.fieldValue}>
              <A href={`/tags/${tag.fieldValue}`}>
                {tag.fieldValue}
              </A>
              <span>{tag.totalCount}</span>
            </Tag>
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
`;

const Tag = styled.div`
  width: 25%;
  display: inline-block;

  span {
    top: 0;
    right: 0;
    height: 20px;
    display: flex;
    padding: 0 4px;
    position: absolute;
    background-color: red;
    color: white;
    width: 32px;
  }
`;

const A = styled.a`
  display: flex;
  justify-content: space-between;
  color: inherit;
  padding: 1rem;
  margin: 10px;
  border-radius: 4px;
  transition: all ease 0.4s;
  background-color: #efefef;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;
