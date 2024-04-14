import React from 'react';
import { Row, CardPost, ButtonLink } from 'Common';
import { Wrapper, Center } from './styles.js';

export const MostPopularPosts = ({ edges }) => {
  return (
    <Wrapper>
      <Row>
        {edges.map((post) => (
          <CardPost landing key={post.node.id} {...post} />
        ))}
      </Row>
      <Center>
        <ButtonLink to="/blog" linkText="See more" minwidth={'200px'} />
      </Center>
    </Wrapper>
  );
};
