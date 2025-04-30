import React from 'react';
import { Layout, SEO, PageTitle, Container, Row, Courses } from 'Common';

const OnlineCoursesPage = () => (
  <Layout>
    <Container>
      <PageTitle>Online Courses</PageTitle>
      <Row>
        <Courses></Courses>
      </Row>
    </Container>
  </Layout>
);

export default OnlineCoursesPage;

export const Head = () => (
  <SEO
    title="Online courses offered for kids and more"
    type=""
    location="/courses"
  />
);
