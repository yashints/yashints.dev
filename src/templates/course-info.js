import React from 'react';
import { navigate } from 'gatsby';
import { Layout, SEO, PageTitle, Container, Row, CourseInfo } from 'Common';
import courses from 'Static/course';

const isBrowser = () => typeof window !== 'undefined';

const CourseInfoPage = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const courseId = params.get('course');
  if (isNaN(courseId)) {
    navigate('/');
    return;
  }
  const courseInfo = courses[courseId - 1];

  return (
    <Layout>
      <Container>
        <PageTitle> Course Information </PageTitle>
        <Row>
          <CourseInfo courseInfo={courseInfo} />
        </Row>
      </Container>
    </Layout>
  );
};

export default CourseInfoPage;

export const Head = () => {
  if (isBrowser()) {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('course');
    const courseInfo = courses[courseId - 1];
    return <SEO title={courseInfo.name} type="" location="/courseinfo" />;
  } else {
    return <SEO title="Course Information" type="" location="/courseinfo" />;
  }
};
