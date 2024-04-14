import React from 'react';
import { Layout, SEO, PageTitle, Container, Row } from 'Common';
import { ContactForm } from 'Components/contact';

const Contact = () => (
  <Layout>
    <Container>
      <PageTitle>Getting in touch</PageTitle>
      <Row>
        <ContactForm />
      </Row>
    </Container>
  </Layout>
);

export const Head = () => (
  <SEO title="Contact" type="Organization" location="/contact" />
);

export default Contact;
