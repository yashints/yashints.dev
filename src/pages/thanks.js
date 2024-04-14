import React from 'react';
import { Layout, SEO } from 'Common';
import { ThanksContent } from 'Components/contact/ThanksContent';

const ThanksPage = () => (
  <Layout>
    <ThanksContent />
  </Layout>
);

export default ThanksPage;

export const Head = () => (
  <SEO title="Thanks!" type="Organization" location="/thanks" />
);
