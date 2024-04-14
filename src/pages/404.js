import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import NotFound from 'Static/404/404.gif';
import { Layout, SEO, SmallerContainer, ButtonLink } from 'Common';

const NotFoundPage = () => (
  <Layout>
    <Center as={SmallerContainer}>
      <img src={NotFound} alt="404 page not found" />
      <ButtonLink
        as={Link}
        to="/"
        linkText="Go back home, it's much safer there..."
      ></ButtonLink>
    </Center>
  </Layout>
);

export const Head = () => (
  <SEO
    location="/404"
    type="Organization"
    title="404"
    description="404 page not found"
  />
);

export default NotFoundPage;

const Center = styled.div`
  padding: 1rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
