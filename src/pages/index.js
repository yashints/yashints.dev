import React from 'react';
import {
  Intro,
  Skills,
  Work,
  Services,
  Github,
  Popular,
} from 'Components/landing';
import config from 'Data';
import { Layout, SEO } from 'Common';

export default () => (
  <Layout>
    <SEO
      title={`(${
        config.legalName
      }) Personal site`}
      type="Organization"
    />
    <Intro />
    <Skills />
    <Services />
    <Github />
    <Popular />
  </Layout>
);
