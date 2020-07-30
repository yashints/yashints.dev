import React from 'react';
import { Layout, SEO, PageTitle, Container, Row, Services } from 'Common';

export default () => (
  <Layout>
    <Container>
      <SEO
        title="Workshops and Training &ndash; Yashints &ndash; Web Performance Optimisation"
        type=""
        location="/contact"
      />
      <PageTitle>Workshops and Trainings</PageTitle>
      <Row>
        <Services></Services>
      </Row>
    </Container>
  </Layout>
);
