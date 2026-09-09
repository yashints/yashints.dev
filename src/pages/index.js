import React from 'react';
import { Intro, Skills, Services, Popular } from 'Components/landing';
import config from 'Data';
import { Layout, SEO } from 'Common';

const IndexPage = () => {
 return (
  <Layout>
    <Intro />
    <Skills />
    <Services />
    <Popular />
  </Layout>
 )
};

export const Head = () => (
  <SEO title={`(${config.legalName}) Personal site`} type="Organization" />
);

export default IndexPage;
