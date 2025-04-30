import React from 'react';
import { Layout, SEO, PageTitle, Container, Row, CourseInfo } from 'Common';
import courses from 'Static/course';

const CourseInfoPage = ({ location }) => {
  return (
    <Layout>
      <Container>
        <PageTitle> Course Information </PageTitle>
        <Row>
          <CourseInfo location={location} />
        </Row>
      </Container>
    </Layout>
  );
};

export default CourseInfoPage;

export const Head = () => {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('course');
  const courseInfo = courses[courseId - 1];
  return <SEO title={courseInfo.name} type="" location="/courseinfo" />;
};
