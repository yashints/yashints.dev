import React from 'react';
import { Layout, SEO, PageTitle, Container, Row, Services } from 'Common';

const ServicesPage = () => (
  <Layout>
    <Container>
      <PageTitle>Workshops, Trainings, and Courses</PageTitle>
      <Row>
        <Services></Services>
      </Row>
    </Container>
  </Layout>
);

export default ServicesPage;

export const Head = () => (
  <SEO
    title="Workshops and Training &ndash; Yashints &ndash; Web Performance Optimisation"
    type=""
    location="/contact"
  />
);
